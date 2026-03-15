import { createApiRepository } from "../base/Repository";

const CLASSROOM_GROUP_ENDPOINT = "/api/v1/classroomGroup";

const classroomGroupApi = createApiRepository(CLASSROOM_GROUP_ENDPOINT);

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