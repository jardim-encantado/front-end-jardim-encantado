import React from "react";
import "./AvisoCard.css";

export default function AvisoCard({ avisoSchema }) {
  return (
    <div className={`aviso-card ${avisoSchema.color}`}>
      <h3>{avisoSchema.name}</h3>
      <p><strong>Data:</strong> {avisoSchema.eventDate}</p>
      <p><strong>Descrição:</strong> {avisoSchema.description}</p>
      <p><strong>Origem:</strong> {avisoSchema.origin}</p>
    </div>
  );
}