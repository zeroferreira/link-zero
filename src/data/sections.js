// ─────────────────────────────────────────────────────────────────────
//  ZERO FM — Link in Bio · Secciones y botones
//  Edita ESTE archivo para añadir, quitar o reordenar botones.
//
//  Cada sección tiene:
//    id      → identificador único (no cambiar)
//    label   → título visible de la sección
//    links   → array de botones (o filas de botones)
//
//  Tipos de botón:
//    Normal  → { id, label, sublabel, href, icon, theme }
//    Fila    → { type: 'row', id, items: [ ...botones ] }
//
//  Temas disponibles: 'tiktok-music' | 'tiktok-gaming' | 'spotify' | 'apple' | 'youtube'
//  Íconos disponibles: 'tiktok' | 'spotify' | 'apple' | 'youtube' | 'gamepad'
//  (ver src/components/icons.jsx para agregar más)
// ─────────────────────────────────────────────────────────────────────

export const sections = [
  // ── 🎵 Música ──────────────────────────────────────────────────────
  {
    id:    'music',
    label: '🎵 Música',
    links: [
      {
        type: 'row',
        id:   'song-request-row',
        items: [
          {
            id:       'tiktok-music',
            label:    'Pide una canción',
            sublabel: '¿Ya sabes qué pedir?',
            href:     'https://zeroferreira.github.io/ListaZero/index.html',
            icon:     'tiktok',
            theme:    'tiktok-music',
          },
          {
            id:       'song-list',
            label:    'Lista de peticiones',
            sublabel: 'Revisa la lista hasta ahora',
            href:     'https://zeroferreira.github.io/ListaZero/lista.html',
            icon:     'tiktok',
            theme:    'tiktok-music',
          },
        ],
      },
      {
        type: 'row',
        id:   'apple-spotify-row',
        items: [
          {
            id:       'apple-music',
            label:    'Apple Music',
            sublabel: 'Escucha mi proyecto',
            href:     'https://music.apple.com/ug/artist/zero-fm/1608671787',
            icon:     'apple',
            theme:    'apple',
          },
          {
            id:       'spotify',
            label:    'Spotify',
            sublabel: 'Escucha mi proyecto',
            href:     'https://open.spotify.com/intl-es/artist/3PYFaujfW3f1RWZdBouxMm',
            icon:     'spotify',
            theme:    'spotify',
          },
        ],
      },
      {
        id:       'apple-playlist',
        label:    '¿No sabes qué escuchar?',
        sublabel: 'Escucha mi playlist en Apple Music. ¡Tiene de todo!',
        href:     'https://music.apple.com/mx/playlist/the-diversity-list/pl.u-9N9Lz63C2Gz9pr',
        icon:     'apple',
        theme:    'apple',
      },
      {
        id:       'youtube',
        label:    'YouTube',
        sublabel: 'Videos, drum covers y más',
        href:     'https://www.youtube.com/@zer0ferreira',
        icon:     'youtube',
        theme:    'youtube',
      },
    ],
  },

  // ── 🎮 Gaming ──────────────────────────────────────────────────────
  {
    id:    'gaming',
    label: '🎮 Gaming',
    links: [
      {
        type: 'row',
        id:   'gaming-row',
        items: [
          {
            id:       'tiktok-gaming',
            label:    'TikTok Gaming',
            sublabel: 'LIVE, clips y gameplays 🥁🎮',
            href:     'https://www.tiktok.com/@game.zer0',
            icon:     'tiktok',
            theme:    'tiktok-gaming',
          },
          {
            id:       'twitch',
            label:    'Twitch',
            sublabel: 'Transmisiones en vivo',
            href:     'https://www.twitch.tv/zero0playz',
            icon:     'twitch',
            theme:    'twitch',
          },
        ],
      },
    ],
  },
];
