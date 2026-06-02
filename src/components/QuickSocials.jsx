import icons from './icons';
import styles from './QuickSocials.module.css';

export default function QuickSocials({ socials = [] }) {
  if (!socials || socials.length === 0) return null;

  return (
    <div className={styles.socialsBar} role="group" aria-label="Redes sociales">
      {socials.map((social, i) => {
        const iconSvg = icons[social.name] ?? icons.tiktok;
        
        // Individual entrance animation delay
        const delay = (0.35 + i * 0.05).toFixed(2);

        return (
          <a
            key={social.name}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.socialLink} ${styles[`theme--${social.name}`]}`}
            style={{ animationDelay: `${delay}s` }}
            aria-label={`Visitar mi perfil de ${social.name}`}
          >
            <div className={styles.iconBox}>
              {iconSvg}
            </div>
          </a>
        );
      })}
    </div>
  );
}
