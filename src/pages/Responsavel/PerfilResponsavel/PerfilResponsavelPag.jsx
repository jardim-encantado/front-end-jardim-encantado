import { usePerson } from "../../../hooks/personHook";
import PerfilComponente from "../../../components/PerfilResponsavel/PerfilResponsavel";
import styles from "./PerfilResponsavel.module.css";
import SideBarPerfil from "../../../components/Sidebar/Sidebar";
import Carregamento from "../../../components/Carregamento/Carregamento";

export default function PerfilResponsavelPag() {
  const { person } = usePerson();

  if (!person) return <Carregamento />;

  return (
    <div className={styles.page}>
      <SideBarPerfil />

      <div className={styles.profileHeader}>
        <img
          src={person.photoUrl || "/avatar.jpg"}
          alt="perfil"
          className={styles.avatar}
        />
        <div>
          <h1>{person.firstName} {person.lastName}</h1>
          <p>Caso deseje alterar alguma informação pessoal, envie email para jardimEncantado@gmail.com</p>
        </div>
      </div>

      <PerfilComponente usuario={person} />
    </div>
  );
}