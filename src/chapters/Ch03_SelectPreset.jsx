import { useState, useEffect, useCallback } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',              duration: 1500 },
  { id: 'cursor-to-b',        duration: 500  },
  { id: 'tap-studio-b',       duration: 200  },
  { id: 'active-studio-b',    duration: 1800 },
  { id: 'cursor-to-info',     duration: 400  },
  { id: 'tap-info',           duration: 200  },
  { id: 'show-info-b',        duration: 2500 },
  { id: 'dismiss-info',       duration: 300  },
  { id: 'cursor-to-great',    duration: 500  },
  { id: 'tap-great',          duration: 200  },
  { id: 'active-great',       duration: 1800 },
  { id: 'show-info-great',    duration: 2200 },
  { id: 'dismiss-info-2',     duration: 300  },
  { id: 'cursor-to-cathedral',duration: 500  },
  { id: 'tap-cathedral',      duration: 200  },
  { id: 'active-cathedral',   duration: 1500 },
  { id: 'outro',              duration: 2200 },
];

const CALLOUT_MAP = {
  'intro': 'Tap any preset to select a room acoustic.',
  'active-studio-b': 'Studio B is now selected.',
  'show-info-b': 'Tap the info badge to read a description of the acoustic preset.',
  'active-great': 'Great Hall is now selected.',
  'active-cathedral': 'Grand Cathedral is now active.',
  'outro': '9 acoustic presets \u2014 one tap to transform your space.',
};

export default function Ch03_SelectPreset({ started, uiRef }) {
  const getCalloutText = useCallback((stepId) => CALLOUT_MAP[stepId] || null, []);
  const { currentStep } = useAnimationSequence(STEPS, { started, getCalloutText });

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    showInfoTooltip: false,
    infoPresetId: null,
    cursorPos: { x: 80, y: 65 },
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
          activePreset: 'studio-a',
          showInfoTooltip: false,
          infoPresetId: null,
          cursorVisible: true,
          cursorPos: { x: 80, y: 65 },
          cursorTapping: false,
          calloutText: CALLOUT_MAP['intro'],
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-b':
        setUi(s => ({ ...s, cursorPos: { x: 215, y: 65 }, calloutVisible: false }));
        break;
      case 'tap-studio-b':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'active-studio-b':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          activePreset: 'studio-b',
          calloutText: CALLOUT_MAP['active-studio-b'],
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-info':
        setUi(s => ({ ...s, cursorPos: { x: 258, y: 48 }, calloutVisible: false }));
        break;
      case 'tap-info':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'show-info-b':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          showInfoTooltip: true,
          infoPresetId: 'studio-b',
          calloutText: CALLOUT_MAP['show-info-b'],
          calloutVisible: true,
        }));
        break;
      case 'dismiss-info':
        setUi(s => ({ ...s, showInfoTooltip: false, infoPresetId: null, calloutVisible: false }));
        break;
      case 'cursor-to-great':
        setUi(s => ({ ...s, cursorPos: { x: 350, y: 130 } }));
        break;
      case 'tap-great':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'active-great':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          activePreset: 'great-hall',
          calloutText: CALLOUT_MAP['active-great'],
          calloutVisible: true,
        }));
        break;
      case 'show-info-great':
        setUi(s => ({
          ...s,
          showInfoTooltip: true,
          infoPresetId: 'great-hall',
          calloutVisible: false,
        }));
        break;
      case 'dismiss-info-2':
        setUi(s => ({ ...s, showInfoTooltip: false, infoPresetId: null }));
        break;
      case 'cursor-to-cathedral':
        setUi(s => ({ ...s, cursorPos: { x: 350, y: 195 } }));
        break;
      case 'tap-cathedral':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'active-cathedral':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          activePreset: 'grand-cathedral',
          calloutText: CALLOUT_MAP['active-cathedral'],
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
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
          showInfoTooltip={ui.showInfoTooltip}
          infoPresetId={ui.infoPresetId}
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
