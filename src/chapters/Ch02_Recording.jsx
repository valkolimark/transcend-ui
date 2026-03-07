import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';
import ProgressBar from '../components/ProgressBar';

const STEPS = [
  { id: 'intro',             duration: 1500 },
  { id: 'cursor-to-rec',     duration: 500  },
  { id: 'tap-rec',           duration: 200  },
  { id: 'recording-active',  duration: 3500 },
  { id: 'cursor-away',       duration: 400  },
  { id: 'dwell-recording',   duration: 1500 },
  { id: 'cursor-to-stop',    duration: 400  },
  { id: 'tap-stop',          duration: 200  },
  { id: 'recorded-pause',    duration: 2500 },
  { id: 'cursor-to-play',    duration: 400  },
  { id: 'tap-play-review',   duration: 200  },
  { id: 'recorded-playing',  duration: 2000 },
  { id: 'cursor-to-save',    duration: 500  },
  { id: 'tap-save',          duration: 200  },
  { id: 'saved-confirm',     duration: 2000 },
  { id: 'outro',             duration: 2200 },
];

export default function Ch02_Recording() {
  const { currentStep, loopProgress } = useAnimationSequence(STEPS);

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    transportState: 'default',
    recordingActive: false,
    recordingHeader: null,
    playbackProgress: 0.22,
    cursorPos: { x: 65, y: 295 },
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
          recordingActive: false,
          recordingHeader: null,
          playbackProgress: 0.22,
          cursorVisible: true,
          cursorPos: { x: 100, y: 260 },
          cursorTapping: false,
          calloutText: 'Tap REC to start recording',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-rec':
        setUi(s => ({ ...s, cursorPos: { x: 65, y: 295 }, calloutVisible: false }));
        break;
      case 'tap-rec':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'recording-active':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          transportState: 'recording',
          recordingActive: true,
          recordingHeader: 'Recording...',
          calloutText: 'Recording in progress — red dot pulses',
          calloutVisible: true,
        }));
        break;
      case 'cursor-away':
        setUi(s => ({ ...s, cursorPos: { x: 240, y: 160 }, calloutVisible: false }));
        break;
      case 'dwell-recording':
        break;
      case 'cursor-to-stop':
        setUi(s => ({ ...s, cursorPos: { x: 85, y: 295 } }));
        break;
      case 'tap-stop':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'recorded-pause':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          transportState: 'recorded-paused',
          recordingActive: false,
          recordingHeader: 'Playing recorded track',
          calloutText: 'Recording stopped — review before saving',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-play':
        setUi(s => ({ ...s, cursorPos: { x: 215, y: 295 }, calloutVisible: false }));
        break;
      case 'tap-play-review':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'recorded-playing':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          transportState: 'recorded-playing',
          playbackProgress: 0.45,
          calloutText: 'Preview your recording',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-save':
        setUi(s => ({ ...s, cursorPos: { x: 55, y: 295 }, calloutVisible: false }));
        break;
      case 'tap-save':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'saved-confirm':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          transportState: 'default',
          recordingHeader: null,
          playbackProgress: 0.22,
          calloutText: 'Track saved to file manager \u2713',
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          cursorVisible: false,
          calloutText: 'Record, review, and save — all from the home screen',
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
          recordingActive={ui.recordingActive}
          recordingHeader={ui.recordingHeader}
          playbackProgress={ui.playbackProgress}
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
