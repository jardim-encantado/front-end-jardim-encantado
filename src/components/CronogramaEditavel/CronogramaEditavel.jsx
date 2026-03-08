import React, { useState } from "react";
import styles from "./CronogramaEditavel.module.css";

const CronogramaEditavel = () => {
  const [professor, setProfessor] = useState("");
  const [turma, setTurma] = useState("");

  const [dados, setDados] = useState([
    { segunda: "Matemática", terca: "Português", quarta: "História", quinta: "Geografia", sexta: "Ciência" }
  ]);

  const handleChange = (rowIndex, dia, value) => {
    const novosDados = [...dados];
    novosDados[rowIndex][dia] = value;
    setDados(novosDados);
  };

  const adicionarLinha = () => {
    setDados([
      ...dados,
      { segunda: "", terca: "", quarta: "", quinta: "", sexta: "" }
    ]);
  };

  return (
    <div className={styles.cronogramaEditavel}>
      <div className={styles.topoCronograma}>
        <label>
          Professor:
          <input 
            type="text"
            value={professor}
            onChange={(e) => setProfessor(e.target.value)}
            placeholder="Nome do professor"
          />
        </label>
        <label>
          Turma:
          <input 
            type="text"
            value={turma}
            onChange={(e) => setTurma(e.target.value)}
            placeholder="Turma"
          />
        </label>
      </div>

      <table className={styles.tabelaRosa}>
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
          {dados.map((item, rowIndex) => (
            <tr key={rowIndex}>
              {["segunda", "terca", "quarta", "quinta", "sexta"].map((dia) => (
                <td key={dia}>
                  <input
                    type="text"
                    value={item[dia]}
                    onChange={(e) => handleChange(rowIndex, dia, e.target.value)}
                    className={styles.inputMateria}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      <button className={styles.btnAdicionar} onClick={adicionarLinha}>
        Adicionar Linha
      </button>
    </div>
  );
};

export default CronogramaEditavel;