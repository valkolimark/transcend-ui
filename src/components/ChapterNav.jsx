const CHAPTERS = [
  { id: 1, icon: '\u{1F4F6}', title: 'Bluetooth' },
  { id: 2, icon: '\u23FA', title: 'Recording' },
  { id: 3, icon: '\u{1F3B5}', title: 'Presets' },
  { id: 4, icon: '\u{1F50A}', title: 'Volume' },
  { id: 5, icon: '\u25B6', title: 'Playback' },
  { id: 6, icon: '\u26A1', title: 'Quick Settings' },
  { id: 7, icon: '\u{1F39B}', title: 'Stereo Mode' },
  { id: 8, icon: '\u{1F310}', title: 'Wireless' },
  { id: 9, icon: '\u23FB', title: 'Standby' },
  { id: 10, icon: '\u{1F4C1}', title: 'Audio Files' },
  { id: 11, icon: '\u2699', title: 'Settings' },
  { id: 12, icon: '?', title: 'Help' },
];

export default function ChapterNav({ activeIndex, onChange }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 6,
      padding: 6,
      width: 280,
      flexShrink: 0,
      alignSelf: 'center',
    }}>
      {CHAPTERS.map((ch, i) => {
        const isActive = i === activeIndex;
        return (
          <div
            key={ch.id}
            onClick={() => onChange(i)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              padding: '10px 4px 8px',
              borderRadius: 10,
              cursor: 'pointer',
              background: isActive ? 'rgba(65, 105, 225, 0.18)' : 'rgba(255,255,255,0.03)',
              border: isActive ? '1px solid rgba(65, 105, 225, 0.45)' : '1px solid rgba(255,255,255,0.06)',
              transition: 'all 200ms ease',
            }}
          >
            <span style={{
              fontSize: 20,
              lineHeight: 1,
              color: isActive ? '#7CA8FF' : 'rgba(255,255,255,0.40)',
            }}>
              {ch.icon}
            </span>
            <span style={{
              fontSize: 9,
              fontWeight: 600,
              color: isActive ? '#7CA8FF' : 'rgba(255,255,255,0.35)',
              textAlign: 'center',
              lineHeight: 1.2,
              letterSpacing: '0.02em',
              fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
            }}>
              {ch.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
