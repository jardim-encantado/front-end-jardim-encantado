import styles from "./ProfessorComponent.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function CardUsuarios({
  fotoProfessor,
  nomeProfessor,
  cargoProfessor,
  emailProfessor,
  materia,
  telefoneProfessor,
}) {
  return (
    <div className={styles.cardUsuarios}>
      <div className={styles.headerCardUsuarios}>
        <div className={styles.responsavel}>
          <img
            src={
              fotoProfessor
                ? fotoProfessor
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    nomeProfessor
                  )}&background=C2C2C2&color=000000&rounded=true`
            }
            alt={nomeProfessor}
          />

          <div>
            <h4>{nomeProfessor}</h4>
            <p>{cargoProfessor}</p>
          </div>
        </div>
      </div>

      <div className={styles.contato}>
        <div>
          <EmailIcon />
          <p>{emailProfessor}</p>
        </div>

        <div>
          <LocalPhoneIcon />
          <p>{telefoneProfessor}</p>
        </div>
      </div>

      <hr className={styles.divisao} />

      <div className={styles.informacoes}>
        <div className={styles.info}>
          <p>Matéria:</p>
          <p>{materia}</p>
        </div>
      </div>
    </div>
  );
}