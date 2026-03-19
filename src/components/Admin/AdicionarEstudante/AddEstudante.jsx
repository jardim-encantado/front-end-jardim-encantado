import React, { useState } from "react";
import styles from "./AddEstudante.module.css";
import SidebarAdmin from "../SideBarAdmin/";
import { createStudentService } from "../../../api/service/StudentService";

const maskCpf = (value) => {
  value = value.replace(/\D/g, "");
  value = value.slice(0, 11);
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  return value;
};

const maskPhone = (value) => {
  value = value.replace(/\D/g, "");
  value = value.slice(0, 11);
  value = value.replace(/(\d{2})(\d)/, "($1) $2");
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

const maskCep = (value) => {
  value = value.replace(/\D/g, "");
  value = value.slice(0, 8);
  value = value.replace(/(\d{5})(\d)/, "$1-$2");
  return value;
};

export default function AddEstudante({ dados, setDados, titulo, onSaved }) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const studentService = createStudentService();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file") {
      setDados({ ...dados, [name]: files[0] });
      return;
    }

    let newValue = value;

    if (name === "cpf") newValue = maskCpf(value);
    if (name === "telefone") newValue = maskPhone(value);
    if (name === "cep") newValue = maskCep(value);

    setDados({ ...dados, [name]: newValue });
  };

  const handleSave = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const address = {
        street: dados.rua,
        streetNumber: dados.numero,
        cep: dados.cep?.replace(/\D/g, ""),
        city: dados.cidade,
        state: dados.estado,
        complement: dados.complemento,
      };


      const payload = {
        firstName: dados.nome,
        lastName: dados.sobrenome,
        email: dados.email,
        password: dados.senha,
        cpf: dados.cpf?.replace(/\D/g, ""),
        phoneNumber: dados.telefone,
        roleId: dados.roleId || 1,
        address,
      };

      console.log("PAYLOAD FINAL:", payload);

      await studentService.createStudent(payload, null);

      if (onSaved) onSaved();
      alert("Estudante salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar estudante:", err);
      setErrorMsg(
        err?.response?.data?.message ||
          "Não foi possível salvar o estudante. Tente novamente.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>{titulo}</div>

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
            <input type="file" name="foto" onChange={handleChange} />
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

          <div>
            <label>Complemento:</label>
            <input
              type="text"
              name="complemento"
              value={dados.complemento || ""}
              onChange={handleChange}
            />
          </div>
        </div>
        {errorMsg && <p className={styles.errorMessage}>{errorMsg}</p>}

        <div className={styles.row}>
          <button
            className={styles.saveButton}
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </div>
    </div>
  );
}
