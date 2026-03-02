import React, { useState } from "react";
import CriarEstudante from "../../../components/Admin/AdicionarEstudante/AddEstudante";
import CriarResponsavel from "../../../components/Admin/AdicionarEstudante/AddResponsavel";
import styles from "./AdicionarAluno.module.css";

export default function TelaAdicionarEstudante() {
  const [estudante, setEstudante] = useState({});
  const [responsavel, setResponsavel] = useState({});

  const handleSalvar = () => {
    console.log("Estudante:", estudante);
    console.log("Responsável:", responsavel);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <div className={styles.container}>
      <h2>Adicionar novo estudante</h2>

      <div className={styles.formSection}>
        <h2 className={styles.formTitle}>Detalhes do Estudante</h2>
        <CriarEstudante dados={estudante} setDados={setEstudante} />
      </div>

      <div className={styles.formSection}>
        <h2>Detalhes do Responsável</h2>
        <CriarResponsavel dados={responsavel} setDados={setResponsavel} />
      </div>

      <button className={styles.salvarBtn} onClick={handleSalvar}>
        Salvar
      </button>
    </div>
  );
}