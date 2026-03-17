import { createApiRepository } from "../base/Repository";
import { toClassroomGroupSchema } from "../schemas/ClassroomGroup";

const CLASSROOM_GROUP_ENDPOINT = "/api/v1/classroomGroup";

const classroomGroupApi = createApiRepository(
  CLASSROOM_GROUP_ENDPOINT,
  null,
  toClassroomGroupSchema
);

export function createClassroomGroupService() {
  return {
    async getAll() {
      return classroomGroupApi.getAll();
    },

    async getById(id) {
      return classroomGroupApi.getById(id);
    },
  };
}