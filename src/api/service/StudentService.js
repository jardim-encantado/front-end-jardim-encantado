import { createApiRepository } from "../base/Repository";
import { createPersonService } from "./PersonService";
import { toStudentRequest } from "../dto/StudentRequest";
import { toStudentResponseModel } from "../dto/StudentResponseModel";

const STUDENTS_ENDPOINT = "/api/v1/roles/students";
const studentApi = createApiRepository(STUDENTS_ENDPOINT, toStudentRequest, toStudentResponseModel);

export function createStudentService() {
    const personService = createPersonService();

    return {
        async createStudent (studentData) {
            try {
                const personData = {
                    ...studentData,
                    role: "student",
                    roleId: studentData?.roleId ?? studentData?.perfilId ?? studentData?.cargoId ?? 1,
                };

                await personService.createPerson(personData);
                return studentApi.create(studentData);
            } catch (error) {
                console.error("Error creating student:", error);
                throw error;
            }
        },

        async getAllStudents() { return studentApi.getAll(); },

        async getStudentById(id) { return studentApi.getById(id); },

        async updateStudent(id, studentData) { return studentApi.update(id, studentData); },

        async deleteStudent(id) { return studentApi.delete(id); }
    }
}