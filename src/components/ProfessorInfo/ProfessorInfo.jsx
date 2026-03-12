import { useState } from "react";
import Cabecalho from "../EstudanteInfo/Cabecalho";
import InfoRow from "../EstudanteInfo/./InfoLinha";
import styles from "./ProfessorInfo.module.css";

export default function ProfessorInfo({ teacher, onDelete }) {

  const [editando, setEditando] = useState(false);

  const teacherName = teacher?.fullName || teacher?.name || "-";
  const teacherEmail = teacher?.email || "-";
  const teacherCpf = teacher?.cpf || "-";
  const teacherPhone = teacher?.phoneNumber || "-";
  const teacherSubject = teacher.getSubjectNamesList() ?? "-";
  const teacherPhoto = teacher?.photoUrl || "";

  return (
    <div
      className={styles.card}
    >

      <div
        className={styles.actions}
      >
        <button onClick={() => setEditando(!editando)}>✏️</button>
        <button onClick={onDelete}>🗑️</button>
      </div>

      <Cabecalho title="Detalhes do Professor" />

      <div className={styles.content}>
        <div>
          <InfoRow label="Nome:" value={teacherName} disabled={!editando} />
          <InfoRow label="Email:" value={teacherEmail} disabled={!editando} />
          <InfoRow label="CPF:" value={teacherCpf} disabled={!editando} />
          <InfoRow label="Telefone:" value={teacherPhone} disabled={!editando} />
        </div>

        <div>
          <p>Foto:</p>
          <img src={teacherPhoto} alt="" width="70" height="90" />
        </div>

        <div>
            <InfoRow label="Matéria:" value={teacherSubject} disabled={!editando} />
        </div>

      </div>
    </div>
  );
}