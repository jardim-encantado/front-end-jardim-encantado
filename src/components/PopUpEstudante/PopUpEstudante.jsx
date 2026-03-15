import React, { useEffect, useState } from "react";
import styles from "./PopUpEstudante.module.css";
import BoletimAluno from "../BoletimComponent/BoletimComponent";
import AvisoCard from "../AvisoCard/AvisoCard";
import iconOcorrencia from "../../assets/images/addOcorrencia.png";
import { createGradingService } from "../../api/service/GradingService";
import { createSchoolEventService } from "../../api/service/SchoolEventService";

export default function PopUpEstudante({ estudante, onClose, onCriarAviso }) {
  const [boletim, setBoletim] = useState([]);
  const [avisosDoAluno, setAvisosDoAluno] = useState([]);
  const [loading, setLoading] = useState(true);

  const gradingService = createGradingService();
  const schoolEventService = createSchoolEventService();

  useEffect(() => {
    if (!estudante?.estudanteId) return;

    const fetchBoletim = async () => {
  try {
    const todosGrading = await gradingService.getAllGradings();
    const boletimAluno = todosGrading
      .filter(g => g.student.id === estudante.estudanteId)
      .map(g => ({
        gradingId: g.id,
        subjectId: g.subject.id,
        disciplina: g.subject.name,
        bimestre1: g.grade1 ?? 0,
        bimestre2: g.grade2 ?? 0,
        bimestre3: g.grade3 ?? 0,
        bimestre4: g.grade4 ?? 0,
        observations: g.observations
      }));
    setBoletim(boletimAluno);
  } catch (error) {
    console.error("Erro ao carregar boletim do aluno:", error);
  }
};
      

    fetchBoletim();
  }, [estudante, gradingService]);

  useEffect(() => {
    if (!estudante?.estudanteId) return;

    const fetchAvisos = async () => {
      try {
        const eventos = await schoolEventService.getAllEvents();
        const eventosAluno = eventos.filter(e => e.studentId === estudante.estudanteId);
        setAvisosDoAluno(eventosAluno);
      } catch (error) {
        console.error("Erro ao carregar avisos do aluno:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAvisos();
  }, [estudante, schoolEventService]);

  if (!estudante || loading) return <p>Carregando...</p>;

  const handleBoletimChange = async (novoBoletim) => {
    setBoletim(novoBoletim);

    for (const nota of novoBoletim) {
      try {
        await gradingService.updateGrading(nota.gradingId, {
          studentId: estudante.estudanteId,
          subjectId: nota.subjectId,
          grade: nota.bimestre1,
          givenByTeacherId: estudante.teacherId,
          observations: nota.observations || ""
        });
      } catch (error) {
        console.error("Erro ao atualizar nota:", error);
      }
    }
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.info}>
          <p><strong>Nome:</strong> {estudante.nomeEstudante}</p>
          <p><strong>Série:</strong> {estudante.serieEstudante}</p>
          <p><strong>Professora:</strong> {estudante.professoraResponsavel}</p>
          <p><strong>Telefone:</strong> {estudante.telefone}</p>
          <p><strong>Email:</strong> {estudante.email}</p>
        </div>

        <BoletimAluno dados={boletim} editable={true} onChange={handleBoletimChange} />
        <hr className={styles.divider} />

        <div className={styles.avisosDoAluno}>
          {avisosDoAluno.length > 0 ? (
            avisosDoAluno.map(aviso => (
              <AvisoCard
                key={aviso.id}
                avisoSchema={{
                  color: aviso.color || "azul",
                  name: aviso.name || aviso.title,
                  eventDate: aviso.eventDate || aviso.date,
                  description: aviso.description || aviso.descricao,
                  origin: aviso.origin || aviso.origem
                }}
              />
            ))
          ) : (
            <p>Sem avisos para este aluno.</p>
          )}

          <img
            src={iconOcorrencia}
            alt="Ícone de ocorrência"
            className={styles.iconOcorrencia}
            onClick={(e) => {
              e.stopPropagation();
              onCriarAviso(estudante);
            }}
          />
        </div>
      </div>
    </div>
  );
}