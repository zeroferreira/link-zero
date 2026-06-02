import { useRef, useCallback } from 'react';
import icons from './icons';
import styles from './LinkButton.module.css';

export default function LinkButton({ href, label, sublabel, icon, theme, animDelay = 0, compact = false }) {
  const btnRef = useRef(null);

  /* Track mouse position for the radial ripple highlight */
  const handleMouseMove = useCallback((e) => {
    const el  = btnRef.current;
    if (!el) return;
    const r   = el.getBoundingClientRect();
    const x   = ((e.clientX - r.left)  / r.width  * 100).toFixed(1);
    const y   = ((e.clientY - r.top)   / r.height * 100).toFixed(1);
    el.style.setProperty('--rx', x + '%');
    el.style.setProperty('--ry', y + '%');
  }, []);

  const themeClass = styles[`theme--${theme}`] ?? '';
  const compactClass = compact ? styles.compact : '';

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.btn} ${themeClass} ${compactClass}`}
      style={{ animationDelay: `${animDelay}s` }}
      onMouseMove={handleMouseMove}
      aria-label={label}
    >
      {/* Gloss shimmer sweep */}
      <div 
        className={styles.shimmer} 
        aria-hidden="true" 
        style={{ animationDelay: `${animDelay * 1.6 + 1.2}s` }} 
      />

      {/* Icon box */}
      <div className={styles.iconBox} aria-hidden="true">
        {icons[icon] ?? icons.tiktok}
      </div>

      {/* Text */}
      <div className={styles.text}>
        <span className={styles.label}>{label}</span>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>

      {/* Arrow */}
      <div className={styles.arrow} aria-hidden="true">›</div>
    </a>
  );
}
