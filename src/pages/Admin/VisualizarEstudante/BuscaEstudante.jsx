import { useState } from "react";
import CardEstudante from "../../../components/EstudanteInfo/EstudanteInfo";
import BuscaEstudanteInput from "../../../components/SearchStudent/SearchBar";
import SideBarAdmin from "../../../components/Admin/SideBarAdmin"

export default function BuscaEstudante() {

  const [estudantes, setEstudantes] = useState([
    { id: 1, nome: "Maria" },
    { id: 2, nome: "João" }
  ]);

  const [textoBusca, setTextoBusca] = useState("");

  function adicionarEstudante() {
    const novoEstudante = {
      id: Date.now(),
      nome: "Camilla"
    };

    setEstudantes([...estudantes, novoEstudante]);
  }

  function removerEstudante(id) {
    setEstudantes(estudantes.filter((estudante) => estudante.id !== id));
  }

  const estudantesFiltrados = estudantes.filter((estudante) =>
    estudante.nome.toLowerCase().includes(textoBusca.toLowerCase())
  );

  return (
    <div
      style={{
        padding: "30px",
        background: "#ffffff",
        minHeight: "100vh",
        marginLeft: "200px"
      }}
    >
      <SideBarAdmin></SideBarAdmin>
      <h2>Estudantes</h2>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        
        <BuscaEstudanteInput
          onSearch={setTextoBusca}
        />

        <button
          onClick={adicionarEstudante}
          style={{
            padding: "10px 20px",
            background: "#f2b8b8",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer"
          }}
        >
          Adicionar
        </button>

      </div>

      {estudantesFiltrados.map((estudante) => (
        <CardEstudante
          key={estudante.id}
          estudante={estudante}
          onDelete={() => removerEstudante(estudante.id)}
        />
      ))}

    </div>
  );
}