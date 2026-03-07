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

function PresetButton({ preset, isActive, onInfoBadge }) {
  const active = isActive;
  return (
    <div style={{
      position: 'relative',
      height: 62,
      borderRadius: 10,
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      letterSpacing: '0.005em',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.30s cubic-bezier(0.34, 1.56, 0.64, 1)',
      background: active
        ? 'linear-gradient(145deg, #4361EE 0%, #3b55d8 100%)'
        : 'var(--bg-button-idle)',
      border: active
        ? '1.5px solid var(--border-button-active)'
        : '1.5px solid var(--border-button-idle)',
      color: active ? '#FFFFFF' : 'var(--text-secondary)',
      boxShadow: active
        ? '0 0 22px rgba(67, 97, 238, 0.50), 0 4px 14px rgba(0, 0, 0, 0.40)'
        : '0 2px 6px rgba(0,0,0,0.30)',
      transform: active ? 'scale(1.02)' : 'scale(1)',
      cursor: 'default',
    }}>
      {preset.label}
      {active && (
        <div style={{
          position: 'absolute',
          top: 6,
          right: 7,
          width: 15,
          height: 15,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 9,
          color: 'rgba(255,255,255,0.80)',
        }}>
          i
        </div>
      )}
    </div>
  );
}

function InfoTooltip({ preset }) {
  if (!preset) return null;
  return (
    <div style={{
      position: 'absolute',
      zIndex: 50,
      width: 220,
      background: 'var(--bg-tooltip)',
      border: '1px solid var(--border-tooltip)',
      borderRadius: 10,
      padding: '11px 15px',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.65), 0 0 0 1px rgba(75, 110, 230, 0.15)',
      animation: 'fadeInUp 350ms cubic-bezier(0.34, 1.2, 0.64, 1) forwards',
      left: '50%',
      transform: 'translateX(-50%)',
      bottom: '100%',
      marginBottom: 8,
    }}>
      <div style={{
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--text-blue)',
        marginBottom: 5,
      }}>
        {preset.label}
      </div>
      <div style={{
        fontSize: 12,
        lineHeight: 1.55,
        color: 'rgba(255,255,255,0.65)',
      }}>
        {preset.desc}
      </div>
      <div style={{
        position: 'absolute',
        bottom: -6,
        left: '50%',
        transform: 'translateX(-50%) rotate(45deg)',
        width: 10,
        height: 10,
        background: 'var(--bg-tooltip)',
        borderRight: '1px solid var(--border-tooltip)',
        borderBottom: '1px solid var(--border-tooltip)',
      }} />
    </div>
  );
}

function QuickSettingsPanel({ stereoModeActive, bluetoothActive }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 160,
      background: 'rgba(10, 12, 20, 0.97)',
      borderBottom: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '0 0 14px 14px',
      padding: '16px 14px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.70)',
      animation: 'slideDownPanel 400ms cubic-bezier(0.34, 1.1, 0.64, 1) forwards',
      zIndex: 40,
    }}>
      {/* Row 1 — Toggle pills */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
        {[
          { label: 'Stereo Mode', icon: '🎛', active: stereoModeActive },
          { label: 'Bluetooth', icon: '📶', active: bluetoothActive },
        ].map(btn => (
          <div key={btn.label} style={{
            flex: 1,
            height: 40,
            borderRadius: 10,
            fontSize: 13,
            fontWeight: 600,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 6,
            background: btn.active
              ? 'linear-gradient(135deg, #4361EE, #3b55d8)'
              : 'rgba(255,255,255,0.06)',
            border: btn.active
              ? '1.5px solid rgba(100,130,255,0.60)'
              : '1.5px solid rgba(255,255,255,0.08)',
            color: btn.active ? '#FFFFFF' : 'rgba(255,255,255,0.45)',
          }}>
            <span style={{ fontSize: 14 }}>{btn.icon}</span>
            {btn.label}
          </div>
        ))}
      </div>

      {/* Row 2 — Action buttons */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 8,
      }}>
        {[
          { label: 'Help', icon: '?' },
          { label: 'Net Control', icon: '⊕' },
          { label: 'Settings', icon: '⚙' },
          { label: 'Standby', icon: '⏻' },
        ].map(btn => (
          <div key={btn.label} style={{
            height: 48,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 4,
          }}>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.55)' }}>{btn.icon}</span>
            <span style={{
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'rgba(255,255,255,0.40)',
              textTransform: 'uppercase',
            }}>{btn.label}</span>
          </div>
        ))}
      </div>

      {/* Scroll indicator */}
      <div style={{
        width: 40,
        height: 3,
        background: 'rgba(255,255,255,0.20)',
        borderRadius: 2,
        margin: '10px auto 0',
      }} />
    </div>
  );
}

function AuxInputsPanel() {
  const channels = [
    { label: 'Bluetooth: Connected', connected: true, level: 0.65 },
    { label: 'RCA', connected: false, level: 0.3 },
    { label: 'Balanced 1', connected: false, level: 0.5 },
    { label: 'Balanced 2', connected: false, level: 0.4 },
  ];

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'var(--bg-panel)',
      padding: '16px 14px',
      animation: 'slideInRight 400ms cubic-bezier(0.34, 1.1, 0.64, 1) forwards',
      zIndex: 40,
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: '#FFFFFF' }}>Aux Inputs</span>
        <div style={{ display: 'flex', gap: 6 }}>
          {['Stereo', 'BT Pair'].map(lbl => (
            <div key={lbl} style={{
              padding: '4px 10px',
              borderRadius: 8,
              fontSize: 11,
              fontWeight: 600,
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              color: 'rgba(255,255,255,0.45)',
            }}>{lbl}</div>
          ))}
        </div>
      </div>

      {channels.map(ch => (
        <div key={ch.label} style={{ marginBottom: 14 }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginBottom: 6,
          }}>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)' }}>{ch.label}</span>
            <div style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: ch.connected ? '#2DD4BF' : 'rgba(255,255,255,0.20)',
            }} />
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            <div style={{
              flex: 1,
              height: 3,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 2,
              position: 'relative',
            }}>
              <div style={{
                width: `${ch.level * 100}%`,
                height: '100%',
                background: 'var(--blue-primary)',
                borderRadius: 2,
              }} />
              <div style={{
                position: 'absolute',
                top: -5.5,
                left: `${ch.level * 100}%`,
                transform: 'translateX(-50%)',
                width: 14,
                height: 14,
                borderRadius: '50%',
                background: '#FFFFFF',
              }} />
            </div>
            <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>🔊</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function ModalBluetooth() {
  return (
    <ModalBase>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
        Bluetooth Pairing...
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.6, marginBottom: 8 }}>
        Look for the Device ID:
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-blue)', textAlign: 'center', marginBottom: 16 }}>
        Transcend-01M6
      </div>
      <button style={{
        width: '100%',
        height: 40,
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.10)',
        borderRadius: 10,
        color: 'rgba(255,255,255,0.65)',
        fontSize: 13,
        cursor: 'default',
      }}>Cancel</button>
    </ModalBase>
  );
}

function ModalQRWebUI() {
  return (
    <ModalBase>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
        Control Over Local Network
      </div>
      <QRPlaceholder />
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.6, marginBottom: 4 }}>
        Scan to open Web Browser
      </div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.40)', textAlign: 'center', lineHeight: 1.5, marginBottom: 16 }}>
        You must be connected to the same Wi-Fi Network as Transcend.
      </div>
      <PrimaryButton label="Close" />
    </ModalBase>
  );
}

function ModalQRHelp() {
  return (
    <ModalBase>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
        Online User Guide
      </div>
      <QRPlaceholder />
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.6, marginBottom: 16 }}>
        Scan to access online Product Manuals, How-To Videos, and more information.
      </div>
      <PrimaryButton label="Close" />
    </ModalBase>
  );
}

function ModalEnterStandby() {
  return (
    <ModalBase>
      <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', textAlign: 'center', marginBottom: 8 }}>
        Enter Standby Mode...
      </div>
      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', textAlign: 'center', lineHeight: 1.6, marginBottom: 16 }}>
        Turn off the screen and disable audio?
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button style={{
          flex: 1,
          height: 40,
          background: 'rgba(255,255,255,0.06)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 10,
          color: 'rgba(255,255,255,0.65)',
          fontSize: 13,
          cursor: 'default',
        }}>Cancel</button>
        <button style={{
          flex: 1,
          height: 40,
          background: 'linear-gradient(135deg, #4361EE, #3b55d8)',
          border: 'none',
          borderRadius: 10,
          color: '#FFFFFF',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'default',
        }}>Yes</button>
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
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 60,
      animation: 'fadeIn 400ms ease forwards',
    }}>
      <div style={{
        position: 'absolute',
        top: 12,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        gap: 24,
      }}>
        {['⚙', '?', '📋', '✕'].map((icon, i) => (
          <span key={i} style={{ fontSize: 18, color: 'rgba(255,255,255,0.15)' }}>{icon}</span>
        ))}
      </div>
      <div style={{
        background: 'rgba(20, 22, 32, 1.0)',
        borderRadius: 16,
        padding: '32px 24px',
        width: 280,
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 18, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>
          System in Standby
        </div>
        <button style={{
          width: '100%',
          height: 52,
          background: 'linear-gradient(135deg, #4361EE, #3b55d8)',
          border: 'none',
          borderRadius: 12,
          fontSize: 15,
          fontWeight: 700,
          color: '#FFFFFF',
          cursor: 'default',
        }}>Wake Up</button>
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
    <ModalBase width={300}>
      <div style={{
        position: 'absolute',
        top: 10,
        right: 10,
        width: 28,
        height: 28,
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.08)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'rgba(255,255,255,0.45)',
        fontSize: 14,
      }}>✕</div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
      }}>
        <div style={{ fontSize: 28, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.1em' }}>
          {passcodeDisplay}
        </div>
        <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.40)', cursor: 'default' }}>👁</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {keys.flat().map(key => (
          <div key={key} style={{
            height: 50,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: key === 'Delete' || key === 'Enter' ? 13 : 18,
            fontWeight: key === 'Delete' || key === 'Enter' ? 600 : 400,
            color: key === 'Delete' || key === 'Enter' ? 'rgba(255,255,255,0.55)' : '#FFFFFF',
          }}>{key}</div>
        ))}
      </div>
    </ModalBase>
  );
}

function ModalBase({ children, width = 300 }) {
  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width,
      borderRadius: 14,
      background: 'rgba(18, 20, 30, 0.98)',
      border: '1px solid rgba(255,255,255,0.10)',
      boxShadow: '0 16px 56px rgba(0,0,0,0.75)',
      padding: '24px 20px',
      zIndex: 50,
      animation: 'modalEnter 300ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards',
    }}>
      {children}
    </div>
  );
}

function QRPlaceholder() {
  return (
    <div style={{
      width: 160,
      height: 160,
      margin: '8px auto 12px',
      background: '#FFFFFF',
      borderRadius: 8,
      display: 'grid',
      gridTemplateColumns: 'repeat(8, 1fr)',
      gridTemplateRows: 'repeat(8, 1fr)',
      gap: 2,
      padding: 8,
    }}>
      {Array.from({ length: 64 }).map((_, i) => (
        <div key={i} style={{
          background: (i + Math.floor(i / 8)) % 3 === 0 ? '#111' : (i % 5 === 0 ? '#333' : 'transparent'),
          borderRadius: 1,
        }} />
      ))}
    </div>
  );
}

function PrimaryButton({ label }) {
  return (
    <button style={{
      width: '100%',
      height: 44,
      background: 'linear-gradient(135deg, #4361EE, #3b55d8)',
      border: 'none',
      borderRadius: 10,
      color: '#FFFFFF',
      fontSize: 14,
      fontWeight: 600,
      cursor: 'default',
    }}>{label}</button>
  );
}

function TransportDefault({ recordingActive }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: 12,
    }}>
      {/* Hamburger/Files */}
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>☰</span>

      {/* REC button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: 'var(--red-rec-bg)',
          border: '2px solid var(--red-rec-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: 9,
            height: 9,
            borderRadius: '50%',
            background: 'var(--red-rec)',
            animation: recordingActive ? 'recPulse 1.2s ease-in-out infinite' : 'none',
          }} />
        </div>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.55)',
          letterSpacing: '0.08em',
        }}>REC</span>
      </div>

      <div style={{ flex: 1 }} />

      {/* Skip back */}
      <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)' }}>⏮</span>
      {/* Play */}
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.75)' }}>▶</span>
      {/* Skip forward */}
      <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.45)' }}>⏭</span>

      <div style={{ flex: 1 }} />

      {/* Volume */}
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>🔊</span>
    </div>
  );
}

function TransportRecording() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: 12,
    }}>
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>☰</span>

      {/* Stop button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <div style={{
          width: 26,
          height: 26,
          borderRadius: '50%',
          background: 'var(--red-rec-bg)',
          border: '2px solid var(--red-rec-border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ width: 10, height: 10, background: 'var(--red-rec)', borderRadius: 2 }} />
        </div>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Stop</span>
      </div>

      {/* Discard */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)' }}>✕</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)' }}>Discard</span>
      </div>

      <div style={{ flex: 1 }} />
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>🔊</span>
    </div>
  );
}

function TransportRecordedPaused() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: 12,
    }}>
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>☰</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)' }}>💾</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Save</span>
      </div>

      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.75)' }}>▶</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)' }}>✕</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)' }}>Discard</span>
      </div>

      <div style={{ flex: 1 }} />
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>🔊</span>
    </div>
  );
}

function TransportRecordedPlaying() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: 12,
    }}>
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>☰</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.75)' }}>💾</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Save</span>
      </div>

      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.75)' }}>⏸</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.50)' }}>✕</span>
        <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.50)' }}>Discard</span>
      </div>

      <div style={{ flex: 1 }} />
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>🔊</span>
    </div>
  );
}

function TransportPlayback({ playbackProgress = 0.65 }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      gap: 10,
    }}>
      <span style={{ fontSize: 20, color: 'rgba(255,255,255,0.50)' }}>☰</span>

      <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.45)', whiteSpace: 'nowrap' }}>Playback</span>

      {/* Scrubber */}
      <div style={{
        flex: 1,
        height: 3,
        background: 'rgba(255,255,255,0.12)',
        borderRadius: 2,
        position: 'relative',
      }}>
        <div style={{
          width: `${playbackProgress * 100}%`,
          height: '100%',
          background: 'var(--blue-primary)',
          borderRadius: 2,
        }} />
        <div style={{
          position: 'absolute',
          top: -5.5,
          left: `${playbackProgress * 100}%`,
          transform: 'translateX(-50%)',
          width: 14,
          height: 14,
          borderRadius: '50%',
          background: '#FFFFFF',
        }} />
      </div>

      <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.40)', cursor: 'default' }}>✕</span>
    </div>
  );
}

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
}) {
  const knobTop = (1 - volumeLevel) * 130;
  const fillHeight = volumeLevel * 130;

  const infoPreset = infoPresetId ? PRESETS.find(p => p.id === infoPresetId) : null;

  return (
    <div style={{
      position: 'relative',
      width: 480,
      height: 320,
      background: 'var(--bg-device)',
      borderRadius: 16,
      border: '2px solid var(--border-device)',
      overflow: 'hidden',
      boxShadow: '0 32px 96px rgba(0, 0, 0, 0.75), 0 0 0 1px rgba(255, 255, 255, 0.05), inset 0 1px 0 rgba(255, 255, 255, 0.07)',
      fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
    }}>
      {/* ─── MAIN PANEL ─── */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: 430, height: 280 }}>
        {/* Header row */}
        <div style={{
          height: 36,
          padding: '0 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontSize: 12,
            fontWeight: 300,
            color: 'var(--text-tertiary)',
            letterSpacing: '0.03em',
          }}>Active Acoustics</span>
          <div style={{
            width: 32,
            height: 28,
            borderRadius: 7,
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.07)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
          }}>≡‹</div>
        </div>

        {/* Preset grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          gap: 7,
          padding: '10px 14px',
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

      {/* ─── BLUE VERTICAL LINE ─── */}
      <div style={{
        position: 'absolute',
        left: 430,
        top: 0,
        width: 2,
        height: 220,
        background: 'var(--blue-vert-line)',
        opacity: 0.7,
      }} />

      {/* ─── VOLUME SIDEBAR ─── */}
      <div style={{
        position: 'absolute',
        left: 432,
        top: 0,
        width: 48,
        height: 280,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          position: 'relative',
          width: 4,
          height: 130,
          background: 'var(--slider-track)',
          borderRadius: 4,
        }}>
          {/* Active fill (from bottom) */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: 4,
            height: fillHeight,
            background: 'var(--slider-active)',
            borderRadius: '0 0 4px 4px',
            transition: 'height 300ms ease',
          }} />
          {/* Knob */}
          <div style={{
            position: 'absolute',
            top: knobTop - 9,
            left: -7,
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: muteActive ? 'rgba(255,255,255,0.25)' : 'var(--slider-knob)',
            border: '2.5px solid var(--slider-knob-border)',
            boxShadow: muteActive ? 'none' : '0 0 10px rgba(67, 97, 238, 0.65)',
            transition: 'top 300ms ease, background 300ms ease',
          }} />
        </div>
      </div>

      {/* ─── TRACK / PROGRESS ROW ─── */}
      <div style={{
        position: 'absolute',
        top: 280,
        left: 0,
        width: 430,
        height: 18,
        padding: '0 14px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span style={{ fontSize: 10, fontWeight: 300 }}>
          <span style={{ color: 'var(--text-disabled)' }}>Selected: </span>
          <span style={{ color: 'var(--text-tertiary)' }}>{trackLabel}</span>
        </span>
        <span style={{ fontSize: 10, fontWeight: 300, color: 'var(--text-tertiary)' }}>
          {timestamp}
        </span>
      </div>

      {/* Recording header (between progress and transport) */}
      {recordingHeader && (
        <div style={{
          position: 'absolute',
          top: 280,
          left: 0,
          width: 430,
          height: 18,
          padding: '0 14px',
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}>
          <div style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: 'var(--red-rec)',
            animation: recordingActive ? 'recPulse 1.2s ease-in-out infinite' : 'none',
          }} />
          <span style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.65)' }}>
            {recordingHeader}
          </span>
        </div>
      )}

      {/* ─── PROGRESS BAR ─── */}
      <div style={{
        position: 'absolute',
        top: 300,
        left: 0,
        width: 480,
        height: 3,
        background: 'rgba(255,255,255,0.08)',
      }}>
        <div style={{
          width: `${playbackProgress * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, #4361EE, #7C9EFF)',
          boxShadow: '0 0 6px rgba(124, 158, 255, 0.50)',
          transition: 'width 300ms linear',
        }} />
        <div style={{
          position: 'absolute',
          top: -3,
          left: `${playbackProgress * 100}%`,
          transform: 'translateX(-50%)',
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: '#FFFFFF',
          boxShadow: '0 0 4px rgba(255,255,255,0.60)',
          transition: 'left 300ms linear',
        }} />
      </div>

      {/* ─── TRANSPORT BAR ─── */}
      <div style={{
        position: 'absolute',
        top: 303,
        left: 0,
        width: 430,
        height: 50,
        background: 'var(--bg-transport)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '0 14px',
        display: 'flex',
        alignItems: 'center',
      }}>
        {transportState === 'default' && <TransportDefault recordingActive={recordingActive} />}
        {transportState === 'recording' && <TransportRecording />}
        {transportState === 'recorded-paused' && <TransportRecordedPaused />}
        {transportState === 'recorded-playing' && <TransportRecordedPlaying />}
        {transportState === 'playback' && <TransportPlayback playbackProgress={playbackProgress} />}
      </div>

      {/* ─── MUTE / AUX BUTTON ─── */}
      <div style={{
        position: 'absolute',
        left: 432,
        top: 285,
        width: 48,
        height: 68,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          width: 44,
          height: 44,
          borderRadius: '50%',
          background: muteActive ? 'rgba(224, 49, 49, 0.15)' : 'var(--blue-dim)',
          border: muteActive
            ? '1.5px solid rgba(224, 49, 49, 0.45)'
            : '1.5px solid rgba(67, 97, 238, 0.45)',
          boxShadow: muteActive ? 'none' : '0 0 12px rgba(67, 97, 238, 0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          color: muteActive ? '#FF6B6B' : 'var(--text-blue)',
          position: 'relative',
        }}>
          ⊕
          {muteActive && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '15%',
              width: '70%',
              height: 2,
              background: '#FF6B6B',
              transform: 'rotate(-45deg)',
              transformOrigin: 'center',
            }} />
          )}
        </div>
      </div>

      {/* ─── FILE LIST PANEL ─── */}
      {fileListOpen && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'rgba(10, 12, 20, 0.98)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '14px 14px 0 0',
          padding: '12px 14px',
          zIndex: 35,
          animation: 'fadeInUp 300ms ease forwards',
        }}>
          {(fileListTracks || ['Track 1', 'Track 2', 'Track 3']).map((track, i) => (
            <div key={i} style={{
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
              padding: '0 8px',
              position: 'relative',
            }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)' }}>{track}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>01:10</span>
                <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>▶</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ─── FILE CONTEXT MENU ─── */}
      {fileContextMenu && (
        <div style={{
          position: 'absolute',
          left: fileContextMenu.x || 100,
          top: fileContextMenu.y || 200,
          width: 120,
          background: 'rgba(18, 20, 30, 0.98)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: 8,
          padding: '6px 0',
          zIndex: 55,
          animation: 'fadeIn 200ms ease forwards',
        }}>
          <div style={{
            padding: '8px 14px',
            fontSize: 13,
            color: '#E03131',
            cursor: 'default',
          }}>Delete</div>
        </div>
      )}

      {/* ─── SETTINGS SCREEN ─── */}
      {settingsScreen && (
        <div style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'var(--bg-device)',
          zIndex: 45,
          animation: 'slideInRight 300ms ease forwards',
          padding: '16px 14px',
        }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: '#FFFFFF', marginBottom: 16 }}>Settings</div>
          {['Network', 'Audio', 'Display', 'Device Info', 'Factory Reset'].map(item => (
            <div key={item} style={{
              height: 44,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              padding: '0 8px',
            }}>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>{item}</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.30)' }}>›</span>
            </div>
          ))}
        </div>
      )}

      {/* ─── OVERLAYS ─── */}
      {quickSettingsOpen && (
        <QuickSettingsPanel
          stereoModeActive={stereoModeActive}
          bluetoothActive={bluetoothActive}
        />
      )}

      {auxPanelOpen && <AuxInputsPanel />}

      {/* ─── MODALS ─── */}
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
          top: -32,
          left: -2,
          right: -2,
          height: 32,
          background: '#1a1a1a',
          borderRadius: '8px 8px 0 0',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: 8,
        }}>
          <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>‹ ›</span>
          <div style={{
            flex: 1,
            height: 20,
            borderRadius: 10,
            background: 'rgba(255,255,255,0.08)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
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
