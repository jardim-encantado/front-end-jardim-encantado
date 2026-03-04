import React, { useState } from "react";
import styles from "./AdicionarAluno.module.css";

import AddEstudante from "../../../components/Admin/AdicionarEstudante/AddEstudante";
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

      <AddEstudante
        titulo="Detalhes do Estudante"
        dados={estudante}
        setDados={setEstudante}
      />

      <CriarResponsavel
        titulo="Detalhes do Responsável"
        dados={responsavel}
        setDados={setResponsavel}
      />

      <button className={styles.salvarBtn} onClick={handleSalvar}>
        Salvar
      </button>
    </div>
  );
}