import { sanitizeCpf, removeUndefinedFields } from "../util/objectUtil";

export const toStudentRequest = (student = {}) => {
  return removeUndefinedFields({
    cpf: sanitizeCpf(student.cpf ?? student.person?.cpf ?? student.CPF),
  });
};

export const toStudentRequestModel = toStudentRequest;
