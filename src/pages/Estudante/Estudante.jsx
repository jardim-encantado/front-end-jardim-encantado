import EstudanteComponent from "../../components/EstudanteComponent/EstudanteComponent";
import styles from "./Estudante.module.css";
import SidebarProfessor from "../../components/SideBarProfessor/SidebarProfessor";
import DropdownEstudantes from "../../components/DropdownEstudantes/DropdownEstudantes";

export default function Estudante() {
  const estudantes = [
    {
      id: 1,
      nomeEstudante: "Lucas Silva",
      serieEstudante: "Maternal II",
      professoraResponsavel: "Maria Eduarda",
    },
    {
      id: 2,
      nomeEstudante: "Ana Clara",
      serieEstudante: "Jardim I",
      professoraResponsavel: "Patrícia Lima",
    },
  ];

  return (
    <div className={styles.pageLayout}>
      <SidebarProfessor />

      <div className={styles.pageContent}>
        <h1>Estudantes</h1>
        <div>
          <h2>Série</h2>
          <DropdownEstudantes />
        </div>

        <div className={styles.cardsContainer}>
          {estudantes.map((estudante) => (
            <EstudanteComponent
              key={estudante.id}
              nomeEstudante={estudante.nomeEstudante}
              serieEstudante={estudante.serieEstudante}
              professoraResponsavel={estudante.professoraResponsavel}
            />
          ))}
        </div>
      </div>
    </div>
  );
}