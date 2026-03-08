import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomeStudent from "./pages/HomeEstudante/HomeEstudante";
import Boletim from "./pages/Boletim/Boletim";
import Professor from "./pages/Professor/Professor"
import Estudante from "./pages/Estudante/Estudante";
import CriarEstudante from "./pages/Admin/AdicionarAluno/AdicionarAluno";
import AdicionarProfessor from "./pages/Admin/AdicionarProfessor/AdicionarProfessor";
import VisualizarEstudante from "./pages/Admin/VisualizarEstudante/BuscaEstudante";
import CronogramaEscolar from "./pages/Admin/CronogramaEscolar/CronogramaEscolar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeStudent />} />
        <Route path="/boletim" element={<Boletim />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/professor/estudante" element={<Estudante />} />
        <Route path="/professor/home" element={<HomeStudent />} />
        <Route path="/admin/criarEstudante" element={<CriarEstudante />} />
        <Route path="/admin/criarProfessor" element={<AdicionarProfessor />} />
        <Route path="/admin/visualizarEstudante" element={<VisualizarEstudante />} />
        <Route path="/admin/cronogramaEscolar/cronogramaEscolar" element={<CronogramaEscolar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;