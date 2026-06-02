import styles from './ProfileHeader.module.css';

export default function ProfileHeader({ name, handle, bio }) {
  // Support \n line breaks in bio
  const bioLines = bio.split('\n');

  return (
    <div className={styles.header}>
      <h1 className={styles.name}>{name}</h1>
      <p className={styles.handle}>{handle}</p>
      <p className={styles.bio}>
        {bioLines.map((line, i) => (
          <span key={i}>
            {line}
            {i < bioLines.length - 1 && <br />}
          </span>
        ))}
      </p>
    </div>
  );
}
