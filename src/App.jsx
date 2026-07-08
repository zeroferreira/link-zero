import { useState, useEffect, useMemo } from 'react';
import ParticleCanvas  from './components/ParticleCanvas';
import Avatar          from './components/Avatar';
import ProfileHeader   from './components/ProfileHeader';
import QuickSocials    from './components/QuickSocials';
import SectionLabel    from './components/SectionLabel';
import LinkButton      from './components/LinkButton';
import Footer          from './components/Footer';
import ThemeToggle     from './components/ThemeToggle';
import { profile }  from './data/profile';
import { sections } from './data/sections';
import './App.css';

const BASE_DELAY   = 0.28; // seconds before first button appears
const STAGGER_STEP = 0.07; // seconds between buttons

const handleScrollDown = () => {
  const el = document.querySelector('.section-wrapper');
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

const fetchLiveStatus = async (signal) => {
  try {
    const res = await fetch('https://firestore.googleapis.com/v1/projects/zero-strom-web/databases/(default)/documents/system/status', { signal });
    if (!res.ok) return false;
    const data = await res.json();
    return data?.fields?.isLive?.booleanValue ?? false;
  } catch (err) {
    if (err.name !== 'AbortError') {
      console.error('Error checking TikTok live status:', err);
    }
    return false;
  }
};

export default function App() {
  // ── Theme (#4) ──
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('zfm-theme');
    if (saved) return saved;
    // Fallback to prefers-color-scheme (light maps to warm)
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    return prefersLight ? 'warm' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('zfm-theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme(t => t === 'dark' ? 'warm' : 'dark');

  // ── Dynamic LIVE Status (#3) ──
  const [isLive, setIsLive] = useState(false);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    async function checkLiveStatus() {
      const live = await fetchLiveStatus(controller.signal);
      if (active) {
        setIsLive(live);
      }
    }
    checkLiveStatus();
    const interval = setInterval(checkLiveStatus, 20000); // Check status every 20 seconds
    return () => {
      active = false;
      controller.abort();
      clearInterval(interval);
    };
  }, []);

  // ── Pre-compute stagger delays (#9 — replaces mutable buttonIndex in render) ──
  const buttonDelays = useMemo(() => {
    let idx = 0;
    const delays = {};
    sections.forEach(section => {
      section.links.forEach(linkOrRow => {
        if (linkOrRow.type === 'row') {
          linkOrRow.items.forEach(link => {
            delays[link.id] = BASE_DELAY + idx * STAGGER_STEP;
            idx++;
          });
        } else {
          delays[linkOrRow.id] = BASE_DELAY + idx * STAGGER_STEP;
          idx++;
        }
      });
    });
    return delays;
  }, []); // sections is static — no need to recompute

  return (
    <>
      {/* ── Background layers ── */}
      <ParticleCanvas theme={theme} />
      <div className="bg-layer" aria-hidden="true" />

      {/* ── Theme toggle ── */}
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {/* ── Page content ── */}
      <main className="page">

        {/* Dynamic LIVE Stream Banner */}
        {isLive && (
          <a
            href="https://www.tiktok.com/@game.zer0/live"
            target="_blank"
            rel="noopener noreferrer"
            className="live-stream-banner"
            aria-label="¡En vivo ahora en TikTok! Haz clic para unirte"
          >
            <span className="live-stream-pulse" />
            <span className="live-stream-text">🔴 EN VIVO EN TIKTOK — Entra aquí 🎧</span>
          </a>
        )}

        {/* Profile Glassmorphic Card */}
        <div className="profile-card">
          <Avatar src={profile.avatar} name={profile.name} live={isLive} />
          <ProfileHeader
            name={profile.name}
            handle={profile.handle}
            bio={profile.bio}
          />
          <QuickSocials socials={profile.socials} />
        </div>

        {/* Scroll invitation */}
        <button className="scroll-invitation" onClick={handleScrollDown} type="button" aria-label="Deslizar para ver más">
          <span className="scroll-text">Desliza para ver más</span>
          <div className="scroll-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </button>

        {/* Link sections */}
        {sections.map((section) => (
          <div key={section.id} className="section-wrapper">
            <SectionLabel>
              <span className="section-label-inner">
                {section.label}
                {section.id === 'live' && isLive && (
                  <span className="live-section-badge">
                    <span className="live-section-dot" />
                    <span>EN VIVO</span>
                  </span>
                )}
              </span>
            </SectionLabel>

            <ul className="links-group" aria-label={`Links de ${section.label}`}>
              {section.links.map((linkOrRow) => {
                if (linkOrRow.type === 'row') {
                  return (
                    <li key={linkOrRow.id} style={{ width: '100%' }}>
                      <div className="links-row" role="group">
                        {linkOrRow.items.map((link) => (
                          <LinkButton
                            key={link.id}
                            href={link.href}
                            label={link.label}
                            sublabel={link.sublabel}
                            icon={link.icon}
                            theme={link.theme}
                            animDelay={buttonDelays[link.id]}
                            compact={true}
                            live={isLive && section.id === 'live'}
                          />
                        ))}
                      </div>
                    </li>
                  );
                }

                return (
                  <li key={linkOrRow.id} style={{ width: '100%' }}>
                    <LinkButton
                      key={linkOrRow.id}
                      href={linkOrRow.href}
                      label={linkOrRow.label}
                      sublabel={linkOrRow.sublabel}
                      icon={linkOrRow.icon}
                      theme={linkOrRow.theme}
                      animDelay={buttonDelays[linkOrRow.id]}
                      live={isLive && section.id === 'live'}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        <Footer />
      </main>
    </>
  );
}
