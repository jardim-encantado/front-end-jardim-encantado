import { useEffect, useMemo, useState } from "react";
import EstudanteComponent from "../../../components/EstudanteComponent/EstudanteComponent";
import SidebarProfessor from "../../../components/SideBarProfessor/SidebarProfessor";
import DropdownEstudantes from "../../../components/DropdownEstudantes/DropdownEstudantes";
import SearchBar from "../../../components/SearchStudent/SearchBar";
import PopUpEstudante from "../../../components/PopUpEstudante/PopUpEstudante";
import CriarAviso from "../../../components/CriarAviso/CriarAviso";
import Carregamento from "../../../components/Carregamento/Carregamento";
import styles from "./Estudante.module.css";

import { createStudentService } from "../../../api/service/StudentService";
import { createGradingService } from "../../../api/service/GradingService";
import { createClassroomGroupStudentService } from "../../../api/service/ClassroomGroupStudentService";
import { createClassroomGroupService } from "../../../api/service/ClassroomGroupService";

import { usePerson } from "../../../hooks/personHook";

export default function Estudante() {

  const studentService = useMemo(() => createStudentService(), []);
  const gradingService = useMemo(() => createGradingService(), []);
  const relationService = useMemo(() => createClassroomGroupStudentService(), []);
  const groupService = useMemo(() => createClassroomGroupService(), []);

  const { person } = usePerson();

  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [relations, setRelations] = useState([]);
  const [groups, setGroups] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [serieSelecionada, setSerieSelecionada] = useState(null);

  const [alunoPopUp, setAlunoPopUp] = useState(null);
  const [alunoCriarAviso, setAlunoCriarAviso] = useState(null);
  const [showCriarAviso, setShowCriarAviso] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      try {

        const [studentsRes, gradesRes, relationsRes, groupsRes] =
          await Promise.all([
            studentService.getAllStudents(),
            gradingService.getAllGradings(),
            relationService.getAll(),
            groupService.getAll(),
          ]);

        setStudents(studentsRes);
        setGrades(gradesRes);
        setRelations(relationsRes);
        setGroups(groupsRes);

      } catch (error) {
        console.error("Erro ao carregar estudantes:", error);
      } finally {
        setIsLoading(false);
      }
    }

    carregarDados();
  }, [studentService, gradingService, relationService, groupService]);

  const teacherName =
    [person?.firstName, person?.lastName].filter(Boolean).join(" ") ||
    "Professor(a)";

  /*
  groupId -> series
  */
  const seriesByGroupId = useMemo(() => {

    const map = new Map();

    groups.forEach((g) => {
      map.set(g.groupId, g.series);
    });

    return map;

  }, [groups]);

  /*
  studentId -> series
  */
  const seriesByStudentId = useMemo(() => {

    const map = new Map();

    relations.forEach((rel) => {
      const serie = seriesByGroupId.get(rel.groupId);
      if (serie) {
        map.set(rel.studentId, serie);
      }
    });

    return map;

  }, [relations, seriesByGroupId]);

  /*
  studentId -> grades
  */
  const gradesByStudent = useMemo(() => {

    const map = new Map();

    grades.forEach((g) => {

      if (!map.has(g.studentId)) {
        map.set(g.studentId, []);
      }

      map.get(g.studentId).push(g);
    });

    return map;

  }, [grades]);

  const estudantes = useMemo(() => {

    return students.map((student) => ({

      id: student.studentId,

      nomeEstudante:
        student.fullName || `Estudante ${student.studentId}`,

      serieEstudante:
        seriesByStudentId.get(student.studentId) || "Sem série",

      professoraResponsavel: teacherName,

      boletim:
        gradesByStudent.get(student.studentId) || []

    }));

  }, [students, seriesByStudentId, gradesByStudent, teacherName]);

  const seriesDisponiveis = useMemo(() => {

    const set = new Set();

    estudantes.forEach((e) => set.add(e.serieEstudante));

    return [...set].map((s) => ({
      value: s,
      label: s
    }));

  }, [estudantes]);

  const estudantesFiltrados = estudantes.filter((e) => {

    const matchNome = e.nomeEstudante
      .toLowerCase()
      .includes(filtro.toLowerCase());

    const matchSerie =
      !serieSelecionada || e.serieEstudante === serieSelecionada;

    return matchNome && matchSerie;

  });

  const abrirPopUp = (aluno) => {
    setAlunoPopUp(aluno);
    setShowCriarAviso(false);
  };

  const criarAviso = (aluno) => {
    setAlunoPopUp(null);
    setAlunoCriarAviso(aluno);
    setShowCriarAviso(true);
  };

  return (
    <div className={styles.pageLayout}>

      <SidebarProfessor />

      <div className={styles.pageContent}>

        <h1>Estudantes</h1>

        <div className={styles.filtros}>

          <DropdownEstudantes
            options={seriesDisponiveis}
            onChangeSerie={setSerieSelecionada}
          />

          <SearchBar onSearch={setFiltro} />

        </div>

        {isLoading && <Carregamento />}

        {!isLoading && (
          <div className={styles.cardsContainer}>

            {estudantesFiltrados.map((e) => (

              <EstudanteComponent
                key={e.id}
                nomeEstudante={e.nomeEstudante}
                serieEstudante={e.serieEstudante}
                professoraResponsavel={e.professoraResponsavel}
                onClick={() => abrirPopUp(e)}
              />

            ))}

          </div>
        )}

        {alunoPopUp && !showCriarAviso && (

          <PopUpEstudante
            estudante={alunoPopUp}
            onClose={() => setAlunoPopUp(null)}
            onCriarAviso={criarAviso}
          />

        )}

        {showCriarAviso && alunoCriarAviso && (

          <CriarAviso
            estudante={alunoCriarAviso}
            onCancel={() => setShowCriarAviso(false)}
            onSave={() => setShowCriarAviso(false)}
          />

        )}

      </div>
    </div>
  );
}