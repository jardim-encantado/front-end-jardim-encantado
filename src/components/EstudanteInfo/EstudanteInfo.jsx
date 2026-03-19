import { useState } from "react";
import Cabecalho from "./Cabecalho";
import InfoRow from "./InfoLinha";

export default function EstudanteInfo({ estudante, onDelete }) {
  const [editando, setEditando] = useState(false);

  return (
    <div style={{
      borderRadius: "10px",
      overflow: "hidden",
      background: "#fdf2f2", 
      border: "2px solid #e29c9c",
      width: "100%",
      maxWidth: "950px",
      color: "black",
      marginBottom: "25px",
      position: "relative",
      boxShadow: "0 4px 15px rgba(0,0,0,0.05)"
    }}>
      
      <div style={{ position: "absolute", top: "15px", right: "15px", display: "flex", gap: "12px", zIndex: 10 }}>
        <button onClick={() => setEditando(!editando)} style={{ cursor: "pointer", border: "none", background: "white", borderRadius: "20%", width: "35px", height: "35px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          {editando ? "💾" : "✏️"}
        </button>
        <button onClick={onDelete} style={{ cursor: "pointer", border: "none", background: "white", borderRadius: "20%", width: "35px", height: "35px", boxShadow: "0 2px 5px rgba(0,0,0,0.1)" }}>
          🗑️
        </button>
      </div>

      <Cabecalho title="Detalhes do Estudante" />
      <div style={{ padding: "25px", display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: 2 }}>
          <InfoRow label="Nome:" value={estudante?.fullName} disabled={!editando} />
          <InfoRow label="Email:" value={estudante?.email} disabled={!editando} />
          <InfoRow label="CPF:" value={estudante?.cpf} disabled={!editando} />
          <InfoRow label="Foto URL:" value={estudante?.photoUrl} disabled={!editando} />
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
          <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Foto Aluno</p>
          <img src={estudante?.photoUrl || "/placeholder-user.png"} alt="Estudante" style={{ width: "100px", height: "120px", objectFit: "cover", borderRadius: "10px", border: "2px solid #e29c9c" }} />
        </div>
      </div>

      <Cabecalho title="Detalhes do Responsável" />
      <div style={{ padding: "25px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
          <div style={{ flex: 2 }}>
            <InfoRow label="Responsável:" value={estudante?.guardian?.fullName} disabled={!editando} />
            <InfoRow label="Email:" value={estudante?.guardian?.email} disabled={!editando} />
            <InfoRow label="CPF:" value={estudante?.guardian?.cpf} disabled={!editando} />
            <InfoRow label="Telefone:" value={estudante?.guardian?.phoneNumber} disabled={!editando} />
          </div>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
            <p style={{ fontWeight: "bold", marginBottom: "10px" }}>Foto Responsável</p>
            <img src={estudante?.guardian?.photoUrl || "/placeholder-user.png"} alt="Responsável" style={{ width: "100px", height: "120px", objectFit: "cover", borderRadius: "10px", border: "2px solid #e29c9c" }} />
          </div>
        </div>

        <div style={{ borderTop: "1px solid #e29c9c", paddingTop: "20px" }}>
          <p style={{ fontWeight: "bold", marginBottom: "15px", color: "#d17a7a" }}>Endereço Residencial</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 40px" }}>
            <InfoRow label="Rua:" value={estudante?.address?.street} disabled={!editando} />
            <InfoRow label="Número:" value={estudante?.address?.streetNumber} disabled={!editando} />
            <InfoRow label="Cidade:" value={estudante?.address?.city} disabled={!editando} />
            <InfoRow label="Estado:" value={estudante?.address?.state} disabled={!editando} />
          </div>
        </div>
      </div>
    </div>
  );
}