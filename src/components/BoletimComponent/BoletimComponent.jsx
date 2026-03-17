import React from "react";
import styles from "./BoletimComponent.module.css";

const BoletimAluno = ({ dados, editable = false, onChange }) => {
  const handleChange = (index, campo, valor) => {
  let numero = valor === "" ? "" : Number(valor);

  if (numero !== "") {
    if (numero > 10) numero = 10;
    if (numero < 0) numero = 0;
  }

  const novoBoletim = [...dados];
  novoBoletim[index][campo] = numero;

  if (onChange) onChange(novoBoletim);
};

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
          {dados.length > 0 ? (
            dados.map((item, index) => (
              <tr key={index}>
                <td>{item.disciplina}</td>
                <td>
                  {editable ? (
                    <input
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      value={item.bimestre1}
                      onKeyDown={(e) => {
                        if (e.key === "-") e.preventDefault();
                      }}
                      onChange={(e) =>
                        handleChange(index, "bimestre1", e.target.value)
                      }
                    />
                  ) : (
                    item.bimestre1
                  )}
                </td>
                <td>
                  {editable ? (
                    <input
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      value={item.bimestre2}
                      onKeyDown={(e) => {
                        if (e.key === "-") e.preventDefault();
                      }}
                      onChange={(e) =>
                        handleChange(index, "bimestre2", e.target.value)
                      }
                    />
                  ) : (
                    item.bimestre2
                  )}
                </td>
                <td>
                  {editable ? (
                    <input
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      value={item.bimestre3}
                      onKeyDown={(e) => {
                        if (e.key === "-") e.preventDefault();
                      }}
                      onChange={(e) =>
                        handleChange(index, "bimestre3", e.target.value)
                      }
                    />
                  ) : (
                    item.bimestre3
                  )}
                </td>
                <td>
                  {editable ? (
                    <input
                      type="number"
                      min={0}
                      max={10}
                      step={0.1}
                      value={item.bimestre4}
                      onKeyDown={(e) => {
                        if (e.key === "-") e.preventDefault();
                      }}
                      onChange={(e) =>
                        handleChange(index, "bimestre4", e.target.value)
                      }
                    />
                  ) : (
                    item.bimestre4
                  )}
                </td>
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
