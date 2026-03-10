import styles from "./CardInfoProfessor.module.css";
import EmailIcon from "@mui/icons-material/Email";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";

export default function CardInfoProfessor({ teacherSchema }) {

  const materias = Array.isArray(teacherSchema.subjectNames) && teacherSchema.subjectNames.length
                  ? teacherSchema.subjectNames.join(", ")
                  : "Não definidas";

  return (
    <div className={styles.cardUsuarios}>
      <div className={styles.headerCardUsuarios}>
        <div className={styles.responsavel}>
          <img
            src={
              teacherSchema.photoUrl
                ? teacherSchema.photoUrl
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    nomeProfessor
                  )}&background=C2C2C2&color=000000&rounded=true`
            }
            alt={teacherSchema.fullName}
          />

          <div>
            <h4>{teacherSchema.fullName}</h4>
            <p>{teacherSchema.cargo}</p>
          </div>
        </div>
      </div>

      <div className={styles.contato}>
        <div>
          <EmailIcon />
          <p>{teacherSchema.email}</p>
        </div>

        <div>
          <LocalPhoneIcon />
          <p>{teacherSchema.phoneNumber}</p>
        </div>
      </div>

      <hr className={styles.divisao} />

      <div className={styles.informacoes}>
        <div className={styles.info}>
          <p>Matéria:</p>
          <p>{materias}</p>
        </div>
      </div>
    </div>
  );
}