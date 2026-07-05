import styles from './SectionLabel.module.css';

export default function SectionLabel({ children }) {
  return (
    <h2 className={styles.label}>
      <span>{children}</span>
    </h2>
  );
}
