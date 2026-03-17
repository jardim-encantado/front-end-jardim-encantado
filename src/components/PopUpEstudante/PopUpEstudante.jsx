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

    if (!estudante?.id) return;

    async function carregarDados() {

      try {

        setLoading(true);

        const boletimResponse =
          await gradingService.getByStudentId(estudante.id);

        const boletimFormatado = [];

        boletimResponse.forEach((g) => {

          const subjectId = g.subject.subjectId;

          let materia = boletimFormatado.find(
            (b) => b.subjectId === subjectId
          );

          if (!materia) {

            materia = {
              disciplina: g.subject.name,
              subjectId: subjectId,

              bimestre1: "",
              bimestre2: "",
              bimestre3: "",
              bimestre4: "",

              gradingIds: {}
            };

            boletimFormatado.push(materia);
          }

          const bimestre = g.bimonthly;

          materia[`bimestre${bimestre}`] = g.grade;
          materia.gradingIds[bimestre] = g.gradingId;

        });

        setBoletim(boletimFormatado);

        const eventos = await schoolEventService.getAllEvents();

        const eventosAluno = eventos.filter(
          (e) => e.studentId === estudante.id
        );

        setAvisosDoAluno(eventosAluno);

      } catch (error) {

        console.error("Erro ao carregar dados do aluno:", error);

      } finally {

        setLoading(false);

      }

    }

    carregarDados();

  }, [estudante]);

  const handleBoletimChange = async (novoBoletim) => {

    setBoletim(novoBoletim);

    for (const materia of novoBoletim) {

      for (let b = 1; b <= 4; b++) {

        const nota = materia[`bimestre${b}`];
        const gradingId = materia.gradingIds[b];

        if (!gradingId) continue;

        try {

          await gradingService.updateGrading(gradingId, {
            studentId: estudante.id,
            subjectId: materia.subjectId,
            grade: nota,
            bimonthly: b,
            observations: ""
          });

        } catch (error) {

          console.error("Erro ao atualizar nota:", error);

        }

      }

    }

  };

  if (!estudante || loading) {
    return <p>Carregando...</p>;
  }

  return (

    <div className={styles.overlay} onClick={onClose}>

      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className={styles.closeBtn}
          onClick={onClose}
        >
          ✕
        </button>

        <div className={styles.info}>

          <p>
            <strong>Nome:</strong> {estudante.nomeEstudante}
          </p>

          <p>
            <strong>Série:</strong> {estudante.serieEstudante}
          </p>

          <p>
            <strong>Professora:</strong> {estudante.professoraResponsavel}
          </p>

          <p>
            <strong>Telefone:</strong> {estudante.telefone}
          </p>

          <p>
            <strong>Email:</strong> {estudante.email}
          </p>

        </div>

        <BoletimAluno
          dados={boletim}
          editable={true}
          onChange={handleBoletimChange}
        />

        <hr className={styles.divider} />

        <div className={styles.avisosDoAluno}>

          {avisosDoAluno.length > 0 ? (

            avisosDoAluno.map((aviso) => (

              <AvisoCard
                key={aviso.id}
                avisoSchema={{
                  color: aviso.color || "azul",
                  name: aviso.name || aviso.title,
                  eventDate: aviso.eventDate || aviso.date,
                  description: aviso.description || aviso.descricao,
                  origin: aviso.origin || aviso.origem,
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