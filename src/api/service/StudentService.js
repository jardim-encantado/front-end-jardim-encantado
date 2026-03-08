import { createApiRepository } from "../base/Repository";
import { createPersonService } from "./PersonService";
import { toStudentRequest } from "../schemas/dto/StudentRequest";
import { makeStudentSchema } from "../schemas/Student";

const STUDENTS_ENDPOINT = "v1/students";
const studentApi = createApiRepository(STUDENTS_ENDPOINT, toStudentRequest, toStudentSchema);

export function createStudentService() {
    const personService = createPersonService();

    return {
        async createStudent (studentData) {
            try {
                const schema = toStudentSchema(studentData);
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