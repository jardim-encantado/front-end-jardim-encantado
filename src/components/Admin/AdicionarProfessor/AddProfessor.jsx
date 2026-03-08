import React, { useState } from "react";
import styles from "./AddProfessor.module.css";
import SidebarAdmin from "../SideBarAdmin/";
import DropdownMaterias from "./Dropdown/DropdownMaterias";
import iconMais from "../../../assets/images/addOcorrencia.png";
import iconMenos from "../../../assets/images/iconRemover.png";

export default function AddEstudante({ dados, setDados, titulo }) {

  const [materias, setMaterias] = useState([{ materia: "" }]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setDados({ ...dados, [name]: files[0] });
    } else {
      setDados({ ...dados, [name]: value });
    }
  };

  const adicionarMateria = () => {
    setMaterias([...materias, { materia: "" }]);
  };

  const removerMateria = (index) => {
    if (index === 0) return;
    const novasMaterias = materias.filter((option, i) => i !== index );

    setMaterias(novasMaterias);
  };

  return (
    <div>

      <div className={styles.container}>

        <div className={styles.header}>
          {titulo}
        </div>

        <SidebarAdmin />

        <div className={styles.form}>

          <div className={styles.row}>
            <div>
              <label>Nome:</label>
              <input
                type="text"
                name="nome"
                value={dados.nome || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Sobrenome:</label>
              <input
                type="text"
                name="sobrenome"
                value={dados.sobrenome || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={dados.email || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Telefone:</label>
              <input
                type="text"
                name="telefone"
                value={dados.telefone || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>CPF:</label>
              <input
                type="text"
                name="cpf"
                value={dados.cpf || ""}
                onChange={handleChange}
              />
            </div>

            <div>
              <label>Senha:</label>
              <input
                type="password"
                name="senha"
                value={dados.senha || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>Foto:</label>
              <input
                type="file"
                name="foto"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>


      <div className={styles.container}>

        <div className={styles.header}>
          Matérias
        </div>

      <div className={styles.subject}>
      <label>Matérias:</label>

      {materias.map((item, index) => (
      <div key={index} className={styles.dropdownRow}>
      <DropdownMaterias />

      {index === materias.length - 1 && (
        <img
          src={iconMais}
          alt="Adicionar Matéria"
          className={styles.iconMais}
          onClick={adicionarMateria}
        />
          )}
        <img
          src={iconMenos}
          alt="Remover Matéria"
          className={styles.iconMais}
          onClick={() => removerMateria(index)}
        />
       </div>
       ))}

      </div>

      </div>
    </div>
  );
}