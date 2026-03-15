export function toClassroomGroupStudentSchema(data) {
  return {
    classroomGroupStudentId: data.classroomGroupStudentId,
    groupId: data.groupId,
    studentId: data.studentId,
  };
}