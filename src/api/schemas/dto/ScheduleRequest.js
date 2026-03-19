import { removeUndefinedFields } from "../../util/objectUtil";

export const toScheduleRequest = (schedule = {}) => {
  return removeUndefinedFields({
    groupId: schedule.groupId,
    startTime: schedule.startTime,
    endTime: schedule.endTime,
    items: (schedule.items || []).map((item) => ({
      dayOfWeek: item.dayOfWeek,
      startTime: item.startTime,
      endTime: item.endTime,
      subjectId: item.subjectId,
      teacherId: item.teacherId,
    })),
  });
};