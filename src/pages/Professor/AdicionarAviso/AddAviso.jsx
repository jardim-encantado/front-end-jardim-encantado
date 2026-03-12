import React, { useState } from "react";
import Box from "@mui/material/Box";
import SidebarProfessor from "../../../components/SideBarProfessor/SidebarProfessor";
import AvisoCard from "../../../components/AvisoCard/AvisoCard";
import CriarAviso from "../../../components/CriarAviso/CriarAviso"; 
import styles from "./AddAviso.module.css";
import addIcon from "../../../assets/images/addOcorrencia.png"; 

const PaginaAvisos = () => {
  const [avisos, setAvisos] = useState([
    { id: 1, titulo: "Reunião de Pais", data: "08/03/2026", descricao: "Reunião sobre o calendário escolar.", origem: "Administração", cor: "rosa" },
    { id: 2, titulo: "Prova de Matemática", data: "10/03/2026", descricao: "Prova do 2º bimestre.", origem: "Professor", cor: "verde" }
  ]);

  const [mostraPopUp, setMostraPopUp] = useState(false);

  const handleAddAviso = (novoAviso) => {
    const corPadrao = novoAviso.cor || "rosa";
    setAvisos([...avisos, { ...novoAviso, cor: corPadrao, id: avisos.length + 1 }]);
    setMostraPopUp(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarProfessor />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h2>Mural de Avisos</h2>

        <button className={styles.btnAdicionar} onClick={() => setMostraPopUp(true)}>
          <img src={addIcon} alt="Adicionar" className={styles.iconeAdicionar} /> Adicionar Aviso
        </button>

        {mostraPopUp && (
          <CriarAviso
            estudante={{ estudanteId: 0 }}
            onCancel={() => setMostraPopUp(false)}
            onSave={handleAddAviso}
          />
        )}

        <div className={styles.mural}>
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
      </Box>
    </Box>
  );
};

export default PaginaAvisos;