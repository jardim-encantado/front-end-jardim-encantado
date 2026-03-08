import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuscaProfessor.module.css";
import ProfessorInfo from "../../../components/ProfessorInfo/ProfessorInfo";
import BuscaEstudanteInput from "../../../components/SearchStudent/SearchBar";
import SideBarAdmin from "../../../components/Admin/SideBarAdmin";

export default function BuscaProfessor() {

  const navigate = useNavigate();

  const [estudantes, setEstudantes] = useState([
    { id: 1, nome: "Maria" },
    { id: 2, nome: "João" },
    { id: 2, nome: "cavalo" }
  ]);

  const [textoBusca, setTextoBusca] = useState("");

  function removerEstudante(id) {
    setEstudantes(estudantes.filter((estudante) => estudante.id !== id));
  }

  const estudantesFiltrados = estudantes.filter((estudante) =>
    estudante.nome.toLowerCase().includes(textoBusca.toLowerCase())
  );

  function irParaAdicionarEstudante() {
    navigate("/admin/criarProfessor");
  }

  return (
    <div className={styles.container}>
      <SideBarAdmin />

      <h2 className={styles.titulo}>Professores</h2>

      <div className={styles.topBar}>
        
        <BuscaEstudanteInput onSearch={setTextoBusca} />

        <button
          onClick={irParaAdicionarEstudante}
          className={styles.adicionarBtn}
        >
          Adicionar
        </button>

      </div>

      {estudantesFiltrados.map((estudante) => (
        <ProfessorInfo
          key={estudante.id}
          estudante={estudante}
          onDelete={() => removerEstudante(estudante.id)}
        />
      ))}

    </div>
  );
}