import styles from './Avatar.module.css';

export default function Avatar({ src, name, live = false }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .toUpperCase()
    .slice(0, 3);

  return (
    <div className={styles.wrap}>
      <div className={styles.aura} aria-hidden="true" />
      <div className={styles.ring}>
        <div className={styles.inner}>
          {src ? (
            <img
              src={src}
              alt={`${name} avatar`}
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          ) : (
            <span className={styles.initials}>{initials}</span>
          )}
        </div>
      </div>

      {live && (
        <div className={styles.live} aria-label="En vivo">
          LIVE
        </div>
      )}
    </div>
  );
}
