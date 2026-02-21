import React from "react";
import "./Cronograma.css";

const TabelaRosa = () => {
  const dados = [
    { segunda: "Matemática", terca: "Português", quarta: "História", quinta: "Geografia", sexta: "Ciência" },
     { segunda: "Matemática", terca: "Português", quarta: "História", quinta: "Geografia", sexta: "Ciência" },
      { segunda: "Matemática", terca: "Português", quarta: "História", quinta: "Geografia", sexta: "Ciência" }
  ];

  return (
    <table className="tabela-rosa" >
      <thead>
        <tr>
          <th>Segunda-feira</th>
          <th>Terça-feira</th>
          <th>Quarta-feira</th>
          <th>Quinta-feira</th>
          <th>Sexta-feira</th>
        </tr>
      </thead>
      <tbody>
        {dados.map((item, index) => (
          <tr key={index}>
            <td>{item.segunda}</td>
            <td>{item.terca}</td>
            <td>{item.quarta}</td>
            <td>{item.quinta}</td>
            <td>{item.sexta}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TabelaRosa;