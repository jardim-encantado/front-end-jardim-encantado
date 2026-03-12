// src/App.jsx
import React, { Suspense, lazy } from "react"; // React + Suspense + lazy
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Router
import Carregamento from "./components/Carregamento/Carregamento"; // Componente de loading
import { usePerson } from "./hooks/personHook"; // Hook do usuário logado

// Lazy imports para componentes/páginas
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
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
