import { useState, useEffect, useCallback } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


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

const CALLOUT_MAP = {
  'intro': 'Access system settings with the admin passcode',
  'login-modal-open': 'Enter the 6-digit admin passcode',
  'settings-open': 'Settings unlocked \u2713',
  'browse-settings': 'Adjust network, audio, and device preferences',
  'outro': 'Default passcode: 12345',
};

export default function Ch11_Settings({ started, uiRef }) {
  const getCalloutText = useCallback((stepId) => CALLOUT_MAP[stepId] || null, []);
  const { currentStep } = useAnimationSequence(STEPS, { started, getCalloutText });

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
          calloutText: CALLOUT_MAP['intro'],
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
          calloutText: CALLOUT_MAP['login-modal-open'],
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
          calloutText: CALLOUT_MAP['settings-open'],
          calloutVisible: true,
        }));
        break;
      case 'browse-settings':
        setUi(s => ({
          ...s,
          cursorVisible: true,
          cursorPos: { x: 240, y: 180 },
          calloutText: CALLOUT_MAP['browse-settings'],
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          cursorVisible: false,
          settingsScreen: false,
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
          uiRef={uiRef}
        />
        <Callout text={ui.calloutText} visible={ui.calloutVisible} />
      </div>
    </div>
  );
}
