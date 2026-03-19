const toScheduleItemSchema = (item = {}) => ({
  id: item.id ?? null,
  dayOfWeek: item.dayOfWeek ?? null,
  startTime: item.startTime ?? "",
  endTime: item.endTime ?? "",
  subjectId: item.subjectId ?? item.subject?.id ?? null,
  teacherId: item.teacherId ?? item.teacher?.id ?? null,
  subjectName: item.subjectName ?? item.subject?.name ?? "",
});

const toScheduleItemsSchema = (schedule) => {
  if (Array.isArray(schedule)) {
    return schedule.map(toScheduleItemSchema);
  }

  if (Array.isArray(schedule?.items)) {
    return schedule.items.map(toScheduleItemSchema);
  }

  if (Array.isArray(schedule?.scheduleItems)) {
    return schedule.scheduleItems.map(toScheduleItemSchema);
  }

  if (schedule && typeof schedule === "object" && schedule.dayOfWeek !== undefined) {
    return [toScheduleItemSchema(schedule)];
  }

  return [];
};

export const toScheduleSchema = (schedule = {}) => {
  const scheduleData =
    schedule && typeof schedule === "object" && !Array.isArray(schedule)
      ? schedule
      : {};

  return {
    id: scheduleData.id ?? null,
    groupId: scheduleData.groupId ?? null,
    startTime: scheduleData.startTime ?? "",
    endTime: scheduleData.endTime ?? "",
    items: toScheduleItemsSchema(schedule),
  };
};