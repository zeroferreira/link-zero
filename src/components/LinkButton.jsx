import { useRef, useCallback, useState } from 'react';
import icons from './icons';
import styles from './LinkButton.module.css';

export default function LinkButton({ href, label, sublabel, icon, theme, animDelay = 0, compact = false, live = false }) {
  const btnRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const isVisible = true;

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

  const handlePointerDown = useCallback((e) => {
    const el = btnRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 1.5;
    
    // Support both mouse and touch event coordinates
    const clientX = e.clientX ?? (e.touches && e.touches[0] ? e.touches[0].clientX : 0);
    const clientY = e.clientY ?? (e.touches && e.touches[0] ? e.touches[0].clientY : 0);
    
    const x = clientX - rect.left - size / 2;
    const y = clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };
    
    setRipples((prev) => [...prev, newRipple]);
  }, []);

  const removeRipple = useCallback((id) => {
    setRipples((prev) => prev.filter((r) => r.id !== id));
  }, []);

  const themeClass = styles[`theme--${theme}`] ?? '';
  const compactClass = compact ? styles.compact : '';
  const visibleClass = isVisible ? styles.visible : '';
  const liveClass = (live === 'live' || live === true) ? styles.liveGlow : '';

  return (
    <a
      ref={btnRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.btn} ${themeClass} ${compactClass} ${visibleClass} ${liveClass}`}
      style={{ animationDelay: `${animDelay}s` }}
      onMouseMove={handleMouseMove}
      onPointerDown={handlePointerDown}
      aria-label={label}
    >
      {/* Dynamic Click/Touch Ripples */}
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className={styles.ripple}
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
          }}
          onAnimationEnd={() => removeRipple(ripple.id)}
        />
      ))}

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
        <span className={styles.label}>
          {label}
          {live && (
            <span className={`${styles.liveIndicator} ${live === 'offline' ? styles.offline : ''}`}>
              <span className={styles.liveDot} />
              <span>LIVE</span>
            </span>
          )}
        </span>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </div>

      {/* Arrow */}
      <div className={styles.arrow} aria-hidden="true">›</div>
    </a>
  );
}
