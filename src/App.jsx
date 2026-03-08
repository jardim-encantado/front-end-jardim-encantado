import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";

import CriarEstudante from "./pages/Admin/AdicionarAluno/AdicionarAluno";
import AdicionarProfessor from "./pages/Admin/AdicionarProfessor/AdicionarProfessor";
import VisualizarEstudante from "./pages/Admin/VisualizarEstudante/BuscaEstudante";
import CronogramaEscolar from "./pages/Admin/CronogramaEscolar/CronogramaEscolar";
import VisualizarProfessor from "./pages/Admin/VisualizarProfessor/BuscaProfessor";

// Responsável (Pelo Estudante)
import HomeResponsavel from "./pages/Responsavel/HomeResponsavel/HomeResponsavel";
import ProfessorEstudante from "./pages/Responsavel/VisualizarProfessor/Professor";
import BoletimEstudante from "./pages/Responsavel/Boletim/Boletim";

// Professor
import HomeProfessor from "./pages/Professor/HomeProfessor/HomeProfessor";
import ProfessorVisualizaEstudante from "./pages/Professor/VisualizarEstudantes/Estudante";
import AdicionarAviso from "./pages/Professor/AdicionarAviso/AddAviso"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        
        {/* Responsavel */}
        <Route path="/responsavel/home" element={<HomeResponsavel />} />
        <Route path="/responsavel/visualizarProfessor" element={<ProfessorEstudante />} />
        <Route path="/responsavel/boletim" element={<BoletimEstudante />} />

        {/* Professor */}
        <Route path="/professor/home" element={<HomeProfessor />} />
        <Route path="/professor/visualizarEstudante" element={<ProfessorVisualizaEstudante />} />
        <Route path="/professor/AdicionarAviso" element={<AdicionarAviso />} />

        <Route path="/admin/criarEstudante" element={<CriarEstudante />} />
        <Route path="/admin/criarProfessor" element={<AdicionarProfessor />} />
        <Route path="/admin/visualizarEstudante" element={<VisualizarEstudante />} />
        <Route path="/admin/cronogramaEscolar/cronogramaEscolar" element={<CronogramaEscolar />} />
        <Route path="/admin/visualizarProfessor" element={<VisualizarProfessor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;