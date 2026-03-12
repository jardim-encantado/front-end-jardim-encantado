import { useState } from "react";
import styles from "./Login.module.css";
import imgJardimLogin from "../../assets/images/imgJardimLogin.png";
import { useNavigate } from "react-router-dom";
import Carregamento from "../../components/Carregamento/Carregamento";
import { createPersonService } from "../../api/service/PersonService";
import { saveLoggedPerson } from "../../hooks/personHook";
import { usePerson } from "../../hooks/personHook";

function Login() {
  const [cpf, setCPF] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const personService = createPersonService();
  const { setLoggedPerson } = usePerson();

  const resolveRouteByRole = (person) => {
    const normalizedRoleName = String(person?.roleName ?? "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

    if (normalizedRoleName.includes("admin")) {
      return "/admin/visualizarEstudante";
    }

    if (
      normalizedRoleName.includes("teacher") ||
      normalizedRoleName.includes("professor") ||
      normalizedRoleName.includes("docente")
    ) {
      return "/professor/home";
    }

    return "/responsavel/home";
  };

  async function handleLogin(e) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await personService.login(cpf, password);

      response.cpf = cpf;

      setLoggedPerson(response);

      setTimeout(() => {
        navigate(resolveRouteByRole(response));
      }, 0);
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      setErrorMessage("CPF ou senha incorretos.");
    } finally {
      setIsLoading(false);
    }
  }

  function handleCPFChange(e) {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 9) {
      value = value.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, "$1.$2.$3-$4");
    } else if (value.length > 6) {
      value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
    } else if (value.length > 3) {
      value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
    }
    setCPF(value);
  }

  return (
    <div className={styles.loginPage}>
      {isLoading && <Carregamento />}

      <div className={styles.loginLeft}>
        <h1>Login</h1>

        <form className={styles.form} onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="CPF: "
            value={cpf}
            maxLength={14}
            onChange={handleCPFChange}
          />
          <input
            type="password"
            placeholder="Senha: "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
      <div className={styles.loginRight}>
        <img src={imgJardimLogin} alt="Imagem 1" />
      </div>
    </div>
  );
}

export default Login;
