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

        const roleId = await ensureStudentRole(studentData);

        const { foto, photoUrl, ...studentWithoutFile } = studentData;

        const normalizedStudentData = {
          ...studentWithoutFile,
          roleId,
        };

        try {
          const personPayload = {
            firstName: normalizedStudentData.firstName,
            lastName: normalizedStudentData.lastName,
            email: normalizedStudentData.email,
            cpf: sanitizeCpf(normalizedStudentData.cpf),
            password: normalizedStudentData.password,
            phoneNumber: normalizedStudentData.phoneNumber,
            roleId: normalizedStudentData.roleId,
            address: normalizedStudentData.address,
          };

          await personService.createPerson(personPayload);
        } catch (error) {
          if (error.response?.status !== 409) {
            throw error;
          }
        }

        const createdStudent = await studentApi.create(normalizedStudentData);

        if (createdGuardian?.guardianId && createdStudent?.studentId) {
          try {
            await guardianService.addStudentToGuardian(
              createdGuardian.guardianId,
              createdStudent.studentId,
            );
          } catch (error) {
            console.warn(
              "Student was created but linking guardian failed:",
              error,
            );
          }
        }

        cachedStudents = null;

        return createdStudent;
      } catch (error) {
        console.error("Error creating student:", error);
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