import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdicionarProfessor.module.css";

import AddProfessor from "../../../components/Admin/AdicionarProfessor/AddProfessor";
import Carregamento from "../../../components/Carregamento/Carregamento";
import { createTeacherService } from "../../../api/service/TeacherService";
import { createStudySubjectService } from "../../../api/service/StudySubjectService";

export default function TelaAdicionarProfessor() {
  const navigate = useNavigate();

  const [professor, setProfessor] = useState({});
  const [selectedSubjectIds, setSelectedSubjectIds] = useState([]);
  const [subjectsOptions, setSubjectsOptions] = useState([]);
  const [isLoadingSubjects, setIsLoadingSubjects] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const teacherService = useMemo(() => createTeacherService(), []);
  const subjectService = useMemo(() => createStudySubjectService(), []);

  useEffect(() => {
    let isMounted = true;
    const loadSubjects = async () => {
      try {
        const subjects = await subjectService.getAllSubjects();
        if (isMounted && Array.isArray(subjects)) {
          setSubjectsOptions(
            subjects.map((s) => ({ value: s.subjectId, label: s.name })),
          );
        }
      } catch (error) {
        console.error("Erro ao carregar matérias:", error);
      } finally {
        if (isMounted) setIsLoadingSubjects(false);
      }
    };
    loadSubjects();
    return () => { isMounted = false; };
  }, [subjectService]);

  const handleSalvar = async () => {
    if (isSaving) return;
    setIsSaving(true);

    try {
      // 1. Limpeza dos dados: O Java espera String, não objetos
      const dadosParaEnviar = { ...professor };

      // Remove máscaras
      if (dadosParaEnviar.cpf) dadosParaEnviar.cpf = dadosParaEnviar.cpf.replace(/\D/g, "");
      if (dadosParaEnviar.telefone) dadosParaEnviar.telefone = dadosParaEnviar.telefone.replace(/\D/g, "");
      if (dadosParaEnviar.cep) dadosParaEnviar.cep = dadosParaEnviar.cep.replace(/\D/g, "");

      // SOLUÇÃO PARA O ERRO JSON: 
      // Se 'foto' for um objeto (File), o Java crasha ao tentar mapear para String.
      // Removemos o arquivo binário do JSON. 
      if (typeof dadosParaEnviar.foto === "object") {
        delete dadosParaEnviar.foto; 
      }

      // 2. Envio para o serviço
      await teacherService.createTeacherWithSubjects(
        dadosParaEnviar,
        selectedSubjectIds,
      );

      alert("Professor cadastrado com sucesso!");
      navigate("/admin/visualizarProfessor");
    } catch (error) {
      console.error("Erro detalhado do Backend:", error.response?.data);
      alert("Erro ao salvar: Verifique os campos e o console.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      {(isLoadingSubjects || isSaving) && <Carregamento />}

      <h2>Adicionar novo Professor</h2>

      <AddProfessor
        titulo="Dados Pessoais"
        dados={professor}
        setDados={setProfessor}
        subjectsOptions={subjectsOptions}
        onSubjectsChange={setSelectedSubjectIds}
      />

      <div className={styles.botoesContainer}>
        <button
          className={styles.salvarBtn}
          onClick={handleSalvar}
          disabled={isSaving || isLoadingSubjects}
        >
          {isSaving ? "Salvando..." : "Salvar Cadastro Completo"}
        </button>

        <button className={styles.voltarBtn} onClick={() => navigate(-1)}>
          Voltar
        </button>
      </div>
    </div>
  );
}