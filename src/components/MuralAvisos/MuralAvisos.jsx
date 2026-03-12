import styles from "./MuralAvisos.module.css";
import AvisoCard from "../AvisoCard/AvisoCard";

export default function AvisoMural({ schoolEvents }) {
  return (
    <div className={styles.mural}>
      <h3 className={styles.muralTitle}>Mural de Avisos</h3>
      <div className={styles.avisosContainer}>
        {(schoolEvents.length === 0) ? (
          <p className={styles.noAvisos}>Não há avisos no momento.</p>
        ) : (
          schoolEvents.map((aviso) => (
            <AvisoCard
              avisoSchema={aviso}
            />
          ))
        )}
      </div>
    </div>
  );
}
