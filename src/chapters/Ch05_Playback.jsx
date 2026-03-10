import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',               duration: 3500 },
  { id: 'cursor-to-hamburger', duration: 500  },
  { id: 'tap-hamburger',       duration: 200  },
  { id: 'playback-mode',       duration: 4000 },
  { id: 'cursor-to-scrubber',  duration: 500  },
  { id: 'scrub-right',         duration: 1200 },
  { id: 'hold-scrubbed',       duration: 1500 },
  { id: 'cursor-to-play',      duration: 400  },
  { id: 'tap-play',            duration: 200  },
  { id: 'playing',             duration: 4000 },
  { id: 'cursor-to-skip-fwd',  duration: 400  },
  { id: 'tap-skip',            duration: 200  },
  { id: 'next-track',          duration: 3000 },
  { id: 'cursor-to-volume',    duration: 400  },
  { id: 'tap-volume',          duration: 200  },
  { id: 'volume-slider-appears', duration: 4000 },
  { id: 'outro',               duration: 4000 },
];

export default function Ch05_Playback({ voice, onControls }) {
  const controls = useAnimationSequence(STEPS);
  const { currentStep, loopProgress } = controls;

  useEffect(() => { if (onControls) onControls(controls); }, [controls.stepIndex, controls.playing, controls.finished]);

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
          calloutText: 'Select a track to begin playback',
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
          calloutText: 'You are now in playback mode. Use the scrubber to seek through the track',
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
          calloutText: 'You can scrub forward through the track like this',
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
          calloutText: 'The progress bar moves in real time as the track plays',
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
          calloutText: 'Tap the skip button to jump to the next track',
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
          calloutText: 'You can adjust playback volume separately from the acoustics volume',
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          cursorVisible: false,
          transportState: 'default',
          calloutText: 'Full transport controls are available on every screen',
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
          playbackProgress={ui.playbackProgress}
          trackLabel={ui.trackLabel}
          timestamp={ui.timestamp}
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
