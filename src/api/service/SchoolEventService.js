import { createApiRepository } from "../base/Repository";
import { toSchoolEventSchema } from "../schemas/SchoolEvent";
import { toSchoolEventRequest } from "../schemas/dto/SchoolEventRequest";

const SCHOOL_EVENT_ENDPOINT = "/api/v1/schoolEvent";

const schoolEventApi = createApiRepository(
  SCHOOL_EVENT_ENDPOINT,
  toSchoolEventRequest,
  toSchoolEventSchema
);

export function createSchoolEventService() {
  return {
    async createEvent(event) {
      return schoolEventApi.create(event);
    },

    async getAllEvents() {
      return schoolEventApi.getAll();
    },

    async getEventById(id) {
      return schoolEventApi.getById(id);
    },

    async updateEvent(id, event) {
      return schoolEventApi.update(id, event);
    },
  };
}