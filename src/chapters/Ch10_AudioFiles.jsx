import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';
import ProgressBar from '../components/ProgressBar';

const STEPS = [
  { id: 'intro',                duration: 1500 },
  { id: 'cursor-to-hamburger',  duration: 400  },
  { id: 'tap-hamburger',        duration: 200  },
  { id: 'file-list-open',       duration: 2500 },
  { id: 'cursor-to-track2',     duration: 500  },
  { id: 'tap-track2',           duration: 200  },
  { id: 'track2-selected',      duration: 1500 },
  { id: 'cursor-to-play',       duration: 400  },
  { id: 'tap-play',             duration: 200  },
  { id: 'playing-track2',       duration: 2000 },
  { id: 'cursor-to-delete-hint',duration: 500  },
  { id: 'file-manager-reopen',  duration: 200  },
  { id: 'long-press-track',     duration: 600  },
  { id: 'delete-option',        duration: 2000 },
  { id: 'cursor-to-delete',     duration: 300  },
  { id: 'tap-delete',           duration: 200  },
  { id: 'track-removed',        duration: 1500 },
  { id: 'outro',                duration: 2200 },
];

export default function Ch10_AudioFiles() {
  const { currentStep, loopProgress } = useAnimationSequence(STEPS);

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    transportState: 'default',
    fileListOpen: false,
    fileListTracks: ['Track 1', 'Track 2', 'Track 3'],
    fileContextMenu: null,
    trackLabel: 'Track 1',
    playbackProgress: 0.22,
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
          fileListOpen: false,
          fileListTracks: ['Track 1', 'Track 2', 'Track 3'],
          fileContextMenu: null,
          trackLabel: 'Track 1',
          playbackProgress: 0.22,
          transportState: 'default',
          cursorVisible: true,
          cursorPos: { x: 40, y: 270 },
          cursorTapping: false,
          calloutText: 'The file manager holds all your recordings',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-hamburger':
        setUi(s => ({ ...s, cursorPos: { x: 20, y: 295 }, calloutVisible: false }));
        break;
      case 'tap-hamburger':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'file-list-open':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          fileListOpen: true,
          calloutText: 'All saved recordings appear here',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-track2':
        setUi(s => ({ ...s, cursorPos: { x: 100, y: 260 }, calloutVisible: false }));
        break;
      case 'tap-track2':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'track2-selected':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          fileListOpen: false,
          trackLabel: 'Track 2',
          playbackProgress: 0,
          calloutText: 'Track 2 selected',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-play':
        setUi(s => ({ ...s, cursorPos: { x: 215, y: 295 }, calloutVisible: false }));
        break;
      case 'tap-play':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'playing-track2':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          transportState: 'playback',
          playbackProgress: 0.4,
          calloutText: 'Playing Track 2',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-delete-hint':
        setUi(s => ({
          ...s,
          transportState: 'default',
          cursorPos: { x: 20, y: 295 },
          calloutVisible: false,
        }));
        break;
      case 'file-manager-reopen':
        setUi(s => ({
          ...s,
          cursorTapping: true,
          fileListOpen: true,
        }));
        break;
      case 'long-press-track':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorPos: { x: 100, y: 220 },
          calloutText: 'Long press to access delete option',
          calloutVisible: true,
        }));
        break;
      case 'delete-option':
        setUi(s => ({
          ...s,
          fileContextMenu: { x: 140, y: 210 },
          calloutVisible: false,
        }));
        break;
      case 'cursor-to-delete':
        setUi(s => ({ ...s, cursorPos: { x: 180, y: 220 } }));
        break;
      case 'tap-delete':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'track-removed':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          fileContextMenu: null,
          fileListTracks: ['Track 2', 'Track 3'],
          calloutText: 'Track deleted',
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          fileListOpen: false,
          cursorVisible: false,
          calloutText: 'Organize recordings directly from the controller',
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
          fileListOpen={ui.fileListOpen}
          fileListTracks={ui.fileListTracks}
          fileContextMenu={ui.fileContextMenu}
          trackLabel={ui.trackLabel}
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
