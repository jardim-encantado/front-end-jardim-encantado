import { createApiRepository } from "../base/Repository";
import { toGradingRequest } from "../schemas/dto/GradingRequest";
import { toGradingSchema } from "../schemas/Grading";

const GRADING_ENDPOINT = "/api/v1/grading";
const gradingApi = createApiRepository(GRADING_ENDPOINT, toGradingRequest, toGradingSchema);

export function createGradingService() {
  return {
    async getAllGrades() {
      return gradingApi.getAll();
    },

    async getGradeById(id) {
      return gradingApi.getById(id);
    },

    async createGrade(gradeData) {
      return gradingApi.create(gradeData);
    },

    async updateGrade(id, gradeData) {
      return gradingApi.update(id, gradeData);
    },

    async getGradesByStudentId(studentId) {
      const normalizedStudentId = Number(studentId);
      const allGrades = await gradingApi.getAll();

      if (!Number.isFinite(normalizedStudentId)) {
        return allGrades;
      }

      return allGrades.filter((grade) => Number(grade.studentId) === normalizedStudentId);
    },
  };
}
