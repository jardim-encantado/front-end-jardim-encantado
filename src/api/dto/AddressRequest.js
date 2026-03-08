import { removeUndefinedFields } from "../util/objectUtil";

export const toAddressRequestModel = (address = {}) => {
  return removeUndefinedFields({
    street: address.street ?? address.rua,
    number: address.number ?? address.numero,
    neighborhood: address.neighborhood ?? address.bairro,
    city: address.city ?? address.cidade,
    state: address.state ?? address.estado,
    cep: address.cep,
    complement: address.complement ?? address.complemento,
  });
};
