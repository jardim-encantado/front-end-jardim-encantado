import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdicionarAluno.module.css";
import AddEstudante from "../../../components/Admin/AdicionarEstudante/AddEstudante";
import CriarResponsavel from "../../../components/Admin/AdicionarEstudante/AddResponsavel";
import Carregamento from "../../../components/Carregamento/Carregamento";
import { createStudentService } from "../../../api/service/StudentService";

export default function TelaAdicionarEstudante() {
  const navigate = useNavigate();
  const [estudante, setEstudante] = useState({});
  const [responsavel, setResponsavel] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const studentService = createStudentService();

  const validarFormularios = () => {
    // Lista de campos que NÃO podem estar vazios (exceto complemento e foto)
    const camposObrigatorios = [
      "nome",
      "sobrenome",
      "email",
      "telefone",
      "cpf",
      "senha",
      "rua",
      "numero",
      "cep",
      "cidade",
      "estado",
    ];

    for (let campo of camposObrigatorios) {
      if (!estudante[campo])
        return {
          valido: false,
          msg: `Preencha o campo ${campo} do Estudante.`,
        };
      if (!responsavel[campo])
        return {
          valido: false,
          msg: `Preencha o campo ${campo} do Responsável.`,
        };
    }
    return { valido: true };
  };

  const handleSalvar = async () => {
    const check = validarFormularios();
    if (!check.valido) {
      alert(check.msg);
      return;
    }

    setIsSaving(true);

    try {
      // 1. Montagem do payload do Estudante (Já estava correto)
      const payloadEstudante = {
        firstName: estudante.nome,
        lastName: estudante.sobrenome,
        email: estudante.email,
        password: estudante.senha,
        cpf: estudante.cpf?.replace(/\D/g, ""),
        phoneNumber: estudante.telefone,
        roleId: 1,
        address: {
          street: estudante.rua,
          streetNumber: estudante.numero,
          cep: estudante.cep?.replace(/\D/g, ""),
          city: estudante.cidade,
          state: estudante.estado,
          complement: estudante.complemento || "",
        },
      };

      // 2. Montagem do payload do Responsável (AQUI ESTAVA O ERRO)
      // Precisamos envelopar os campos de rua, numero, etc, dentro de 'address'
      const payloadResponsavel = {
        firstName: responsavel.nome,
        lastName: responsavel.sobrenome,
        email: responsavel.email,
        password: responsavel.senha,
        cpf: responsavel.cpf?.replace(/\D/g, ""),
        phoneNumber: responsavel.telefone,
        roleId: 3, // Role de Responsável/Guardian
        address: {
          street: responsavel.rua,
          streetNumber: responsavel.numero,
          cep: responsavel.cep?.replace(/\D/g, ""),
          city: responsavel.cidade,
          state: responsavel.estado,
          complement: responsavel.complemento || "",
        },
      };

      console.log("Enviando Responsável:", payloadResponsavel);

      // Chama o service passando os dois objetos estruturados
      await studentService.createStudent(payloadEstudante, payloadResponsavel);

      alert("Matrícula realizada com sucesso!");
      navigate("/admin/visualizarEstudante");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      alert(
        error?.response?.data?.message || "Erro ao salvar. Verifique os dados.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className={styles.container}>
      {isSaving && <Carregamento />}

      <h2>Adicionar novo estudante</h2>

      <AddEstudante
        titulo="Detalhes do Estudante"
        dados={estudante}
        setDados={setEstudante}
      />

      <CriarResponsavel
        titulo="Detalhes do Responsável"
        dados={responsavel}
        setDados={setResponsavel}
      />

      <div className={styles.botoesContainer}>
        <button
          className={styles.salvarBtn}
          onClick={handleSalvar}
          disabled={isSaving}
        >
          {isSaving ? "Processando..." : "Salvar Matrícula Completa"}
        </button>

        <button className={styles.voltarBtn} onClick={() => navigate(-1)}>
          Cancelar
        </button>
      </div>
    </div>
  );
}
