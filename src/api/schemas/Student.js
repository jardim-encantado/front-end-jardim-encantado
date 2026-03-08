import { toPersonSchema } from "./Person";

export const toStudentSchema = (student = {}) => {
    if (!student || typeof student !== "object") {
        return null;
    }
    return {
        studentId: student.studentId ?? student.id ?? null,
        person: toPersonSchema(student),
    };
};