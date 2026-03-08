import React, { useState } from "react";
import CronogramaEditavel from "../../../components/CronogramaEditavel/CronogramaEditavel";
import styles from "./CronogramaEscolar.module.css";
import SidebarAdmin from "../../../components/Admin/SideBarAdmin"

const CronogramaEscolar = () => {
  const [cronogramas, setCronogramas] = useState([{}]); 

  const adicionarCronograma = () => {
    setCronogramas([...cronogramas, {}]);
  };

  return (
    <div>
     <SidebarAdmin></SidebarAdmin>
    <div className={styles.pagina}>
      <h1 className={styles.titulo}>Gerenciamento de Cronogramas</h1>

      <button className={styles.btnAdicionarGeral} onClick={adicionarCronograma}>
        Adicionar Cronograma
      </button>

      <div className={styles.listaCronogramas}>
        {cronogramas.map((_, index) => (
          <div key={index} className={styles.cronogramaWrapper}>
            <CronogramaEditavel />
          </div>
        ))}
      </div>
    </div>
    </div>
 
  );
};

export default CronogramaEscolar;