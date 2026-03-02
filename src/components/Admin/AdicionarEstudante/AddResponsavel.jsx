import React from "react";
import styles from "./AddEstudante.module.css";

export default function AddResponsavel({ dados, setDados }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  };

  return (
    <div className={styles.form}>
      <div className={styles.row}>
        <div>
          <label>Nome</label>
          <input type="text" name="nome" value={dados.nome || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Sobrenome</label>
          <input type="text" name="sobrenome" value={dados.sobrenome || ""} onChange={handleChange} />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={dados.email || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Telefone</label>
          <input type="text" name="telefone" value={dados.telefone || ""} onChange={handleChange} />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <label>CPF</label>
          <input type="text" name="cpf" value={dados.cpf || ""} onChange={handleChange} />
        </div>
        <div>
          <label>Senha</label>
          <input type="password" name="senha" value={dados.senha || ""} onChange={handleChange} />
        </div>
      </div>

      <div className={styles.row}>
        <div>
          <label>Foto</label>
          <input type="file" name="foto" onChange={handleChange} />
        </div>
        <div>
          <label>Endereço</label>
          <input type="text" name="endereco" value={dados.endereco || ""} onChange={handleChange} />
        </div>
      </div>
    </div>
  );
}