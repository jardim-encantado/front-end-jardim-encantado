import { toAddressSchema } from "./Address";

export const toPersonSchema = (person = {}) => {
    if (!person || typeof person !== "object") {
        return null;
    }

    const firstName = person.firstName ?? person.nome ?? "";
    const lastName = person.lastName ?? person.sobrenome ?? "";

    return {
        id: person.id ?? person.personId ?? null,
        personId: person.personId ?? person.id ?? null,
        firstName,
        lastName,
        fullName: [firstName, lastName].filter(Boolean).join(" ").trim(),
        email: person.email ?? "",
        cpf: person.cpf ?? "",
        phoneNumber: person.phoneNumber ?? person.telefone ?? "",
        photoUrl: person.photoUrl ?? person.foto ?? "",
        roleId: person.roleId ?? person.perfilId ?? person.cargoId ?? null,
        roleName: person.roleName ?? person.perfil ?? "",
        address: toAddressSchema(person.address),
    };
};