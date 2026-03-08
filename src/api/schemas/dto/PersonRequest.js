import { toAddressRequest } from "./AddressRequest";
import { sanitizeCpf, removeUndefinedFields } from "../../util/objectUtil";

export const toPersonRequest = (person = {}) => {
  const addressInput =
    person.address ??
    person.endereco ?? {
      street: person.street ?? person.rua,
      streetNumber: person.streetNumber ?? person.number ?? person.numero,
      cep: person.cep ?? person.zipCode,
      complement: person.complement ?? person.complemento,
      city: person.city ?? person.cidade,
      state: person.state ?? person.estado,
    };

  const address = toAddressRequest(addressInput);

  return removeUndefinedFields({
    firstName: person.firstName ?? person.nome,
    lastName: person.lastName ?? person.sobrenome,
    cpf: sanitizeCpf(person.cpf),
    email: person.email,
    password: person.password ?? person.senha,
    photoUrl: person.photoUrl ?? person.foto,
    phoneNumber: person.phoneNumber ?? person.telefone,
    roleId: person.roleId ?? person.perfilId ?? person.cargoId,
    address,
  });
};