import { useRef, useState, useEffect } from 'react';

const PRESETS = [
  { id: 'studio-a', label: 'Studio A', desc: 'Intimate recording space with flat, natural response ideal for tracking and mixing.' },
  { id: 'studio-b', label: 'Studio B', desc: 'Warmer response optimized for vocal booths and live tracking sessions.' },
  { id: 'recital-hall', label: 'Recital Hall', desc: 'Small hall acoustics with subtle reverb and balanced reflection patterns.' },
  { id: 'chamber-hall', label: 'Chamber Hall', desc: 'Rich chamber sound with moderate reverb and warm early reflections.' },
  { id: 'concert-hall', label: 'Concert Hall', desc: 'Full orchestral hall with extended decay and natural audience absorption.' },
  { id: 'great-hall', label: 'Great Hall', desc: 'Grand performance space with expansive reverb and dramatic spatial depth.' },
  { id: 'chapel', label: 'Chapel', desc: 'Sacred space acoustic with long reverb tail and bright upper frequencies.' },
  { id: 'arena', label: 'Arena', desc: 'Large venue simulation with wide stereo field and stadium-scale reflections.' },
  { id: 'grand-cathedral', label: 'Grand Cathedral', desc: 'Majestic cathedral acoustics with soaring reverb and ethereal decay.' },
];

const basePath = import.meta.env.BASE_URL || '/';

/* ─── IMAGE ICON HELPER ─── */

function ImgIcon({ src, alt = '', size = 20, style = {} }) {
  return (
    <img
      src={`${basePath}images/${src}`}
      alt={alt}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        ...style,
      }}
    />
  );
}

/* ─── (MuteButton removed — now inline in sidebar) ─── */

/* ─── PRESET BUTTON ─── */

function PresetButton({ preset, isActive }) {
  return (
    <div style={{
      position: 'relative',
      height: '100%',
      minHeight: 62,
      borderRadius: 10,
      fontSize: 13,
      lineHeight: 1.3,
      fontWeight: isActive ? 600 : 400,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '0 8px',
      transition: 'all 0.28s cubic-bezier(0.34, 1.45, 0.64, 1)',
      background: isActive
        ? 'var(--blue-primary)'
        : 'var(--bg-button-idle)',
      border: isActive
        ? '1.5px solid var(--border-button-active)'
        : '1.5px solid var(--border-button-idle)',
      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
      boxShadow: isActive
        ? '0 0 18px var(--blue-glow), 0 4px 12px rgba(0,0,0,0.40)'
        : '0 2px 8px rgba(0,0,0,0.35)',
      transform: isActive ? 'scale(1.02)' : 'scale(1)',
      cursor: 'default',
    }}>
      {preset.label}
      {isActive && (
        <div style={{
          position: 'absolute',
          top: 5,
          right: 6,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 10,
          color: 'rgba(255,255,255,0.85)',
          fontStyle: 'italic',
        }}>
          i
        </div>
      )}
    </div>
  );
}

/* ─── INFO TOOLTIP ─── */

function InfoTooltip({ preset }) {
  const tooltipRef = useRef(null);
  const [placedBelow, setPlacedBelow] = useState(false);

  useEffect(() => {
    if (!tooltipRef.current || !preset) return;
    const el = tooltipRef.current;
    // Find the device screen container (the 480x320 root)
    let screen = el.closest('[data-transcend-screen]') || el.offsetParent;
    if (!screen) return;
    const screenRect = screen.getBoundingClientRect();
    const tooltipRect = el.getBoundingClientRect();
    // If tooltip overflows top of device screen, flip below
    setPlacedBelow(tooltipRect.top < screenRect.top);

    // Horizontal clamp: keep within device screen with 8px padding
    if (tooltipRect.left < screenRect.left + 8) {
      el.style.left = '0';
      el.style.transform = 'none';
    } else if (tooltipRect.right > screenRect.right - 8) {
      el.style.left = 'auto';
      el.style.right = '0';
      el.style.transform = 'none';
    }
  }, [preset]);

  if (!preset) return null;

  const placement = placedBelow
    ? { top: 'calc(100% + 10px)', bottom: 'auto' }
    : { bottom: 'calc(100% + 10px)', top: 'auto' };

  const arrowStyle = {
    position: 'absolute',
    left: '50%',
    width: 9,
    height: 9,
    background: 'var(--bg-tooltip)',
    borderRight: '1px solid var(--border-tooltip)',
    borderBottom: '1px solid var(--border-tooltip)',
  };

  const arrowPlacement = placedBelow
    ? { top: -5, transform: 'translateX(-50%) rotate(225deg)' }
    : { bottom: -5, transform: 'translateX(-50%) rotate(45deg)' };

  return (
    <div ref={tooltipRef} style={{
      position: 'absolute',
      zIndex: 50,
      width: 215,
      maxWidth: 'calc(100% - 16px)',
      background: 'var(--bg-tooltip)',
      border: '1px solid var(--border-tooltip)',
      borderRadius: 10,
      padding: '10px 13px',
      boxShadow: '0 8px 28px rgba(0,0,0,0.65)',
      animation: 'fadeInUp 320ms cubic-bezier(0.34, 1.2, 0.64, 1) forwards',
      left: '50%',
      transform: 'translateX(-50%)',
      ...placement,
    }}>
      <div style={{
        fontSize: 9,
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--text-blue)',
        marginBottom: 5,
      }}>
        {preset.label}
      </div>
      <div style={{
        fontSize: 11.5,
        lineHeight: 1.55,
        color: 'rgba(255,255,255,0.60)',
      }}>
        {preset.desc}
      </div>
      <div style={{ ...arrowStyle, ...arrowPlacement }} />
    </div>
  );
}

/* ─── QUICK SETTINGS PANEL ─── */

function QuickSettingsPanel({ stereoModeActive, bluetoothActive }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: 432,
      height: 180,
      background: 'var(--qs-bg)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '0 0 12px 12px',
      padding: '12px 10px 10px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.70)',
      animation: 'slideDownPanel 380ms cubic-bezier(0.34, 1.1, 0.64, 1) forwards',
      zIndex: 40,
    }}>
      {/* Row 1 — Two toggle pills spanning 2 columns each on same grid as Row 2 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 6,
        marginBottom: 4,
      }}>
        {[
          { key: 'stereo', label: 'Stereo Mode', active: stereoModeActive,
            imgOn: 'stero_mode_connected.png', imgOff: 'steromode_btn_drk.png' },
          { key: 'bt', label: bluetoothActive ? 'Connected' : 'Bluetooth', active: bluetoothActive,
            imgOn: 'bluetooth_connected.png', imgOff: 'bluetooth_dark.png' },
        ].map(btn => (
          <div key={btn.key} style={{ gridColumn: 'span 2', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <img
              src={`${basePath}images/${btn.active ? btn.imgOn : btn.imgOff}`}
              alt={btn.label}
              style={{
                width: '100%',
                height: 44,
                objectFit: 'fill',
                borderRadius: 10,
              }}
            />
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              color: btn.active ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.38)',
              letterSpacing: '0.02em',
            }}>{btn.label}</span>
          </div>
        ))}
      </div>

      {/* Row 2 — Four action buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 6,
      }}>
        {[
          { key: 'help', label: 'Help', img: 'helo_btn_drk.png' },
          { key: 'net', label: 'Net Control', img: 'net_control_btn_drk.png' },
          { key: 'settings', label: 'Settings', img: 'settings_btn_drk.png' },
          { key: 'standby', label: 'Standby', img: 'standby_btn_drk.png' },
        ].map(btn => (
          <div key={btn.key} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
            <img
              src={`${basePath}images/${btn.img}`}
              alt={btn.label}
              style={{
                width: '100%',
                height: 48,
                objectFit: 'fill',
                borderRadius: 10,
              }}
            />
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.38)',
            }}>{btn.label}</span>
          </div>
        ))}
      </div>

      <div style={{
        width: 36,
        height: 3,
        background: 'rgba(255,255,255,0.18)',
        borderRadius: 2,
        margin: '6px auto 0',
      }} />
    </div>
  );
}

/* ─── AUX INPUTS PANEL ─── */

function AuxInputsPanel() {
  const channels = [
    { label: 'Bluetooth: Connected', connected: true, level: 0.65 },
    { label: 'RCA', connected: false, level: 0.3, disabled: true },
    { label: 'Balanced 1', connected: false, level: 0.5 },
    { label: 'Balanced 2', connected: false, level: 0.4 },
  ];

  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, width: 432, bottom: 0,
      background: 'var(--bg-panel)',
      animation: 'slideInRight 400ms cubic-bezier(0.34, 1.1, 0.64, 1) forwards',
      zIndex: 40,
    }}>
      <div style={{
        height: 36,
        padding: '0 10px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Aux Inputs</span>
        <div style={{
          width: 32, height: 28, borderRadius: 6,
          border: '1.5px solid var(--border-sidebar-box)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <ImgIcon src="aux_menu_icon.png" alt="Aux" size={13} />
        </div>
      </div>

      {channels.map(ch => (
        <div key={ch.label} style={{
          height: 52,
          padding: '0 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          ...(ch.disabled ? {
            background: 'var(--aux-row-disabled)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 8,
            margin: '0 6px',
            opacity: 0.35,
          } : {}),
        }}>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>{ch.label}</span>
          <div style={{
            width: 8, height: 8, borderRadius: '50%', flexShrink: 0,
            background: ch.connected ? 'var(--aux-signal-on)' : 'var(--aux-signal-off)',
          }} />
          <div style={{
            flex: 1, height: 3, background: 'rgba(255,255,255,0.12)',
            borderRadius: 2, position: 'relative',
          }}>
            <div style={{
              width: `${ch.level * 100}%`, height: '100%',
              background: 'var(--blue-primary)', borderRadius: 2,
            }} />
            <div style={{
              position: 'absolute', top: -5.5,
              left: `${ch.level * 100}%`, transform: 'translateX(-50%)',
              width: 14, height: 14, borderRadius: '50%', background: '#FFFFFF',
            }} />
          </div>
          <ImgIcon src="sound_on_btn.png" alt="Speaker" size={18} />
        </div>
      ))}
    </div>
  );
}

/* ─── MODAL COMPONENTS ─── */

function ModalBase({ children, width = 260 }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 50,
    }}>
      <div style={{
        width,
        borderRadius: 14,
        background: 'var(--modal-bg)',
        border: '1px solid var(--modal-border)',
        boxShadow: '0 16px 48px rgba(0,0,0,0.75)',
        padding: '22px 18px',
        animation: 'modalEnter 280ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards',
      }}>
        {children}
      </div>
    </div>
  );
}

function ModalBluetooth() {
  return (
    <ModalBase>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
        Bluetooth Pairing...
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', textAlign: 'center', lineHeight: 1.6, marginBottom: 8 }}>
        Look for the Device ID:
      </div>
      <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-blue)', textAlign: 'center', marginBottom: 16 }}>
        Transcend-0186
      </div>
      <img
        src={`${basePath}images/cancel_btn_drk.png`}
        alt="Cancel"
        style={{ width: '100%', height: 42, objectFit: 'contain', cursor: 'default', borderRadius: 9 }}
      />
    </ModalBase>
  );
}

function ModalQRWebUI() {
  return (
    <ModalBase width={380}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: 12 }}>
        Control Over Local Network
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
        <ImgIcon src="web_ui_qr_code.png" alt="QR Code" size={110} style={{ width: 110, height: 110, borderRadius: 6, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 6 }}>
            Scan to open Web Browser
          </div>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
            You must be connected to the same Wi-Fi Network as Transcend.
          </div>
        </div>
      </div>
      <img
        src={`${basePath}images/close_btn_active.png`}
        alt="Close"
        style={{ width: '100%', height: 42, objectFit: 'contain', cursor: 'default', borderRadius: 9 }}
      />
    </ModalBase>
  );
}

function ModalQRHelp() {
  return (
    <ModalBase width={380}>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: 12 }}>
        Online User Guide
      </div>
      <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start', marginBottom: 14 }}>
        <ImgIcon src="online_user_guide_QR_code.png" alt="QR Code" size={110} style={{ width: 110, height: 110, borderRadius: 6, flexShrink: 0 }} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', lineHeight: 1.6 }}>
            Scan to access online Product Manuals, How-To Videos, and more information.
          </div>
        </div>
      </div>
      <img
        src={`${basePath}images/close_btn_active.png`}
        alt="Close"
        style={{ width: '100%', height: 42, objectFit: 'contain', cursor: 'default', borderRadius: 9 }}
      />
    </ModalBase>
  );
}

function ModalEnterStandby() {
  return (
    <ModalBase>
      <div style={{ fontSize: 15, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
        Enter Standby Mode...
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)', textAlign: 'center', lineHeight: 1.6, marginBottom: 16 }}>
        Turn off the screen and disable audio?
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <img
          src={`${basePath}images/cancel_btn_drk.png`}
          alt="Cancel"
          style={{ flex: '0 0 48%', height: 42, objectFit: 'contain', cursor: 'default', borderRadius: 9 }}
        />
        <img
          src={`${basePath}images/yes_btn_active.png`}
          alt="Yes"
          style={{ flex: '0 0 48%', height: 42, objectFit: 'contain', cursor: 'default', borderRadius: 9 }}
        />
      </div>
    </ModalBase>
  );
}

function ModalStandbyScreen() {
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0, bottom: 0,
      background: '#000000',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      zIndex: 60,
      animation: 'fadeIn 400ms ease forwards',
    }}>
      <div style={{
        position: 'absolute', top: 12, left: 0, right: 0,
        display: 'flex', justifyContent: 'center', gap: 24,
      }}>
        {['⚙', '?', '☰', '✕'].map((icon, i) => (
          <span key={i} style={{ fontSize: 18, color: 'rgba(255,255,255,0.12)' }}>{icon}</span>
        ))}
      </div>
      <div style={{
        background: 'rgba(18, 20, 30, 1.0)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 16, padding: '28px 22px', width: 260, textAlign: 'center',
      }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>
          System in Standby
        </div>
        <img
          src={`${basePath}images/wakeup_btn_active.png`}
          alt="Wake Up"
          style={{ width: '100%', height: 50, objectFit: 'contain', cursor: 'default', borderRadius: 11 }}
        />
      </div>
    </div>
  );
}

function ModalAdminLogin({ passcodeDisplay = '------' }) {
  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['Delete', '0', 'Enter'],
  ];

  return (
    <ModalBase width={260}>
      <div style={{
        position: 'absolute', top: 10, right: 10,
        width: 26, height: 26, borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <ImgIcon src="discard_btn.png" alt="Close" size={14} />
      </div>

      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16,
      }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: '#FFFFFF', letterSpacing: '6px' }}>
          {passcodeDisplay}
        </div>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <ellipse cx="10" cy="10" rx="8" ry="5" stroke="rgba(255,255,255,0.40)" strokeWidth="1.5" fill="none" />
          <circle cx="10" cy="10" r="3" fill="rgba(255,255,255,0.40)" />
        </svg>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 5 }}>
        {keys.flat().map(key => (
          <div key={key} style={{
            height: 46, borderRadius: 7,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: key === 'Delete' || key === 'Enter' ? 12 : 17,
            fontWeight: key === 'Delete' || key === 'Enter' ? 600 : 400,
            color: key === 'Delete' || key === 'Enter' ? 'rgba(255,255,255,0.50)' : '#FFFFFF',
          }}>{key}</div>
        ))}
      </div>
    </ModalBase>
  );
}

/* ─── TRANSPORT BAR VARIANTS (Figma-derived proportional layout) ─── */

/* ─── TRANSPORT BAR — Figma 710×78 → scaled to 425×48 ─── */

function TransportDefault() {
  return (
    <div className="tbar-default">
      <div className="tbar-left">
        <div className="tbar-menu-cell">
          <img src={`${basePath}images/playback_menu_icon.png`} className="tbar-menu-icon" alt="Files" />
        </div>
        <div className="tbar-rec-btn">
          <img src={`${basePath}images/rec_btn.png`} className="tbar-rec-icon" alt="REC" />
          <span className="tbar-rec-label">REC</span>
        </div>
      </div>
      <div className="tbar-controls">
        <img src={`${basePath}images/back_drk_btn.png`} className="tbar-ctrl-icon" alt="Skip back" />
        <img src={`${basePath}images/play_btn.png`} className="tbar-ctrl-icon" alt="Play" />
        <img src={`${basePath}images/forward_btn.png`} className="tbar-ctrl-icon" alt="Skip forward" />
      </div>
      <div className="tbar-vol-cell">
        <img src={`${basePath}images/audio_on.png`} className="tbar-vol-icon" alt="Volume" />
      </div>
    </div>
  );
}

function TransportRecording() {
  return (
    <div className="tbar-default">
      <div className="tbar-menu-cell">
        <img src={`${basePath}images/playback_menu_icon.png`} className="tbar-menu-icon" alt="Files" />
      </div>
      <div className="tbar-mid-recording">
        <div className="tbar-stop-btn">
          <img src={`${basePath}images/stop_btn.png`} className="tbar-rec-icon stop-pulse" alt="Stop" />
          <span className="tbar-btn-label">Stop</span>
        </div>
        <div className="tbar-btn-divider" />
        <div className="tbar-discard-btn">
          <img src={`${basePath}images/discard_btn.png`} className="tbar-ctrl-icon" alt="Discard" />
          <span className="tbar-btn-label">Discard</span>
        </div>
      </div>
      <div className="tbar-vol-cell">
        <img src={`${basePath}images/audio_on.png`} className="tbar-vol-icon" alt="Volume" />
      </div>
    </div>
  );
}

function TransportRecordedPaused() {
  return (
    <div className="tbar-default">
      <div className="tbar-menu-cell">
        <img src={`${basePath}images/playback_menu_icon.png`} className="tbar-menu-icon" alt="Files" />
      </div>
      <div className="tbar-mid-preview">
        <div className="tbar-preview-buttons">
          <div className="tbar-save-btn">
            <img src={`${basePath}images/save_btn.png`} className="tbar-ctrl-icon" alt="Save" />
            <span className="tbar-btn-label">Save</span>
          </div>
          <div className="tbar-btn-divider" />
          <div className="tbar-play-preview">
            <img src={`${basePath}images/play_btn.png`} className="tbar-ctrl-icon" alt="Play" />
          </div>
          <div className="tbar-btn-divider" />
          <div className="tbar-discard-prev">
            <img src={`${basePath}images/discard_btn.png`} className="tbar-ctrl-icon" alt="Discard" />
            <span className="tbar-btn-label">Discard</span>
          </div>
        </div>
      </div>
      <div className="tbar-vol-cell tbar-vol-highlighted">
        <img src={`${basePath}images/audio_on.png`} className="tbar-vol-icon" alt="Volume" />
      </div>
    </div>
  );
}

function TransportRecordedPlaying() {
  return (
    <div className="tbar-default">
      <div className="tbar-menu-cell">
        <img src={`${basePath}images/playback_menu_icon.png`} className="tbar-menu-icon" alt="Files" />
      </div>
      <div className="tbar-mid-preview">
        <div className="tbar-preview-buttons">
          <div className="tbar-save-btn">
            <img src={`${basePath}images/save_btn.png`} className="tbar-ctrl-icon" alt="Save" />
            <span className="tbar-btn-label">Save</span>
          </div>
          <div className="tbar-btn-divider" />
          <div className="tbar-play-preview">
            <img src={`${basePath}images/pause_btn.png`} className="tbar-ctrl-icon" alt="Pause" />
          </div>
          <div className="tbar-btn-divider" />
          <div className="tbar-discard-prev">
            <img src={`${basePath}images/discard_btn.png`} className="tbar-ctrl-icon" alt="Discard" />
            <span className="tbar-btn-label">Discard</span>
          </div>
        </div>
      </div>
      <div className="tbar-vol-cell tbar-vol-highlighted">
        <img src={`${basePath}images/audio_on.png`} className="tbar-vol-icon" alt="Volume" />
      </div>
    </div>
  );
}

function TransportPlayback({ playbackProgress = 0.65 }) {
  return (
    <div className="tbar-default" style={{ background: '#202223' }}>
      <div className="tbar-menu-cell">
        <img src={`${basePath}images/playback_menu_icon.png`} className="tbar-menu-icon" alt="Files" />
      </div>
      <div className="tbar-mid-playback">
        <span className="tbar-playback-label">Playback</span>
        <div className="tbar-scrubber">
          <div className="tbar-scrubber-fill" style={{ width: `${playbackProgress * 100}%` }} />
          <img
            src={`${basePath}images/playback_slider_dot.png`}
            className="tbar-scrubber-dot"
            style={{ left: `${playbackProgress * 100}%` }}
            alt="scrubber"
          />
        </div>
      </div>
      <div className="tbar-vol-cell" style={{ borderLeft: '1px solid #454950' }}>
        <img src={`${basePath}images/audio_on.png`} className="tbar-vol-icon" alt="Volume" />
      </div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */

export default function TranscendUI({
  activePreset = 'studio-a',
  showInfoTooltip = false,
  infoPresetId = null,
  transportState = 'default',
  quickSettingsOpen = false,
  stereoModeActive = false,
  bluetoothActive = false,
  auxPanelOpen = false,
  modalType = null,
  volumeLevel = 0.55,
  playbackProgress = 0.22,
  recordingActive = false,
  muteActive = false,
  trackLabel = 'Track 1',
  timestamp = '01:10.32',
  recordingHeader = null,
  fileListOpen = false,
  fileListTracks = null,
  fileContextMenu = null,
  settingsScreen = false,
  browserChrome = false,
  passcodeDisplay = '------',
  recStepDuration = 3500,
}) {
  /* Layout constants */
  const SIDEBAR_W = 55;
  const MAIN_W = 480 - SIDEBAR_W; /* 425 */
  const TRANSPORT_H = 48;
  const SCRUB_H = 20;
  const PROGRESS_H = 3;
  const HEADER_H = 32;
  const GRID_TOP = HEADER_H;
  const SCRUB_TOP = 320 - TRANSPORT_H - PROGRESS_H - SCRUB_H; /* 249 */
  const PROGRESS_TOP = SCRUB_TOP + SCRUB_H; /* 269 */
  const TRANSPORT_TOP = PROGRESS_TOP + PROGRESS_H; /* 272 */

  /* Volume slider — Figma-derived, scaled to 55×320 sidebar */
  const SB_TRACK_H = 200;
  const SB_KNOB = 26;
  const SB_TRACK_TOP = 56;        /* below aux area */
  const sbKnobTravel = SB_TRACK_H - SB_KNOB;
  const sbKnobTop = (1 - volumeLevel) * sbKnobTravel;
  const sbFillTop = sbKnobTop + SB_KNOB / 2;
  const sbFillHeight = Math.max(0, SB_TRACK_H - sbFillTop);

  const infoPreset = infoPresetId ? PRESETS.find(p => p.id === infoPresetId) : null;

  return (
    <div data-transcend-screen style={{
      position: 'relative',
      width: 480,
      height: 320,
      background: 'var(--bg-device)',
      border: '2px solid var(--border-device)',
      boxShadow: '0 32px 96px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.07)',
      fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
    }}>
      {/* ─── CONTENT CLIP WRAPPER ─── */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        overflow: 'hidden',
      }}>

      {/* ─── MAIN PANEL (left area) ─── */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: MAIN_W, height: SCRUB_TOP,
        background: 'var(--bg-panel)',
      }}>
        {/* Header row */}
        <div style={{
          height: HEADER_H,
          padding: '0 12px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontSize: 11,
            fontWeight: 300,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.04em',
          }}>Active Acoustics</span>
        </div>

        {/* Preset grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 6,
          padding: '0 10px 8px',
          height: `calc(100% - ${HEADER_H}px)`,
        }}>
          {PRESETS.map(preset => (
            <div key={preset.id} style={{ position: 'relative' }}>
              <PresetButton
                preset={preset}
                isActive={activePreset === preset.id}
              />
              {showInfoTooltip && infoPresetId === preset.id && infoPreset && (
                <InfoTooltip preset={infoPreset} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ─── RIGHT SIDEBAR (Figma-derived) ─── */}
      <div className="right-sidebar" style={{
        position: 'absolute',
        left: MAIN_W,
        top: 0,
        width: SIDEBAR_W,
        height: 320,
      }}>
        {/* Aux button + divider */}
        <div className="sb-top">
          <div className="sb-aux-btn">
            <img src={`${basePath}images/aux_menu_icon.png`} alt="Aux" />
          </div>
          <div className="sb-top-divider" />
        </div>

        {/* Volume slider */}
        <div className="sb-slider" style={{ top: SB_TRACK_TOP }}>
          <div className="sb-track" />
          <div
            className="sb-fill"
            style={{
              top: sbFillTop,
              height: sbFillHeight,
              opacity: muteActive ? 0.25 : 1,
            }}
          />
          <div
            className="sb-knob"
            style={{
              top: sbKnobTop,
              opacity: muteActive ? 0.4 : 1,
            }}
          >
            <div className="sb-knob-outer" />
            <div className="sb-knob-inner" />
          </div>
        </div>

        {/* Mute button */}
        <div className="sb-mute">
          <img
            src={`${basePath}images/${muteActive ? 'muted_icon.png' : 'unmuted_icon.png'}`}
            alt={muteActive ? 'Unmute' : 'Mute'}
          />
        </div>
      </div>

      {/* ─── SCRUB ROW ─── */}
      <div style={{
        position: 'absolute',
        top: SCRUB_TOP,
        left: 0,
        width: MAIN_W,
        height: SCRUB_H,
        padding: '0 12px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: 'var(--bg-panel)',
      }}>
        <span style={{ fontSize: 10, fontWeight: 300 }}>
          <span style={{ color: 'var(--text-muted)' }}>Selected: </span>
          <span style={{ color: 'var(--text-tertiary)' }}>{trackLabel}</span>
        </span>
        <span style={{ fontSize: 10, fontWeight: 300, color: 'var(--text-tertiary)' }}>
          {timestamp}
        </span>
      </div>

      {/* Status header (replaces scrub row when recording/previewing) */}
      {recordingHeader && (
        <div className="t-status-header" style={{
          position: 'absolute',
          top: SCRUB_TOP,
          left: 0,
          width: MAIN_W,
          height: SCRUB_H,
        }}>
          <span className="t-status-text">{recordingHeader}</span>
          <span className="t-status-text">{timestamp}</span>
        </div>
      )}

      {/* ─── PROGRESS BAR ─── */}
      <div style={{
        position: 'absolute',
        top: PROGRESS_TOP,
        left: 0,
        width: MAIN_W,
        height: PROGRESS_H,
        background: 'var(--progress-track)',
      }}>
        <div style={{
          height: '100%',
          background: 'var(--progress-fill)',
          ...(transportState === 'recording'
            ? {
                animation: `recSweep ${recStepDuration}ms linear forwards`,
                transition: 'none',
              }
            : {
                width: `${playbackProgress * 100}%`,
                transition: 'width 300ms linear',
              }
          ),
        }} />
        {transportState !== 'recording' && (
          <div style={{
            position: 'absolute',
            top: -2.5,
            left: `${playbackProgress * 100}%`,
            transform: 'translateX(-50%)',
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--progress-dot)',
            boxShadow: '0 0 4px rgba(255,255,255,0.60)',
            transition: 'left 300ms linear',
          }} />
        )}
      </div>

      {/* ─── TRANSPORT BAR ─── */}
      <div style={{
        position: 'absolute',
        top: TRANSPORT_TOP,
        left: 0,
        width: MAIN_W,
        height: TRANSPORT_H,
        overflow: 'hidden',
      }}>
        {transportState === 'default' && <TransportDefault />}
        {transportState === 'recording' && <TransportRecording />}
        {transportState === 'recorded-paused' && <TransportRecordedPaused />}
        {transportState === 'recorded-playing' && <TransportRecordedPlaying />}
        {transportState === 'playback' && <TransportPlayback playbackProgress={playbackProgress} />}
      </div>

      {/* ─── FILE LIST PANEL ─── */}
      {fileListOpen && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: MAIN_W, bottom: TRANSPORT_H + PROGRESS_H + SCRUB_H,
          background: 'var(--bg-panel)',
          zIndex: 35,
          animation: 'fadeInUp 300ms ease forwards',
        }}>
          <div style={{
            height: 36,
            background: 'var(--bg-transport)',
            display: 'flex', gap: 6, padding: '6px 10px',
          }}>
            {['Local (120 min. left)', 'USB'].map((tab, i) => (
              <div key={tab} style={{
                flex: 1, height: 24, borderRadius: 7,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 12,
                background: i === 0 ? 'var(--file-tab-active)' : 'var(--bg-button-idle)',
                border: i === 0 ? '1.5px solid var(--file-tab-border)' : '1.5px solid var(--border-button-idle)',
                color: i === 0 ? 'var(--text-primary)' : 'var(--text-tertiary)',
              }}>{tab}</div>
            ))}
          </div>
          <div style={{ overflow: 'auto' }}>
            {(fileListTracks || ['Track 1', 'Track 2', 'Track 3']).map((track, i) => (
              <div key={i} style={{
                height: 40,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                borderBottom: '1px solid rgba(255,255,255,0.04)',
                padding: '0 12px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 14, color: i === 0 ? 'var(--blue-primary)' : 'rgba(255,255,255,0.35)' }}>&#9834;</span>
                  <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{track}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── FILE CONTEXT MENU ─── */}
      {fileContextMenu && (
        <div style={{
          position: 'absolute',
          left: fileContextMenu.x || 100, top: fileContextMenu.y || 200,
          width: 120,
          background: 'var(--modal-bg)',
          border: '1px solid var(--modal-border)',
          borderRadius: 8, padding: '6px 0',
          zIndex: 55,
          animation: 'fadeIn 200ms ease forwards',
        }}>
          <div style={{ padding: '8px 14px', fontSize: 13, color: '#E03131', cursor: 'default', display: 'flex', alignItems: 'center', gap: 6 }}>
            <ImgIcon src="delete_btn_trash.png" alt="Delete" size={14} />
            Delete
          </div>
        </div>
      )}

      {/* ─── SETTINGS SCREEN ─── */}
      {settingsScreen && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, width: MAIN_W, bottom: 0,
          background: 'var(--bg-device)',
          zIndex: 45,
          animation: 'slideInRight 300ms ease forwards',
          padding: '16px 14px',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>Settings</div>
          {['Network', 'Audio', 'Display', 'Device Info', 'Factory Reset'].map(item => (
            <div key={item} style={{
              height: 44,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '0 8px',
            }}>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{item}</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.30)' }}>&#8250;</span>
            </div>
          ))}
        </div>
      )}

      {/* ─── OVERLAYS (inside clip wrapper) ─── */}
      {quickSettingsOpen && (
        <QuickSettingsPanel stereoModeActive={stereoModeActive} bluetoothActive={bluetoothActive} />
      )}
      {auxPanelOpen && <AuxInputsPanel />}

      </div>{/* ─── END CONTENT CLIP WRAPPER ─── */}

      {/* ─── MODALS (outside clip wrapper so they aren't clipped) ─── */}
      {modalType === 'bluetooth-pairing' && <ModalBluetooth />}
      {modalType === 'qr-web-ui' && <ModalQRWebUI />}
      {modalType === 'qr-help' && <ModalQRHelp />}
      {modalType === 'enter-standby' && <ModalEnterStandby />}
      {modalType === 'standby-screen' && <ModalStandbyScreen />}
      {modalType === 'admin-login' && <ModalAdminLogin passcodeDisplay={passcodeDisplay} />}

      {/* ─── BROWSER CHROME (for Ch08) ─── */}
      {browserChrome && (
        <div style={{
          position: 'absolute',
          top: -32, left: -2, right: -2, height: 32,
          background: '#1a1a1a',
          borderRadius: '8px 8px 0 0',
          display: 'flex', alignItems: 'center', padding: '0 12px', gap: 8,
        }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>&#8249; &#8250;</span>
          <div style={{
            flex: 1, height: 20, borderRadius: 10,
            background: 'rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', padding: '0 10px',
          }}>
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.40)' }}>
              https://transcend.local/webui
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
