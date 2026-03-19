import React, { useMemo, useState } from "react";
import styles from "./AddProfessor.module.css";
import SidebarAdmin from "../SideBarAdmin/";
import DropdownMaterias from "./Dropdown/DropdownMaterias";
import iconMais from "../../../assets/images/addOcorrencia.png";
import iconMenos from "../../../assets/images/iconRemover.png";

export default function AddProfessor({
  dados,
  setDados,
  titulo,
  subjectsOptions = [],
  onSubjectsChange,
}) {
  const [materias, setMaterias] = useState([{ subjectId: null }]);

  // Funções de formatação mantidas
  const formatCPF = (v) =>
    v
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  const formatTelefone = (v) =>
    v
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
  const formatCEP = (v) =>
    v.replace(/\D/g, "").replace(/(\d{5})(\d{3})$/, "$1-$2");

  const normalizedOptions = useMemo(
    () => (Array.isArray(subjectsOptions) ? subjectsOptions : []),
    [subjectsOptions],
  );

  const emitSubjectsChange = (nextMaterias) => {
    if (!onSubjectsChange) return;
    const ids = nextMaterias
      .map((m) => Number(m.subjectId))
      .filter((id) => !isNaN(id) && id !== 0);
    onSubjectsChange([...new Set(ids)]);
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let newValue = value;

    if (name === "cpf") newValue = formatCPF(value);
    if (name === "telefone") newValue = formatTelefone(value);
    if (name === "cep") newValue = formatCEP(value);

    if (type === "file") {
      setDados({ ...dados, [name]: files[0] });
    } else {
      setDados({ ...dados, [name]: newValue });
    }
  };

  const handleMateriaChange = (index, option) => {
    const nextMaterias = [...materias];
    nextMaterias[index] = {
      subjectId: option ? Number(option.value) : null,
    };
    setMaterias(nextMaterias);
    emitSubjectsChange(nextMaterias);
  };

  const adicionarMateria = () =>
    setMaterias([...materias, { subjectId: null }]);

  const removerMateria = (index) => {
    if (materias.length === 1) {
      setMaterias([{ subjectId: null }]);
      return;
    }
    const novas = materias.filter((_, i) => i !== index);
    setMaterias(novas);
    emitSubjectsChange(novas);
  };

  return (
    <div className={styles.formWrapper}>
      <SidebarAdmin />

      <div className={styles.container}>
        <div className={styles.header}>{titulo}</div>

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
                maxLength={15}
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
                maxLength={14}
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
              <label>Rua:</label>
              <input
                type="text"
                name="rua"
                value={dados.rua || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Número:</label>
              <input
                type="text"
                name="numero"
                value={dados.numero || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>CEP:</label>
              <input
                type="text"
                name="cep"
                value={dados.cep || ""}
                onChange={handleChange}
                maxLength={9}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>Cidade:</label>
              <input
                type="text"
                name="cidade"
                value={dados.cidade || ""}
                onChange={handleChange}
              />
            </div>
            <div>
              <label>Estado:</label>
              <input
                type="text"
                name="estado"
                value={dados.estado || ""}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.row}>
            <div>
              <label>Foto de Perfil:</label>
              <input
                type="file"
                name="foto"
                accept="image/*"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={styles.container}>
        <div className={styles.header}>Matérias Lecionadas</div>
        <div className={styles.subject}>
          {materias.map((item, index) => (
            <div key={index} className={styles.dropdownRow}>
              <DropdownMaterias
                options={normalizedOptions}
                value={
                  normalizedOptions.find(
                    (opt) => Number(opt.value) === Number(item.subjectId),
                  ) || null
                }
                onChange={(opt) => handleMateriaChange(index, opt)}
              />
              <img
                src={iconMais}
                alt="Add"
                className={styles.icon}
                onClick={adicionarMateria}
              />
              <img
                src={iconMenos}
                alt="Del"
                className={styles.icon}
                onClick={() => removerMateria(index)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
