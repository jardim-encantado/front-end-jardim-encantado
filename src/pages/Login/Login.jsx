import { useState } from "react";
import styles from "./Login.module.css";
import imgJardimLogin from "../../assets/images/imgJardimLogin.png";
import { useNavigate } from "react-router-dom";
import { createPersonService } from "../../api/service/PersonService";


function Login() {
    const [cpf, setCPF] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const personService = createPersonService();

    function handleLogin(e) {
        e.preventDefault();

        personService.login(cpf, password)
            .then((response) => {
                console.log("Login realizado com sucesso:", response);
                navigate("/home");
            })
            .catch((error) => {
                console.error("Erro ao realizar login:", error);
            });
    }

    function handleCPFChange(e) {
        let value = e.target.value.replace(/\D/g, "");
        if (value.length > 9) {
            value = value.replace(
                /(\d{3})(\d{3})(\d{3})(\d{0,2})/,
                "$1.$2.$3-$4",
            );
        } else if (value.length > 6) {
            value = value.replace(/(\d{3})(\d{3})(\d{0,3})/, "$1.$2.$3");
        } else if (value.length > 3) {
            value = value.replace(/(\d{3})(\d{0,3})/, "$1.$2");
        }
        setCPF(value);
    }

    return (
        <div className={styles.loginPage}>
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
                    <button type="submit" onClick={handleLogin}>
                        Entrar
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
