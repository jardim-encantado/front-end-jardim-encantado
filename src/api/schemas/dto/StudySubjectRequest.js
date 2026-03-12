import { removeUndefinedFields } from "../../util/objectUtil";

export const toStudySubjectRequest = (subject = {}) => {
  return removeUndefinedFields({
    name: subject.name,
  });
};
