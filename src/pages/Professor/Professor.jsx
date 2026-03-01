import React, { useState } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Sidebar/Sidebar";
import CardUsuarios from "../../components/InformacaoProfessor/ProfessorComponente";
import styles from "./Professor.module.css";

export default function Professores() {

  const [professores] = useState([
    {
      id: 1,
      nomeProfessor: "Maria Oliveira",
      cargoProfessor: "Professora",
      emailProfessor: "maria@escola.com",
      telefoneProfessor: "(11) 99999-1111",
      materia: "Matemática",
    },
    {
      id: 2,
      nomeProfessor: "João Pedro",
      cargoProfessor: "Professor",
      emailProfessor: "joao@escola.com",
      telefoneProfessor: "(11) 98888-2222",
      materia: "História",
    },
    {
      id: 3,
      nomeProfessor: "Ana Clara",
      cargoProfessor: "Coordenadora",
      emailProfessor: "ana@escola.com",
      telefoneProfessor: "(11) 97777-3333",
      materia: "Pedagogia",
    },
  ]);

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

      <Box className={styles.mainContent}>
        <h1>Professores</h1>

        <div className={styles.cardsGrid}>
          {professores.map((professor) => (
            <CardUsuarios
              key={professor.id}
              nomeProfessor={professor.nomeProfessor}
              cargoProfessor={professor.cargoProfessor}
              emailProfessor={professor.emailProfessor}
              telefoneProfessor={professor.telefoneProfessor}
              materia={professor.materia}
            />
          ))}
        </div>
      </Box>
    </Box>
  );
}