import { sanitizeCpf, removeUndefinedFields } from "../../util/objectUtil";

export const toGuardianRequest = (guardian = {}) => {
  return removeUndefinedFields({
    cpf: sanitizeCpf(guardian.cpf ?? guardian.person?.cpf ?? guardian.CPF),
  });
};