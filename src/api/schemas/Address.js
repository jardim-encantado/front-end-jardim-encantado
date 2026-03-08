export const makeAddressSchema = (address = {}) => {
    if (!address || typeof address !== "object") {
        return null;
    }

    return {
        addressId: address.addressId ?? address.id ?? null,
        street: address.street ?? address.rua ?? "",
        streetNumber: address.streetNumber ?? address.number ?? address.numero ?? "",
        cep: address.cep ?? address.zipCode ?? "",
        complement: address.complement ?? address.complemento ?? "",
        city: address.city ?? address.cidade ?? "",
        state: address.state ?? address.estado ?? "",
    };
};

export const makeAddressSchemaList = (addresses = []) => {
    if (!Array.isArray(addresses)) {
        return [];
    }

    return addresses.map(makeAddressSchema).filter(Boolean);
};
