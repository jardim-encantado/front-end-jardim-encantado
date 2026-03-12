import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Sidebar from "../../../components/Sidebar/Sidebar";
import Cronograma from "../../../components/Cronograma/Cronograma";
import AvisoCard from "../../../components/AvisoCard/AvisoCard";
import Carregamento from "../../../components/Carregamento/Carregamento";
import styles from "./HomeResponsavel.module.css";
import { usePerson } from "../../../hooks/personHook";
import { createSchoolEventService } from "../../../api/service/SchoolEventService";
import HelloComponent from "../../../components/Hello/HelloComponent";

function HomeStudent() {
  const { person } = usePerson();
  const [avisos, setAvisos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!person?.id) return;

    const fetchAvisos = async () => {
      try {
        const schoolEventService = createSchoolEventService();
        const eventos = await schoolEventService.getAllEvents();

        // Ajuste conforme o nome do campo que vincula evento ao aluno
        const eventosAluno = eventos.filter((e) => e.studentId === person.id);
        setAvisos(eventosAluno);
      } catch (error) {
        console.error("Erro ao carregar avisos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvisos();
  }, [person]);

  if (!person || loading) {
    return <Carregamento />;
  }

  const displayName = [person.firstName, person.lastName].filter(Boolean).join(" ");

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />

  <Box
    component="main"
    sx={{
      flexGrow: 1,
      p: 3,
    }}>
        <HelloComponent name={displayName} />

        <div className={styles.mural}>
          <h3 className={styles.muralTitle}>Mural de Avisos</h3>

          <div className={styles.avisosContainer}>
            {avisos.map((aviso) => (
              <AvisoCard
                key={aviso.id}
                avisoSchema={{
                  color: aviso.color || "azul",
                  name: aviso.name || aviso.title,
                  eventDate: aviso.eventDate || aviso.date,
                  description: aviso.description || aviso.descricao,
                  origin: aviso.origin || aviso.origem,
                }}
              />
            ))}
          </div>
        </div>

        <Cronograma />
      </Box>
    </Box>
  );
}

export default HomeStudent;