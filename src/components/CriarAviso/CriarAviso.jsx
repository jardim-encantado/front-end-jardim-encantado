import React, { useState } from "react";
import styles from "./CriarAviso.module.css";

export default function CriarAviso({ estudante, onCancel, onSave }) {
  const [titulo, setTitulo] = useState("");
  const [descricao, setDescricao] = useState("");

  const handleSave = () => {
    onSave({ titulo, descricao, estudanteId: estudante.estudanteId });
  };

  return (
    <div className={styles.modalOverlay} onClick={onCancel}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <button onClick={onCancel} style={{ position: "absolute", top: 10, right: 10 }}>✕</button>
        <h2>Criar Aviso</h2>
        <input
          type="text"
          placeholder="Título"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
        <textarea
          placeholder="Descrição"
          value={descricao}
          onChange={e => setDescricao(e.target.value)}
        />
        <button onClick={handleSave}>Salvar</button>
      </div>
    </div>
  );
}