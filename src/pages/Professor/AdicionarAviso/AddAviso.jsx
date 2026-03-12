import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SidebarProfessor from "../../../components/SideBarProfessor/SidebarProfessor";
import CriarAviso from "../../../components/CriarAviso/CriarAviso";
import styles from "./AddAviso.module.css";
import addIcon from "../../../assets/images/addOcorrencia.png";
import { createSchoolEventTypeService } from "../../../api/service/SchoolEventTypeService";
import { createSchoolEventService } from "../../../api/service/SchoolEventService";
import { getLoggedPerson } from "../../../hooks/personHook";
import AvisoMural from "../../../components/MuralAvisos/MuralAvisos";
import Carregamento from "../../../components/Carregamento/Carregamento";
import { roleNameMatches, ROLE_NAME_ALIASES } from "../../../api/schemas/Role";
import SidebarAdmin from "../../../components/Admin/SideBarAdmin";

const PaginaAvisos = () => {
    const schoolEventService = createSchoolEventService();
    const schoolEventTypeService = createSchoolEventTypeService();

    const [schoolEventTypes, setSchoolEventTypes] = useState([]);
    const [schoolEvents, setSchoolEvents] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [mostraPopUp, setMostraPopUp] = useState(false);

    const loggedPerson = getLoggedPerson();

    const getAllSchoolEvents = async () => {
        try {
            const events = await schoolEventService.getAllEvents();
            setSchoolEvents(events);
        } catch (error) {
            console.error("Erro ao buscar eventos:", error);
            setSchoolEvents([]);
        }
    };

    const getSchoolEventTypes = async () => {
        try {
            const types = await schoolEventTypeService.getAllTypes();
            setSchoolEventTypes(types);
        } catch (error) {
            console.error("Erro ao buscar tipos de evento:", error);
            setSchoolEventTypes([
                {
                    id: "1",
                    name: "OUTROS",
                },
            ]);
        }
    };

    useEffect(() => {
        getSchoolEventTypes();
        getAllSchoolEvents();
        setLoading(false);
    }, []);


    const handleAddAviso = (newSchoolEventSchema) => {
        setSchoolEvents([
            ...schoolEvents,
            {...newSchoolEventSchema, id: schoolEvents.length + 1},
        ]);
        setMostraPopUp(false);
    };

    return (
        isLoading ? (
            <Carregamento />
        ) : (
        <Box sx={{ display: "flex" }} className={styles.container}>
            
            {roleNameMatches(loggedPerson.roleName, ROLE_NAME_ALIASES.teacher) && <SidebarProfessor />}
            {roleNameMatches(loggedPerson.roleName, ROLE_NAME_ALIASES.admin) && <SidebarAdmin />}

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <h2>Gerenciar Mural de Avisos</h2>

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
                        personSchema={loggedPerson}
                        onCancel={() => setMostraPopUp(false)}
                        onSave={handleAddAviso}
                        schoolEventTypes={schoolEventTypes}
                    />
                )}

                <AvisoMural schoolEvents={schoolEvents}/>
            </Box>
        </Box>
        )
    );
};

export default PaginaAvisos;
