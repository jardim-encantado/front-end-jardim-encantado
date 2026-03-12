import { useState, useEffect } from "react";
import styles from "./CriarAviso.module.css";
import { createSchoolEventService } from "../../api/service/SchoolEventService";


export default function CriarAviso({ personSchema, onCancel, onSave, schoolEventTypes }) {
    const schoolEventService = createSchoolEventService();

    const [titulo, setTitulo] = useState("");
    const [data, setData] = useState("");
    const [descricao, setDescricao] = useState("");
    const [eventType, setEventType] = useState("");

    const handleSave = async () => {
        if (!titulo || !data || !descricao || !eventType) return;

        try {
            const avisoSchema = await schoolEventService.createEvent({
                titulo,
                descricao,
                data: `${data}T00:00:00`,
                cpf: personSchema.cpf,
                eventTypeId: eventType,
            });

            onSave(avisoSchema);
        } catch (error) {
            console.error("Erro ao criar aviso:", error);
        }
    };


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
                            {et.name.charAt(0).toUpperCase() + et.name.slice(1)}
                        </option>
                    ))}
                </select>

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
