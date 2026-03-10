import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',               duration: 3500 },
  { id: 'open-quick-settings', duration: 600  },
  { id: 'panel-open',          duration: 1000 },
  { id: 'cursor-to-standby',   duration: 400  },
  { id: 'tap-standby',         duration: 200  },
  { id: 'confirm-modal',       duration: 5000 },
  { id: 'cursor-to-yes',       duration: 400  },
  { id: 'tap-yes',             duration: 200  },
  { id: 'standby-screen',      duration: 5000 },
  { id: 'cursor-to-wakeup',    duration: 600  },
  { id: 'tap-wakeup',          duration: 200  },
  { id: 'wake-transition',     duration: 800  },
  { id: 'home-restored',       duration: 1500 },
  { id: 'outro',               duration: 4000 },
];

export default function Ch09_PowerSave({ voice, onControls }) {
  const controls = useAnimationSequence(STEPS);
  const { currentStep, loopProgress } = controls;

  useEffect(() => { if (onControls) onControls(controls); }, [controls.stepIndex, controls.playing, controls.finished]);

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    quickSettingsOpen: false,
    modalType: null,
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
          modalType: null,
          cursorVisible: true,
          cursorPos: { x: 240, y: 10 },
          cursorTapping: false,
          calloutText: 'You can put Transcend into standby mode to save power',
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
      case 'panel-open':
        setUi(s => ({ ...s, cursorTapping: false }));
        break;
      case 'cursor-to-standby':
        setUi(s => ({ ...s, cursorPos: { x: 375, y: 110 } }));
        break;
      case 'tap-standby':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'confirm-modal':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          quickSettingsOpen: false,
          modalType: 'enter-standby',
          calloutText: 'Tap confirm to turn off the screen and disable audio',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-yes':
        setUi(s => ({
          ...s,
          cursorVisible: true,
          cursorPos: { x: 300, y: 210 },
          calloutVisible: false,
        }));
        break;
      case 'tap-yes':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'standby-screen':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          modalType: 'standby-screen',
          calloutText: 'The screen is now off and the system is in standby',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-wakeup':
        setUi(s => ({
          ...s,
          cursorVisible: true,
          cursorPos: { x: 240, y: 200 },
          calloutText: 'Tap the Wake Up button to resume operation',
          calloutVisible: true,
        }));
        break;
      case 'tap-wakeup':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'wake-transition':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          modalType: null,
          calloutVisible: false,
        }));
        break;
      case 'home-restored':
        setUi(s => ({
          ...s,
          calloutText: 'The system has been restored and is ready to use',
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          calloutText: 'Standby mode saves energy without losing any of your settings',
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
          modalType={ui.modalType}
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
