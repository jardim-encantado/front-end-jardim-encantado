import styles from "./AddEstudante.module.css";
import { useState } from "react";
import { createGuardianService } from "../../../api/service/GuardianService";

export default function AddResponsavel({ dados, setDados, titulo }) {
  const [loading, setLoading] = useState(false);

  const formatCPF = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  const formatTelefone = (value) => {
    return value
      .replace(/\D/g, "")
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
  };

  const formatCEP = (value) => {
    return value.replace(/\D/g, "").replace(/(\d{5})(\d{3})$/, "$1-$2");
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

  const handleSalvar = async () => {
    try {
      setLoading(true);

      const payload = {
        ...dados,
        cpf: dados.cpf?.replace(/\D/g, ""),       
        telefone: dados.telefone?.replace(/\D/g, ""), 
        cep: dados.cep?.replace(/\D/g, ""),       
      };

      await createGuardianService().createGuardian(payload);

      alert("Responsável cadastrado com sucesso!");
    } catch (error) {
      console.error("Erro ao cadastrar responsável:", error.response?.data || error.message);
      alert("Erro ao cadastrar responsável. Confira os dados e tente novamente.");
    } finally {
      setLoading(false);
    }
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
            <input type="text" name="telefone" value={dados.telefone || ""} onChange={handleChange} maxLength={15} />
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <label>CPF:</label>
            <input type="text" name="cpf" value={dados.cpf || ""} onChange={handleChange} maxLength={14} />
          </div>
          <div>
            <label>Senha:</label>
            <input type="password" name="senha" value={dados.senha || ""} onChange={handleChange} />
          </div>
        </div>

        <div className={styles.row}>
          <div>
            <label>Rua:</label>
            <input type="text" name="rua" value={dados.rua || ""} onChange={handleChange} />
          </div>
          <div>
            <label>Numero:</label>
            <input type="text" name="numero" value={dados.numero || ""} onChange={handleChange} />
          </div>
          <div>
            <label>CEP:</label>
            <input type="text" name="cep" value={dados.cep || ""} onChange={handleChange} maxLength={9} />
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

        <div style={{ marginTop: "20px" }}>
          <button onClick={handleSalvar} disabled={loading}>
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}