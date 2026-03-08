import { createApiRepository } from "../base/Repository";
import { createPersonService } from "./PersonService";
import { toStudentRequest } from "../schemas/dto/StudentRequest";
import { createGuardianService } from "./GuardianService";

const STUDENTS_ENDPOINT = "v1/students";
const studentApi = createApiRepository(STUDENTS_ENDPOINT, toStudentRequest, toStudentSchema);

export function createStudentService() {
    const personService = createPersonService();
    const guardianService = createGuardianService();

    return {
        async createStudent (studentData, guardianData) {
            try {
                await guardianService.createGuardian(guardianData);
                await personService.createPerson(studentData);
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