import { createApiRepository } from "../base/Repository";
import { toTeacherSubjectRequest } from "../schemas/dto/TeacherSubjectRequest";
import { toTeacherSubjectSchema } from "../schemas/TeacherSubject";

const TEACHER_SUBJECTS_ENDPOINT = "/teacher-subjects";
const teacherSubjectApi = createApiRepository(
  TEACHER_SUBJECTS_ENDPOINT,
  toTeacherSubjectRequest,
  toTeacherSubjectSchema
);

export function createTeacherSubjectService() {
  return {
    async getAllTeacherSubjects() {
      return teacherSubjectApi.getAll();
    },

    async getTeacherSubjectById(id) {
      return teacherSubjectApi.getById(id);
    },

    async createTeacherSubject(teacherSubjectData) {
      return teacherSubjectApi.create(teacherSubjectData);
    },
  };
}
