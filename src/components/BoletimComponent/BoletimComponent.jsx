import React from "react";
import styles from "./BoletimComponent.module.css";

const BoletimAluno = ({
  dados,
  editable = false,
  onChange,
  bimestreAtual,
}) => {
  const handleChange = (index, campo, valor) => {
    const numero = valor === "" ? "" : Number(valor);

    // pega o número do bimestre (1, 2, 3 ou 4)
    const bimestre = Number(campo.replace("bimestre", ""));

    // 🚨 BLOQUEIA APENAS FUTUROS
    if (bimestre > bimestreAtual) {
      alert("Você não pode editar bimestres futuros");

      const novoBoletim = [...dados];
      novoBoletim[index][campo] = ""; // limpa o campo

      if (onChange) onChange(novoBoletim);
      return;
    }

    let notaTratada = numero;

    if (notaTratada !== "") {
      if (notaTratada > 10) notaTratada = 10;
      if (notaTratada < 0) notaTratada = 0;
    }

    const novoBoletim = [...dados];
    novoBoletim[index][campo] = notaTratada;

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

                {/* 1º BIM */}
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

                {/* 2º BIM */}
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

                {/* 3º BIM */}
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

                {/* 4º BIM */}
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