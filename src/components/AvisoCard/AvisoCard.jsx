import React from "react";
import "./AvisoCard.css";

export default function AvisoCard({ avisoSchema }) {
  return (
    <div className={`aviso-card ${avisoSchema.color}`}>
      <h3>{avisoSchema.name}</h3>
      <p><strong>Data:</strong> {new Date(avisoSchema.eventDate).toLocaleDateString('pt-BR')}</p>
      <p><strong>Descrição:</strong> {avisoSchema.description}</p>

      {
        avisoSchema.origin ? (
          <p><strong>Origem:</strong> {avisoSchema.origin}</p>
        ) : null
      }
    </div>
  );
}