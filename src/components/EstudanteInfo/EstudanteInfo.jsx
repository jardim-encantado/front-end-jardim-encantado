import { useState } from "react";
import Cabecalho from "./Cabecalho";
import InfoRow from "./InfoLinha";

export default function EstudanteInfo({ estudante, onDelete }) {

  const [editando, setEditando] = useState(false);

  const studentName = estudante?.fullName || estudante?.name || "-";
  const studentEmail = estudante?.email || "-";
  const studentCpf = estudante?.cpf || "-";
  const enrollmentStatus = estudante?.enrollment?.status || "-";

  const guardianName = estudante?.guardian?.fullName || "-";
  const guardianEmail = estudante?.guardian?.email || "-";
  const guardianCpf = estudante?.guardian?.cpf || "-";
  const guardianPhone = estudante?.guardian?.phoneNumber || "-";

  const address = estudante?.address
    ? [
        estudante.address.street,
        estudante.address.streetNumber,
        estudante.address.city,
        estudante.address.state,
      ]
        .filter(Boolean)
        .join(", ")
    : "-";

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

      <Cabecalho title="Detalhes do Estudante" />

      <div style={{ padding: "20px", display: "flex", gap: "40px" }}>
        <div>
          <InfoRow label="Nome:" value={studentName} disabled={!editando} />
          <InfoRow label="Email:" value={studentEmail} disabled={!editando} />
          <InfoRow label="CPF:" value={studentCpf} disabled={!editando} />
          <InfoRow label="Matricula:" value={enrollmentStatus} disabled={!editando} />
        </div>

        <div>
          <p>Foto:</p>
          <img src="" alt="" width="70" height="90"/>
        </div>
      </div>

      <Cabecalho title="Detalhes Responsável 1" />

      <div style={{ padding: "20px", display: "flex", gap: "40px" }}>
        <div>
          <InfoRow label="Nome:" value={guardianName} disabled={!editando}/>
          <InfoRow label="Email:" value={guardianEmail} disabled={!editando}/>
          <InfoRow label="CPF:" value={guardianCpf} disabled={!editando}/>
          <InfoRow label="Telefone:" value={guardianPhone} disabled={!editando}/>
        </div>

        <div>
          <p>Foto:</p>
          <img src="" alt="" width="70" height="90"/>
        </div>

        <div>
          <InfoRow label="Endereço:" value={address} disabled={!editando}/>
        </div>
      </div>
    </div>
  );
}