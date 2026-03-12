export const toSchoolEventTypeSchema = (eventType = {}) => {
  return {
    id: eventType.eventTypeId,
    name: eventType.name ?? "",
  };
}