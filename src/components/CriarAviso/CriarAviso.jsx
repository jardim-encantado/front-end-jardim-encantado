import React, { useState } from "react";
import styles from "./CriarAviso.module.css";

export default function CriarAviso({ estudante, onCancel, onSave }) {
  const [titulo, setTitulo] = useState("");
  const [data, setData] = useState("");
  const [descricao, setDescricao] = useState("");
  const [origem, setOrigem] = useState("");

  const handleSave = () => {
    if (!titulo || !data || !descricao || !origem) return; // validação simples
    onSave({ titulo, data, descricao, origem, estudanteId: estudante.estudanteId });
  };

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2>Criar Aviso</h2>

        <label>Título</label>
        <input
          type="text"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />

        <label>Data</label>
        <input
          type="date"
          value={data}
          onChange={e => setData(e.target.value)}
        />

        <label>Descrição</label>
        <input
          type="text"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />

        <label>Origem</label>
        <input
          type="text"
          value={origem}
          onChange={e => setOrigem(e.target.value)}
        />

        <div className={styles.buttons}>
          <button className={styles.cancel} onClick={onCancel}>Cancelar</button>
          <button className={styles.save} onClick={handleSave}>Salvar</button>
        </div>
      </div>
    </div>
  );
}