import { makePersonSchema } from "./Person";

export function makeStudentSchema(studentId, personId, firstName, lastName, email, cpf, photoUrl, createdAt, updatedAt) {
    return {
        "studentId": studentId,
        "person": makePersonSchema(personId, firstName, lastName, cpf, email, photoUrl, 1, createdAt, updatedAt)
    }
}
