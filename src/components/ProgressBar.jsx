export default function ProgressBar({ progress }) {
  return (
    <div style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      width: '100%',
      height: 2,
      background: 'rgba(255,255,255,0.07)',
    }}>
      <div style={{
        width: `${(progress || 0) * 100}%`,
        height: '100%',
        background: 'linear-gradient(90deg, var(--blue-primary), var(--text-blue))',
        boxShadow: '0 0 6px rgba(124,158,255,0.50)',
        transition: 'width 60ms linear',
      }} />
    </div>
  );
}
