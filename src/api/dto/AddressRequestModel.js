const removeUndefinedFields = (value) => {
  if (!value || typeof value !== "object") {
    return undefined;
  }

  const entries = Object.entries(value).filter(([, fieldValue]) => fieldValue !== undefined);

  return entries.length ? Object.fromEntries(entries) : undefined;
};

export const toAddressRequestModel = (address = {}) => {
  return removeUndefinedFields({
    street: address.street ?? address.rua,
    number: address.number ?? address.numero,
    neighborhood: address.neighborhood ?? address.bairro,
    city: address.city ?? address.cidade,
    state: address.state ?? address.estado,
    zipCode: address.zipCode ?? address.cep,
    complement: address.complement ?? address.complemento,
  });
};
