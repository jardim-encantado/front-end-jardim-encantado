import { makeStudentSchema, makeStudentSchemaList } from "../schemas/Student";

export const toStudentResponseModel = (student = {}) => makeStudentSchema(student);

export const toStudentResponseListModel = (students = []) => {
  return makeStudentSchemaList(students);
};
