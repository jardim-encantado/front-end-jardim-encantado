export function toClassroomGroupSchema(data) {
  return {
    groupId: data.groupId,
    classroomId: data.classroomId,
    series: data.series,
  };
}