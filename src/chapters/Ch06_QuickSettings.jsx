import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',                duration: 3500 },
  { id: 'swipe-gesture',        duration: 700  },
  { id: 'panel-open',           duration: 4400 },
  { id: 'highlight-stereo',     duration: 1500 },
  { id: 'highlight-bt',         duration: 1500 },
  { id: 'highlight-help',       duration: 1500 },
  { id: 'highlight-netcontrol', duration: 1500 },
  { id: 'highlight-settings',   duration: 1500 },
  { id: 'highlight-standby',    duration: 1500 },
  { id: 'callout-summary',      duration: 3000 },
  { id: 'swipe-close',          duration: 600  },
  { id: 'outro',                duration: 4000 },
];

export default function Ch06_QuickSettings({ voice, onControls }) {
  const controls = useAnimationSequence(STEPS);
  const { currentStep, loopProgress } = controls;

  useEffect(() => { if (onControls) onControls(controls); }, [controls.stepIndex, controls.playing, controls.finished]);

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
          calloutText: 'Swipe down from the top of the screen to open Quick Settings',
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
          calloutText: 'Quick Settings lets you access key controls quickly',
          calloutVisible: true,
        }));
        break;
      case 'highlight-stereo':
        setUi(s => ({
          ...s,
          cursorPos: { x: 115, y: 55 },
          calloutText: 'You can toggle Stereo Mode on or off here',
          calloutVisible: true,
        }));
        break;
      case 'highlight-bt':
        setUi(s => ({
          ...s,
          cursorPos: { x: 295, y: 55 },
          calloutText: 'Or manage your Bluetooth connections here',
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
          calloutText: 'You also have quick access to Help, Net Control, Settings, and Standby',
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
          calloutText: 'Quick Settings is always just one swipe away',
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
