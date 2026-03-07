import { useState } from 'react';
import ChapterNav from './components/ChapterNav';

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
  const ActiveChapter = CHAPTER_COMPONENTS[activeChapter];

  return (
    <div style={{
      display: 'flex',
      width: '100vw',
      height: '100vh',
      background: 'var(--bg-app)',
      overflow: 'hidden',
      fontFamily: "'Avenir LT Pro', 'Avenir', 'Nunito', sans-serif",
    }}>
      <ChapterNav
        activeIndex={activeChapter}
        onChange={setActiveChapter}
      />
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <ActiveChapter key={activeChapter} />
      </div>
    </div>
  );
}
