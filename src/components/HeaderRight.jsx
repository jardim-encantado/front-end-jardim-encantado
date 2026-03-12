import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./Header.module.css";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <PersonIcon
          className={styles.headerIcon}
          onClick={() => navigate("/responsavel/perfil")}
        />

        <LogoutIcon
          className={styles.headerIcon}
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
}