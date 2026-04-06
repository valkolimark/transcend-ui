import { useState, useEffect, useCallback } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',               duration: 1500 },
  { id: 'open-quick-settings', duration: 600  },
  { id: 'panel-showing-off',   duration: 1500 },
  { id: 'cursor-to-stereo',    duration: 400  },
  { id: 'tap-stereo-on',       duration: 200  },
  { id: 'stereo-active',       duration: 2000 },
  { id: 'hold-on',             duration: 1000 },
  { id: 'cursor-tap-again',    duration: 400  },
  { id: 'tap-stereo-off',      duration: 200  },
  { id: 'stereo-inactive',     duration: 1800 },
  { id: 'note-soundlok',       duration: 1500 },
  { id: 'close-panel',         duration: 500  },
  { id: 'outro',               duration: 2200 },
];

const CALLOUT_MAP = {
  'intro': 'Stereo Mode processes left and right channels independently.',
  'panel-showing-off': 'Stereo Mode is currently off.',
  'stereo-active': 'Stereo Mode is on \u2014 both channels are now processed independently.',
  'stereo-inactive': 'Stereo Mode is off \u2014 the system returns to mono processing.',
  'note-soundlok': 'Not available on SoundLok units.',
  'outro': 'You can toggle Stereo Mode anytime from Quick Settings.',
};

export default function Ch07_StereoMode({ started, uiRef }) {
  const getCalloutText = useCallback((stepId) => CALLOUT_MAP[stepId] || null, []);
  const { currentStep } = useAnimationSequence(STEPS, { started, getCalloutText });

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    quickSettingsOpen: false,
    stereoModeActive: false,
    bluetoothActive: false,
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
          stereoModeActive: false,
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
      case 'panel-showing-off':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          calloutText: CALLOUT_MAP['panel-showing-off'],
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-stereo':
        setUi(s => ({ ...s, cursorPos: { x: 115, y: 55 }, calloutVisible: false }));
        break;
      case 'tap-stereo-on':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'stereo-active':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          stereoModeActive: true,
          calloutText: CALLOUT_MAP['stereo-active'],
          calloutVisible: true,
        }));
        break;
      case 'hold-on':
        setUi(s => ({ ...s, calloutVisible: false }));
        break;
      case 'cursor-tap-again':
        setUi(s => ({ ...s, cursorPos: { x: 115, y: 55 } }));
        break;
      case 'tap-stereo-off':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'stereo-inactive':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          stereoModeActive: false,
          calloutText: CALLOUT_MAP['stereo-inactive'],
          calloutVisible: true,
        }));
        break;
      case 'note-soundlok':
        setUi(s => ({
          ...s,
          calloutText: CALLOUT_MAP['note-soundlok'],
          calloutVisible: true,
        }));
        break;
      case 'close-panel':
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
