import styles from "./PerfilResponsavel.module.css";

export default function FormResponsavel({ usuario }) {

  return (
    <div className={styles.container}>
      <div className={styles.formGrid}>

        <div className={styles.inputGroup}>
          <label>Nome Completo do Responsável *</label>
          <input
            type="text"
            value={`${usuario.firstName} ${usuario.lastName}`}
            readOnly
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Telefone *</label>
          <input
            type="text"
            value={usuario.phoneNumber || ""}
            readOnly
          />
        </div>

        <div className={styles.inputGroup}>
          <label>CPF *</label>
          <input
            type="text"
            value={usuario.cpf || ""}
            readOnly
          />
        </div>

        <div className={styles.inputGroup}>
          <label>CEP *</label>
          <input
            type="text"
            value={usuario.address?.cep || ""}
            readOnly
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Rua *</label>
          <input
            type="text"
            value={usuario.address?.street || ""}
            readOnly
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Número *</label>
          <input
            type="text"
            value={usuario.address?.streetNumber || ""}
            readOnly
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Complemento</label>
          <input
            type="text"
            value={usuario.address?.complement || ""}
            readOnly
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Cidade *</label>
          <input
            type="text"
            value={usuario.address?.city || ""}
            readOnly
          />
        </div>

        <div className={styles.inputGroup}>
          <label>Estado *</label>
          <input
            type="text"
            value={usuario.address?.state || ""}
            readOnly
          />
        </div>

      </div>
    </div>
  );
}