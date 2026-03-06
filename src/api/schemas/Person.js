export function makePersonSchema(id, firstName, lastName, cpf, email, photoUrl, roleId, createdAt, updatedAt) {
    return {
        id,
        firstName,
        lastName,
        cpf,
        email,
        photoUrl,
        roleId,
        createdAt,
        updatedAt
    }
}