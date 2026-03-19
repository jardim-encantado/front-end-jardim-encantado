import React from "react";
import styles from "./AddEstudante.module.css";

export default function CriarResponsavel({ dados, setDados, titulo }) {
  const formatCPF = (value) => {
    return value.replace(/\D/g, "").slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatTelefone = (value) => {
    return value.replace(/\D/g, "").slice(0, 11)
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const formatCEP = (value) => {
    return value.replace(/\D/g, "").slice(0, 8)
      .replace(/(\d{5})(\d)/, "$1-$2");
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    let newValue = value;

    if (name === "cpf") newValue = formatCPF(value);
    if (name === "telefone") newValue = formatTelefone(value);
    if (name === "cep") newValue = formatCEP(value);

    if (type === "file") {
      setDados({ ...dados, [name]: files[0] });
      return;
    }
    setDados({ ...dados, [name]: newValue });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>{titulo}</div>
      <div className={styles.form}>
        <div className={styles.row}>
          <div>
            <label>Nome:</label>
            <input type="text" name="nome" value={dados.nome || ""} onChange={handleChange} />
          </div>
          <div>
            <label>Sobrenome:</label>
            <input type="text" name="sobrenome" value={dados.sobrenome || ""} onChange={handleChange} />
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <label>Email:</label>
            <input type="email" name="email" value={dados.email || ""} onChange={handleChange} />
          </div>
          <div>
            <label>Telefone:</label>
            <input type="text" name="telefone" value={dados.telefone || ""} onChange={handleChange} />
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <label>CPF:</label>
            <input type="text" name="cpf" value={dados.cpf || ""} onChange={handleChange} />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" name="senha" value={dados.senha || ""} onChange={handleChange} />
          </div>
        </div>
        
        {/* Endereço Completo do Responsável */}
        <div className={styles.row}>
          <div>
            <label>Rua:</label>
            <input type="text" name="rua" value={dados.rua || ""} onChange={handleChange} />
          </div>
          <div>
            <label>Número:</label>
            <input type="text" name="numero" value={dados.numero || ""} onChange={handleChange} />
          </div>
          <div>
            <label>CEP:</label>
            <input type="text" name="cep" value={dados.cep || ""} onChange={handleChange} />
          </div>
        </div>
        <div className={styles.row}>
          <div>
            <label>Cidade:</label>
            <input type="text" name="cidade" value={dados.cidade || ""} onChange={handleChange} />
          </div>
          <div>
            <label>Estado:</label>
            <input type="text" name="estado" value={dados.estado || ""} onChange={handleChange} />
          </div>
          <div>
            <label>Complemento:</label>
            <input type="text" name="complemento" value={dados.complemento || ""} onChange={handleChange} />
          </div>
        </div>
      </div>
    </div>
  );
}