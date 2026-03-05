import { toAddressRequestModel } from "./AddressRequestModel";

const sanitizeCpf = (value) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.replace(/\D/g, "");
};

const removeUndefinedFields = (value) => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const entries = Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined);

  return entries.length ? Object.fromEntries(entries) : undefined;
};

export const toPersonRequestModel = (person = {}) => {
  const address = toAddressRequestModel(person.address);

  return removeUndefinedFields({
    firstName: person.firstName ?? person.nome,
    lastName: person.lastName ?? person.sobrenome,
    cpf: sanitizeCpf(person.cpf),
    email: person.email,
    password: person.password,
    photoUrl: person.photoUrl ?? person.foto,
    phoneNumber: person.phoneNumber ?? person.telefone,
    roleId: person.roleId ?? person.perfilId ?? person.cargoId,
    address,
  });
};
