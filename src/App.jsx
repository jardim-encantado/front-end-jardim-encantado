import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomeStudent from "./pages/HomeStudent/HomeStudent";
import Boletim from "./pages/Boletim/Boletim";
import Professor from "./pages/Professor/Professor"
import Estudante from "./pages/Estudante/Estudante";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeStudent />} />
        <Route path="/boletim" element={<Boletim />} />
        <Route path="/professor" element={<Professor />} />
        <Route path="/professor/estudante" element={<Estudante />} />
  
      </Routes>
    </BrowserRouter>
  );
}

export default App;