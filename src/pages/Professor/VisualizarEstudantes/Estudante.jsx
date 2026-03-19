import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import SidebarProfessor from "../../../components/SideBarProfessor/SidebarProfessor";
import DropdownEstudantes from "../../../components/DropdownEstudantes/DropdownEstudantes";
import SearchBar from "../../../components/SearchStudent/SearchBar";
import EstudanteComponent from "../../../components/EstudanteComponent/EstudanteComponent";
import PopUpEstudante from "../../../components/PopUpEstudante/PopUpEstudante";
import CriarAviso from "../../../components/CriarAviso/CriarAviso";
import Carregamento from "../../../components/Carregamento/Carregamento";
import styles from "./Estudante.module.css";

import { createStudentService } from "../../../api/service/StudentService";
import { createGradingService } from "../../../api/service/GradingService";
import { createClassroomGroupStudentService } from "../../../api/service/ClassroomGroupStudentService";
import { createClassroomGroupService } from "../../../api/service/ClassroomGroupService";
import { createSchoolEventTypeService } from "../../../api/service/SchoolEventTypeService";

import { usePerson } from "../../../hooks/personHook";

export default function Estudante() {
  const studentService = useMemo(() => createStudentService(), []);
  const gradingService = useMemo(() => createGradingService(), []);
  const relationService = useMemo(
    () => createClassroomGroupStudentService(),
    [],
  );
  const groupService = useMemo(() => createClassroomGroupService(), []);
  const schoolEventTypeService = useMemo(
    () => createSchoolEventTypeService(),
    [],
  );

  const { person } = usePerson();

  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [relations, setRelations] = useState([]);
  const [groups, setGroups] = useState([]);
  const [schoolEventTypes, setSchoolEventTypes] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [filtro, setFiltro] = useState("");
  const [serieSelecionada, setSerieSelecionada] = useState(null);

  const [alunoPopUp, setAlunoPopUp] = useState(null);
  const [alunoCriarAviso, setAlunoCriarAviso] = useState(null);
  const [showCriarAviso, setShowCriarAviso] = useState(false);

  // Carrega alunos, notas, relações, turmas e tipos de aviso
  useEffect(() => {
    async function carregarDados() {
      try {
        setIsLoading(true);

        const [studentsRes, gradesRes, relationsRes, groupsRes, typesRes] =
          await Promise.all([
            studentService.getAllStudents(),
            gradingService.getAllGradings(),
            relationService.getAll(),
            groupService.getAll(),
            schoolEventTypeService.getAllTypes(),
          ]);

        setStudents(studentsRes);
        setGrades(gradesRes);
        setRelations(relationsRes);
        setGroups(groupsRes);
        setSchoolEventTypes(typesRes);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      } finally {
        setIsLoading(false);
      }
    }

    carregarDados();
  }, [
    studentService,
    gradingService,
    relationService,
    groupService,
    schoolEventTypeService,
  ]);

  const teacherName =
    [person?.firstName, person?.lastName].filter(Boolean).join(" ") ||
    "Professor(a)";

  const seriesByGroupId = useMemo(() => {
    const map = new Map();
    groups.forEach((g) => map.set(g.groupId, g.series));
    return map;
  }, [groups]);

  const seriesByStudentId = useMemo(() => {
    const map = new Map();
    relations.forEach((rel) => {
      const serie = seriesByGroupId.get(rel.groupId);
      if (serie) map.set(rel.studentId, serie);
    });
    return map;
  }, [relations, seriesByGroupId]);

  const gradesByStudent = useMemo(() => {
    const map = new Map();
    grades.forEach((g) => {
      if (!map.has(g.studentId)) map.set(g.studentId, []);
      map.get(g.studentId).push(g);
    });
    return map;
  }, [grades]);

  const estudantes = useMemo(() => {
    return students.map((s) => ({
      id: s.studentId,
      studentId: s.studentId,
      nomeEstudante: s.fullName || `Estudante ${s.studentId}`,
      serieEstudante: seriesByStudentId.get(s.studentId) || "Sem série",
      professoraResponsavel: teacherName,
      boletim: gradesByStudent.get(s.studentId) || [],
      cpf: s.cpf,
    }));
  }, [students, seriesByStudentId, gradesByStudent, teacherName]);

  const seriesDisponiveis = useMemo(() => {
    const set = new Set();
    estudantes.forEach((e) => set.add(e.serieEstudante));
    return [...set].map((s) => ({ value: s, label: s }));
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

  const handleAddAviso = (novoAviso) => {
    setShowCriarAviso(false);
  };

  return (
    <Box sx={{ display: "flex" }} className={styles.pageLayout}>
      <SidebarProfessor />

      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
        className={styles.pageContent}
      >
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
            personSchema={{ cpf: alunoCriarAviso.cpf }}
            schoolEventTypes={schoolEventTypes}
            onCancel={() => setShowCriarAviso(false)}
            onSave={handleAddAviso}
            studentId={alunoCriarAviso.studentId}
          />
        )}
      </Box>
    </Box>
  );
}
