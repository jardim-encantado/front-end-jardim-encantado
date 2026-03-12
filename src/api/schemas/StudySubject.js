export const toStudySubjectSchema = (subject = {}) => {
  if (!subject || typeof subject !== "object") {
    return null;
  }

  return {
    id: subject.subjectId ?? subject.id ?? null,
    subjectId: subject.subjectId ?? subject.id ?? null,
    name: subject.name ?? "",
  };
};
