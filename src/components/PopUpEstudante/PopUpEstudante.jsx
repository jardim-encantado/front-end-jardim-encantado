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
  const [saving, setSaving] = useState(false);

  const gradingService = createGradingService();
  const schoolEventService = createSchoolEventService();

  useEffect(() => {
    if (!estudante?.id) return;

    async function carregarDados() {
      try {
        setLoading(true);

        const boletimResponse = await gradingService.getByStudentId(
          estudante.id,
        );
        const boletimFormatado = [];

        boletimResponse.forEach((g) => {
          const subjectId = g.subject.subjectId;
          let materia = boletimFormatado.find((b) => b.subjectId === subjectId);

          if (!materia) {
            materia = {
              disciplina: g.subject.name,
              subjectId: subjectId,
              bimestre1: "",
              bimestre2: "",
              bimestre3: "",
              bimestre4: "",
              gradingIds: {},
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
          (e) => e.studentId === estudante.id,
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

  const handleBoletimChange = (novoBoletim) => {
    setBoletim(novoBoletim);
  };

  const getBimestreAtual = () => {
    const mes = new Date().getMonth() + 1;
    return Math.floor((mes - 1) / 3) + 1;
  };

  const handleSalvarBoletim = async () => {
    try {
      setSaving(true);
      const requests = [];
      const bimestreAtual = getBimestreAtual();

      for (const materia of boletim) {
        for (let b = 1; b <= 4; b++) {
          const nota = materia[`bimestre${b}`];
          const gradingId = materia.gradingIds[b];
          if (nota === "") continue;

          const payload = {
            studentId: estudante.studentId,
            subjectId: materia.subjectId,
            grade: nota,
            observations: "",
            givenByTeacherId: 1,
          };

          if (gradingId && b === bimestreAtual) {
            requests.push(gradingService.updateGrading(gradingId, payload));
          } else if (!gradingId && b === bimestreAtual) {
            requests.push(gradingService.createGrading(payload));
          }
        }
      }

      await Promise.all(requests);
      alert("Boletim salvo com sucesso!");
    } catch (error) {
      console.error("Erro ao salvar boletim:", error);
      alert("Erro ao salvar alterações.");
    } finally {
      setSaving(false);
    }
  };

  if (!estudante || loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.info}>
          <img
            src={estudante.fotoUrl || "https://via.placeholder.com/120"}
            alt="Foto do aluno"
            className={styles.foto}
          />

          <div className={styles.columnsWrapper}>
            <div className={styles.columnPrimary}>
              <p>
                <strong>Nome:</strong> {estudante.nomeEstudante}
              </p>
              <p>
                <strong>Série:</strong> {estudante.serieEstudante}
              </p>
              <p>
                <strong>Professora:</strong> {estudante.professoraResponsavel}
              </p>
            </div>
            <div className={styles.columnSecondary}>
              <p>
                <strong>Telefone:</strong> {estudante.telefone}
              </p>
              <p>
                <strong>Email:</strong> {estudante.email}
              </p>
            </div>
          </div>
        </div>

        <BoletimAluno
          dados={boletim}
          editable={true}
          bimestreAtual={getBimestreAtual()}
          onChange={handleBoletimChange}
        />

        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <button
            className={styles.saveBtn}
            onClick={handleSalvarBoletim}
            disabled={saving}
          >
            {saving ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>

        <hr className={styles.divider} />

        <div className={styles.avisosDoAluno}>
          {avisosDoAluno.length > 0 &&
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
            ))}

          <div className={styles.avisoContainer}>
            <p>
              {avisosDoAluno.length > 0
                ? `${avisosDoAluno.length} aviso(s)`
                : "Sem avisos para este aluno."}
            </p>
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
    </div>
  );
}
