import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuscaProfessor.module.css";
import ProfessorInfo from "../../../components/ProfessorInfo/ProfessorInfo";
import BuscaEstudanteInput from "../../../components/SearchStudent/SearchBar";
import SideBarAdmin from "../../../components/Admin/SideBarAdmin";
import Carregamento from "../../../components/Carregamento/Carregamento";
import { createTeacherService } from "../../../api/service/TeacherService";

export default function BuscaProfessor() {

  const navigate = useNavigate();

  const teacherService = useMemo(() => createTeacherService(), []);

  const [professores, setProfessores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [textoBusca, setTextoBusca] = useState("");

  useEffect(() => {
    const loadTeachers = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        const teachers = await teacherService.getAllTeachers();
        setProfessores(teachers);
      } catch (error) {
        console.error("Erro ao carregar professores:", error);
        setLoadError("Nao foi possivel carregar os professores.");
      } finally {
        setIsLoading(false);
      }
    };

    loadTeachers();
  }, [teacherService]);

  function removerProfessor(id) {
    setProfessores((currentTeachers) =>
      currentTeachers.filter((professor) => professor.teacherId !== id)
    );
  }

  const professoresFiltrados = professores.filter((professor) =>
    (professor.fullName || "").toLowerCase().includes(textoBusca.toLowerCase())
  );

  function irParaAdicionarProfessor() {
    navigate("/admin/criarProfessor");
  }

  return (
    <div className={styles.container}>
      <SideBarAdmin />

      <h2 className={styles.titulo}>Professores</h2>

      <div className={styles.topBar}>
        
        <BuscaEstudanteInput onSearch={setTextoBusca} />

        <button
          onClick={irParaAdicionarProfessor}
          className={styles.adicionarBtn}
        >
          Adicionar
        </button>

      </div>

      {isLoading && <Carregamento />}
      {!isLoading && loadError && <p>{loadError}</p>}

      {!isLoading && !loadError && professoresFiltrados.map((professor) => (
        <ProfessorInfo
          teacher={professor}
          onDelete={() => removerProfessor(professor.teacherId)}
        />
      ))}

    </div>
  );
}