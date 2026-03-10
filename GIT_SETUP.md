# Git Setup & Claude Code Workflow

This document tells Claude Code exactly how to scaffold, build, and push this project to GitHub.

**Repository:** `https://github.com/valkolimark/transcend-ui.git`

---

## 1. Repository Setup

### Initialize the project

```bash
mkdir transcend-ui
cd transcend-ui
git init
```

### Create the Vite + React project

```bash
npm create vite@latest . -- --template react
npm install
```

### Create `.gitignore`

```
node_modules/
dist/
.DS_Store
*.local
.env
```

### Connect to the remote repository

```bash
git remote add origin https://github.com/valkolimark/transcend-ui.git
git branch -M main
```

---

## 2. Project Scaffolding — Claude Code Build Order

Claude Code should create files in this exact order to avoid import errors:

### Step 1: Repo-level documents (create FIRST — before any code)

```
README.md        ← public-facing GitHub README (full template in Section 7)
CHANGELOG.md     ← version history log (full template in Section 8)
```

### Step 2: Base styles and entry

```
index.html          ← include Google Fonts <link>, set title "Wenger Transcend TS1"
src/main.jsx        ← standard Vite React entry
src/index.css       ← global CSS vars, @font-face, keyframes (see ANIMATION_SPEC.md)
```

`index.html` must include:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet">
```

`src/index.css` must include:
```css
* { box-sizing: border-box; margin: 0; padding: 0; }
body { background: #0a0a0f; overflow: hidden; }

@font-face {
  font-family: 'Avenir LT Pro';
  src: local('Avenir LT Pro'), local('AvenirLTPro'), local('Avenir');
  font-weight: normal;
}

/* All keyframes from ANIMATION_SPEC.md section 8 go here */
```

### Step 3: Shared hooks

```
src/hooks/useAnimationSequence.js   ← exact implementation from ANIMATION_SPEC.md section 2
```

### Step 4: Shared components (build in this order)

```
src/components/ProgressBar.jsx      ← simplest, no deps
src/components/Callout.jsx          ← no deps
src/components/CursorDot.jsx        ← no deps
src/components/TranscendUI.jsx      ← depends on nothing, receives all state as props
src/components/ChapterNav.jsx       ← depends on CHAPTERS metadata
```

### Step 5: Chapter files (can be built in any order after step 4)

```
src/chapters/Ch01_Bluetooth.jsx
src/chapters/Ch02_Recording.jsx
src/chapters/Ch03_SelectPreset.jsx
src/chapters/Ch04_PresetVolume.jsx
src/chapters/Ch05_Playback.jsx
src/chapters/Ch06_QuickSettings.jsx
src/chapters/Ch07_StereoMode.jsx
src/chapters/Ch08_WirelessControl.jsx
src/chapters/Ch09_PowerSave.jsx
src/chapters/Ch10_AudioFiles.jsx
src/chapters/Ch11_Settings.jsx
src/chapters/Ch12_HelpMenu.jsx
```

### Step 6: App shell

```
src/App.jsx     ← imports all chapters, ChapterNav, wires together
```

---

## 3. `package.json`

```json
{
  "name": "transcend-ui",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.0.0",
    "gh-pages": "^5.0.0",
    "vite": "^4.4.0"
  }
}
```

---

## 4. `vite.config.js`

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/transcend-ui/',   // matches GitHub repo name for Pages compatibility
})
```

---

## 5. `App.jsx` Structure

```jsx
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
      background: '#0a0a0f',
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
```

**Important:** `key={activeChapter}` on `<ActiveChapter>` ensures the animation resets on chapter switch.

---

## 6. TranscendUI Component Implementation Notes

This is the most important component. Claude Code must build it precisely.

### Layout rules:
- Total rendered width: **480px** fixed
- Total rendered height: **320px** fixed
- Overflow: hidden
- All child elements positioned absolutely within this canvas

### The component must:
1. Accept all props defined in `ANIMATION_SPEC.md` section 7
2. Render the exact layout from `UI_SPEC.md` section 4
3. Apply all color tokens from `UI_SPEC.md` section 2
4. Animate smoothly between `transportState` values
5. Render `quickSettingsOpen` panel with slide-down animation
6. Render the correct modal based on `modalType` prop
7. Render `auxPanelOpen` with slide-in-from-right animation
8. Apply `recPulse` animation on the REC dot when `recordingActive === true`

### Do NOT:
- Use any CSS framework (no Tailwind, no Bootstrap)
- Use any animation library (no Framer Motion, no GSAP)
- Use `localStorage` or `sessionStorage`
- Add any UI not specified in `UI_SPEC.md`

---

## 7. GitHub README Template

Claude Code must create this file as `README.md` at the **project root** as the very first file before any code is written. This is what GitHub displays on the repository homepage.

````markdown
# Wenger Transcend TS1 — Interactive Feature Guide

> 12 animated tutorial shorts demonstrating every feature of the Wenger Transcend TS1
> Active Acoustics controller touchscreen UI.

![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white&style=flat-square)
![Vite](https://img.shields.io/badge/Vite-4-646cff?logo=vite&logoColor=white&style=flat-square)
![Status](https://img.shields.io/badge/Status-In%20Development-orange?style=flat-square)
![License](https://img.shields.io/badge/License-Private-lightgrey?style=flat-square)

---

## Overview

This application is an animated UI reference tool built for the **Wenger Transcend TS1**
Active Acoustics controller. Each of the 12 chapters auto-plays a looping tutorial
demonstrating one feature of the device — no interaction required.

The interface is a pixel-accurate recreation of the real Transcend TS1 touchscreen,
built entirely in React with no external animation libraries.

---

## Chapters

| # | Feature | Description |
|---|---------|-------------|
| 01 | Connect to Bluetooth | Pair a device via Quick Settings |
| 02 | Make & Save a Recording | Record, review, and save audio tracks |
| 03 | Selecting a Preset | Choose from 9 acoustic room presets |
| 04 | Preset Volume | Adjust Active Acoustics output level |
| 05 | Playback Controls | Transport bar, scrubbing, track selection |
| 06 | Quick Settings Menu | Swipe-down panel overview |
| 07 | Stereo Mode | Toggle dual-channel processing |
| 08 | Wireless Control | Net Control QR code and web interface |
| 09 | Power Save / Standby | Enter and exit standby mode |
| 10 | Managing Audio Files | File manager, playback, and deletion |
| 11 | Settings | Admin passcode and system settings |
| 12 | Help Menu | Online user guide QR code |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
git clone https://github.com/valkolimark/transcend-ui.git
cd transcend-ui
npm install
```

### Run locally

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for production

```bash
npm run build
```

### Deploy to GitHub Pages

```bash
npm run deploy
```

Live at: [https://valkolimark.github.io/transcend-ui/](https://valkolimark.github.io/transcend-ui/)

---

## Tech Stack

- **React 18** — UI and state management
- **Vite 4** — build tool and dev server
- **CSS custom properties** — design token system
- **Pure CSS keyframe animations** — no animation libraries
- **Avenir LT Pro / Nunito** — typography matching original device

---

## Project Structure

```
transcend-ui/
├── src/
│   ├── App.jsx                    # Chapter navigation shell
│   ├── components/
│   │   ├── TranscendUI.jsx        # Pixel-accurate device UI replica
│   │   ├── CursorDot.jsx          # Animated tap cursor with ripple
│   │   ├── Callout.jsx            # Caption overlay
│   │   ├── ProgressBar.jsx        # Loop progress indicator
│   │   └── ChapterNav.jsx         # Left sidebar navigation
│   ├── chapters/
│   │   ├── Ch01_Bluetooth.jsx
│   │   ├── Ch02_Recording.jsx
│   │   └── ... (12 total)
│   └── hooks/
│       └── useAnimationSequence.js
├── README.md
├── CHANGELOG.md
└── package.json
```

---

## Design Specifications

All visual specifications are documented in:

- `UI_SPEC.md` — colors, typography, component dimensions
- `ANIMATION_SPEC.md` — timing, cursor system, keyframes
- `CHAPTERS.md` — per-chapter animation scripts

---

## Built for

**Wenger Corporation** — [wengercorp.com](https://www.wengercorp.com)

*Transcend TS1 Active Acoustics Controller*
````

---

## 8. CHANGELOG Template

Claude Code must create this file as `CHANGELOG.md` at the **project root** as the second file before any code is written. It must be updated (adding entries under `[Unreleased]`) before every commit milestone.

````markdown
# Changelog

All notable changes to the Wenger Transcend UI project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- All 12 animated chapter shorts
- GitHub Pages deployment at https://valkolimark.github.io/transcend-ui/

---

## [1.0.0] — Initial Release (In Progress)

### Added
- Project scaffold with Vite 4 and React 18
- Global CSS design token system — all colors, spacing, typography as custom properties
- Global CSS keyframe animation library — ripple, fadeInUp, fadeOutUp, recPulse,
  slideDownPanel, slideInRight, modalEnter, cursorTap
- `useAnimationSequence` hook — declarative step-based animation timing with auto-loop
- `TranscendUI` component — pixel-accurate Transcend TS1 UI replica
  - Home screen with 3×3 preset grid (Active Acoustics)
  - Active/inactive preset button states with ⓘ info badge
  - Preset info tooltip with description text
  - Vertical volume slider with animated knob and blue fill
  - Blue vertical accent line separating grid and volume sidebar
  - Transport bar states: default, recording, recorded-paused, recorded-playing, playback
  - REC indicator with pulsing animation during active recording
  - Quick Settings panel — slide down from top edge
  - Aux Inputs panel — slide in from right edge
  - Modals: Bluetooth Pairing, QR Web UI, QR Help, Enter Standby,
    Standby Screen, Admin Login numpad
  - Mute button with active/muted visual states
- `CursorDot` component — animated finger tap ring with inner dot and ripple effect
- `Callout` component — caption overlay with fadeInUp/fadeOutUp transitions
- `ProgressBar` component — loop progress indicator at device bottom
- `ChapterNav` component — 72px left sidebar with 12 chapter selector buttons
- Chapter 01: Connect to Bluetooth
- Chapter 02: Make & Save a Recording
- Chapter 03: Selecting a Preset
- Chapter 04: Preset Volume
- Chapter 05: Playback Controls
- Chapter 06: Quick Settings Menu
- Chapter 07: Stereo Mode
- Chapter 08: Wireless Control (Net Control / QR)
- Chapter 09: Power Save / Standby Mode
- Chapter 10: Managing Audio Files
- Chapter 11: Settings (Admin Login)
- Chapter 12: Help Menu (QR Code)
- `App.jsx` — chapter navigation shell with key-based animation reset
- GitHub Pages deployment via `gh-pages` package

---

## Versioning Guide

Use these prefixes in future CHANGELOG entries:

| Prefix | Meaning |
|--------|---------|
| `Added` | New features, chapters, or components |
| `Changed` | Updates to existing animations, UI, or copy |
| `Fixed` | Bug fixes and corrections |
| `Removed` | Deleted features or files |
| `Security` | Security-related patches |

### Version bump rules
- **Patch** `1.0.x` — timing tweaks, callout copy edits, minor visual fixes
- **Minor** `1.x.0` — new chapter, significant animation rework, new component
- **Major** `x.0.0` — full UI redesign, framework migration, breaking restructure
````

---

## 9. Git Commit Strategy

Before every commit, Claude Code must:
1. Add the work to `CHANGELOG.md` under `[Unreleased]`
2. Stage all changed files
3. Commit with the message below

```bash
# ── Milestone 1: Repo documents ─────────────────────────────────
git add README.md CHANGELOG.md
git commit -m "docs: add GitHub README and CHANGELOG"

# ── Milestone 2: Project scaffold ───────────────────────────────
git add .
git commit -m "feat: project scaffold — Vite/React 18, CSS tokens, global keyframes"

# ── Milestone 3: Shared infrastructure ──────────────────────────
git add .
git commit -m "feat: shared components — TranscendUI, CursorDot, Callout, ProgressBar, ChapterNav"

# ── Milestone 4: Chapters 01–03 ─────────────────────────────────
git add .
git commit -m "feat(chapters): 01 Bluetooth, 02 Recording, 03 Select Preset"

# ── Milestone 5: Chapters 04–06 ─────────────────────────────────
git add .
git commit -m "feat(chapters): 04 Volume, 05 Playback, 06 Quick Settings"

# ── Milestone 6: Chapters 07–09 ─────────────────────────────────
git add .
git commit -m "feat(chapters): 07 Stereo Mode, 08 Wireless Control, 09 Standby"

# ── Milestone 7: Chapters 10–12 ─────────────────────────────────
git add .
git commit -m "feat(chapters): 10 Audio Files, 11 Settings, 12 Help Menu"

# ── Milestone 8: App shell ───────────────────────────────────────
git add .
git commit -m "feat: App.jsx — chapter navigation shell, key-based animation reset"

# ── Milestone 9: Polish pass ─────────────────────────────────────
git add .
git commit -m "polish: timing refinements, callout copy review, cursor smoothing"

# ── Milestone 10: Release — update CHANGELOG [Unreleased] → [1.0.0]
git add CHANGELOG.md
git commit -m "docs: CHANGELOG — mark v1.0.0 release"

# ── Push all commits ─────────────────────────────────────────────
git push origin main
```

---

## 10. GitHub Pages Deployment

```bash
npm run deploy
```

This runs `npm run build` then automatically pushes the `dist/` folder to the `gh-pages` branch.

Live URL after deploy:
**`https://valkolimark.github.io/transcend-ui/`**

---

## 11. Full Claude Code Prompt

Copy and paste this entire block into a new Claude Code session. All 5 spec files (`UI_SPEC.md`, `ANIMATION_SPEC.md`, `CHAPTERS.md`, `GIT_SETUP.md`, `README.md` draft) must be in the working directory.

---

```
You are building a React web application for Wenger Corporation called "Transcend UI".

Repository: https://github.com/valkolimark/transcend-ui.git

The app contains 12 auto-playing animated tutorial shorts demonstrating the UI of the
Wenger Transcend TS1 Active Acoustics controller touchscreen.

━━━ BEFORE WRITING ANY CODE ━━━
Read ALL of the following spec files in full:
  1. UI_SPEC.md        — exact pixel specs: colors, sizes, typography, every component
  2. ANIMATION_SPEC.md — animation system, useAnimationSequence hook, cursor coords, keyframes
  3. CHAPTERS.md       — step-by-step animation scripts for all 12 chapters
  4. GIT_SETUP.md      — build order, file templates, commit strategy, README and CHANGELOG templates

━━━ BUILD ORDER (follow exactly) ━━━
1. Create README.md at project root (use template from GIT_SETUP.md section 7)
2. Create CHANGELOG.md at project root (use template from GIT_SETUP.md section 8)
3. Commit: "docs: add GitHub README and CHANGELOG"
4. Scaffold Vite + React: index.html (with Google Fonts link), src/main.jsx, src/index.css
   - index.css must contain ALL CSS custom properties from UI_SPEC.md section 2
   - index.css must contain ALL keyframes from ANIMATION_SPEC.md section 8
5. Commit: "feat: project scaffold — Vite/React 18, CSS tokens, global keyframes"
6. Create src/hooks/useAnimationSequence.js (exact code from ANIMATION_SPEC.md section 2)
7. Create src/components/ProgressBar.jsx
8. Create src/components/Callout.jsx
9. Create src/components/CursorDot.jsx (finger tap ring + ripple — UI_SPEC.md section 16)
10. Create src/components/TranscendUI.jsx (THE most critical file — all states from UI_SPEC.md)
11. Create src/components/ChapterNav.jsx
12. Commit: "feat: shared components — TranscendUI, CursorDot, Callout, ProgressBar, ChapterNav"
13. Create all 12 chapter files in src/chapters/ (template in ANIMATION_SPEC.md section 6)
14. Commit after each group of 3 chapters (see GIT_SETUP.md section 9 for messages)
15. Create src/App.jsx (structure from GIT_SETUP.md section 5)
16. Final commit and push

━━━ KEY REQUIREMENTS ━━━
- Font stack: "Avenir LT Pro", "Avenir", "Nunito", sans-serif (in that exact order)
- All colors MUST use CSS custom properties — never hardcode hex values in components
- NO CSS frameworks (no Tailwind, no Bootstrap, no styled-components)
- NO animation libraries (no Framer Motion, no GSAP, no react-spring)
- TranscendUI.jsx is shared — ALL 12 chapters use the exact same component
- Each chapter controls TranscendUI purely through props — zero UI logic inside TranscendUI
- Cursor: 24px ring + 10px inner dot, ripple on tap (UI_SPEC.md section 16)
- Chapter switch MUST reset animation: use key={activeChapter} on active chapter component
- vite.config.js base must be '/transcend-ui/' for GitHub Pages

━━━ GIT WORKFLOW ━━━
- Remote: https://github.com/valkolimark/transcend-ui.git
- Update CHANGELOG.md [Unreleased] section before every commit
- Follow exact commit messages from GIT_SETUP.md section 9
- Push to main after all 12 chapters and App.jsx are complete

━━━ QUALITY CHECKS (verify before each commit) ━━━
- README.md and CHANGELOG.md exist at repo root
- Active preset: blue gradient + scale(1.02) + ⓘ badge
- Inactive presets: var(--bg-button-idle) background, no blue
- "Active Acoustics" label: var(--text-tertiary) = rgba(255,255,255,0.40) — NOT white
- Volume slider: vertical, right side, knob is var(--slider-knob) = #4361EE with glow
- Blue vertical line: 2px solid var(--blue-vert-line) = #4361EE
- REC dot: var(--red-rec) = #E03131
- Quick Settings: slides DOWN from top
- Aux panel: slides in from RIGHT
- Modals: scale in using modalEnter keyframe
- Cursor ripple: scale(0.4)→scale(2.8), opacity 0.8→0, 600ms ease-out
- Callout: fadeInUp enter, fadeOutUp exit
```

---

## 12. Quality Checklist for Claude Code

Verify before each commit:

- [ ] `README.md` exists at repo root — all sections complete, correct repo URL
- [ ] `CHANGELOG.md` exists at repo root — current milestone added under `[Unreleased]`
- [ ] Active preset button has blue gradient + `scale(1.02)` + ⓘ badge
- [ ] Inactive preset buttons use `var(--bg-button-idle)` — no blue tint
- [ ] Volume knob on vertical track, right side, color `var(--slider-knob)`
- [ ] Blue 2px vertical line between grid and volume sidebar
- [ ] "Active Acoustics" label is `var(--text-tertiary)` — NOT white
- [ ] REC dot is `var(--red-rec)` = `#E03131` — not pink, not orange
- [ ] Quick Settings slides **DOWN** from top edge
- [ ] Aux Inputs panel slides in from **RIGHT** edge
- [ ] Modals scale in from center using `modalEnter` keyframe
- [ ] Cursor tap emits ripple div — scale + fade out over 600ms
- [ ] Chapter switch resets animation via `key={activeChapter}`
- [ ] Callout uses `fadeInUp` enter / `fadeOutUp` exit
- [ ] Font stack: `"Avenir LT Pro", "Avenir", "Nunito", sans-serif`
- [ ] `vite.config.js` has `base: '/transcend-ui/'`
- [ ] Git remote is `https://github.com/valkolimark/transcend-ui.git`
- [ ] All colors reference CSS custom properties — no hardcoded hex values in `.jsx` files
