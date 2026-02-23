import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import HomeStudent from "./pages/HomeStudent/HomeStudent";
import Boletim from "./pages/Boletim/Boletim";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<HomeStudent />} />
        <Route path="/boletim" element={<Boletim />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;