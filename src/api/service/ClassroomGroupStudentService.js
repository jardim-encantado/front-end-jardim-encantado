import { createApiRepository } from "../base/Repository";

const CLASSROOM_GROUP_STUDENT_ENDPOINT = "/api/v1/classroom-group-students";

const classroomGroupStudentApi = createApiRepository(
  CLASSROOM_GROUP_STUDENT_ENDPOINT
);

export function createClassroomGroupStudentService() {
  return {
    async createRelation(data) {
      return classroomGroupStudentApi.create(data);
    },

    async getAll() {
      return classroomGroupStudentApi.getAll();
    },

    async getById(id) {
      return classroomGroupStudentApi.getById(id);
    },
  };
}