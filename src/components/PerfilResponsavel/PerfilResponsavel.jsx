import styles from "./PerfilResponsavel.module.css";

export default function FormResponsavel() {
  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>
        
        <div className={styles.inputGroup}>
          <label>Nome Completo do Responsável *</label>
          <input type="text" placeholder="Digite o nome completo" />
        </div>

        <div className={styles.inputGroup}>
          <label>Nome Completo do Filho *</label>
          <input type="text" placeholder="Digite o nome do aluno" />
        </div>

        <div className={styles.inputGroup}>
          <label>Email *</label>
          <input type="email" placeholder="email@email.com" />
        </div>

        <div className={styles.inputGroup}>
          <label>Série *</label>
          <input type="text" placeholder="Ex: 5ºC" />
        </div>

        <div className={styles.inputGroup}>
          <label>Telefone *</label>
          <input type="text" placeholder="(11) 99999-9999" />
        </div>

        <div className={styles.inputGroup}>
          <label>Telefone *</label>
          <input type="text" placeholder="(11) 99999-9999" />
        </div>

        <div className={styles.inputGroup}>
          <label>Telefone Extra</label>
          <input type="text" placeholder="(11) 99999-9999" />
        </div>

        <div className={styles.inputGroup}>
          <label>Telefone Extra</label>
          <input type="text" placeholder="(11) 99999-9999" />
        </div>

      </div>
    </div>
  );
}