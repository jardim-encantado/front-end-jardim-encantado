import { removeUndefinedFields } from "../../util/objectUtil";

const normalizeNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return undefined;
  }

  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? undefined : numberValue;
};

export const toGradingRequest = (grading = {}) => {
  return removeUndefinedFields({
    studentId: normalizeNumber(grading.studentId),
    subjectId: normalizeNumber(grading.subjectId),
    grade: normalizeNumber(grading.grade),
    observations: grading.observations,
    givenByTeacherId: normalizeNumber(grading.givenByTeacherId),
  });
};
