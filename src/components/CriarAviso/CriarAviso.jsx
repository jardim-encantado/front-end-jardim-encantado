import { useState, useEffect } from "react";
import styles from "./CriarAviso.module.css";
import { createSchoolEventService } from "../../api/service/SchoolEventService";
import { createSchoolEventTypeService } from "../../api/service/SchoolEventTypeService";

export default function CriarAviso({ personSchema, onCancel, onSave }) {
    const schoolEventService = createSchoolEventService();
    const schoolEventTypeService = createSchoolEventTypeService();

    const [titulo, setTitulo] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [eventType, setEventType] = useState("");

    const handleSave = async () => {
        if (!titulo || !data || !descricao || !eventType) return;

        try {
            await schoolEventService.createEvent({
                titulo,
                descricao,
                data: `${data}T00:00:00`,
                cpf: personSchema.cpf,
                eventTypeId: eventType,
            });

            onSave();
        } catch (error) {
            console.error("Erro ao criar aviso:", error);
        }
    };

    const [schoolEventTypes, setSchoolEventTypes] = useState([]);

    
    const getSchoolEventTypes = async () => {
        try {
            const types = await schoolEventTypeService.getAllEventTypes();
            setSchoolEventTypes(types);
        } catch (error) {
            console.error("Erro ao buscar tipos de evento:", error);
            setSchoolEventTypes([{
                id: "1",
                name: "OUTROS"
            }]);
        }
    }

    useEffect(() => {
        getSchoolEventTypes();
    }, []);

    return (
        <div className={styles.modalOverlay} onClick={onCancel}>
            <div
                className={styles.modalContent}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Criar Aviso</h2>

                <label>Título</label>
                <input
                    type="text"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                />

                <label>Data</label>
                <input
                    type="date"
                    value={data}
                    onChange={(e) => setData(e.target.value)}
                />

                <label>Descrição</label>
                <input
                    type="text"
                    value={descricao}
                    onChange={(e) => setDescricao(e.target.value)}
                />

                <label>Tipo de Evento</label>

                <select name="event_type_select" id="event_type_select" value={eventType} onChange={(e) => setEventType(e.target.value)}>
                    {schoolEventTypes.map((et) => (
                        <option key={et.id} value={et.id}>
                            {et.name.toLowerCase()}
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                />

                <div className={styles.buttons}>
                    <button className={styles.cancel} onClick={onCancel}>
                        Cancelar
                    </button>
                    <button className={styles.save} onClick={handleSave}>
                        Salvar
                    </button>
                </div>
            </div>
        </div>
    );
}
