import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',               duration: 3500 },
  { id: 'open-quick-settings', duration: 600  },
  { id: 'panel-showing-off',   duration: 3000 },
  { id: 'cursor-to-stereo',    duration: 400  },
  { id: 'tap-stereo-on',       duration: 200  },
  { id: 'stereo-active',       duration: 4000 },
  { id: 'hold-on',             duration: 1500 },
  { id: 'cursor-tap-again',    duration: 400  },
  { id: 'tap-stereo-off',      duration: 200  },
  { id: 'stereo-inactive',     duration: 3600 },
  { id: 'note-soundlok',       duration: 3000 },
  { id: 'close-panel',         duration: 500  },
  { id: 'outro',               duration: 4000 },
];

export default function Ch07_StereoMode({ voice, onControls }) {
  const controls = useAnimationSequence(STEPS);
  const { currentStep, loopProgress } = controls;

  useEffect(() => { if (onControls) onControls(controls); }, [controls.stepIndex, controls.playing, controls.finished]);

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    quickSettingsOpen: false,
    stereoModeActive: false,
    bluetoothActive: false,
    cursorPos: { x: 240, y: 10 },
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
          quickSettingsOpen: false,
          stereoModeActive: false,
          cursorVisible: true,
          cursorPos: { x: 240, y: 10 },
          cursorTapping: false,
          calloutText: 'Stereo Mode processes the left and right channels independently',
          calloutVisible: true,
        }));
        break;
      case 'open-quick-settings':
        setUi(s => ({
          ...s,
          cursorPos: { x: 240, y: 100 },
          cursorTapping: true,
          quickSettingsOpen: true,
          calloutVisible: false,
        }));
        break;
      case 'panel-showing-off':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          calloutText: 'Stereo Mode is currently turned off',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-stereo':
        setUi(s => ({ ...s, cursorPos: { x: 115, y: 55 }, calloutVisible: false }));
        break;
      case 'tap-stereo-on':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'stereo-active':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          stereoModeActive: true,
          calloutText: 'Stereo Mode is now on with dual-channel processing active',
          calloutVisible: true,
        }));
        break;
      case 'hold-on':
        setUi(s => ({ ...s, calloutVisible: false }));
        break;
      case 'cursor-tap-again':
        setUi(s => ({ ...s, cursorPos: { x: 115, y: 55 } }));
        break;
      case 'tap-stereo-off':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'stereo-inactive':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          stereoModeActive: false,
          calloutText: 'Stereo Mode is now off, returning to mono processing',
          calloutVisible: true,
        }));
        break;
      case 'note-soundlok':
        setUi(s => ({
          ...s,
          calloutText: 'Please note that Stereo Mode is not available on SoundLok units',
          calloutVisible: true,
        }));
        break;
      case 'close-panel':
        setUi(s => ({
          ...s,
          cursorPos: { x: 240, y: 5 },
          cursorTapping: true,
          quickSettingsOpen: false,
          calloutVisible: false,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          calloutText: 'You can toggle Stereo Mode anytime from Quick Settings',
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
          quickSettingsOpen={ui.quickSettingsOpen}
          stereoModeActive={ui.stereoModeActive}
          bluetoothActive={ui.bluetoothActive}
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
