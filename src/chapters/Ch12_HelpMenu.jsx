import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',               duration: 3500 },
  { id: 'open-quick-settings', duration: 600  },
  { id: 'panel-open',          duration: 1000 },
  { id: 'cursor-to-help',      duration: 400  },
  { id: 'tap-help',            duration: 200  },
  { id: 'help-modal-open',     duration: 6000 },
  { id: 'hold-qr',             duration: 3000 },
  { id: 'cursor-to-close',     duration: 400  },
  { id: 'tap-close',           duration: 200  },
  { id: 'modal-closed',        duration: 400  },
  { id: 'outro',               duration: 4000 },
];

export default function Ch12_HelpMenu({ voice, onControls }) {
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
          calloutText: 'You can access the full online user guide instantly',
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
      case 'cursor-to-help':
        setUi(s => ({ ...s, cursorPos: { x: 60, y: 110 } }));
        break;
      case 'tap-help':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'help-modal-open':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          quickSettingsOpen: false,
          modalType: 'qr-help',
          calloutText: 'Scan this code with your phone to open the user guide',
          calloutVisible: true,
        }));
        break;
      case 'hold-qr':
        setUi(s => ({
          ...s,
          calloutText: 'Here you will find links to manuals, videos, and support resources',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-close':
        setUi(s => ({
          ...s,
          cursorVisible: true,
          cursorPos: { x: 240, y: 280 },
          calloutVisible: false,
        }));
        break;
      case 'tap-close':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'modal-closed':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          modalType: null,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          calloutText: 'Help is always just one tap away with no manual required',
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
