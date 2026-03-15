export function toClassroomGroupRequest(data) {
  return {
    classroomId: data.classroomId,
    series: data.series,
  };
}