import React, { useState } from "react";
import styles from "./AdicionarProfessor.module.css";

import AddProfessor from "../../../components/Admin/AdicionarProfessor/AddProfessor";
import CriarResponsavel from "../../../components/Admin/AdicionarEstudante/AddResponsavel";

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

      <AddProfessor
        titulo="Detalhes do Professor"
        dados={estudante}
        setDados={setEstudante}
      />
      <button className={styles.salvarBtn} onClick={handleSalvar}>
        Salvar
      </button>
    </div>
  );
}