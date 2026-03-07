export default function Callout({ text, visible }) {
  if (!text) return null;

  return (
    <div style={{
      position: 'absolute',
      bottom: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 100,
      pointerEvents: 'none',
      animation: visible ? 'fadeInUp 350ms cubic-bezier(0.34,1.2,0.64,1) forwards' : 'fadeOutUp 200ms ease-in forwards',
    }}>
      <div style={{
        background: 'rgba(10, 12, 20, 0.92)',
        border: '1px solid rgba(75, 110, 230, 0.40)',
        borderRadius: 24,
        padding: '9px 22px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.40)',
        whiteSpace: 'nowrap',
      }}>
        <span style={{
          fontSize: 13,
          fontWeight: 400,
          color: 'rgba(255,255,255,0.85)',
          letterSpacing: '0.01em',
        }}>
          {text}
        </span>
      </div>
    </div>
  );
}
