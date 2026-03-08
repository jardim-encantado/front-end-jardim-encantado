import { makeAddressSchema } from "../schemas/Address";

export const toAddressResponseModel = (address = {}) => makeAddressSchema(address);
