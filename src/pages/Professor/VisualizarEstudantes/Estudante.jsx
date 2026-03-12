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
import { usePerson } from "../../../hooks/personHook";

const ENROLLMENT_STATUS_LABEL = {
  PRE_ENROLLMENT: "Pre-matricula",
  ENROLLED: "Matriculado",
  REJECTED: "Rejeitado",
};

const buildBoletimRows = (grades) => {
  const rowsBySubject = new Map();

  grades.forEach((grade) => {
    const subjectName = grade.subjectName || "Sem disciplina";

    if (!rowsBySubject.has(subjectName)) {
      rowsBySubject.set(subjectName, {
        disciplina: subjectName,
        bimestre1: "-",
        bimestre2: "-",
        bimestre3: "-",
        bimestre4: "-",
      });
    }

    const row = rowsBySubject.get(subjectName);
    const bimonthly = Number(grade.bimonthly);

    if (bimonthly >= 1 && bimonthly <= 4) {
      row[`bimestre${bimonthly}`] = grade.grade ?? "-";
    }
  });

  return [...rowsBySubject.values()];
};

export default function Estudante() {
  const studentService = useMemo(() => createStudentService(), []);
  const gradingService = useMemo(() => createGradingService(), []);
  const { person } = usePerson();

  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [filtro, setFiltro] = useState("");
  const [alunoPopUp, setAlunoPopUp] = useState(null);
  const [alunoCriarAviso, setAlunoCriarAviso] = useState(null);
  const [showCriarAviso, setShowCriarAviso] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const [studentList, gradingList] = await Promise.all([
          studentService.getAllStudents(),
          gradingService.getAllGrades(),
        ]);

        setStudents(studentList);
        setGrades(gradingList);
      } catch (error) {
        console.error("Erro ao carregar estudantes do professor:", error);
        setLoadError("Nao foi possivel carregar os estudantes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [gradingService, studentService]);

  const teacherName =
    [person?.firstName, person?.lastName].filter(Boolean).join(" ").trim() || "Professor(a)";

  const boletimByStudentId = useMemo(() => {
    const groupedGrades = new Map();

    grades.forEach((grade) => {
      const studentId = Number(grade.studentId);

      if (!groupedGrades.has(studentId)) {
        groupedGrades.set(studentId, []);
      }

      groupedGrades.get(studentId).push(grade);
    });

    const result = new Map();

    groupedGrades.forEach((studentGrades, studentId) => {
      result.set(studentId, buildBoletimRows(studentGrades));
    });

    return result;
  }, [grades]);

  const estudantes = useMemo(() => {
    return students.map((student) => ({
      id: student.studentId,
      estudanteId: student.studentId,
      nomeEstudante: student.fullName || `Estudante ${student.studentId}`,
      serieEstudante:
        ENROLLMENT_STATUS_LABEL[student.enrollment?.status] || student.enrollment?.status || "Sem matricula",
      professoraResponsavel: teacherName,
      telefone: "Nao informado",
      email: student.email || "Nao informado",
      boletim: boletimByStudentId.get(Number(student.studentId)) || [],
    }));
  }, [boletimByStudentId, students, teacherName]);

  const estudantesFiltrados = estudantes.filter((estudante) =>
    estudante.nomeEstudante.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleAbrirPopUp = (aluno) => {
    setAlunoPopUp(aluno);
    setShowCriarAviso(false);
  };

  const handleCriarAviso = (aluno) => {
    setAlunoPopUp(null);
    setAlunoCriarAviso(aluno);
    setShowCriarAviso(true);
  };

  const handleFecharCriarAviso = () => {
    setShowCriarAviso(false);
    setAlunoCriarAviso(null);
  };

  const handleSalvarAviso = (novoAviso) => {
    console.log("Aviso salvo:", novoAviso);
    handleFecharCriarAviso();
  };

  return (
    <div className={styles.pageLayout}>
      <SidebarProfessor />

      <div className={styles.pageContent}>
        <h1>Estudantes</h1>

        <div className={styles.filtros}>
          <div className={styles.serie}>
            <h2>Série:</h2>
            <DropdownEstudantes />
          </div>

          <div className={styles.search}>
            <SearchBar onSearch={setFiltro} />
          </div>
        </div>

        {isLoading && <Carregamento />}
        {!isLoading && loadError && <p>{loadError}</p>}

        {!isLoading && !loadError && (
          <div className={styles.cardsContainer}>
            {estudantesFiltrados.map((estudante) => (
              <EstudanteComponent
                key={estudante.id}
                nomeEstudante={estudante.nomeEstudante}
                serieEstudante={estudante.serieEstudante}
                professoraResponsavel={estudante.professoraResponsavel}
                onClick={() => handleAbrirPopUp(estudante)}
              />
            ))}
          </div>
        )}

        {alunoPopUp && !showCriarAviso && (
          <PopUpEstudante
            estudante={alunoPopUp}
            onClose={() => setAlunoPopUp(null)}
            onCriarAviso={handleCriarAviso}
          />
        )}

        {alunoCriarAviso && showCriarAviso && (
          <CriarAviso
            estudante={alunoCriarAviso}
            onCancel={handleFecharCriarAviso}
            onSave={handleSalvarAviso}
          />
        )}
      </div>
    </div>
  );
}