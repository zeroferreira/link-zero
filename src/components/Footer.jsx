import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>Zero FM</div>
      <p className={styles.copy}>© 2025 Zero FM · Todos los derechos reservados</p>
    </footer>
  );
}
