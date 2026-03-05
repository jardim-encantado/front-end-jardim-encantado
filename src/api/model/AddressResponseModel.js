export const toAddressResponseModel = (address = {}) => {
  if (!address || typeof address !== "object") {
    return null;
  }

  return {
    id: address.id ?? null,
    street: address.street ?? address.rua ?? "",
    number: address.number ?? address.numero ?? "",
    neighborhood: address.neighborhood ?? address.bairro ?? "",
    city: address.city ?? address.cidade ?? "",
    state: address.state ?? address.estado ?? "",
    zipCode: address.zipCode ?? address.cep ?? "",
    complement: address.complement ?? address.complemento ?? "",
  };
};
