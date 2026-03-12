import { createApiRepository } from "../base/Repository";
import { toSchoolEventTypeSchema } from "../schemas/SchoolEventType";

const SCHOOL_EVENT_TYPE_ENDPOINT = "/api/v1/schoolEventType";

const eventTypeApi = createApiRepository(
  SCHOOL_EVENT_TYPE_ENDPOINT,
  undefined,
  toSchoolEventTypeSchema
);

export function createSchoolEventTypeService() {
  return {
    async getAllTypes() {
      return eventTypeApi.getAll();
    },

    async getTypeById(id) {
      return eventTypeApi.getById(id);
    },
  };
}