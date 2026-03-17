import { createApiRepository } from "../base/Repository";
import { toGradingRequest } from "../schemas/dto/GradingRequest";
import { toGradingSchema } from "../schemas/Grading";
import api from "../base/config";

const GRADING_ENDPOINT = "/api/v1/grading";

const gradingApi = createApiRepository(
  GRADING_ENDPOINT,
  toGradingRequest,
  toGradingSchema
);

export function createGradingService() {
  return {
    async createGrading(grading) {
      return gradingApi.create(grading);
    },

    async getAllGradings() {
      return gradingApi.getAll();
    },

    async getGradingById(id) {
      return gradingApi.getById(id);
    },

    async getByStudentId(studentId) {
      const response = await api.get(`${GRADING_ENDPOINT}/by-student/${studentId}`);
      return response.data.map(toGradingSchema);
    },

    async updateGrading(id, grading) {
      return gradingApi.update(id, grading);
    },
  };
}