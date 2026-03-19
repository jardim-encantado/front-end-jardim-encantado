import api from "../base/config";
import { createApiRepository } from "../base/Repository";
import { createPersonService } from "./PersonService";
import { toStudentRequest } from "../schemas/dto/StudentRequest";
import { createGuardianService } from "./GuardianService";
import { toStudentSchema } from "../schemas/Student";
import { createRoleService } from "./RoleService";
import { sanitizeCpf } from "../util/objectUtil";

const STUDENTS_ENDPOINT = "/api/v1/students";

const studentApi = createApiRepository(
  STUDENTS_ENDPOINT,
  toStudentRequest,
  toStudentSchema,
);

export function createStudentService() {
  const personService = createPersonService();
  const guardianService = createGuardianService();
  const roleService = createRoleService();

  let cachedStudents = null;

  const ensureStudentRole = async (studentData) => {
    if (studentData?.roleId) {
      return studentData.roleId;
    }

    const resolvedRoleId = await roleService.resolveRoleId("student");

    if (!resolvedRoleId) {
      throw new Error(
        "Could not resolve student roleId. Configure VITE_ROLE_ID_STUDENT or provide roleId in payload.",
      );
    }

    return resolvedRoleId;
  };

  return {
    async createStudent(studentData, guardianData) {
      try {
        let createdGuardian = null;

        // 1. Lógica do Responsável (Guardian)
        if (guardianData?.cpf) {
          try {
            createdGuardian =
              await guardianService.createGuardian(guardianData);
          } catch (error) {
            if (error.response?.status === 409) {
              createdGuardian = await guardianService.getGuardianByCpf(
                guardianData.cpf,
              );
            } else {
              throw error;
            }
          }
        }

        // 2. Resolver o Role ID (Garante que seja um Integer)
        const roleId = await ensureStudentRole(studentData);

        // 3. Criar a Pessoa (Person)
        // Aqui enviamos o objeto completo que o PersonRequest do Java espera
        try {
          const personPayload = {
            firstName: studentData.firstName,
            lastName: studentData.lastName,
            email: studentData.email,
            cpf: sanitizeCpf(studentData.cpf),
            password: studentData.password,
            phoneNumber: studentData.phoneNumber,
            roleId: Number(roleId), // Força conversão para número
            address: {
              street: studentData.address.street,
              streetNumber: studentData.address.streetNumber,
              cep: studentData.address.cep,
              city: studentData.address.city,
              state: studentData.address.state,
              complement: studentData.address.complement || "",
            },
          };

          await personService.createPerson(personPayload);
        } catch (error) {
          // Se a pessoa já existir (409), ignoramos e seguimos para criar o vínculo de estudante
          if (error.response?.status !== 409) {
            throw error;
          }
        }

        // 4. Criar o Estudante (Student) - O PONTO CRÍTICO
        // O seu StudentRequest no Java espera APENAS o CPF
        const studentPayload = {
          cpf: sanitizeCpf(studentData.cpf),
        };

        const createdStudent = await studentApi.create(studentPayload);

        // 5. Vincular Estudante ao Responsável
        if (createdGuardian?.guardianId && createdStudent?.studentId) {
          try {
            await guardianService.addStudentToGuardian(
              createdGuardian.guardianId,
              createdStudent.studentId,
            );
          } catch (error) {
            console.warn(
              "Estudante criado, mas falhou ao vincular ao responsável:",
              error,
            );
          }
        }

        // Limpar cache e retornar
        cachedStudents = null;
        return createdStudent;
      } catch (error) {
        console.error("Erro no fluxo de criação de estudante:", error);
        throw error;
      }
    },

    async getAllStudents() {
      if (!cachedStudents) {
        cachedStudents = await studentApi.getAll();
      }
      return cachedStudents;
    },

    async getStudentById(id) {
      return studentApi.getById(id);
    },

    async finishEnrollment(studentId) {
      const response = await api.patch(
        `${STUDENTS_ENDPOINT}/${studentId}/enrollment/finish`,
      );
      return toStudentSchema(response.data);
    },

    async rejectEnrollment(studentId) {
      const response = await api.patch(
        `${STUDENTS_ENDPOINT}/${studentId}/enrollment/approve`,
      );
      return toStudentSchema(response.data);
    },

    async getStudentByPersonId(personId) {
      if (!personId) return null;

      const students = await this.getAllStudents();

      const found = students.find(
        (s) =>
          Number(s.personId) === Number(personId) ||
          Number(s.id) === Number(personId) ||
          Number(s.person?.id) === Number(personId),
      );

      return found || null;
    },

    async approveEnrollment(studentId) {
      return this.rejectEnrollment(studentId);
    },
  };
}
