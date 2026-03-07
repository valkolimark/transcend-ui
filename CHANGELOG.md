# Changelog

All notable changes to the Wenger Transcend UI project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- GitHub README and CHANGELOG
- Project scaffold with Vite 4 and React 18
- Global CSS design token system — all colors, spacing, typography as custom properties
- Global CSS keyframe animation library — ripple, fadeInUp, fadeOutUp, recPulse, slideDownPanel, slideInRight, modalEnter, cursorTap
- `useAnimationSequence` hook — declarative step-based animation timing with auto-loop
- `TranscendUI` component — pixel-accurate Transcend TS1 UI replica
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

### Planned
- GitHub Pages deployment at https://valkolimark.github.io/transcend-ui/

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
