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
