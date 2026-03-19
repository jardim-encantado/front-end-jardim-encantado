import React, { useEffect, useMemo, useState } from "react";
import "./Cronograma.css";
import { usePerson } from "../../hooks/personHook";
import { createScheduleService } from "../../api/service/ScheduleService";
import { createRoleService } from "../../api/service/RoleService";
import { createStudentService } from "../../api/service/StudentService";
import { createTeacherService } from "../../api/service/TeacherService";

const diasMap = {
  1: "segunda",
  2: "terca",
  3: "quarta",
  4: "quinta",
  5: "sexta",
};

const toScheduleItems = (value) => {
  if (Array.isArray(value)) {
    return value;
  }

  if (Array.isArray(value?.items)) {
    return value.items;
  }

  if (Array.isArray(value?.scheduleItems)) {
    return value.scheduleItems;
  }

  return [];
};

const normalizeRoleName = (value) =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const Cronograma = () => {
  const { person } = usePerson();
  const scheduleService = useMemo(() => createScheduleService(), []);
  const roleService = useMemo(() => createRoleService(), []);
  const studentService = useMemo(() => createStudentService(), []);
  const teacherService = useMemo(() => createTeacherService(), []);

  const [dados, setDados] = useState([]);

  const [msgCron, setMsgCron] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setMsgCron("Carregando cronograma...");
        if (!person) {
          setDados([]);
          return;
        }

        const personId = Number(person.personId ?? person.id);
        const roleId = Number(person.roleId);
        const normalizedRoleName = normalizeRoleName(person.roleName);

        const [teacherRoleId, studentRoleId] = await Promise.all([
          roleService.resolveRoleId("teacher"),
          roleService.resolveRoleId("student"),
        ]);

        const normalizedTeacherRoleId = Number(teacherRoleId);
        const normalizedStudentRoleId = Number(studentRoleId);

        const isTeacherByRoleId =
          Number.isFinite(roleId) &&
          Number.isFinite(normalizedTeacherRoleId) &&
          roleId === normalizedTeacherRoleId;

        const isStudentByRoleId =
          Number.isFinite(roleId) &&
          Number.isFinite(normalizedStudentRoleId) &&
          roleId === normalizedStudentRoleId;

        const isTeacher =
          isTeacherByRoleId ||
          normalizedRoleName.includes("teacher") ||
          normalizedRoleName.includes("professor") ||
          normalizedRoleName.includes("docente");

        const isStudent =
          isStudentByRoleId ||
          normalizedRoleName.includes("student") ||
          normalizedRoleName.includes("estudante") ||
          normalizedRoleName.includes("aluno");

        const fallbackTeacherId = Number(person.teacherId);
        const fallbackStudentId = Number(person.studentId);
        const hasFallbackTeacherId =
          Number.isFinite(fallbackTeacherId) && fallbackTeacherId > 0;
        const hasFallbackStudentId =
          Number.isFinite(fallbackStudentId) && fallbackStudentId > 0;

        let items = [];

        if (isTeacher || hasFallbackTeacherId) {
          const resolvedTeacher =
            Number.isFinite(personId) && personId > 0
              ? await teacherService.getByPersonId(personId)
              : null;

          const teacherId =
            resolvedTeacher?.teacherId ??
            (Number.isFinite(fallbackTeacherId) && fallbackTeacherId > 0
              ? fallbackTeacherId
              : null);

          if (teacherId) {
            const schedule = await scheduleService.getByTeacher(teacherId);
            items = toScheduleItems(schedule);
          }
        } else if (isStudent || hasFallbackStudentId) {
          const resolvedStudent =
            Number.isFinite(personId) && personId > 0
              ? await studentService.getStudentByPersonId(personId)
              : null;

          const studentId =
            resolvedStudent?.studentId ??
            (Number.isFinite(fallbackStudentId) && fallbackStudentId > 0
              ? fallbackStudentId
              : null);

          if (studentId) {
            const schedule = await scheduleService.getByStudent(studentId);
            items = toScheduleItems(schedule);
          }
        } else if (Number.isFinite(personId) && personId > 0) {
          const resolvedStudent =
            await studentService.getStudentByPersonId(personId);

          if (resolvedStudent?.studentId) {
            const schedule = await scheduleService.getByStudent(
              resolvedStudent.studentId
            );
            items = toScheduleItems(schedule);
          }

          if (!items.length) {
            const resolvedTeacher = await teacherService.getByPersonId(personId);

            if (resolvedTeacher?.teacherId) {
              const schedule = await scheduleService.getByTeacher(
                resolvedTeacher.teacherId
              );
              items = toScheduleItems(schedule);
            }
          }
        }

        if (!Array.isArray(items)) {
          items = [];
        }

        const tabela = [];

        items.forEach((item) => {
          const startTime = String(item?.startTime ?? "");
          const hora = Number.parseInt(startTime.split(":")[0], 10);
          const index = hora - 7; 

          if (!Number.isFinite(index) || !diasMap[item?.dayOfWeek]) {
            return;
          }

          if (!tabela[index]) {
            tabela[index] = {};
          }

          tabela[index][diasMap[item.dayOfWeek]] =
            item.subjectName || item.subject?.name || "—";
        });

        // if all items are —, set message to "Nenhuma aula encontrada"
        const allEmpty = tabela.every((linha) =>
          Object.values(linha).every(
            (valor) => valor === "—" || !valor
          )
        );

        if (allEmpty) {
          setMsgCron("Nenhuma aula encontrada");
        }

        setDados(tabela);
      } catch (error) {
        console.error("Erro ao carregar cronograma:", error);
        setDados([]);
      }
    };

    load();
  }, [person, roleService, scheduleService, studentService, teacherService]);

  return (
    <table className="tabela-rosa">
      <thead>
        <tr>
          <th>Segunda-feira</th>
          <th>Terça-feira</th>
          <th>Quarta-feira</th>
          <th>Quinta-feira</th>
          <th>Sexta-feira</th>
        </tr>
      </thead>

      <tbody>
        {dados.length === 0 ? (
          <tr>
            <td colSpan="5">{msgCron}</td>
          </tr>
        ) : (
          dados.map((linha, index) => (
            <tr key={index}>
              <td>{linha?.segunda || "-"}</td>
              <td>{linha?.terca || "-"}</td>
              <td>{linha?.quarta || "-"}</td>
              <td>{linha?.quinta || "-"}</td>
              <td>{linha?.sexta || "-"}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Cronograma;