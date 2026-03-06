import {api} from "./config";
import { createPerson, getPersonById } from "./PersonService";

export const createStudent = async (studentData) => {
    try {
        const personData = {
            ...studentData,
            role: "student"
        };
        return await createPerson(personData)
            .then(async (createdPerson) => {
                return await api.post("/students", { personId: createdPerson.id,  })
            });
    } catch (error) {
        console.error("Error creating student:", error);
        throw error;
    }
}