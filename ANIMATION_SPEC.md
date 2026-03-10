# Animation Specification — Transcend Shorts

This document defines the animation system architecture, timing conventions, and the `useAnimationSequence` hook that all 12 chapters share.

---

## 1. Core Architecture

Every chapter is structured as:

```
ChapterComponent
  └── App Shell (provides nav, layout)
  └── TranscendUI (the base device replica — NEVER modified per chapter)
  └── ChapterOverlay (chapter-specific animations, cursors, panels)
  └── Callout (caption strip)
  └── ProgressBar (loop indicator)
```

**Rule**: `TranscendUI.jsx` is shared and receives props for its current visual state. Chapters pass state down as props. No chapter imports anything except the shared component set.

---

## 2. `useAnimationSequence` Hook

Location: `src/hooks/useAnimationSequence.js`

```javascript
/**
 * Drives a linear sequence of named steps with defined durations.
 * Automatically loops back to step 0 after all steps complete.
 *
 * @param {Array<{id: string, duration: number}>} steps
 * @returns {{ currentStep: string, stepIndex: number, loopProgress: number }}
 *
 * loopProgress: 0.0 → 1.0 over the full loop duration (for ProgressBar)
 */

import { useState, useEffect, useRef } from 'react';

export function useAnimationSequence(steps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [loopProgress, setLoopProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  const totalDuration = steps.reduce((sum, s) => sum + s.duration, 0);

  useEffect(() => {
    startTimeRef.current = Date.now();
    let cumulative = 0;
    const timeouts = [];

    steps.forEach((step, i) => {
      const t = setTimeout(() => setStepIndex(i), cumulative);
      timeouts.push(t);
      cumulative += step.duration;
    });

    // Loop restart
    const loopTimeout = setTimeout(() => {
      setStepIndex(0);
      startTimeRef.current = Date.now();
    }, totalDuration);
    timeouts.push(loopTimeout);

    // Progress ticker
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      setLoopProgress(Math.min(elapsed / totalDuration, 1));
    }, 50);

    return () => {
      timeouts.forEach(clearTimeout);
      clearInterval(interval);
    };
  }, []); // Empty dep array — sequence defined once at mount

  return {
    currentStep: steps[stepIndex]?.id ?? steps[0].id,
    stepIndex,
    loopProgress,
  };
}
```

---

## 3. Animation Timing Standards

All durations are in **milliseconds**.

```
PAUSE_INTRO:        1500   — hold before first action
PAUSE_BEAT:         600    — brief pause between actions
PAUSE_DWELL:        2000   — hold to let user read/absorb
PAUSE_LONG_DWELL:   2800   — hold for complex screens
PAUSE_OUTRO:        2200   — hold on final state before loop

CURSOR_TRAVEL:      500    — cursor moves to new target
TAP_HOLD:           200    — cursor paused at tap target before triggering
TAP_RELEASE:        150    — snap to active state
TRANSITION_UI:      350    — UI state changes (panel open, selection change)
TRANSITION_MODAL:   300    — modal enter/exit
```

---

## 4. Cursor System

### CursorDot Component Props

```typescript
interface CursorDotProps {
  x: number;          // px from left of TranscendUI container
  y: number;          // px from top of TranscendUI container
  tapping: boolean;   // true during TAP_HOLD phase
  visible: boolean;   // fade in/out
}
```

### Cursor Coordinate Reference

All coordinates are relative to the **480×320** device screen (not the outer frame).

```
PRESET BUTTON CENTERS (x, y):
  Studio A:        80,  65
  Studio B:       215,  65
  Recital Hall:   350,  65
  Chamber Hall:    80, 130
  Concert Hall:   215, 130
  Great Hall:     350, 130
  Chapel:          80, 195
  Arena:          215, 195
  Grand Cathedral:350, 195

TRANSPORT BAR ELEMENTS:
  Hamburger icon:  20, 295
  REC button:      65, 295
  Skip back:      155, 295
  Play/Pause:     215, 295
  Skip forward:   275, 295
  Volume speaker: 355, 295

VOLUME SLIDER:
  Knob (default): 455, 140
  Knob (high):    455,  80
  Knob (low):     455, 200

AUX BUTTON (top-right):    445,  18
QUICK SETTINGS SWIPE DOWN: 240,  10  → drag to 240, 80

QUICK SETTINGS BUTTONS:
  Stereo Mode:    115, 340  (in panel y space, offset from screen top)
  Bluetooth:      295, 340
  Help:            60, 395
  Net Control:    165, 395
  Settings:       270, 395
  Standby:        375, 395
```

### Cursor Movement

Use CSS `transition` on `left` and `top` with `CURSOR_TRAVEL` duration.

```css
.cursor {
  transition:
    left 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
    top  500ms cubic-bezier(0.25, 0.46, 0.45, 0.94),
    transform 150ms ease,
    opacity 200ms ease;
}
```

### Tap Sequence (per action)

```
1. Cursor arrives at target (CURSOR_TRAVEL ms)
2. TAP_HOLD pause — cursor shows tapping state (scale down)
3. Ripple emitted at cursor center
4. UI state updates (button activates, panel opens, etc.)
5. PAUSE_BEAT before next cursor move
```

---

## 5. Loop Progress Bar

Location: bottom of device frame, 2px height, full width.

```
Fills left → right over full loop duration.
Reset to 0 at loop restart (no animation — instant reset).

Track:  rgba(255,255,255,0.07)
Fill:   linear-gradient(90deg, #4361EE, #7C9EFF)
Glow:   box-shadow: 0 0 6px rgba(124,158,255,0.50)
```

---

## 6. Chapter Template Structure

Every chapter file should follow this exact structure:

```jsx
// src/chapters/Ch03_SelectPreset.jsx

import { useState, useEffect } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';
import ProgressBar from '../components/ProgressBar';

// 1. Define animation steps
const STEPS = [
  { id: 'intro',           duration: 1500 },
  { id: 'cursor-to-b',     duration: 500  },
  { id: 'tap-studio-b',    duration: 200  },
  { id: 'active-studio-b', duration: 2000 },
  // ... all steps
  { id: 'outro',           duration: 2200 },
];

export default function Ch03_SelectPreset() {
  const { currentStep, loopProgress } = useAnimationSequence(STEPS);

  // 2. Derive UI state from currentStep
  const [uiState, setUiState] = useState({
    activePreset: 'studio-a',
    showInfoTooltip: false,
    infoPresetId: null,
    transportState: 'default',
    quickSettingsOpen: false,
    auxPanelOpen: false,
    modalType: null,
    cursorPos: { x: 80, y: 65 },
    cursorTapping: false,
    cursorVisible: false,
    calloutText: '',
    calloutVisible: false,
  });

  useEffect(() => {
    // 3. Map each step id to UI state updates
    switch (currentStep) {
      case 'intro':
        setUiState(s => ({
          ...s,
          activePreset: 'studio-a',
          cursorVisible: true,
          cursorPos: { x: 80, y: 65 },
          calloutText: 'Tap any preset to select a room acoustic',
          calloutVisible: true,
        }));
        break;
      case 'cursor-to-b':
        setUiState(s => ({
          ...s,
          cursorPos: { x: 215, y: 65 },
          calloutVisible: false,
        }));
        break;
      case 'tap-studio-b':
        setUiState(s => ({ ...s, cursorTapping: true }));
        break;
      case 'active-studio-b':
        setUiState(s => ({
          ...s,
          cursorTapping: false,
          activePreset: 'studio-b',
          calloutText: 'Studio B selected',
          calloutVisible: true,
        }));
        break;
      // ... other cases
    }
  }, [currentStep]);

  // 4. Render
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <TranscendUI {...uiState} />
      <CursorDot
        x={uiState.cursorPos.x}
        y={uiState.cursorPos.y}
        tapping={uiState.cursorTapping}
        visible={uiState.cursorVisible}
      />
      <Callout text={uiState.calloutText} visible={uiState.calloutVisible} />
      <ProgressBar progress={loopProgress} />
    </div>
  );
}
```

---

## 7. TranscendUI Props Interface

```typescript
interface TranscendUIProps {
  // Preset grid
  activePreset: PresetId;           // which button is highlighted blue
  showInfoTooltip: boolean;         // show ⓘ tooltip
  infoPresetId: PresetId | null;    // which preset's info to show

  // Transport
  transportState: 'default'        // normal home state
    | 'recording'                   // recording in progress
    | 'recorded-playing'            // reviewing recorded audio, playing
    | 'recorded-paused'             // reviewing recorded audio, paused
    | 'playback';                   // playback slider mode

  // Overlays
  quickSettingsOpen: boolean;       // quick settings panel visible
  stereoModeActive: boolean;        // stereo mode toggle state
  bluetoothActive: boolean;         // bluetooth toggle state

  auxPanelOpen: boolean;            // aux inputs panel visible

  // Modals
  modalType: null
    | 'bluetooth-pairing'
    | 'qr-web-ui'
    | 'qr-help'
    | 'enter-standby'
    | 'standby-screen'
    | 'admin-login';

  // Volume
  volumeLevel: number;              // 0.0 – 1.0, affects slider knob position

  // Playback progress
  playbackProgress: number;         // 0.0 – 1.0 for progress bar scrubber

  // Recording animation
  recordingActive: boolean;         // enables red dot pulsing
}

type PresetId =
  | 'studio-a' | 'studio-b' | 'recital-hall'
  | 'chamber-hall' | 'concert-hall' | 'great-hall'
  | 'chapel' | 'arena' | 'grand-cathedral';
```

---

## 8. CSS Keyframes (Global)

Define once in `index.css` or `App.css`:

```css
@keyframes ripple {
  0%   { transform: scale(0.4); opacity: 0.8; }
  100% { transform: scale(2.8); opacity: 0; }
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}

@keyframes fadeOutUp {
  from { opacity: 1; transform: translateY(0); }
  to   { opacity: 0; transform: translateY(-8px); }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to   { opacity: 1; }
}

@keyframes recPulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}

@keyframes slideDownPanel {
  from { transform: translateY(-100%); }
  to   { transform: translateY(0); }
}

@keyframes slideInRight {
  from { transform: translateX(100%); }
  to   { transform: translateX(0); }
}

@keyframes modalEnter {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}

@keyframes cursorTap {
  0%   { transform: scale(1.0); }
  50%  { transform: scale(0.68); }
  100% { transform: scale(1.0); }
}
```
