import { removeUndefinedFields } from "../../util/objectUtil";

export const toTeacherSubjectRequest = (teacherSubject = {}) => {
  return removeUndefinedFields({
    teacherId: teacherSubject.teacherId,
    subjectId: teacherSubject.subjectId,
  });
};
