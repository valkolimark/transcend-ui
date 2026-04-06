import { useState, useEffect, useCallback } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',          duration: 1500 },
  { id: 'cursor-to-knob', duration: 500  },
  { id: 'drag-up-start',  duration: 300  },
  { id: 'drag-up',        duration: 1200 },
  { id: 'hold-high',      duration: 1500 },
  { id: 'drag-down',      duration: 1200 },
  { id: 'hold-low',       duration: 1500 },
  { id: 'drag-mid',       duration: 800  },
  { id: 'release',        duration: 300  },
  { id: 'mute-cursor',    duration: 500  },
  { id: 'tap-mute',       duration: 200  },
  { id: 'muted',          duration: 1800 },
  { id: 'tap-unmute',     duration: 200  },
  { id: 'unmuted',        duration: 1200 },
  { id: 'outro',          duration: 2200 },
];

const CALLOUT_MAP = {
  'intro': 'The right sidebar controls Active Acoustics volume.',
  'drag-up': 'Drag up to increase volume.',
  'hold-high': 'Volume is now at maximum.',
  'drag-down': 'Drag down to decrease the volume.',
  'muted': 'Tap the mute button to toggle Active Acoustics on or off.',
  'outro': 'Volume is independent of recording and playback levels.',
};

export default function Ch04_PresetVolume({ started, uiRef }) {
  const getCalloutText = useCallback((stepId) => CALLOUT_MAP[stepId] || null, []);
  const { currentStep } = useAnimationSequence(STEPS, { started, getCalloutText });

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    volumeLevel: 0.55,
    muteActive: false,
    cursorPos: { x: 455, y: 140 },
    cursorTapping: false,
    cursorVisible: false,
    calloutText: '',
    calloutVisible: false,
  });

  useEffect(() => {
    switch (currentStep) {
      case 'intro':
        setUi(s => ({
          ...s,
          volumeLevel: 0.55,
          muteActive: false,
          cursorVisible: true,
          cursorPos: { x: 455, y: 160 },
          cursorTapping: false,
          calloutText: CALLOUT_MAP['intro'],
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-knob':
        setUi(s => ({ ...s, cursorPos: { x: 455, y: 140 }, calloutVisible: false }));
        break;
      case 'drag-up-start':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'drag-up':
        setUi(s => ({
          ...s,
          cursorPos: { x: 455, y: 80 },
          volumeLevel: 1.0,
          calloutText: CALLOUT_MAP['drag-up'],
          calloutVisible: true,
        }));
        break;
      case 'hold-high':
        setUi(s => ({
          ...s,
          calloutText: CALLOUT_MAP['hold-high'],
          calloutVisible: true,
        }));
        break;
      case 'drag-down':
        setUi(s => ({
          ...s,
          cursorPos: { x: 455, y: 200 },
          volumeLevel: 0.15,
          calloutText: CALLOUT_MAP['drag-down'],
          calloutVisible: true,
        }));
        break;
      case 'hold-low':
        setUi(s => ({ ...s, calloutVisible: false }));
        break;
      case 'drag-mid':
        setUi(s => ({
          ...s,
          cursorPos: { x: 455, y: 140 },
          volumeLevel: 0.55,
        }));
        break;
      case 'release':
        setUi(s => ({ ...s, cursorTapping: false }));
        break;
      case 'mute-cursor':
        setUi(s => ({ ...s, cursorPos: { x: 455, y: 292 } }));
        break;
      case 'tap-mute':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'muted':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          muteActive: true,
          calloutText: CALLOUT_MAP['muted'],
          calloutVisible: true,
        }));
        break;
      case 'tap-unmute':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'unmuted':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          muteActive: false,
          calloutVisible: false,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          cursorVisible: false,
          calloutText: CALLOUT_MAP['outro'],
          calloutVisible: true,
        }));
        break;
    }
  }, [currentStep]);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div ref={uiRef} style={{ position: 'relative', width: 480, height: 320 }}>
        <TranscendUI
          activePreset={ui.activePreset}
          volumeLevel={ui.volumeLevel}
          muteActive={ui.muteActive}
        />
        <CursorDot
          x={ui.cursorPos.x}
          y={ui.cursorPos.y}
          tapping={ui.cursorTapping}
          visible={ui.cursorVisible}
          uiRef={uiRef}
        />
        <Callout text={ui.calloutText} visible={ui.calloutVisible} />
      </div>
    </div>
  );
}
