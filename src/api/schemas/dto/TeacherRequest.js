import { sanitizeCpf, removeUndefinedFields } from "../../util/objectUtil";

export const toTeacherRequest = (teacher = {}) => {
  return removeUndefinedFields({
    cpf: sanitizeCpf(teacher.cpf ?? teacher.person?.cpf),
  });
};
