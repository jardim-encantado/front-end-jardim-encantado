import InfoRow from "../EstudanteInfo/./InfoLinha";
import styles from "./ProfessorInfo.module.css";

export default function ProfessorInfo({ teacher, onDelete }) {

  const [editando, setEditando] = useState(false);

  console.log(teacher);

  const teacherName = teacher?.fullName || teacher?.name || "-";
  const teacherEmail = teacher?.email || "-";
  const teacherCpf = teacher?.cpf || "-";
  const teacherPhone = teacher?.phoneNumber || "-";
  const teacherSubject = teacher.getSubjectNamesList() ?? "-";
  const teacherPhoto = teacher?.photoUrl || "";

  return (
    <div
      className={styles.teacherCard}
    >

      <div
        className={styles.teacherCardButtons}
      >
        <button onClick={() => setEditando(!editando)}>✏️</button>
        <button onClick={onDelete}>🗑</button>
      </div>

      <Cabecalho title="Detalhes do Professor" />

      <div style={{ padding: "20px", display: "flex", gap: "40px" }}>
        <div>
          <InfoRow label="Nome:" value={teacherName} disabled={!editando} />
          <InfoRow label="Email:" value={teacherEmail} disabled={!editando} />
          <InfoRow label="CPF:" value={teacherCpf} disabled={!editando} />
          <InfoRow label="Telefone:" value={teacherPhone} disabled={!editando} />
        </div>

        <div>
          <p>Foto:</p>
          <img src={teacherPhoto} alt="" width="70" height="90" />
        </div>

        <div>
            <InfoRow label="Matéria:" value={teacherSubject} disabled={!editando} />
        </div>

      </div>
    </div>
  );
}