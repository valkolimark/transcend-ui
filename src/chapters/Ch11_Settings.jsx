import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';
import ProgressBar from '../components/ProgressBar';

const STEPS = [
  { id: 'intro',               duration: 1500 },
  { id: 'open-quick-settings', duration: 600  },
  { id: 'panel-open',          duration: 1000 },
  { id: 'cursor-to-settings',  duration: 400  },
  { id: 'tap-settings',        duration: 200  },
  { id: 'login-modal-open',    duration: 2000 },
  { id: 'type-1',              duration: 300  },
  { id: 'type-2',              duration: 300  },
  { id: 'type-3',              duration: 300  },
  { id: 'type-4',              duration: 300  },
  { id: 'type-5',              duration: 300  },
  { id: 'type-enter',          duration: 400  },
  { id: 'settings-open',       duration: 2500 },
  { id: 'browse-settings',     duration: 2000 },
  { id: 'outro',               duration: 2200 },
];

const NUMPAD_POS = {
  '1': { x: 175, y: 155 },
  '2': { x: 240, y: 155 },
  '3': { x: 305, y: 155 },
  '4': { x: 175, y: 205 },
  '5': { x: 240, y: 205 },
  'Enter': { x: 305, y: 255 },
};

export default function Ch11_Settings() {
  const { currentStep, loopProgress } = useAnimationSequence(STEPS);

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    quickSettingsOpen: false,
    modalType: null,
    settingsScreen: false,
    passcodeDisplay: '------',
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
          settingsScreen: false,
          passcodeDisplay: '------',
          cursorVisible: true,
          cursorPos: { x: 240, y: 10 },
          cursorTapping: false,
          calloutText: 'Access system settings with the admin passcode',
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
      case 'cursor-to-settings':
        setUi(s => ({ ...s, cursorPos: { x: 270, y: 110 } }));
        break;
      case 'tap-settings':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'login-modal-open':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          quickSettingsOpen: false,
          modalType: 'admin-login',
          passcodeDisplay: '------',
          calloutText: 'Enter the 6-digit admin passcode',
          calloutVisible: true,
        }));
        break;
      case 'type-1':
        setUi(s => ({
          ...s,
          cursorPos: NUMPAD_POS['1'],
          cursorTapping: true,
          passcodeDisplay: '\u25cf-----',
          calloutVisible: false,
        }));
        break;
      case 'type-2':
        setUi(s => ({
          ...s,
          cursorPos: NUMPAD_POS['2'],
          cursorTapping: true,
          passcodeDisplay: '\u25cf\u25cf----',
        }));
        break;
      case 'type-3':
        setUi(s => ({
          ...s,
          cursorPos: NUMPAD_POS['3'],
          cursorTapping: true,
          passcodeDisplay: '\u25cf\u25cf\u25cf---',
        }));
        break;
      case 'type-4':
        setUi(s => ({
          ...s,
          cursorPos: NUMPAD_POS['4'],
          cursorTapping: true,
          passcodeDisplay: '\u25cf\u25cf\u25cf\u25cf--',
        }));
        break;
      case 'type-5':
        setUi(s => ({
          ...s,
          cursorPos: NUMPAD_POS['5'],
          cursorTapping: true,
          passcodeDisplay: '\u25cf\u25cf\u25cf\u25cf\u25cf-',
        }));
        break;
      case 'type-enter':
        setUi(s => ({
          ...s,
          cursorPos: NUMPAD_POS['Enter'],
          cursorTapping: true,
        }));
        break;
      case 'settings-open':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          modalType: null,
          settingsScreen: true,
          calloutText: 'Settings unlocked \u2713',
          calloutVisible: true,
        }));
        break;
      case 'browse-settings':
        setUi(s => ({
          ...s,
          cursorVisible: true,
          cursorPos: { x: 240, y: 180 },
          calloutText: 'Adjust network, audio, and device preferences',
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          cursorVisible: false,
          settingsScreen: false,
          calloutText: 'Default passcode: 12345',
          calloutVisible: true,
        }));
        break;
    }
  }, [currentStep]);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div style={{ position: 'relative' }}>
        <TranscendUI
          activePreset={ui.activePreset}
          quickSettingsOpen={ui.quickSettingsOpen}
          modalType={ui.modalType}
          settingsScreen={ui.settingsScreen}
          passcodeDisplay={ui.passcodeDisplay}
        />
        <CursorDot
          x={ui.cursorPos.x}
          y={ui.cursorPos.y}
          tapping={ui.cursorTapping}
          visible={ui.cursorVisible}
        />
      </div>
      <Callout text={ui.calloutText} visible={ui.calloutVisible} />
      <ProgressBar progress={loopProgress} />
    </div>
  );
}
