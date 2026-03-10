import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',          duration: 3500 },
  { id: 'cursor-to-knob', duration: 500  },
  { id: 'drag-up-start',  duration: 300  },
  { id: 'drag-up',        duration: 1500 },
  { id: 'hold-high',      duration: 3000 },
  { id: 'drag-down',      duration: 1500 },
  { id: 'hold-low',       duration: 1500 },
  { id: 'drag-mid',       duration: 1500 },
  { id: 'release',        duration: 300  },
  { id: 'mute-cursor',    duration: 500  },
  { id: 'tap-mute',       duration: 200  },
  { id: 'muted',          duration: 3600 },
  { id: 'tap-unmute',     duration: 200  },
  { id: 'unmuted',        duration: 1500 },
  { id: 'outro',          duration: 4000 },
];

export default function Ch04_PresetVolume({ voice, onControls }) {
  const controls = useAnimationSequence(STEPS);
  const { currentStep, loopProgress } = controls;

  useEffect(() => { if (onControls) onControls(controls); }, [controls.stepIndex, controls.playing, controls.finished]);

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
          calloutText: 'Use the right sidebar to control the Active Acoustics volume',
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
          calloutText: 'Drag the slider up to increase the volume',
          calloutVisible: true,
        }));
        break;
      case 'hold-high':
        setUi(s => ({
          ...s,
          calloutText: 'The volume is now at maximum',
          calloutVisible: true,
        }));
        break;
      case 'drag-down':
        setUi(s => ({
          ...s,
          cursorPos: { x: 455, y: 200 },
          volumeLevel: 0.15,
          calloutText: 'Drag the slider down to decrease the volume',
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
        setUi(s => ({ ...s, cursorPos: { x: 455, y: 310 } }));
        break;
      case 'tap-mute':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'muted':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          muteActive: true,
          calloutText: 'Tap here to mute or unmute Active Acoustics',
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
          calloutText: 'The volume control is independent of recording and playback levels',
          calloutVisible: true,
        }));
        break;
    }
  }, [currentStep]);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div style={{ position: 'relative', width: 480, height: 320 }}>
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
        />
        <Callout text={ui.calloutText} visible={ui.calloutVisible} voice={voice} />

      </div>
    </div>
  );
}
