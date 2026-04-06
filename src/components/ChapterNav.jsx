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
  { id: 12, title: 'Help Menu' },
];

export default function ChapterNav({ activeIndex, onChange }) {
  return (
    <div className="sidebar">
      {/* Brand header */}
      <div className="sidebar-header">
        <div className="brand-pill">
          <div className="brand-pill-dot" />
          <span className="brand-pill-label">Wenger</span>
        </div>
        <div className="sidebar-title">Transcend TS1</div>
        <div className="sidebar-subtitle">Interactive Guide · 12 Chapters</div>
      </div>

      {/* Section label */}
      <div className="sb-section-label">Chapters</div>

      {/* Chapter list */}
      <div className="chapter-list">
        {CHAPTERS.map((ch, i) => (
          <div
            key={ch.id}
            className={`ch-item ${i === activeIndex ? 'active' : ''}`}
            onClick={() => onChange(i)}
          >
            <span className="ch-num">{ch.id}</span>
            <div className="ch-divider" />
            <span className="ch-title">{ch.title}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="wenger-brand">
          <div className="w-mark">W</div>
          <span className="w-name">Wenger</span>
        </div>
        <span className="ver-badge">v1.0</span>
      </div>
    </div>
  );
}
