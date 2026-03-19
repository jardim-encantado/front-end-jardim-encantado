import { createApiRepository } from "../base/Repository";
import { toTeacherRequest } from "../schemas/dto/TeacherRequest";
import { toTeacherSchema } from "../schemas/Teacher";
import { createPersonService } from "./PersonService";
import { createRoleService } from "./RoleService";
import { createTeacherSubjectService } from "./TeacherSubjectService";

const TEACHERS_ENDPOINT = "/api/v1/teachers";
const teacherApi = createApiRepository(
  TEACHERS_ENDPOINT,
  toTeacherRequest,
  toTeacherSchema
);

export function createTeacherService() {
  const personService = createPersonService();
  const roleService = createRoleService();
  const teacherSubjectService = createTeacherSubjectService();

  const ensureTeacherRole = async (teacherData) => {
    if (teacherData?.roleId) return teacherData.roleId;

    const resolvedRoleId = await roleService.resolveRoleId("teacher");

    if (!resolvedRoleId) {
      throw new Error("Could not resolve teacher roleId.");
    }

    return resolvedRoleId;
  };

  const normalizeSubjectIds = (subjectIds) => {
    if (!Array.isArray(subjectIds)) return [];

    return [...new Set(subjectIds)]
      .map(Number)
      .filter(Number.isFinite);
  };

  return {
    async createTeacher(teacherData) {
      const roleId = await ensureTeacherRole(teacherData);
      const normalizedTeacherData = { ...teacherData, roleId };

      await personService.createPerson(normalizedTeacherData);
      return teacherApi.create(normalizedTeacherData);
    },

    async createTeacherWithSubjects(teacherData, subjectIds = []) {
      const teacher = await this.createTeacher(teacherData);
      const validSubjectIds = normalizeSubjectIds(subjectIds);

      if (teacher?.teacherId && validSubjectIds.length) {
        await Promise.all(
          validSubjectIds.map((subjectId) =>
            teacherSubjectService.createTeacherSubject({
              teacherId: teacher.teacherId,
              subjectId,
            })
          )
        );
      }

      if (teacher?.teacherId) {
        return teacherApi.getById(teacher.teacherId);
      }

      return teacher;
    },

    async getAllTeachers() {
      return teacherApi.getAll();
    },

    async getTeacherById(id) {
      return teacherApi.getById(id);
    },

    async getByPersonId(personId) {
      const teachers = await teacherApi.getAll();
      return teachers.find((t) => t.personId === personId);
    },
  };
}