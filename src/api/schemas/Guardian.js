import { toStudentSchema } from "./Student";


export const toGuardianSchema = (guardian = {}) => {
    if (!guardian || typeof guardian !== "object") {
        return null;
    }

    const firstName = guardian.firstName ?? guardian.nome ?? "";
    const lastName = guardian.lastName ?? guardian.sobrenome ?? "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
    const personId = guardian.personId ?? null;

    return {
        id: guardian.guardianId ?? guardian.guardian_id ?? guardian.id ?? null,
        guardianId: guardian.guardianId ?? guardian.guardian_id ?? guardian.id ?? null,
        personId,
        firstName,
        lastName,
        fullName,
        email: guardian.email ?? "",
        phoneNumber: guardian.phoneNumber ?? guardian.telefone ?? "",
        cpf: guardian.cpf ?? "",
        photoUrl: guardian.photoUrl ?? "",
        students: Array.isArray(guardian.students)
            ? guardian.students.map(toStudentSchema).filter(Boolean)
            : [],
        person: {
            id: personId,
            personId,
            firstName,
            lastName,
            fullName,
            email: guardian.email ?? "",
        },
    };
};