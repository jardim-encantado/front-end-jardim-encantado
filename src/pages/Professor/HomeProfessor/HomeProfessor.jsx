import React, { useState } from "react";
import Box from "@mui/material/Box";
import SidebarProfessor from "../../../components/SideBarProfessor/SideBarProfessor";
import Cronograma from "../../../components/Cronograma/Cronograma";
import AvisoCard from "../../../components/AvisoCard/AvisoCard";
import styles from "./HomeProfessor.module.css";


function HomeProfessor() {
  const [guardianName] = useState("Maria Eduarda");

  const avisos = [
    {
      id: 1,
      titulo: "Dia do Livro",
      data: "02/02",
      descricao: "Os livros podem ser trocados entre alunos.",
      origem: "Diretoria",
      cor: "rosa",
    },
    {
      id: 2,
      titulo: "Reunião de Pais",
      data: "05/02",
      descricao: "Os pais devem comparecer presencialmente.",
      origem: "Coordenação",
      cor: "verde",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
  <SidebarProfessor />

  <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
    }}
  >
        <h2>Olá! {guardianName}</h2>

        <div className={styles.mural}>
          <h3 className={styles.muralTitle}>Mural de Avisos</h3>

          <div className={styles.avisosContainer}>
            {avisos.map((aviso) => (
              <AvisoCard
                key={aviso.id}
                titulo={aviso.titulo}
                data={aviso.data}
                descricao={aviso.descricao}
                cor={aviso.cor}
                origem={aviso.origem}
              />
            ))}
          </div>
        </div>

        <Cronograma />
      </Box>
    </Box>
  );
}

export default HomeProfessor;