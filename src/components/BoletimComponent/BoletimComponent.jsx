import React from "react";
import styles from "./BoletimComponent.module.css";

const defaultDados = [
    { disciplina: "Matemática", bimestre1: 10, bimestre2: 9, bimestre3: 8, bimestre4: 9 },
    { disciplina: "Português", bimestre1: 9, bimestre2: 8, bimestre3: 7, bimestre4: 8 },
    { disciplina: "História", bimestre1: 8, bimestre2: 7, bimestre3: 9, bimestre4: 8 },
    { disciplina: "Geografia", bimestre1: 7, bimestre2: 8, bimestre3: 9, bimestre4: 7 },
    { disciplina: "Ciência", bimestre1: 9, bimestre2: 9, bimestre3: 8, bimestre4: 9 }
  ];

const BoletimAluno = ({ dados = defaultDados }) => {
  const linhas = Array.isArray(dados) ? dados : defaultDados;

  return (
    <div className={styles.containerTabela}>
      <table className={styles.boletimAluno}>
        <thead>
          <tr>
            <th>Disciplinas</th>
            <th>1º Bim</th>
            <th>2º Bim</th>
            <th>3º Bim</th>
            <th>4º Bim</th>
          </tr>
        </thead>
        <tbody>
          {linhas.length > 0 ? (
            linhas.map((item, index) => (
              <tr key={index}>
                <td>{item.disciplina}</td>
                <td>{item.bimestre1}</td>
                <td>{item.bimestre2}</td>
                <td>{item.bimestre3}</td>
                <td>{item.bimestre4}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Sem notas cadastradas.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BoletimAluno;