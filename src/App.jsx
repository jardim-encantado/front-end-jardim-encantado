import React, { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carregamento from "./components/Carregamento/Carregamento";
import { usePerson } from "./hooks/personHook";

// Header
const HeaderRight = lazy(() => import("./components/HeaderRight"));

// Login
const Login = lazy(() => import("./pages/Login/Login"));

// ================= RESPONSÁVEL =================
const HomeResponsavel = lazy(
  () => import("./pages/Responsavel/HomeResponsavel/HomeResponsavel")
);
const PerfilResponsavel = lazy(
  () => import("./pages/Responsavel/PerfilResponsavel/PerfilResponsavelPag")
);
const BoletimResponsavel = lazy(
  () => import("./pages/Responsavel/Boletim/Boletim")
);
const VisualizarProfResponsavel = lazy(
  () => import("./pages/Responsavel/VisualizarProfessor/Professor")
);

// ================= PROFESSOR =================
const HomeProfessor = lazy(
  () => import("./pages/Professor/HomeProfessor/HomeProfessor")
);
const ProfessorVisualizaEstudante = lazy(
  () => import("./pages/Professor/VisualizarEstudantes/Estudante")
);
const PaginaAvisos = lazy(
  () => import("./pages/Professor/AdicionarAviso/AddAviso")
);
const PerfilProfessor = lazy(
  () => import("./pages/Professor/Perfil/PerfilProfessor")
);

// ================= ADMIN =================
const CriarEstudante = lazy(
  () => import("./pages/Admin/AdicionarAluno/AdicionarAluno")
);
const AdicionarProfessor = lazy(
  () => import("./pages/Admin/AdicionarProfessor/AdicionarProfessor")
);
const VisualizarEstudante = lazy(
  () => import("./pages/Admin/VisualizarEstudante/BuscaEstudante")
);
const CronogramaEscolar = lazy(
  () => import("./pages/Admin/CronogramaEscolar/CronogramaEscolar")
);
const VisualizarProfessor = lazy(
  () => import("./pages/Admin/VisualizarProfessor/BuscaProfessor")
);

// ⚠️ CRIAR essa página se ainda não existir
const PerfilAdmin = lazy(
  () => import("./pages/Admin/PerfilAdmin/PerfilAdmin")
);

// ================= ERRO =================
const ErrorPage = lazy(() => import("./pages/Error/ErrorPage"));

function App() {
  const { person } = usePerson();

  return (
    <BrowserRouter>
      {/* Header só aparece logado */}
      {person && (
        <Suspense fallback={<Carregamento />}>
          <HeaderRight />
        </Suspense>
      )}

      <Suspense fallback={<Carregamento />}>
        <Routes>

          {/* LOGIN */}
          <Route path="/" element={<Login />} />

          {/* ================= RESPONSÁVEL ================= */}
          <Route path="/responsavel/home" element={<HomeResponsavel />} />
          <Route path="/responsavel/perfil" element={<PerfilResponsavel />} />
          <Route path="/responsavel/boletim" element={<BoletimResponsavel />} />
          <Route
            path="/responsavel/visualizarProfessor"
            element={<VisualizarProfResponsavel />}
          />

          {/* ================= PROFESSOR ================= */}
          <Route path="/professor/home" element={<HomeProfessor />} />
          <Route path="/professor/perfil" element={<PerfilProfessor />} />
          <Route
            path="/professor/visualizarEstudante"
            element={<ProfessorVisualizaEstudante />}
          />
          <Route path="/professor/adicionarAviso" element={<PaginaAvisos />} />

          {/* ================= ADMIN ================= */}
          <Route path="/admin/criarEstudante" element={<CriarEstudante />} />
          <Route path="/admin/criarProfessor" element={<AdicionarProfessor />} />
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
          <Route path="/admin/perfil" element={<PerfilAdmin />} />

          {/* ================= ERRO ================= */}
          <Route path="*" element={<ErrorPage />} />

        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;