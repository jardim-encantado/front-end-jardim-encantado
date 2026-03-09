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
    const loadSubjects = async () => {
      setIsLoadingSubjects(true);

      try {
        const subjects = await subjectService.getAllSubjects();
        setSubjectsOptions(
          subjects.map((subject) => ({
            value: subject.subjectId,
            label: subject.name,
          }))
        );
      } catch (error) {
        console.error("Erro ao carregar materias:", error);
      } finally {
        setIsLoadingSubjects(false);
      }
    };

    loadSubjects();
  }, [subjectService]);

  const handleSalvar = async () => {
    setIsSaving(true);

    try {
      await teacherService.createTeacherWithSubjects(professor, selectedSubjectIds);
      alert("Cadastro realizado com sucesso!");
      navigate("/admin/visualizarProfessor");
    } catch (error) {
      console.error("Erro ao cadastrar professor:", error);
      alert("Ocorreu um erro ao cadastrar o professor. Por favor, tente novamente.");
    } finally {
      setIsSaving(false);
    }
  };

  function voltarParaLista() {
    navigate("/admin/visualizarProfessor");
  }

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