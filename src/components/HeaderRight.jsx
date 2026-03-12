import { useLocation, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();

  if (location.pathname === "/") return null;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "flex-end",
        gap: "20px",
        padding: "10px 20px",
        background: "white",
        zIndex: 1000
      }}
    >
      <PersonIcon
        style={{ cursor: "pointer", color: "#10898B" }}
        onClick={() => navigate("/perfil")}
      />
      <LogoutIcon
        style={{ cursor: "pointer", color: "#10898B" }}
        onClick={() => navigate("/")}
      />
    </header>
  );
}