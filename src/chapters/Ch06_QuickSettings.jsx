import { useState, useEffect, useCallback } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',                duration: 1500 },
  { id: 'swipe-gesture',        duration: 700  },
  { id: 'panel-open',           duration: 2200 },
  { id: 'highlight-stereo',     duration: 1200 },
  { id: 'highlight-bt',         duration: 1200 },
  { id: 'highlight-help',       duration: 800  },
  { id: 'highlight-netcontrol', duration: 800  },
  { id: 'highlight-settings',   duration: 800  },
  { id: 'highlight-standby',    duration: 800  },
  { id: 'callout-summary',      duration: 1500 },
  { id: 'swipe-close',          duration: 600  },
  { id: 'outro',                duration: 2200 },
];

const CALLOUT_MAP = {
  'intro': 'Swipe down from the top to open Quick Settings.',
  'panel-open': 'Quick Settings gives you fast access to the most-used controls.',
  'highlight-stereo': 'Toggle Stereo Mode here.',
  'highlight-bt': 'You can also manage your Bluetooth connection here.',
  'callout-summary': 'The bottom row includes Help, Net Control, Settings, and Standby.',
  'outro': 'Quick Settings: always one swipe away.',
};

export default function Ch06_QuickSettings({ started, uiRef }) {
  const getCalloutText = useCallback((stepId) => CALLOUT_MAP[stepId] || null, []);
  const { currentStep } = useAnimationSequence(STEPS, { started, getCalloutText });

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    quickSettingsOpen: false,
    stereoModeActive: false,
    bluetoothActive: false,
    cursorPos: { x: 240, y: 5 },
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
          cursorVisible: true,
          cursorPos: { x: 240, y: 5 },
          cursorTapping: false,
          calloutText: CALLOUT_MAP['intro'],
          calloutVisible: true,
        }));
        break;
      case 'swipe-gesture':
        setUi(s => ({
          ...s,
          cursorPos: { x: 240, y: 100 },
          cursorTapping: true,
          quickSettingsOpen: true,
          calloutVisible: false,
        }));
        break;
      case 'panel-open':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          calloutText: CALLOUT_MAP['panel-open'],
          calloutVisible: true,
        }));
        break;
      case 'highlight-stereo':
        setUi(s => ({
          ...s,
          cursorPos: { x: 115, y: 55 },
          calloutText: CALLOUT_MAP['highlight-stereo'],
          calloutVisible: true,
        }));
        break;
      case 'highlight-bt':
        setUi(s => ({
          ...s,
          cursorPos: { x: 295, y: 55 },
          calloutText: CALLOUT_MAP['highlight-bt'],
          calloutVisible: true,
        }));
        break;
      case 'highlight-help':
        setUi(s => ({
          ...s,
          cursorPos: { x: 60, y: 110 },
          calloutVisible: false,
        }));
        break;
      case 'highlight-netcontrol':
        setUi(s => ({ ...s, cursorPos: { x: 165, y: 110 } }));
        break;
      case 'highlight-settings':
        setUi(s => ({ ...s, cursorPos: { x: 270, y: 110 } }));
        break;
      case 'highlight-standby':
        setUi(s => ({ ...s, cursorPos: { x: 375, y: 110 } }));
        break;
      case 'callout-summary':
        setUi(s => ({
          ...s,
          calloutText: CALLOUT_MAP['callout-summary'],
          calloutVisible: true,
        }));
        break;
      case 'swipe-close':
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
          stereoModeActive={ui.stereoModeActive}
          bluetoothActive={ui.bluetoothActive}
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
