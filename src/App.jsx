import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Carregamento from "./components/Carregamento/Carregamento";

const HeaderRight = lazy(() => import("./components/HeaderRight"));

const Login = lazy(() => import("./pages/Login/Login"));
const CriarEstudante = lazy(() => import("./pages/Admin/AdicionarAluno/AdicionarAluno"));
const AdicionarProfessor = lazy(() => import("./pages/Admin/AdicionarProfessor/AdicionarProfessor"));
const VisualizarEstudante = lazy(() => import("./pages/Admin/VisualizarEstudante/BuscaEstudante"));
const CronogramaEscolar = lazy(() => import("./pages/Admin/CronogramaEscolar/CronogramaEscolar"));
const VisualizarProfessor = lazy(() => import("./pages/Admin/VisualizarProfessor/BuscaProfessor"));

// Responsavel (Pelo Estudante)
const HomeResponsavel = lazy(() => import("./pages/Responsavel/HomeResponsavel/HomeResponsavel"));
const ProfessorEstudante = lazy(() => import("./pages/Responsavel/VisualizarProfessor/Professor"));
const BoletimEstudante = lazy(() => import("./pages/Responsavel/Boletim/Boletim"));
const PerfilResponsavel = lazy(() => import("./pages/Responsavel/PerfilResponsavel/PerfilResponsavelPag"));

// Professor
const HomeProfessor = lazy(() => import("./pages/Professor/HomeProfessor/HomeProfessor"));
const ProfessorVisualizaEstudante = lazy(() => import("./pages/Professor/VisualizarEstudantes/Estudante"));
const AdicionarAviso = lazy(() => import("./pages/Professor/AdicionarAviso/AddAviso"));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Carregamento />}>
      <HeaderRight/>
        <Routes>
          <Route path="/" element={<Login />} />

          {/* Responsavel */}
          <Route path="/responsavel/home" element={<HomeResponsavel />} />
          <Route path="/responsavel/visualizarProfessor" element={<ProfessorEstudante />} />
          <Route path="/responsavel/boletim" element={<BoletimEstudante />} />
           <Route path="/responsavel/perfil" element={<PerfilResponsavel />} />

          {/* Professor */}
          <Route path="/professor/home" element={<HomeProfessor />} />
          <Route path="/professor/visualizarEstudante" element={<ProfessorVisualizaEstudante />} />
          <Route path="/professor/AdicionarAviso" element={<AdicionarAviso />} />
          <Route path="/professor/Perfil" element={<PerfilResponsavel />} />

          {/* Admin */}
          <Route path="/admin/criarEstudante" element={<CriarEstudante />} />
          <Route path="/admin/criarProfessor" element={<AdicionarProfessor />} />
          <Route path="/admin/visualizarEstudante" element={<VisualizarEstudante />} />
          <Route path="/admin/cronogramaEscolar/cronogramaEscolar" element={<CronogramaEscolar />} />
          <Route path="/admin/visualizarProfessor" element={<VisualizarProfessor />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;