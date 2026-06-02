import ParticleCanvas  from './components/ParticleCanvas';
import Avatar          from './components/Avatar';
import ProfileHeader   from './components/ProfileHeader';
import QuickSocials    from './components/QuickSocials';
import SectionLabel    from './components/SectionLabel';
import LinkButton      from './components/LinkButton';
import Footer          from './components/Footer';
import { profile, sections } from './data/links';
import './App.css';

export default function App() {
  // Compute a global stagger offset so each button enters slightly later
  let buttonIndex = 0;
  const BASE_DELAY   = 0.28; // seconds before first button appears
  const STAGGER_STEP = 0.07; // seconds between buttons

  return (
    <>
      {/* ── Background layers ── */}
      <ParticleCanvas />
      <div className="bg-layer" aria-hidden="true" />

      {/* ── Page content ── */}
      <main className="page">

        {/* Dynamic LIVE Stream Banner */}
        {profile.live && profile.liveUrl && (
          <a
            href={profile.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="live-stream-banner"
            aria-label="¡En vivo ahora! Haz clic para unirte"
          >
            <span className="live-stream-pulse" />
            <span className="live-stream-text">🔴 EN VIVO AHORA — Entra aquí 🎧</span>
          </a>
        )}

        {/* Profile Glassmorphic Card */}
        <div className="profile-card">
          <Avatar src={profile.avatar} name={profile.name} live={profile.live} />
          <ProfileHeader
            name={profile.name}
            handle={profile.handle}
            bio={profile.bio}
          />
          <QuickSocials socials={profile.socials} />
        </div>

        {/* Link sections */}
        {sections.map((section) => (
          <div key={section.id} className="section-wrapper">
            <SectionLabel>{section.label}</SectionLabel>

            <div className="links-group" role="list" aria-label={`Links de ${section.label}`}>
              {section.links.map((linkOrRow) => {
                if (linkOrRow.type === 'row') {
                  return (
                    <div key={linkOrRow.id} className="links-row" role="group">
                      {linkOrRow.items.map((link) => {
                        const delay = BASE_DELAY + buttonIndex * STAGGER_STEP;
                        buttonIndex++;
                        return (
                          <LinkButton
                            key={link.id}
                            href={link.href}
                            label={link.label}
                            sublabel={link.sublabel}
                            icon={link.icon}
                            theme={link.theme}
                            animDelay={delay}
                            compact={true}
                          />
                        );
                      })}
                    </div>
                  );
                }

                const link = linkOrRow;
                const delay = BASE_DELAY + buttonIndex * STAGGER_STEP;
                buttonIndex++;
                return (
                  <LinkButton
                    key={link.id}
                    href={link.href}
                    label={link.label}
                    sublabel={link.sublabel}
                    icon={link.icon}
                    theme={link.theme}
                    animDelay={delay}
                  />
                );
              })}
            </div>
          </div>
        ))}

        <Footer />
      </main>
    </>
  );
}
