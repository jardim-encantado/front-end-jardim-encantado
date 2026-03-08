import styles from "./Carregamento.module.css";

export default function Carregamento() {
  return (
    <div className={styles.overlay}>
      <div className={styles.pontos}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
}
