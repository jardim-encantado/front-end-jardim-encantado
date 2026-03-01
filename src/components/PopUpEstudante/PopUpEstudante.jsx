import styles from "./PopUpEstudante.module.css";
import Boletim from "../BoletimComponent/BoletimComponent";
import DropdownEstudantes from "../DropdownEstudantes/DropdownEstudantes";

export default function PopUpEstudante({ estudante, onClose }) {
  if (!estudante) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.info}>
          
          <div className={styles.leftSide}>
            

            <div className={styles.columnPrimary}>
              <p><strong>Nome:</strong> {estudante.nomeEstudante}</p>
              <p><strong>Série:</strong> {estudante.serieEstudante}</p>
              <p><strong>Professora:</strong> {estudante.professoraResponsavel}</p>
            </div>

            <div className={styles.columnSecondary}>
              <p><strong>Telefone:</strong> {estudante.telefone}</p>
              <p><strong>Email:</strong> {estudante.email}</p>
              <p><strong>Responsável:</strong> {estudante.responsavel}</p>
            </div>

          </div>

          <hr className={styles.divider} />

          <div className={styles.actions}>
            <DropdownEstudantes />
            <button className={styles.boletimBtn}>Editar</button>
          </div>

        </div>

        <Boletim />
      </div>
    </div>
  );
}