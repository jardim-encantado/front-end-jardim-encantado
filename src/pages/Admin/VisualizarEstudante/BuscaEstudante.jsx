import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./BuscaEstudante.module.css";

import CardEstudante from "../../../components/EstudanteInfo/EstudanteInfo";
import SearchBar from "../../../components/SearchStudent/SearchBar";
import SideBarAdmin from "../../../components/Admin/SideBarAdmin";
import Carregamento from "../../../components/Carregamento/Carregamento";

// Importamos o GuardianService porque ele contém a árvore completa: Guardian -> Students
import { createGuardianService } from "../../../api/service/GuardianService";

export default function BuscaEstudante() {
  const navigate = useNavigate();

  // Inicializa o serviço de responsáveis
  const guardianService = useMemo(() => createGuardianService(), []);

  const [estudantes, setEstudantes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [textoBusca, setTextoBusca] = useState("");

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      setLoadError("");

      try {
        // 1. Buscamos os responsáveis (que trazem a lista de estudantes dentro)
        const guardians = await guardianService.getAllGuardians();
        
        const listaMapeada = [];

        // 2. "Achatamos" a estrutura: tiramos os alunos de dentro dos pais
        guardians.forEach((guardian) => {
          if (guardian.students && guardian.students.length > 0) {
            guardian.students.forEach((aluno) => {
              listaMapeada.push({
                ...aluno, // Contém studentId, fullName, photoUrl do aluno, etc.
                
                // Injetamos o objeto 'guardian' com TODOS os campos que o Card usa
                guardian: {
                  fullName: `${guardian.firstName} ${guardian.lastName}`,
                  email: guardian.email,
                  cpf: guardian.cpf,
                  phoneNumber: guardian.phoneNumber,
                  photoUrl: guardian.photoUrl, // Foto do responsável
                },

                // Injetamos o endereço (que vem do objeto guardian)
                address: guardian.address 
              });
            });
          }
        });

        // 3. Remove duplicados (evita que o mesmo aluno apareça 2x se tiver pai e mãe no sistema)
        const estudantesUnicos = Array.from(
          new Map(listaMapeada.map((item) => [item.studentId, item])).values()
        );

        setEstudantes(estudantesUnicos);
      } catch (error) {
        console.error("Erro ao processar dados dos estudantes:", error);
        setLoadError("Não foi possível carregar a lista completa de estudantes.");
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [guardianService]);

  // Função para remover da lista local após deletar no banco (opcional implementar o delete no service)
  function removerEstudante(id) {
    setEstudantes((currentStudents) =>
      currentStudents.filter((estudante) => estudante.studentId !== id)
    );
  }

  // Lógica de filtro da SearchBar
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
      
      {!isLoading && loadError && (
        <div className={styles.errorContainer}>
          <p className={styles.errorMessage}>{loadError}</p>
        </div>
      )}

      {!isLoading && !loadError && (
        <div className={styles.listaEstudantes}>
          {estudantesFiltrados.length > 0 ? (
            estudantesFiltrados.map((estudante) => (
              <CardEstudante
                key={estudante.studentId}
                estudante={estudante}
                onDelete={() => removerEstudante(estudante.studentId)}
              />
            ))
          ) : (
            <p className={styles.noResults}>Nenhum estudante encontrado.</p>
          )}
        </div>
      )}
    </div>
  );
}