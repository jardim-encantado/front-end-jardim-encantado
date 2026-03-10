import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SidebarProfessor from "../../../components/SideBarProfessor/SidebarProfessor";
import AvisoCard from "../../../components/AvisoCard/AvisoCard";
import CriarAviso from "../../../components/CriarAviso/CriarAviso";
import styles from "./AddAviso.module.css";
import addIcon from "../../../assets/images/addOcorrencia.png";

const AddAviso = () => {

  const [avisos, setAvisos] = useState([]);
  const [mostraPopUp, setMostraPopUp] = useState(false);

  const API_URL = "{VITE_API_URL}/api/v1/schoolEvent";

  const getColorByType = (typeId) => {
    if (typeId === 1) return "verde";
    if (typeId === 2) return "rosa";
    if (typeId === 3) return "azul";
    if (typeId === 4) return "vermelho";
    id
    return "rosa";
  };

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {

        const avisosConvertidos = data.map((event) => ({
          id: event.eventId,
          titulo: event.name,
          descricao: event.description,
          data: new Date(event.eventDate).toLocaleDateString(),
          origem: event.createdBy?.name || "Administração",
          cor: getColorByType(event.eventTypeId?.id)
        }));

        setAvisos(avisosConvertidos);

      })
      .catch((err) => console.error("Erro ao buscar avisos:", err));
  }, []);

  const handleAddAviso = async (novoAviso) => {

    const eventoParaAPI = {
      name: novoAviso.titulo,
      description: novoAviso.descricao,
      eventDate: `${novoAviso.data}T10:00:00`,
      eventTypeId: 1 
    };

    try {

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(eventoParaAPI)
      });

      const data = await response.json();

      const novoAvisoFormatado = {
        id: data.eventId,
        titulo: data.name,
        descricao: data.description,
        data: new Date(data.eventDate).toLocaleDateString(),
        origem: data.createdBy?.name || "Administração",
        cor: getColorByType(data.eventTypeId?.id)
      };

      setAvisos([...avisos, novoAvisoFormatado]);
      setMostraPopUp(false);

    } catch (error) {
      console.error("Erro ao criar aviso:", error);
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <SidebarProfessor />

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <h2>Mural de Avisos</h2>

        <button
          className={styles.btnAdicionar}
          onClick={() => setMostraPopUp(true)}
        >
          <img
            src={addIcon}
            alt="Adicionar"
            className={styles.iconeAdicionar}
          />
          Adicionar Aviso
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

export default AddAviso;