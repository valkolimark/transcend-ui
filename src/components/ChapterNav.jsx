const CHAPTERS = [
  { id: 1, title: 'Connect to Bluetooth' },
  { id: 2, title: 'Creating & Saving a Recording' },
  { id: 3, title: 'Exploring the Presets' },
  { id: 4, title: 'Adjust the Volume' },
  { id: 5, title: 'Playback Features' },
  { id: 6, title: 'Quick Settings' },
  { id: 7, title: 'Turn On Stereo Mode' },
  { id: 8, title: 'Connect to Wireless' },
  { id: 9, title: 'Standby Mode' },
  { id: 10, title: 'Audio Files' },
  { id: 11, title: 'Settings' },
  { id: 12, title: 'Help' },
];

export default function ChapterNav({ activeIndex, onChange }) {
  return (
    <div style={{
      width: 200,
      flexShrink: 0,
      background: '#0a0a0f',
      borderRight: '1px solid rgba(255,255,255,0.07)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflowY: 'auto',
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 14px 16px',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        color: 'var(--text-primary)',
        fontWeight: 600,
        fontSize: 13,
        lineHeight: 1.3,
        fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
      }}>
        What Would You Like to Learn?
      </div>

      {/* Menu items */}
      {CHAPTERS.map((ch, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={ch.id}
            onClick={() => onChange(i)}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 14px',
              minHeight: 48,
              cursor: 'pointer',
              background: isActive ? 'rgba(65,105,225,0.15)' : 'transparent',
              borderLeft: isActive ? '2px solid #4169E1' : '2px solid transparent',
              transition: 'background 150ms ease',
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = 'transparent';
            }}
          >
            <span style={{
              color: 'var(--text-tertiary)',
              fontWeight: 400,
              fontSize: 11,
              marginRight: 8,
              flexShrink: 0,
              fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
            }}>
              {ch.id}.
            </span>
            <span style={{
              color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
              fontSize: 13,
              fontWeight: isActive ? 600 : 400,
              fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
              lineHeight: 1.3,
            }}>
              {ch.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
