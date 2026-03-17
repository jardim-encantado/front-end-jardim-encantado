import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BoletimComponent from "../../../components/BoletimComponent/BoletimComponent";
import DropdownBoletim from "../../../components/DropdownBoletim/DropdownBoletim";
import Carregamento from "../../../components/Carregamento/Carregamento";
import styles from "./Boletim.module.css";
import { createStudentService } from "../../../api/service/StudentService";
import { createGradingService } from "../../../api/service/GradingService";
import { usePerson } from "../../../hooks/personHook";

const buildBoletimRows = (grades) => {
  const gradeMap = new Map();

  grades.forEach((grade) => {
    const subjectName =
      grade.subjectName || grade.subject?.name || "Sem disciplina";

    if (!gradeMap.has(subjectName)) {
      gradeMap.set(subjectName, {
        disciplina: subjectName,
        bimestre1: "-",
        bimestre2: "-",
        bimestre3: "-",
        bimestre4: "-",
      });
    }

    const subjectGrade = gradeMap.get(subjectName);
    const bimonthly = Number(grade.bimonthly);

    if (bimonthly >= 1 && bimonthly <= 4) {
      subjectGrade[`bimestre${bimonthly}`] = grade.grade ?? "-";
    }
  });

  return [...gradeMap.values()];
};

function Boletim() {
  const studentService = useMemo(() => createStudentService(), []);
  const gradingService = useMemo(() => createGradingService(), []);
  const { loggedPerson } = usePerson();

  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGrades, setIsLoadingGrades] = useState(false);
  const [error, setError] = useState("");

  const isStudent = String(loggedPerson?.roleName ?? "")
    .toLowerCase()
    .includes("student");

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      setError("");

      try {
        const studentList = await studentService.getAllStudents();
        setStudents(studentList);

        if (isStudent) {
          const student = studentList.find(
            (s) => Number(s.personId) === Number(loggedPerson?.personId)
          );

          if (student) {
            setSelectedStudentId(student.studentId);
          } else {
            setError("Estudante não encontrado.");
          }
        } else {
          if (studentList.length) {
            setSelectedStudentId(studentList[0].studentId);
          }
        }
      } catch (err) {
        console.error("Erro ao carregar alunos:", err);
        setError("Não foi possível carregar os alunos.");
      } finally {
        setIsLoading(false);
      }
    };

    if (loggedPerson) {
      loadStudents();
    }
  }, [studentService, loggedPerson, isStudent]);

  useEffect(() => {
    const loadGrades = async () => {
      if (!selectedStudentId) return;

      setIsLoadingGrades(true);

      try {
        const studentGrades =
          await gradingService.getByStudentId(selectedStudentId);
        setGrades(studentGrades);
      } catch (err) {
        console.error("Erro ao carregar notas:", err);
        setError("Não foi possível carregar o boletim.");
      } finally {
        setIsLoadingGrades(false);
      }
    };

    loadGrades();
  }, [selectedStudentId, gradingService]);

  const studentOptions = students.map((student) => ({
    value: student.studentId,
    label: student.fullName || `Estudante ${student.studentId}`,
  }));

  const selectedStudentOption =
    studentOptions.find((opt) => opt.value === selectedStudentId) || null;

  const boletimData = useMemo(() => {
    return buildBoletimRows(grades);
  }, [grades]);

  return (
    <Box sx={{ display: "flex", marginTop: "20px" }}>
      <Sidebar />

      <Box className={styles.mainContent}>
        <h1>Boletim</h1>

        {isLoading && <Carregamento />}
        {!isLoading && error && <p>{error}</p>}

        {!isLoading && !error && (
          <>
            {!isStudent && (
              <div style={{ marginBottom: "16px", width: "100%" }}>
                <DropdownBoletim
                  options={studentOptions}
                  selectedOption={selectedStudentOption}
                  onChange={(option) =>
                    setSelectedStudentId(option?.value || null)
                  }
                  placeholder="Selecione o estudante"
                />
              </div>
            )}

            {isLoadingGrades ? (
              <Carregamento />
            ) : (
              <BoletimComponent dados={boletimData} />
            )}
          </>
        )}
      </Box>
    </Box>
  );
}

export default Boletim;