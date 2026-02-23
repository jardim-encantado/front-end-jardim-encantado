import { useState } from "react";
import styles from "./Login.module.css";
import imgJardimLogin from "../../assets/images/imgJardimLogin.png";
import { Link } from "react-router-dom";

function Login() {
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    console.log("CPF:", cpf);
    console.log("Senha:", password);
  }

  return (
    <div className={styles.loginPage}>

      <div className={styles.loginLeft}>
        <h1>Login</h1>

        <form className={styles.form}>
          <input
  type="text"
  placeholder="CPF: "
  value={cpf}
  maxLength={14} // CPF tem 11 dígitos + 2 pontos + 1 hífen
  onChange={(e) => {
    let value = e.target.value.replace(/\D/g, ""); // remove tudo que não é número
    // formata como 000.000.000-00
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }
    setCPF(value);
  }}
/>
          <input type="password" placeholder="Senha: " 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>

<Link to="/boletim">Ir para Boletim</Link>

      <div className={styles.loginRight}>
        <img src={imgJardimLogin} alt="Imagem 1" />
      </div>

    </div>
  );
}

export default Login;