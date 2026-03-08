import { toTeacherSubjectSchema } from "./TeacherSubject";

export const toTeacherSchema = (teacher = {}) => {
  if (!teacher || typeof teacher !== "object") {
    return null;
  }

  const teacherId = teacher.teacherId ?? teacher.id ?? null;
  const firstName = teacher.firstName ?? "";
  const lastName = teacher.lastName ?? "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  const subjects = Array.isArray(teacher.subjects)
    ? teacher.subjects.map(toTeacherSubjectSchema).filter(Boolean)
    : [];

  return {
    id: teacherId,
    teacherId,
    personId: teacher.personId ?? null,
    firstName,
    lastName,
    fullName,
    name: fullName,
    email: teacher.email ?? "",
    phoneNumber: teacher.phoneNumber ?? teacher.telefone ?? "",
    cpf: teacher.cpf ?? "",
    photoUrl: teacher.photoUrl ?? "",
    subjects,
    subjectNames: subjects.map((subject) => subject.subjectName).filter(Boolean),
  };
};
