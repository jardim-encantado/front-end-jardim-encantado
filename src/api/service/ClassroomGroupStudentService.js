import { createApiRepository } from "../base/Repository";
import { toClassroomGroupStudentSchema } from "../schemas/ClassroomGroupStudent";

const ENDPOINT = "/api/v1/classroom-group-students";

const api = createApiRepository(
  ENDPOINT,
  null,
  toClassroomGroupStudentSchema
);

export function createClassroomGroupStudentService() {
  return {
    async getAll() {
      return api.getAll();
    },

    async getById(id) {
      return api.getById(id);
    },
  };
}