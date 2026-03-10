import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',            duration: 3500 },
  { id: 'swipe-down',       duration: 600  },
  { id: 'panel-open',       duration: 1500 },
  { id: 'cursor-to-bt',     duration: 500  },
  { id: 'tap-bt',           duration: 200  },
  { id: 'bt-modal-open',    duration: 5600 },
  { id: 'pause-modal',      duration: 1000 },
  { id: 'bt-paired',        duration: 4000 },
  { id: 'panel-view-paired',duration: 3000 },
  { id: 'close-panel',      duration: 500  },
  { id: 'outro',            duration: 4000 },
];

export default function Ch01_Bluetooth({ voice, onControls }) {
  const controls = useAnimationSequence(STEPS);
  const { currentStep, loopProgress } = controls;

  useEffect(() => { if (onControls) onControls(controls); }, [controls.stepIndex, controls.playing, controls.finished]);

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    transportState: 'default',
    quickSettingsOpen: false,
    stereoModeActive: false,
    bluetoothActive: false,
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
          stereoModeActive: false,
          bluetoothActive: false,
          cursorVisible: true,
          cursorPos: { x: 240, y: 10 },
          cursorTapping: false,
          calloutText: 'First, open the Quick Settings menu by swiping down',
          calloutVisible: true,
        }));
        break;
      case 'swipe-down':
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
          calloutText: 'Now tap Bluetooth to begin pairing your device',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-bt':
        setUi(s => ({
          ...s,
          cursorPos: { x: 295, y: 55 },
          calloutVisible: false,
        }));
        break;
      case 'tap-bt':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'bt-modal-open':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          bluetoothActive: true,
          modalType: 'bluetooth-pairing',
          calloutText: 'Your device will appear here once it is discovered',
          calloutVisible: true,
        }));
        break;
      case 'pause-modal':
        setUi(s => ({ ...s, calloutVisible: false }));
        break;
      case 'bt-paired':
        setUi(s => ({
          ...s,
          modalType: null,
          calloutText: 'Your Bluetooth device is now connected',
          calloutVisible: true,
        }));
        break;
      case 'panel-view-paired':
        setUi(s => ({
          ...s,
          stereoModeActive: true,
          calloutText: 'Both inputs are now active in Stereo Mode',
          calloutVisible: true,
        }));
        break;
      case 'close-panel':
        setUi(s => ({
          ...s,
          quickSettingsOpen: false,
          calloutVisible: false,
          cursorVisible: true,
          cursorPos: { x: 240, y: 10 },
          cursorTapping: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          calloutText: 'Bluetooth is connected and ready to use',
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
          transportState={ui.transportState}
          quickSettingsOpen={ui.quickSettingsOpen}
          stereoModeActive={ui.stereoModeActive}
          bluetoothActive={ui.bluetoothActive}
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
