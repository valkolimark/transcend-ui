import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';
import ProgressBar from '../components/ProgressBar';

const STEPS = [
  { id: 'intro',            duration: 1500 },
  { id: 'swipe-down',       duration: 600  },
  { id: 'panel-open',       duration: 1200 },
  { id: 'cursor-to-bt',     duration: 500  },
  { id: 'tap-bt',           duration: 200  },
  { id: 'bt-modal-open',    duration: 2800 },
  { id: 'pause-modal',      duration: 1000 },
  { id: 'bt-paired',        duration: 2000 },
  { id: 'panel-view-paired',duration: 1500 },
  { id: 'close-panel',      duration: 500  },
  { id: 'outro',            duration: 2200 },
];

export default function Ch01_Bluetooth() {
  const { currentStep, loopProgress } = useAnimationSequence(STEPS);

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
          calloutText: 'Open the Quick Settings menu',
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
          calloutText: 'Tap Bluetooth to begin pairing',
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
          calloutText: 'Your device will appear in Bluetooth settings',
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
          calloutText: 'Bluetooth connected \u2713',
          calloutVisible: true,
        }));
        break;
      case 'panel-view-paired':
        setUi(s => ({
          ...s,
          stereoModeActive: true,
          calloutText: 'Both inputs now active in Stereo Mode',
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
          calloutText: 'Bluetooth connected — ready to use',
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
      </div>
      <Callout text={ui.calloutText} visible={ui.calloutVisible} />
      <ProgressBar progress={loopProgress} />
    </div>
  );
}
