import { removeUndefinedFields } from "../util/objectUtil";

export const toAddressRequestModel = (address = {}) => {
  return removeUndefinedFields({
    street: address.street ?? address.rua,
    streetNumber: address.streetNumber ?? address.number ?? address.numero,
    cep: address.cep ?? address.zipCode,
    complement: address.complement ?? address.complemento,
    city: address.city ?? address.cidade,
    state: address.state ?? address.estado,
  });
};

export const toAddressRequest = toAddressRequestModel;
