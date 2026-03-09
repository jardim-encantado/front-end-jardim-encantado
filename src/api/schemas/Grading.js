import { toStudentSchema } from "./Student";
import { toStudySubjectSchema } from "./StudySubject";
import { toTeacherSchema } from "./Teacher";

const normalizeNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const numberValue = Number(value);
  return Number.isNaN(numberValue) ? null : numberValue;
};

export const toGradingSchema = (grading = {}) => {
  if (!grading || typeof grading !== "object") {
    return null;
  }

  const subject = toStudySubjectSchema(grading.subject);
  const student = toStudentSchema(grading.student);
  const givenBy = toTeacherSchema(grading.givenBy);

  return {
    id: grading.gradingId ?? grading.id ?? null,
    gradingId: grading.gradingId ?? grading.id ?? null,
    student,
    studentId: grading.studentId ?? student?.studentId ?? null,
    subject,
    subjectId: grading.subjectId ?? subject?.subjectId ?? null,
    subjectName: grading.subjectName ?? subject?.name ?? "",
    grade: normalizeNumber(grading.grade),
    observations: grading.observations ?? "",
    gradingDate: grading.gradingDate ?? null,
    updateDate: grading.updateDate ?? null,
    bimonthly: normalizeNumber(grading.bimonthly),
    givenBy,
    givenByTeacherId: grading.givenByTeacherId ?? givenBy?.teacherId ?? null,
  };
};
