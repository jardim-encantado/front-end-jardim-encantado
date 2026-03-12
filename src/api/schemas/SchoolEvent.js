export const toSchoolEventSchema = (data) => {
  if (!data) return null;

  return {
    id: data.eventId,
    name: data.name,
    description: data.description,
    eventDate: data.eventDate,
    createdBy: data.createdBy,
    createDate: data.createDate,
    updateDate: data.updateDate,
    eventType: data.eventTypeId,
  };
};