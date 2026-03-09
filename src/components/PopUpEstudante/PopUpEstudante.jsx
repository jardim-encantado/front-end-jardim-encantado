import React from "react";
import styles from "./PopUpEstudante.module.css";
import Boletim from "../BoletimComponent/BoletimComponent";
import AvisoCard from "../AvisoCard/AvisoCard";
import iconOcorrencia from "../../assets/images/addOcorrencia.png";

export default function PopUpEstudante({ estudante, onClose, onCriarAviso }) {
  if (!estudante) return null;

  const boletim = Array.isArray(estudante.boletim) ? estudante.boletim : [];

  const avisos = [
    { id: 1, titulo: "Dia do Livro", data: "02/02", descricao: "Troca de livros.", origem: "Diretoria", cor: "rosa", estudanteId: 2, tpAviso: 1 },
    { id: 2, titulo: "Reunião de Pais", data: "05/02", descricao: "Presença obrigatória.", origem: "Coordenação", cor: "verde", estudanteId: 2, tpAviso: 1 }
  ];

  const avisosDoAluno = avisos.filter(aviso => aviso.estudanteId === estudante.estudanteId && aviso.tpAviso === 1);

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>✕</button>

        <div className={styles.info}>
          <div>
            <p><strong>Nome:</strong> {estudante.nomeEstudante}</p>
            <p><strong>Série:</strong> {estudante.serieEstudante}</p>
            <p><strong>Professora:</strong> {estudante.professoraResponsavel}</p>
            <p><strong>Telefone:</strong> {estudante.telefone}</p>
            <p><strong>Email:</strong> {estudante.email}</p>
          </div>
        </div>

        <Boletim dados={boletim} />
        <hr className={styles.divider} />

        <div className={styles.avisosDoAluno}>
          {avisosDoAluno.length > 0 ? (
            avisosDoAluno.map(aviso => (
              <AvisoCard
                key={aviso.id}
                titulo={aviso.titulo}
                data={aviso.data}
                descricao={aviso.descricao}
                origem={aviso.origem}
                cor={aviso.cor}
              />
            ))
          ) : <p>Sem avisos para este aluno.</p>}

          <img
            src={iconOcorrencia}
            alt="Ícone de ocorrência"
            className={styles.iconOcorrencia}
            onClick={e => {
              e.stopPropagation();
              onCriarAviso(estudante); 
            }}
          />
        </div>
      </div>
    </div>
  );
}