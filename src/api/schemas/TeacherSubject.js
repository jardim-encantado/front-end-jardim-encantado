export const toTeacherSubjectSchema = (teacherSubject = {}) => {
  if (!teacherSubject || typeof teacherSubject !== "object") {
    return null;
  }

  return {
    id: teacherSubject.teacherSubjectId ?? teacherSubject.id ?? null,
    teacherSubjectId: teacherSubject.teacherSubjectId ?? teacherSubject.id ?? null,
    teacherId: teacherSubject.teacherId ?? null,
    teacherName: teacherSubject.teacherName ?? "",
    subjectId: teacherSubject.subjectId ?? null,
    subjectName: teacherSubject.subjectName ?? "",
  };
};
