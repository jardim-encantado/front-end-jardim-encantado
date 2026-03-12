import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuscaEstudante.module.css";

import CardEstudante from "../../../components/EstudanteInfo/EstudanteInfo";
import SearchBar from "../../../components/SearchStudent/SearchBar";
import SideBarAdmin from "../../../components/Admin/SideBarAdmin";
import Carregamento from "../../../components/Carregamento/Carregamento";
import { createStudentService } from "../../../api/service/StudentService";

export default function BuscaEstudante() {

  const navigate = useNavigate();

  const studentService = useMemo(() => createStudentService(), []);

  const [estudantes, setEstudantes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [textoBusca, setTextoBusca] = useState("");

  useEffect(() => {
    const loadStudents = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const students = await studentService.getAllStudents();
        setEstudantes(students);
      } catch (error) {
        console.error("Erro ao carregar estudantes:", error);
        setLoadError("Nao foi possivel carregar os estudantes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadStudents();
  }, [studentService]);

  function removerEstudante(id) {
    setEstudantes((currentStudents) =>
      currentStudents.filter((estudante) => estudante.studentId !== id)
    );
  }

  const estudantesFiltrados = estudantes.filter((estudante) =>
    (estudante.fullName || "").toLowerCase().includes(textoBusca.toLowerCase())
  );

  function irParaAdicionarEstudante() {
    navigate("/admin/criarEstudante");
  }

  return (
    <div className={styles.container}>
      <SideBarAdmin />

      <h2 className={styles.titulo}>Estudantes</h2>

      <div className={styles.topBar}>
        
        <SearchBar onSearch={setTextoBusca} placeholder={"Buscar estudante..."} />

        <button
          onClick={irParaAdicionarEstudante}
          className={styles.adicionarBtn}
        >
          Adicionar
        </button>

      </div>

      {isLoading && <Carregamento />}
      {!isLoading && loadError && <p>{loadError}</p>}

      {!isLoading && !loadError && estudantesFiltrados.map((estudante) => (
        <CardEstudante
          key={estudante.studentId}
          estudante={estudante}
          onDelete={() => removerEstudante(estudante.studentId)}
        />
      ))}

    </div>
  );
}