import styles from "./ErrorPage.module.css";
import errorImage from "../../assets/images/errorpage.svg";

function ErrorPage() {
    return (
        <>
            <div className={styles.errorPage}>
                <img
                    src={errorImage}
                    alt="Error Page"
                    className={styles.errorImage}
                />
                <h1>Não foi possível encontrar essa página.</h1>
            </div>
        </>
    );
}

export default ErrorPage;
