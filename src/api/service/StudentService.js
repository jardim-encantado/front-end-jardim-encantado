import { createApiRepository } from "../base/Repository";
import { createPersonService } from "./PersonService";


const STUDENTS_ENDPOINT = "/v1/students";
const identity = (value) => value;
const studentApi = createApiRepository(STUDENTS_ENDPOINT, identity, identity);

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

                const createdPerson = await personService.createPerson(personData);

                if (!createdPerson?.id) {
                    throw new Error("Unable to create student because person id is missing in the response from createPerson: " + JSON.stringify(createdPerson));
                }

                return studentApi.create({ personId: createdPerson.id });
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