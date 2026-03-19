import { toStudentSchema } from "./Student"; 
export const toGuardianSchema = (guardian = {}) => {
  if (!guardian) return null;

  return {
    guardianId: guardian.guardianId ?? guardian.id,
    personId: guardian.personId,
    firstName: guardian.firstName ?? guardian.person?.firstName ?? "",
    lastName: guardian.lastName ?? guardian.person?.lastName ?? "",
    email: guardian.email ?? guardian.person?.email ?? "",
    cpf: guardian.cpf ?? guardian.person?.cpf ?? "",
    phoneNumber: guardian.phoneNumber ?? guardian.person?.phoneNumber ?? "",
    photoUrl: guardian.photoUrl ?? guardian.person?.photoUrl ?? "",

    students: Array.isArray(guardian.students) 
      ? guardian.students.map(std => toStudentSchema(std)) 
      : []
  };
};