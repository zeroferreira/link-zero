// ─────────────────────────────────────────────
//  ZERO FM — Link in Bio · Data
//  Edita ESTE archivo para cambiar URLs, nombres
//  y subtítulos de cada botón.
// ─────────────────────────────────────────────

export const profile = {
  name:   'Zero FM',
  handle: '@zeroferreira',
  bio:    'Baterista · Streamer · Gamer\nMúsica, vibes y gaming desde México 🎧🎮🇲🇽',
  avatar: '/logo.png',
  live:   false,   // ← pon en true cuando estés en vivo
  liveUrl: 'https://www.youtube.com/@zer0ferreira', // ← tu URL del Live stream (Twitch, YouTube, TikTok, etc.)
  socials: [
    { name: 'youtube', href: 'https://www.youtube.com/@zer0ferreira' },
    { name: 'spotify', href: 'https://open.spotify.com/intl-es/artist/3PYFaujfW3f1RWZdBouxMm' },
    { name: 'apple', href: 'https://music.apple.com/ug/artist/zero-fm/1608671787' },
    { name: 'tiktok', href: 'https://www.tiktok.com/@game.zer0' },
  ],
};

// Íconos como identificadores de string (ver icons.jsx para los SVGs)
export const sections = [
  {
    id:    'music',
    label: '🎵 Música',
    links: [
      {
        id:        'tiktok-music',
        label:     'Pide una canción en el LIVE',
        sublabel:  'Entra al enlace',
        href:      'https://zeroferreira.github.io/ListaZero/index.html',
        icon:      'tiktok',
        theme:     'tiktok-music',
      },
      {
        type:      'row',
        id:        'apple-spotify-row',
        items: [
          {
            id:        'apple-music',
            label:     'Apple Music',
            sublabel:  'Escucha mi proyecto',
            href:      'https://music.apple.com/ug/artist/zero-fm/1608671787',
            icon:      'apple',
            theme:     'apple',
          },
          {
            id:        'spotify',
            label:     'Spotify',
            sublabel:  'Escucha mi proyecto',
            href:      'https://open.spotify.com/intl-es/artist/3PYFaujfW3f1RWZdBouxMm',
            icon:      'spotify',
            theme:     'spotify',
          },
        ],
      },
      {
        id:        'apple-playlist',
        label:     '¿No sabes qué escuchar?',
        sublabel:  'Escucha mi playlist en Apple Music. ¡Tiene de todo!',
        href:      'https://music.apple.com/mx/playlist/the-diversity-list/pl.u-9N9Lz63C2Gz9pr',
        icon:      'apple',
        theme:     'apple',
      },
      {
        id:        'youtube',
        label:     'YouTube',
        sublabel:  'Videos, drum covers y más',
        href:      'https://www.youtube.com/@zer0ferreira',
        icon:      'youtube',
        theme:     'youtube',
      },
    ],
  },
  {
    id:    'gaming',
    label: '🎮 Gaming',
    links: [
      {
        id:        'tiktok-gaming',
        label:     'TikTok Gaming',
        sublabel:  'LIVE, clips y gameplays 🥁🎮',
        href:      'https://www.tiktok.com/@game.zer0',
        icon:      'tiktok',
        theme:     'tiktok-gaming',
      },
    ],
  },
];
