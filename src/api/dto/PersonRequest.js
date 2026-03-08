import { toAddressRequestModel as toAddressRequest } from "./AddressRequest";
import { sanitizeCpf, removeUndefinedFields } from "../util/objectUtil";

export const toPersonRequest = (person = {}) => {
  const address = toAddressRequest(person.address);

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
