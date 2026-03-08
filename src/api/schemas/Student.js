export const makeStudentSchema = (student = {}) => {
    if (!student || typeof student !== "object") {
        return null;
    }

    const nestedPerson = student.person ?? {};

    return {
        studentId: student.studentId ?? student.id ?? null,
        personId: student.personId ?? nestedPerson.id ?? null,
        firstName: student.firstName ?? nestedPerson.firstName ?? student.nome ?? "",
        lastName: student.lastName ?? nestedPerson.lastName ?? student.sobrenome ?? "",
        email: student.email ?? nestedPerson.email ?? "",
    };
};

export const makeStudentSchemaList = (students = []) => {
    if (!Array.isArray(students)) {
        return [];
    }

    return students.map(makeStudentSchema).filter(Boolean);
};
