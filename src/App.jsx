import { useState, useCallback, useRef } from 'react';
import ChapterNav from './components/ChapterNav';
import VoiceSelector from './components/VoiceSelector';

import Ch01 from './chapters/Ch01_Bluetooth';
import Ch02 from './chapters/Ch02_Recording';
import Ch03 from './chapters/Ch03_SelectPreset';
import Ch04 from './chapters/Ch04_PresetVolume';
import Ch05 from './chapters/Ch05_Playback';
import Ch06 from './chapters/Ch06_QuickSettings';
import Ch07 from './chapters/Ch07_StereoMode';
import Ch08 from './chapters/Ch08_WirelessControl';
import Ch09 from './chapters/Ch09_PowerSave';
import Ch10 from './chapters/Ch10_AudioFiles';
import Ch11 from './chapters/Ch11_Settings';
import Ch12 from './chapters/Ch12_HelpMenu';

const CHAPTER_COMPONENTS = [
  Ch01, Ch02, Ch03, Ch04, Ch05, Ch06,
  Ch07, Ch08, Ch09, Ch10, Ch11, Ch12,
];

const basePath = import.meta.env.BASE_URL || '/';

function PlaybackControls({ controls }) {
  if (!controls) return null;

  const { playing, finished, play, pause, skipBack, skipForward, restart, stepIndex, totalSteps, loopProgress } = controls;

  const btnStyle = (active) => ({
    background: active ? 'rgba(65, 105, 225, 0.22)' : 'rgba(255,255,255,0.04)',
    border: active ? '1px solid rgba(65, 105, 225, 0.50)' : '1px solid rgba(255,255,255,0.08)',
    borderRadius: 6,
    padding: '5px 12px',
    fontSize: 13,
    color: active ? '#7CA8FF' : 'rgba(255,255,255,0.50)',
    cursor: 'pointer',
    fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
    transition: 'all 150ms ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      {/* Progress bar */}
      <div style={{
        width: 480,
        height: 3,
        background: 'rgba(255,255,255,0.07)',
        borderRadius: 2,
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${(loopProgress || 0) * 100}%`,
          height: '100%',
          background: 'linear-gradient(90deg, var(--blue-primary), var(--text-blue))',
          boxShadow: '0 0 6px rgba(124,168,255,0.50)',
          transition: 'width 60ms linear',
          borderRadius: 2,
        }} />
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <button onClick={skipBack} style={btnStyle(false)} title="Previous step">
          &#9198;
        </button>

        {finished ? (
          <button onClick={restart} style={btnStyle(true)} title="Replay">
            &#8634;
          </button>
        ) : playing ? (
          <button onClick={pause} style={btnStyle(true)} title="Pause">
            &#9208;
          </button>
        ) : (
          <button onClick={play} style={btnStyle(true)} title="Play">
            &#9654;
          </button>
        )}

        <button onClick={skipForward} style={btnStyle(false)} title="Next step">
          &#9197;
        </button>

        <span style={{
          fontSize: 9,
          color: 'rgba(255,255,255,0.25)',
          fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
          marginLeft: 6,
          letterSpacing: '0.04em',
        }}>
          {stepIndex + 1} / {totalSteps}
        </span>
      </div>
    </div>
  );
}

export default function App() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [voice, setVoice] = useState('ava');
  const [controls, setControls] = useState(null);
  const ActiveChapter = CHAPTER_COMPONENTS[activeChapter];

  const handleControls = useCallback((c) => {
    setControls(c);
  }, []);

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: 'var(--bg-app)',
      overflow: 'hidden',
      fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
    }}>
      {/* Chapter grid — left of the UI */}
      <ChapterNav
        activeIndex={activeChapter}
        onChange={(i) => { setActiveChapter(i); setControls(null); }}
      />

      {/* Center column: logo + device + voice selector + controls */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
      }}>
        {/* Transcend logo */}
        <img
          src={`${basePath}images/Transcend_Logo_Blue-Black_CMYK.png`}
          alt="Wenger Transcend"
          style={{
            height: 28,
            objectFit: 'contain',
            opacity: 0.85,
            filter: 'brightness(1.8)',
          }}
        />

        {/* Active chapter */}
        <ActiveChapter key={activeChapter} voice={voice} onControls={handleControls} />

        {/* Voice selector */}
        <VoiceSelector value={voice} onChange={setVoice} />

        {/* Playback controls */}
        <PlaybackControls controls={controls} />
      </div>
    </div>
  );
}
