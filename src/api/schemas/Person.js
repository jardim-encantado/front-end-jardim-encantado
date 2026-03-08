import { toAddressSchema } from "./Address";

export const toPersonSchema = (person = {}) => {
    if (!person || typeof person !== "object") {
        return null;
    }

    return {
        id: person.id ?? person.personId ?? null,
        firstName: person.firstName ?? person.nome ?? "",
        lastName: person.lastName ?? person.sobrenome ?? "",
        photoUrl: person.photoUrl ?? person.foto ?? "",
        roleName: person.roleName ?? person.perfil ?? "",
        address: toAddressSchema(person.address),
    };
};