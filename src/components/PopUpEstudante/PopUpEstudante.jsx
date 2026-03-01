import React from "react";
import styles from "./PopUpEstudante.module.css";
import Boletim from "../BoletimComponent/BoletimComponent";
import DropdownEstudantes from "../DropdownEstudantes/DropdownEstudantes";
import AvisoCard from "../AvisoCard/AvisoCard";

export default function PopUpEstudante({ estudante, onClose }) {
  if (!estudante) return null;

  const avisos = [
  {
    id: 1,
    titulo: "Dia do Livro",
    data: "02/02",
    descricao: "Os livros podem ser trocados entre alunos.",
    origem: "Diretoria",
    cor: "rosa",
    alunoNome: "João Silva",
    estudanteId: 2,
  },
  {
    id: 2,
    titulo: "Reunião de Pais",
    data: "05/02",
    descricao: "Os pais devem comparecer presencialmente.",
    origem: "Coordenação",
    cor: "verde",
    alunoNome: "Maria Eduarda",
    estudanteId: 2,
  },
  {
    id: 3,
    titulo: "Projeto de Ciências",
    data: "10/03",
    descricao: "Entrega do trabalho de ciências.",
    origem: "Prof. Ana",
    cor: "rosa",
    alunoNome: "Maria Eduarda",
    estudanteId: 2,
  },
];
  const avisosDoAluno = avisos.filter(
    (aviso) => aviso.estudanteId === estudante.estudanteId
  );

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.info}>
          <div className={styles.leftSide}>
            <div className={styles.columnPrimary}>
              <p><strong>Nome:</strong> {estudante.nomeEstudante}</p>
              <p><strong>Série:</strong> {estudante.serieEstudante}</p>
              <p><strong>Professora:</strong> {estudante.professoraResponsavel}</p>
            </div>

            <div className={styles.columnSecondary}>
              <p><strong>Telefone:</strong> {estudante.telefone}</p>
              <p><strong>Email:</strong> {estudante.email}</p>
              <p><strong>Responsável:</strong> {estudante.responsavel}</p>
            </div>
          </div>

          <hr className={styles.divider} />

          <div className={styles.actions}>
            <DropdownEstudantes />
            <button className={styles.boletimBtn}>Editar</button>
          </div>
        </div>

        <Boletim />
        <hr className={styles.divider} />

        <div className={styles.avisosDoAluno}>
          {avisosDoAluno.length > 0 ? (
            avisosDoAluno.map((aviso) => (
              <AvisoCard
                key={aviso.id}
                titulo={aviso.titulo}
                data={aviso.data}
                descricao={aviso.descricao}
                origem={aviso.origem}
                cor={aviso.cor}
              />
            ))
          ) : (
            <p>Sem avisos para este aluno.</p>
          )}
        </div>
      </div>
    </div>
  );
}