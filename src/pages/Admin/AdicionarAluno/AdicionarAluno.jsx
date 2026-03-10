import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdicionarAluno.module.css";
import AddEstudante from "../../../components/Admin/AdicionarEstudante/AddEstudante";
import CriarResponsavel from "../../../components/Admin/AdicionarEstudante/AddResponsavel";
import Carregamento from "../../../components/Carregamento/Carregamento";

import { createStudentService } from "../../../api/service/StudentService";

export default function TelaAdicionarEstudante() {
  const navigate = useNavigate();

  const [estudante, setEstudante] = useState({});
  const [responsavel, setResponsavel] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const studentService = createStudentService();

  const handleSalvar = async () => {
    setIsSaving(true);

    try {
      await studentService.createStudent(estudante, responsavel);
      alert("Cadastro realizado com sucesso!");
      navigate("/admin/visualizarEstudante");
    } catch (error) {
      console.error("Erro ao cadastrar estudante:", error);
      alert("Ocorreu um erro ao cadastrar o estudante. Por favor, tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  function voltarParaLista() {
    navigate("/admin/visualizarEstudante");
  }

  return (
    <div className={styles.container}>
      {isSaving && <Carregamento />}

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

      <div className={styles.botoesContainer}>
        <button className={styles.salvarBtn} onClick={handleSalvar}>
          {isSaving ? "Salvando..." : "Salvar"}
        </button>

        <button className={styles.voltarBtn} onClick={voltarParaLista}>
          Voltar
        </button>
      </div>
    </div>
  );
}