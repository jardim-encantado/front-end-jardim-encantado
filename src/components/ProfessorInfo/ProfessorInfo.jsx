import { useState } from "react";
import Cabecalho from "../EstudanteInfo/Cabecalho";
import InfoRow from "../EstudanteInfo/./InfoLinha";

export default function EstudanteInfo({ onDelete }) {

  const [editando, setEditando] = useState(false);

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
          <InfoRow label="Nome:" disabled={!editando} />
          <InfoRow label="Email:" disabled={!editando} />
          <InfoRow label="CPF:" disabled={!editando} />
          <InfoRow label="Telefone:" disabled={!editando} />
        </div>

        <div>
          <p>Foto:</p>
          <img src="" alt="" width="70" height="90"/>
        </div>

        <div>
           <InfoRow label="Matéria:" disabled={!editando} />
        </div>

      </div>
    </div>
  );
}