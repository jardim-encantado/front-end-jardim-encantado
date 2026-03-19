export const toScheduleSchema = (schedule = {}) => {
  if (!schedule || typeof schedule !== "object") return null;

  return {
    id: schedule.id ?? null,
    groupId: schedule.groupId ?? null,
    startTime: schedule.startTime ?? "",
    endTime: schedule.endTime ?? "",
    items: (schedule.items || []).map((item) => ({
      id: item.id ?? null,
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      subjectId: item.subjectId,
      teacherId: item.teacherId,
    })),
  };
};