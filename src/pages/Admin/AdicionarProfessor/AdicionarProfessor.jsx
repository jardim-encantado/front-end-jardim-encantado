import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdicionarProfessor.module.css";

import AddProfessor from "../../../components/Admin/AdicionarProfessor/AddProfessor";

export default function TelaAdicionarProfessor() {

  const navigate = useNavigate();

  const [estudante, setEstudante] = useState({});

  const handleSalvar = () => {
    console.log("Professor:", estudante);
    alert("Cadastro realizado com sucesso!");
  };

  function voltarParaLista() {
    navigate("/admin/visualizarProfessor");
  }

  return (
    <div className={styles.container}>
      <h2>Adicionar novo Professor</h2>

      <AddProfessor
        titulo="Dados Pessoais"
        dados={estudante}
        setDados={setEstudante}
      />

      <div className={styles.botoesContainer}>
        <button className={styles.salvarBtn} onClick={handleSalvar}>
          Salvar
        </button>

        <button className={styles.voltarBtn} onClick={voltarParaLista}>
          Voltar
        </button>
      </div>
    </div>
  );
}