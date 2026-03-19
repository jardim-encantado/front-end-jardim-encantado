import api from "../base/config";
import { createApiRepository } from "../base/Repository";
import { toScheduleRequest } from "../schemas/dto/ScheduleRequest";
import { toScheduleSchema } from "../schemas/Schedule";

const SCHEDULE_ENDPOINT = "/schedules";

const scheduleApi = createApiRepository(
  SCHEDULE_ENDPOINT,
  toScheduleRequest,
  toScheduleSchema
);

export function createScheduleService() {
  return {
    async createSchedule(data) {
      return scheduleApi.create(data);
    },

    async updateSchedule(id, data) {
      return scheduleApi.update(id, data);
    },

    async deleteSchedule(id) {
      return scheduleApi.delete(id);
    },

    async getByGroup(groupId) {
      const response = await api.get(`${SCHEDULE_ENDPOINT}/group/${groupId}`);
      return toScheduleSchema(response.data);
    },

    async getByStudent(studentId) {
      const response = await api.get(`${SCHEDULE_ENDPOINT}/student/${studentId}`);
      return toScheduleSchema(response.data);
    },

    async getByTeacher(teacherId) {
      const response = await api.get(`${SCHEDULE_ENDPOINT}/teacher/${teacherId}`);
      return toScheduleSchema(response.data); 
    },
  };
}