import { useState, useEffect, useCallback } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',               duration: 1500 },
  { id: 'cursor-to-hamburger', duration: 500  },
  { id: 'tap-hamburger',       duration: 200  },
  { id: 'playback-mode',       duration: 2000 },
  { id: 'cursor-to-scrubber',  duration: 500  },
  { id: 'scrub-right',         duration: 1200 },
  { id: 'hold-scrubbed',       duration: 1000 },
  { id: 'cursor-to-play',      duration: 400  },
  { id: 'tap-play',            duration: 200  },
  { id: 'playing',             duration: 2000 },
  { id: 'cursor-to-skip-fwd',  duration: 400  },
  { id: 'tap-skip',            duration: 200  },
  { id: 'next-track',          duration: 1500 },
  { id: 'cursor-to-volume',    duration: 400  },
  { id: 'tap-volume',          duration: 200  },
  { id: 'volume-slider-appears', duration: 2000 },
  { id: 'outro',               duration: 2200 },
];

const CALLOUT_MAP = {
  'intro': 'Select a track to begin playback',
  'playback-mode': 'Playback mode \u2014 use the scrubber to seek',
  'scrub-right': 'Scrub forward through the track',
  'playing': 'Playing \u2014 progress bar moves in real time',
  'next-track': 'Skip to next track',
  'volume-slider-appears': 'Adjust playback volume separately from acoustics',
  'outro': 'Full transport controls on every screen',
};

export default function Ch05_Playback({ started, uiRef }) {
  const getCalloutText = useCallback((stepId) => CALLOUT_MAP[stepId] || null, []);
  const { currentStep } = useAnimationSequence(STEPS, { started, getCalloutText });

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    transportState: 'default',
    playbackProgress: 0.22,
    trackLabel: 'Track 1',
    timestamp: '01:10.32',
    cursorPos: { x: 20, y: 295 },
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
          transportState: 'default',
          playbackProgress: 0.22,
          trackLabel: 'Track 1',
          timestamp: '01:10.32',
          cursorVisible: true,
          cursorPos: { x: 100, y: 260 },
          cursorTapping: false,
          calloutText: CALLOUT_MAP['intro'],
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-hamburger':
        setUi(s => ({ ...s, cursorPos: { x: 20, y: 295 }, calloutVisible: false }));
        break;
      case 'tap-hamburger':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'playback-mode':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          transportState: 'playback',
          playbackProgress: 0.35,
          calloutText: CALLOUT_MAP['playback-mode'],
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-scrubber':
        setUi(s => ({ ...s, cursorPos: { x: 250, y: 325 }, calloutVisible: false }));
        break;
      case 'scrub-right':
        setUi(s => ({
          ...s,
          cursorTapping: true,
          cursorPos: { x: 350, y: 325 },
          playbackProgress: 0.75,
          timestamp: '02:45.10',
          calloutText: CALLOUT_MAP['scrub-right'],
          calloutVisible: true,
        }));
        break;
      case 'hold-scrubbed':
        setUi(s => ({ ...s, cursorTapping: false, calloutVisible: false }));
        break;
      case 'cursor-to-play':
        setUi(s => ({ ...s, cursorPos: { x: 215, y: 295 } }));
        break;
      case 'tap-play':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'playing':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          playbackProgress: 0.85,
          calloutText: CALLOUT_MAP['playing'],
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-skip-fwd':
        setUi(s => ({ ...s, cursorPos: { x: 275, y: 295 }, calloutVisible: false }));
        break;
      case 'tap-skip':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'next-track':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          trackLabel: 'Track 2',
          playbackProgress: 0.0,
          timestamp: '00:00.00',
          calloutText: CALLOUT_MAP['next-track'],
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-volume':
        setUi(s => ({ ...s, cursorPos: { x: 355, y: 295 }, calloutVisible: false }));
        break;
      case 'tap-volume':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'volume-slider-appears':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          calloutText: CALLOUT_MAP['volume-slider-appears'],
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          cursorVisible: false,
          transportState: 'default',
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
          transportState={ui.transportState}
          playbackProgress={ui.playbackProgress}
          trackLabel={ui.trackLabel}
          timestamp={ui.timestamp}
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
