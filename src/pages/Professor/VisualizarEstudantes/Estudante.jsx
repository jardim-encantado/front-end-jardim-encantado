import { useState } from "react";
import EstudanteComponent from "../../../components/EstudanteComponent/EstudanteComponent";
import SidebarProfessor from "../../../components/SideBarProfessor/SidebarProfessor";
import DropdownEstudantes from "../../../components/DropdownEstudantes/DropdownEstudantes";
import SearchBar from "../../../components/SearchStudent/SearchBar";
import PopUpEstudante from "../../../components/PopUpEstudante/PopUpEstudante";
import CriarAviso from "../../../components/CriarAviso/CriarAviso";
import styles from "./Estudante.module.css";

export default function Estudante() {
  const estudantes = [
    {
      id: 1,
      nomeEstudante: "Lucas Silva",
      serieEstudante: "Maternal II",
      professoraResponsavel: "Maria Eduarda",
      telefone: "(11) 99999-9999",
      email: "lucas@email.com",
      boletim: [],
      estudanteId: 2
    },
    {
      id: 2,
      nomeEstudante: "Ana Clara",
      serieEstudante: "Jardim I",
      professoraResponsavel: "Patrícia Lima",
      telefone: "(11) 98888-8888",
      email: "ana@email.com",
      boletim: [],
      estudanteId: 2
    }
  ];

  const [filtro, setFiltro] = useState("");
  const [alunoPopUp, setAlunoPopUp] = useState(null);       
  const [alunoCriarAviso, setAlunoCriarAviso] = useState(null); 
  const [showCriarAviso, setShowCriarAviso] = useState(false);

  const estudantesFiltrados = estudantes.filter((estudante) =>
    estudante.nomeEstudante.toLowerCase().includes(filtro.toLowerCase())
  );

  const handleAbrirPopUp = (aluno) => {
    setAlunoPopUp(aluno);
    setShowCriarAviso(false);
  };

  const handleCriarAviso = (aluno) => {
    setAlunoPopUp(null);   
    setAlunoCriarAviso(aluno);   
    setShowCriarAviso(true);  
  };

  const handleFecharCriarAviso = () => {
    setShowCriarAviso(false);
    setAlunoCriarAviso(null);
  };

  const handleSalvarAviso = (novoAviso) => {
    console.log("Aviso salvo:", novoAviso);
    handleFecharCriarAviso();
  };

  return (
    <div className={styles.pageLayout}>
      <SidebarProfessor />

      <div className={styles.pageContent}>
        <h1>Estudantes</h1>

        <div className={styles.filtros}>
          <div className={styles.serie}>
            <h2>Série:</h2>
            <DropdownEstudantes />
          </div>

          <div className={styles.search}>
            <SearchBar onSearch={setFiltro} />
          </div>
        </div>

        <div className={styles.cardsContainer}>
          {estudantesFiltrados.map((estudante) => (
            <EstudanteComponent
              key={estudante.id}
              nomeEstudante={estudante.nomeEstudante}
              serieEstudante={estudante.serieEstudante}
              professoraResponsavel={estudante.professoraResponsavel}
              onClick={() => handleAbrirPopUp(estudante)}
            />
          ))}
        </div>

        {alunoPopUp && !showCriarAviso && (
          <PopUpEstudante
            estudante={alunoPopUp}
            onClose={() => setAlunoPopUp(null)}
            onCriarAviso={handleCriarAviso} 
          />
        )}

        {alunoCriarAviso && showCriarAviso && (
          <CriarAviso
            estudante={alunoCriarAviso}
            onCancel={handleFecharCriarAviso}
            onSave={handleSalvarAviso}
          />
        )}
      </div>
    </div>
  );
}