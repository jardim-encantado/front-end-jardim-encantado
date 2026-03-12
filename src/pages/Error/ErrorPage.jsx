import styles from "./ErrorPage.module.css";
import errorImage from "../../assets/images/errorpage.svg";

function ErrorPage() {
    // load errorpage.svg and display it in the center of the page with a message below it
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
