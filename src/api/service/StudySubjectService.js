import { createApiRepository } from "../base/Repository";

const SUBJECT_ENDPOINT = "/subjects";

const subjectApi = createApiRepository(
  SUBJECT_ENDPOINT,
  null,
  (subject) => ({
    subjectId: subject.subjectId ?? subject.id,
    name: subject.name ?? "",
  })
);

export function createStudySubjectService() {
  return {
    async getAll() {
      return subjectApi.getAll();
    },

    async getById(id) {
      return subjectApi.getById(id);
    },
  };
}