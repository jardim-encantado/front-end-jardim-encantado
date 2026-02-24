import styles from "./EstudanteComponent.module.css";

export default function EstudanteComponent({
  nomeEstudante,
  serieEstudante,
  professoraResponsavel,
  fotoEstudante
}) {
  return (
    <div className={styles.cardUsuarios}>
      <div className={styles.headerCardUsuarios}>
        <div className={styles.responsavel}>
          <img
            src={
              fotoEstudante
                ? fotoEstudante
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    nomeEstudante
                  )}&background=C2C2C2&color=000000&rounded=true`
            }
            alt={nomeEstudante}
          />

          <div>
            <h4>{nomeEstudante}</h4>
            <p>{serieEstudante}</p>
          </div>
        </div>
      </div>

      <hr className={styles.divisao} />

      <div className={styles.informacoes}>
        <div className={styles.info}>
          <p>Professora:</p>
          <p>{professoraResponsavel}</p>
        </div>
      </div>
    </div>
  );
}