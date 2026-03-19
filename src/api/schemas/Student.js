import { toEnrollmentSchema } from "./Enrollment";

export const toStudentSchema = (student = {}) => {
    if (!student || typeof student !== "object") {
        return null;
    }

    const studentId = student.studentId ?? student.id ?? null;
    const personId = student.personId ?? student.id ?? null;
    const firstName = student.firstName ?? student.nome ?? "";
    const lastName = student.lastName ?? student.sobrenome ?? "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

    return {
        id: studentId,
        studentId,
        personId,
        firstName,
        lastName,
        fullName,
        name: fullName,
        email: student.email ?? "",
        phoneNumber: student.phoneNumber ?? student.telefone ?? "",
        cpf: student.cpf ?? "",
        photoUrl: student.photoUrl ?? "",
        enrollment: toEnrollmentSchema(student.enrollment),
        person: {
            id: personId,
            personId,
            firstName,
            lastName,
            fullName,
            email: student.email ?? "",
        },
    };
};
