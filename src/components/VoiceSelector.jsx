const VOICES = [
  { id: 'ava', name: 'Ava' },
  { id: 'jenny', name: 'Jenny' },
  { id: 'aria', name: 'Aria' },
  { id: 'michelle', name: 'Michelle' },
  { id: 'off', name: 'Off' },
];

export default function VoiceSelector({ value, onChange }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 6,
    }}>
      <span style={{
        fontSize: 9,
        fontWeight: 600,
        color: 'rgba(255,255,255,0.30)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
      }}>Voice</span>
      {VOICES.map(v => {
        const isActive = v.id === value;
        return (
          <button
            key={v.id}
            onClick={() => onChange(v.id)}
            style={{
              background: isActive ? 'rgba(65, 105, 225, 0.22)' : 'rgba(255,255,255,0.04)',
              border: isActive ? '1px solid rgba(65, 105, 225, 0.50)' : '1px solid rgba(255,255,255,0.08)',
              borderRadius: 6,
              padding: '4px 10px',
              fontSize: 10,
              fontWeight: 600,
              color: isActive ? '#7CA8FF' : 'rgba(255,255,255,0.40)',
              cursor: 'pointer',
              fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
              transition: 'all 150ms ease',
            }}
          >
            {v.name}
          </button>
        );
      })}
    </div>
  );
}
