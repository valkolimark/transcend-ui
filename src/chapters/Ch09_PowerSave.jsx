import { useState, useEffect, useCallback } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',               duration: 1500 },
  { id: 'open-quick-settings', duration: 600  },
  { id: 'panel-open',          duration: 1000 },
  { id: 'cursor-to-standby',   duration: 400  },
  { id: 'tap-standby',         duration: 200  },
  { id: 'confirm-modal',       duration: 2500 },
  { id: 'cursor-to-yes',       duration: 400  },
  { id: 'tap-yes',             duration: 200  },
  { id: 'standby-screen',      duration: 3000 },
  { id: 'cursor-to-wakeup',    duration: 600  },
  { id: 'tap-wakeup',          duration: 200  },
  { id: 'wake-transition',     duration: 800  },
  { id: 'home-restored',       duration: 1200 },
  { id: 'outro',               duration: 2200 },
];

const CALLOUT_MAP = {
  'intro': 'Put Transcend into standby to save power',
  'confirm-modal': 'Confirm to turn off screen and disable audio',
  'standby-screen': 'Screen off \u2014 system in standby',
  'cursor-to-wakeup': 'Tap Wake Up to resume',
  'home-restored': 'System restored \u2713',
  'outro': 'Standby saves energy without losing your settings',
};

export default function Ch09_PowerSave({ started, uiRef }) {
  const getCalloutText = useCallback((stepId) => CALLOUT_MAP[stepId] || null, []);
  const { currentStep } = useAnimationSequence(STEPS, { started, getCalloutText });

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
          calloutText: CALLOUT_MAP['confirm-modal'],
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
          calloutText: CALLOUT_MAP['standby-screen'],
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-wakeup':
        setUi(s => ({
          ...s,
          cursorVisible: true,
          cursorPos: { x: 240, y: 200 },
          calloutText: CALLOUT_MAP['cursor-to-wakeup'],
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
          calloutText: CALLOUT_MAP['home-restored'],
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
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
