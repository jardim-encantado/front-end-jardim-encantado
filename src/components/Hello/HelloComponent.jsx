import styles from './Hello.module.css';

export default function HelloComponent({name}) {
    return (
        <h1 className={styles.hello}>Olá, {name}!</h1>
    );
}