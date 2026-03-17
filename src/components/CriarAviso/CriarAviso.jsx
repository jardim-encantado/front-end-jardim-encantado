import { useState, useEffect } from "react";
import styles from "./CriarAviso.module.css";
import { createSchoolEventService } from "../../api/service/SchoolEventService";

function getTodayDateInputValue() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function CriarAviso({ personSchema, onCancel, onSave, schoolEventTypes }) {
  const schoolEventService = createSchoolEventService();

  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState(getTodayDateInputValue());
  const [descricao, setDescricao] = useState("");
  const [eventType, setEventType] = useState("");
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!eventType && schoolEventTypes.length > 0) {
      setEventType(String(schoolEventTypes[0]?.id));
    }
  }, [eventType, schoolEventTypes]);

  const handleSave = async () => {
    setFormError("");
    if (!titulo.trim() || !data || !descricao.trim() || eventType === "") {
      setFormError("Preencha título, data, descrição e tipo do aviso.");
      return;
    }
    if (!personSchema?.cpf) {
      setFormError("Não foi possível identificar o CPF do usuário logado.");
      return;
    }

    try {
      setIsSaving(true);
      const avisoSchema = await schoolEventService.createEvent({
        name: titulo.trim(),
        description: descricao.trim(),
        eventDate: data,
        cpf: personSchema.cpf,
        eventTypeId: Number(eventType),
      });
      await onSave(avisoSchema);
    } catch (error) {
      console.error("Erro ao criar aviso:", error);
      const errorMessage = error?.response?.data?.message || 
                           error?.response?.data?.error ||
                           "Não foi possível criar o aviso. Tente novamente.";
      setFormError(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2>Criar Aviso</h2>

        <label>Título</label>
        <input type="text" value={titulo} onChange={(e) => setTitulo(e.target.value)} required />

        <label>Data</label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} required />

        <label>Descrição</label>
        <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} required />

        <label>Tipo do Aviso</label>
        <select value={eventType} onChange={(e) => setEventType(e.target.value)} disabled={schoolEventTypes.length === 0} required>
          {schoolEventTypes.length === 0 ? (
            <option value="">Sem tipos disponíveis</option>
          ) : (
            schoolEventTypes.map((et) => (
              <option key={et.id} value={String(et.id)}>
                {et.name.charAt(0).toUpperCase() + et.name.slice(1)}
              </option>
            ))
          )}
        </select>

        {formError && <p className={styles.errorMessage}>{formError}</p>}

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel} disabled={isSaving} type="button">Cancelar</button>
          <button className={styles.save} onClick={handleSave} disabled={isSaving} type="button">
            {isSaving ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}