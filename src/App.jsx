import { useState, useRef } from 'react';
import ChapterNav from './components/ChapterNav';
import TranscendUI from './components/TranscendUI';

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

export default function App() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [started, setStarted] = useState(false);
  const uiRef = useRef(null);
  const ActiveChapter = CHAPTER_COMPONENTS[activeChapter];

  const handleChapterSelect = (i) => {
    // Cancel any in-progress speech immediately
    window.speechSynthesis?.cancel();
    setStarted(false);
    setActiveChapter(i);
    // After a tick, start the chapter fresh
    setTimeout(() => setStarted(true), 50);
  };

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: 'var(--bg-app)',
      overflow: 'hidden',
      fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
    }}>
      {/* Sidebar */}
      <ChapterNav
        activeIndex={started ? activeChapter : -1}
        onChange={handleChapterSelect}
      />

      {/* Main content area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {started ? (
          <ActiveChapter key={activeChapter} started={started} uiRef={uiRef} />
        ) : (
          /* Default resting state — no animation */
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
          }}>
            <div ref={uiRef} style={{ position: 'relative', width: 480, height: 320 }}>
              <TranscendUI
                activePreset="studio-a"
                transportState="default"
                quickSettingsOpen={false}
                stereoModeActive={false}
                bluetoothActive={false}
                modalType={null}
              />
            </div>
            <div style={{
              fontSize: 13,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.40)',
              textAlign: 'center',
              fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
              letterSpacing: '0.02em',
            }}>
              Select a chapter to begin.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
