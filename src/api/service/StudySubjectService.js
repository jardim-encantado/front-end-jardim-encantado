import { createApiRepository } from "../base/Repository";
import { toStudySubjectRequest } from "../schemas/dto/StudySubjectRequest";
import { toStudySubjectSchema } from "../schemas/StudySubject";

const SUBJECTS_ENDPOINT = "/subjects";
const subjectApi = createApiRepository(
  SUBJECTS_ENDPOINT,
  toStudySubjectRequest,
  toStudySubjectSchema
);

export function createStudySubjectService() {
  return {
    async getAllSubjects() {
      return subjectApi.getAll();
    },

    async getSubjectById(id) {
      return subjectApi.getById(id);
    },

    async createSubject(subjectData) {
      return subjectApi.create(subjectData);
    },

    async updateSubject(id, subjectData) {
      return subjectApi.update(id, subjectData);
    },
  };
}
