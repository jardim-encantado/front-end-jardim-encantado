import React, { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../../components/Sidebar/Sidebar";
import CardUsuarios from "../../../components/InformacaoProfessor/ProfessorComponente";
import Carregamento from "../../../components/Carregamento/Carregamento";
import styles from "./Professor.module.css";
import { createTeacherService } from "../../../api/service/TeacherService";

export default function Professores() {
  const teacherService = useMemo(() => createTeacherService(), []);
  const [professores, setProfessores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const loadTeachers = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const teachers = await teacherService.getAllTeachers();
        setProfessores(teachers);
      } catch (error) {
        console.error("Erro ao carregar professores:", error);
        setLoadError("Nao foi possivel carregar os professores.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTeachers();
  }, [teacherService]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box className={styles.mainContent}>
        <h1>Professores</h1>

        <div className={styles.cardsGrid}>
          {isLoading && <Carregamento />}
          {!isLoading && loadError && <p>{loadError}</p>}

          {!isLoading && !loadError && professores.map((professor) => (
            <CardUsuarios
              key={professor.teacherId}
              nomeProfessor={professor.fullName}
              cargoProfessor="Professor"
              emailProfessor={professor.email || "Nao informado"}
              telefoneProfessor={professor.phoneNumber || "Nao informado"}
              materia={
                Array.isArray(professor.subjectNames) && professor.subjectNames.length
                  ? professor.subjectNames.join(", ")
                  : "Nao informado"
              }
            />
          ))}
        </div>
      </Box>
    </Box>
  );
}