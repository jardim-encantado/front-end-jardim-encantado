import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import styles from "./Header.module.css";
import { usePerson } from "../hooks/personHook";
import { normalizeRoleName } from "../api/schemas/Role";

export default function HeaderRight() {
  const location = useLocation();
  const navigate = useNavigate();

  const { person, removeLoggedPerson } = usePerson();

  function handleLogout() {
    removeLoggedPerson();
    navigate("/");    
  }

  if (location.pathname === "/" || !person) return null;

  const displayName = [person?.firstName, person?.lastName].filter(Boolean).join(" ").trim();

  const getProfileRoute = () => {
    switch (normalizeRoleName(person?.roleName)) {
      case "teacher":
        return "/professor/perfil";
      case "guardian":
        return "/responsavel/perfil";
      case "admin":
        return "/admin/perfil";
      default:
        return "/"; 
    }
  };

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <PersonIcon
          className={styles.headerIcon}
          onClick={() => navigate(getProfileRoute())}
        />

        <LogoutIcon
          className={styles.headerIcon}
          onClick={handleLogout}
        />

        <span className={styles.userName}>{displayName}</span>
      </div>
    </div>
  );
}