import React, { useEffect, useState } from "react";
import styles from "./CronogramaEditavel.module.css";

import { createScheduleService } from "../../api/service/ScheduleService";
import { createTeacherService } from "../../api/service/TeacherService";
import { createClassroomGroupService } from "../../api/service/ClassroomGroupService";
import { createTeacherSubjectService } from "../../api/service/TeacherSubjectService";
import { createSubjectService } from "../../api/service/StudySubjectService";

const diasMap = {
  segunda: 1,
  terca: 2,
  quarta: 3,
  quinta: 4,
  sexta: 5,
};

const CronogramaEditavel = () => {
  const scheduleService = createScheduleService();
  const teacherService = createTeacherService();
  const groupService = createClassroomGroupService();
  const teacherSubjectService = createTeacherSubjectService();
  const subjectService = createSubjectService();

  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [groups, setGroups] = useState([]);

  const [teacherId, setTeacherId] = useState("");
  const [groupId, setGroupId] = useState("");

  const [dados, setDados] = useState([
    { segunda: "", terca: "", quarta: "", quinta: "", sexta: "" },
  ]);

  useEffect(() => {
    const load = async () => {
      try {
        const teachersRes = await teacherService.getAllTeachers();
        const groupsRes = await groupService.getAll();

        let subjectsRes = [];
        try {
          subjectsRes = await subjectService.getAll();
        } catch (e) {
          console.warn("Erro ao carregar matérias", e);
        }

        setTeachers(teachersRes);
        setGroups(groupsRes);
        setSubjects(subjectsRes);
      } catch (e) {
        console.error("Erro geral", e);
      }
    };

    load();
  }, []);

  const handleChange = (rowIndex, dia, value) => {
    const novosDados = [...dados];
    novosDados[rowIndex][dia] = value ? Number(value) : "";
    setDados(novosDados);
  };

  const adicionarLinha = () => {
    setDados([
      ...dados,
      { segunda: "", terca: "", quarta: "", quinta: "", sexta: "" },
    ]);
  };
  const salvarMateriasProfessor = async () => {
    const materias = new Set();

    dados.forEach((linha) => {
      Object.values(linha).forEach((materia) => {
        if (materia) materias.add(Number(materia));
      });
    });

    await Promise.all(
      [...materias].map((subjectId) =>
        teacherSubjectService.createTeacherSubject({
          teacherId: Number(teacherId),
          subjectId: subjectId,
        }),
      ),
    );
  };

  const buildPayload = () => {
    const items = [];

    const formatHour = (hour) => String(hour).padStart(2, "0");

    dados.forEach((linha, index) => {
      Object.keys(linha).forEach((dia) => {
        if (!linha[dia]) return;

        const startHour = 7 + index;
        const endHour = 8 + index;

        items.push({
          dayOfWeek: diasMap[dia],
          startTime: `${formatHour(startHour)}:00`,
          endTime: `${formatHour(endHour)}:00`,
          subjectId: Number(linha[dia]),
          teacherId: Number(teacherId),
        });
      });
    });

    return {
      groupId: Number(groupId),
      startTime: "07:00",
      endTime: "12:00",
      items,
    };
  };

  const handleSalvar = async () => {
    try {
      if (!teacherId || !groupId) {
        alert("Selecione professor e turma");
        return;
      }

      const payload = buildPayload();

      await scheduleService.createSchedule(payload);

      await salvarMateriasProfessor();

      alert("Cronograma salvo com sucesso!");
    } catch (error) {
      console.error(error);
      alert("Erro ao salvar cronograma");
    }
  };

  return (
    <div className={styles.cronogramaEditavel}>
      <div className={styles.topoCronograma}>
        <label>
          Professor:
          <select
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
          >
            <option value="">Selecione</option>
            {teachers.map((t) => (
              <option key={t.teacherId} value={t.teacherId}>
                {t.fullName}
              </option>
            ))}
          </select>
        </label>

        <label>
          Turma:
          <select value={groupId} onChange={(e) => setGroupId(e.target.value)}>
            <option value="">Selecione</option>
            {groups.map((g) => (
              <option key={g.groupId} value={g.groupId}>
                {g.series || `Turma ${g.groupId}`}
              </option>
            ))}
          </select>
        </label>
      </div>

      <table className={styles.tabelaRosa}>
        <thead>
          <tr>
            <th>Segunda</th>
            <th>Terça</th>
            <th>Quarta</th>
            <th>Quinta</th>
            <th>Sexta</th>
          </tr>
        </thead>

        <tbody>
          {dados.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {["segunda", "terca", "quarta", "quinta", "sexta"].map((dia) => (
                <td key={dia}>
                  <select
                    value={item[dia] || ""}
                    onChange={(e) =>
                      handleChange(rowIndex, dia, e.target.value)
                    }
                    className={styles.inputMateria}
                  >
                    <option value="">Selecione</option>

                    {subjects.map((s) => (
                      <option key={s.subjectId} value={s.subjectId}>
                        {s.name}
                      </option>
                    ))}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.btnAdicionar} onClick={adicionarLinha}>
        Adicionar Linha
      </button>

      <button className={styles.btnAdicionar} onClick={handleSalvar}>
        Salvar Cronograma
      </button>
    </div>
  );
};

export default CronogramaEditavel;
