import PerfilComponente from "../../../components/PerfilResponsavel/PerfilResponsavel";
import styles from "./PerfilResponsavel.module.css";
import SideBarPerfil from "../../../components/Sidebar/Sidebar"

export default function PerfilResponsavelPag() {
  return (
    <div className={styles.page}>
      <SideBarPerfil/>
      <div className={styles.profileHeader}>
        <img
          src="/avatar.jpg"
          alt="perfil"
          className={styles.avatar}
        />
        <div>
         <h1>Marcelo Morais</h1>
          <p>
            Caso deseje alterar alguma informação pessoal, envie email para
            jardimEncantado@gmail.com
          </p>
        </div>
      </div>

      <PerfilComponente />

    </div>
  );
}