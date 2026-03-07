import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';
import ProgressBar from '../components/ProgressBar';

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

export default function Ch06_QuickSettings() {
  const { currentStep, loopProgress } = useAnimationSequence(STEPS);

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
          calloutText: 'Swipe down from the top to open Quick Settings',
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
          calloutText: 'Quick Settings — access key controls fast',
          calloutVisible: true,
        }));
        break;
      case 'highlight-stereo':
        setUi(s => ({
          ...s,
          cursorPos: { x: 115, y: 55 },
          calloutText: 'Toggle Stereo Mode here',
          calloutVisible: true,
        }));
        break;
      case 'highlight-bt':
        setUi(s => ({
          ...s,
          cursorPos: { x: 295, y: 55 },
          calloutText: 'Or manage Bluetooth',
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
          calloutText: 'Help \u00b7 Net Control \u00b7 Settings \u00b7 Standby',
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
          calloutText: 'Quick Settings: always one swipe away',
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
          stereoModeActive={ui.stereoModeActive}
          bluetoothActive={ui.bluetoothActive}
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
