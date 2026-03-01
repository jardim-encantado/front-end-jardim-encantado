import React from "react";
import "./AvisoCard.css";

function AvisoCard({ titulo, data, descricao, origem,cor = "rosa"}) {
  return (
    <div className={`aviso-card ${cor}`}>
      <h3>{titulo}</h3>
      <p><strong>Data:</strong> {data}</p>
      <p><strong>Descrição:</strong> {descricao}</p>
      <p><strong>Origem:</strong> {origem}</p>
    </div>
  );
}

export default AvisoCard;