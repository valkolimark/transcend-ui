const CHAPTERS = [
  { id: 1, icon: '📶', title: 'Connect to Bluetooth' },
  { id: 2, icon: '⏺', title: 'Make & Save a Recording' },
  { id: 3, icon: '🎵', title: 'Selecting a Preset' },
  { id: 4, icon: '🔊', title: 'Preset Volume' },
  { id: 5, icon: '▶', title: 'Playback Controls' },
  { id: 6, icon: '⚡', title: 'Quick Settings Menu' },
  { id: 7, icon: '🎛', title: 'Stereo Mode' },
  { id: 8, icon: '🌐', title: 'Wireless Control' },
  { id: 9, icon: '⏻', title: 'Power Save / Standby' },
  { id: 10, icon: '📁', title: 'Managing Audio Files' },
  { id: 11, icon: '⚙', title: 'Settings' },
  { id: 12, icon: '?', title: 'Help Menu' },
];

export default function ChapterNav({ activeIndex, onChange }) {
  return (
    <div style={{
      width: 72,
      height: '100vh',
      background: '#08090d',
      borderRight: '1px solid rgba(255,255,255,0.06)',
      padding: '16px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowY: 'auto',
      flexShrink: 0,
    }}>
      {CHAPTERS.map((ch, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={ch.id}
            onClick={() => onChange(i)}
            title={ch.title}
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              margin: '4px 8px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
              cursor: 'pointer',
              background: isActive ? 'rgba(67, 97, 238, 0.18)' : 'transparent',
              border: isActive ? '1px solid rgba(67, 97, 238, 0.45)' : '1px solid transparent',
              transition: 'all 200ms ease',
            }}
          >
            <span style={{
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: '0.08em',
              color: isActive ? '#7C9EFF' : 'rgba(255,255,255,0.35)',
            }}>
              {String(ch.id).padStart(2, '0')}
            </span>
            <span style={{
              fontSize: 16,
              color: isActive ? '#7C9EFF' : 'rgba(255,255,255,0.40)',
            }}>
              {ch.icon}
            </span>
          </div>
        );
      })}

      <div style={{ flex: 1 }} />
      <span style={{
        fontSize: 9,
        letterSpacing: '0.15em',
        color: 'rgba(255,255,255,0.20)',
        marginBottom: 12,
      }}>WENGER</span>
    </div>
  );
}
