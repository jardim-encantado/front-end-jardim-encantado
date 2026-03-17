import React, { Suspense, lazy } from "react"; 
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Carregamento from "./components/Carregamento/Carregamento";
import { usePerson } from "./hooks/personHook"; 

const HeaderRight = lazy(() => import("./components/HeaderRight"));

// Login
const Login = lazy(() => import("./pages/Login/Login"));

// Responsável
const HomeResponsavel = lazy(
  () => import("./pages/Responsavel/HomeResponsavel/HomeResponsavel"),
);
const PerfilResponsavel = lazy(
  () => import("./pages/Responsavel/PerfilResponsavel/PerfilResponsavelPag"),
);
const BoletimResponsavel = lazy(
  () => import("./pages/Responsavel/Boletim/Boletim"),
);
const VisualizarProfResponsavel = lazy(
  () => import("./pages/Responsavel/VisualizarProfessor/Professor"),
);

// Professor
const HomeProfessor = lazy(
  () => import("./pages/Professor/HomeProfessor/HomeProfessor"),
);
const ProfessorVisualizaEstudante = lazy(
  () => import("./pages/Professor/VisualizarEstudantes/Estudante"),
);
const PaginaAvisos = lazy(
  () => import("./pages/Professor/AdicionarAviso/AddAviso"),
);
const PaginaPerfil = lazy(
  () => import("./pages/Professor/Perfil/PerfilProfessor"),
);

// Admin
const CriarEstudante = lazy(
  () => import("./pages/Admin/AdicionarAluno/AdicionarAluno"),
);
const AdicionarProfessor = lazy(
  () => import("./pages/Admin/AdicionarProfessor/AdicionarProfessor"),
);
const VisualizarEstudante = lazy(
  () => import("./pages/Admin/VisualizarEstudante/BuscaEstudante"),
);
const CronogramaEscolar = lazy(
  () => import("./pages/Admin/CronogramaEscolar/CronogramaEscolar"),
);
const VisualizarProfessor = lazy(
  () => import("./pages/Admin/VisualizarProfessor/BuscaProfessor"),
);

// Etc
const ErrorPage = lazy(() => import("./pages/Error/ErrorPage"));

function App() {
  const { person } = usePerson(); // hook global de usuário

  return (
    <BrowserRouter>
      {/* Header global — aparece apenas se o usuário estiver logado */}
      {person && (
        <Suspense fallback={<Carregamento />}>
          <HeaderRight />
        </Suspense>
      )}

      {/* Rotas */}
      <Suspense fallback={<Carregamento />}>
        <Routes>
          {/* Login */}
          <Route path="/" element={<Login />} />

          {/* Responsável */}
          <Route path="/responsavel/home" element={<HomeResponsavel />} />
          <Route path="/responsavel/perfil" element={<PerfilResponsavel />} />
          <Route path="/responsavel/boletim" element={<BoletimResponsavel />} />
          <Route path="/responsavel/visualizarProfessor" element={<VisualizarProfResponsavel />}
          />

          {/* Professor */}
          <Route path="/professor/home" element={<HomeProfessor />} />
          <Route
            path="/professor/visualizarEstudante"
            element={<ProfessorVisualizaEstudante />}
          />
          <Route path="/professor/adicionarAviso" element={<PaginaAvisos />} />
          <Route path="/pages/Professor/visualizarPerfil" element={<PaginaAvisos />} />

          {/* Admin */}
          <Route path="/admin/criarEstudante" element={<CriarEstudante />} />
          <Route
            path="/admin/criarProfessor"
            element={<AdicionarProfessor />}
          />
          <Route
            path="/admin/visualizarEstudante"
            element={<VisualizarEstudante />}
          />
          <Route
            path="/admin/cronogramaEscolar"
            element={<CronogramaEscolar />}
          />
          <Route
            path="/admin/visualizarProfessor"
            element={<VisualizarProfessor />}
          />
          <Route path="/admin/adicionarAviso" element={<PaginaAvisos />} />

          {/* Rota para página de erro */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
