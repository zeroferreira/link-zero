import styles from './ThemeToggle.module.css';

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SunsetIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 18a5 5 0 0 0-10 0" />
      <line x1="12" y1="2" x2="12" y2="9" />
      <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
      <line x1="1" y1="18" x2="3" y2="18" />
      <line x1="21" y1="18" x2="23" y2="18" />
      <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
      <line x1="23" y1="22" x2="1" y2="22" />
      <polyline points="8 6 12 2 16 6" />
    </svg>
  );
}

export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={`${styles.toggle} ${isDark ? styles.modeDark : styles.modeWarm}`}
      onClick={onToggle}
      aria-label={isDark ? 'Cambiar a tema sunset' : 'Cambiar a tema oscuro'}
      title={isDark ? 'Tema sunset 🌅' : 'Tema oscuro 🌙'}
    >
      {/* Glow ring */}
      <span className={styles.glow} aria-hidden="true" />

      {/* Icon — key forces remount → triggers pop animation on switch */}
      <span className={styles.iconWrap} key={theme}>
        {isDark ? <MoonIcon /> : <SunsetIcon />}
      </span>
    </button>
  );
}
