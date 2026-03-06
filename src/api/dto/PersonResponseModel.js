import { toAddressResponseModel } from "./AddressResponseModel";

export const toPersonResponseModel = (person = {}) => {
  if (!person || typeof person !== "object") {
    return null;
  }

  return {
    id: person.id ?? null,
    firstName: person.firstName ?? person.nome ?? "",
    lastName: person.lastName ?? person.sobrenome ?? "",
    photoUrl: person.photoUrl ?? person.foto ?? "",
    roleName: person.roleName ?? person.perfil ?? "",
    address: toAddressResponseModel(person.address),
  };
};

export const toPersonResponseListModel = (persons = []) => {
  if (!Array.isArray(persons)) {
    return [];
  }

  return persons.map(toPersonResponseModel).filter(Boolean);
};
