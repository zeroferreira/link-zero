import styles from './SectionLabel.module.css';

export default function SectionLabel({ children }) {
  return (
    <div className={styles.label} role="heading" aria-level="2">
      <span>{children}</span>
    </div>
  );
}
