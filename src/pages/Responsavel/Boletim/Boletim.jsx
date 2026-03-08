import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../../components/Sidebar/Sidebar";
import BoletimComponent from "../../../components/BoletimComponent/BoletimComponent";
import DropdownBoletim from "../../../components/DropdownBoletim/DropdownBoletim";
import styles from "./Boletim.module.css";
import { createStudentService } from "../../../api/service/StudentService";
import { createGradingService } from "../../../api/service/GradingService";

const buildBoletimRows = (grades) => {
  const gradeMap = new Map();

  grades.forEach((grade) => {
    const subjectName = grade.subjectName || "Sem disciplina";

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

  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const [studentList, gradeList] = await Promise.all([
          studentService.getAllStudents(),
          gradingService.getAllGrades(),
        ]);

        setStudents(studentList);
        setGrades(gradeList);

        if (studentList.length) {
          setSelectedStudentId(studentList[0].studentId);
        }
      } catch (error) {
        console.error("Erro ao carregar boletim:", error);
        setLoadError("Nao foi possivel carregar os dados do boletim.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [gradingService, studentService]);

  const studentOptions = students.map((student) => ({
    value: student.studentId,
    label: student.fullName || `Estudante ${student.studentId}`,
  }));

  const selectedStudentOption =
    studentOptions.find((option) => option.value === selectedStudentId) || null;

  const boletimData = useMemo(() => {
    if (!selectedStudentId) {
      return [];
    }

    const studentGrades = grades.filter(
      (grade) => Number(grade.studentId) === Number(selectedStudentId)
    );

    return buildBoletimRows(studentGrades);
  }, [grades, selectedStudentId]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box className={styles.mainContent}>
        <h1>Boletim</h1>

        {isLoading && <p>Carregando boletim...</p>}
        {!isLoading && loadError && <p>{loadError}</p>}

        {!isLoading && !loadError && (
          <>
            <div style={{ marginBottom: "16px", width: "100%" }}>
              <DropdownBoletim
                options={studentOptions}
                selectedOption={selectedStudentOption}
                onChange={(option) => setSelectedStudentId(option?.value || null)}
                placeholder="Selecione o estudante"
              />
            </div>
            <BoletimComponent dados={boletimData} />
          </>
        )}
      </Box>
    </Box>
  );
}

export default Boletim;