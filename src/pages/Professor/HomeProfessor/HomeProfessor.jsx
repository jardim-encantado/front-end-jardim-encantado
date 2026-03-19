import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SidebarProfessor from "../../../components/SideBarProfessor/SidebarProfessor";
import Cronograma from "../../../components/Cronograma/Cronograma";
import MuralAvisos from "../../../components/MuralAvisos/MuralAvisos";
import Carregamento from "../../../components/Carregamento/Carregamento";
import { createSchoolEventService } from "../../../api/service/SchoolEventService";
import { usePerson } from "../../../hooks/personHook";
import HelloComponent from "../../../components/Hello/HelloComponent";


function HomeProfessor() {
  const { person } = usePerson();
  const personName = person.fullName || [person?.firstName, person?.lastName].filter(Boolean).join(" ").trim();
  const displayName = personName || "Professor";

  const [avisos, setAvisos] = useState([]);
  const [isLoading, setLoading] = useState(true);


  useEffect(() => {
    const carregarAvisos = async () => {
      const schoolEventService = createSchoolEventService();
      const events = await schoolEventService.getAllEvents();
      setAvisos(events);
      setLoading(false);
    };

    carregarAvisos();
  }, []);

  return (
    isLoading ? <Carregamento /> :
    <Box sx={{ display: "flex" }}>
      <SidebarProfessor />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
          }}
        >
        <HelloComponent name={displayName} />

        <MuralAvisos schoolEvents={avisos} />

        <Cronograma />
      </Box>
    </Box>
  );
}

export default HomeProfessor;