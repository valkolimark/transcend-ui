# Changelog

All notable changes to the Wenger Transcend UI project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- Playback controls bar (play, pause, skip forward/back, replay) below voice selector
- Step counter display showing current step position (e.g. "3 / 11")
- Production PNG image assets for all UI icons, buttons, QR codes, and modals
- `onControls` callback prop on all 12 chapters to expose animation state to App shell

### Changed
- All SVG icon components in `TranscendUI.jsx` replaced with actual Transcend PNG assets
- Quick Settings toggle pills and action buttons now render full button images (no double-framing)
- Modal buttons (Cancel, Yes, Close, Wake Up) now use pre-rendered button images with baked-in text
- Transport bar speaker icon corrected from `volume_btn.png` (knob graphic) to `sound_on_btn.png`
- Mute button uses `unmuted_icon.png` / `muted_icon.png` Transcend logo assets
- QR code placeholders replaced with actual `web_ui_qr_code.png` and `online_user_guide_QR_code.png`
- `useAnimationSequence` hook now plays once and stops (no longer loops)
- `useAnimationSequence` hook exposes play/pause/skip/restart controls
- Progress bar moved from inside chapters to App-level `PlaybackControls` component

### Fixed
- End-of-chapter bug where intro callout would flash again due to loop restart re-triggering step 0

---

## [0.1.0] — 2026-03-06

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
