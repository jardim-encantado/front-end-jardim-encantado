import { useState } from "react";
import Cabecalho from "../EstudanteInfo/Cabecalho";
import InfoRow from "../EstudanteInfo/./InfoLinha";

export default function ProfessorInfo({ teacher, onDelete }) {

  const [editando, setEditando] = useState(false);

  const teacherName = teacher?.fullName || teacher?.name || "-";
  const teacherEmail = teacher?.email || "-";
  const teacherCpf = teacher?.cpf || "-";
  const teacherPhone = teacher?.phoneNumber || "-";
  const teacherSubject = teacher.getSubjectNamesList() ?? "-";

  return (
    <div
      style={{
        borderRadius: "15px",
        overflow: "hidden",
        background: "#f5d3d3",
        border: "3px solid #e29c9c",
        width: "950px",
        color: "black",
        marginBottom: "20px",
        position: "relative"
      }}
    >

      <div
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          display: "flex",
          gap: "10px"
        }}
      >
        <button onClick={() => setEditando(!editando)}>✏️</button>
        <button onClick={onDelete}>🗑</button>
      </div>

      <Cabecalho title="Detalhes do Professor" />

      <div style={{ padding: "20px", display: "flex", gap: "40px" }}>
        <div>
          <InfoRow label="Nome:" value={teacherName} disabled={!editando} />
          <InfoRow label="Email:" value={teacherEmail} disabled={!editando} />
          <InfoRow label="CPF:" value={teacherCpf} disabled={!editando} />
          <InfoRow label="Telefone:" value={teacherPhone} disabled={!editando} />
        </div>

        <div>
          <p>Foto:</p>
          <img src="" alt="" width="70" height="90"/>
        </div>

        <div>
            <InfoRow label="Matéria:" value={teacherSubject} disabled={!editando} />
        </div>

      </div>
    </div>
  );
}