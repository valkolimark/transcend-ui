# Changelog

All notable changes to the Wenger Transcend UI project are documented here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).
Versioning follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Added
- CLAUDE.md — persistent project instructions for Claude Code
- NARRATION_SPEC.md — voice narration specification using Edge TTS
- `App.css` — dedicated stylesheet for app shell per SHELL_REDESIGN_SPEC.md
- `useNarration` hook — plays pre-generated Edge TTS audio via HTML5 Audio API
- `scripts/generate-narration.js` — generates 71 MP3 narration files using `edge-tts` CLI
- 71 pre-generated narration MP3s in `public/narration/` (~1.7 MB total, Aria Neural voice)
- `public/narration/manifest.json` — callout text → MP3 path mapping
- Production PNG image assets for all UI icons, buttons, QR codes, and modals

### Changed
- `useAnimationSequence` hook rewritten: accepts `started` prop and `getCalloutText` callback;
  narration-gated step advancement — audio `onended` drives animation timing for steps with
  callout text; steps with no callout use their specified duration as a normal setTimeout;
  now uses `useNarration` hook instead of Web Speech API
- App shell redesigned per SHELL_REDESIGN_SPEC.md: brand header with Wenger pill,
  "Transcend TS1" title, section label, chapter list with number + divider + title layout,
  Wenger footer with version badge; sidebar width 218px
- Main stage with ambient radial blue glow behind device
- Callout redesigned as floating pill with pointer arrow and calloutIn/calloutOut animations
- All 12 chapters updated to accept `started` and `uiRef` props instead of `voice`/`onControls`
- Callout component rewritten: only one callout renders at a time, fadeOutUp (200ms) before
  fadeInUp transition; TTS removed from Callout (now handled by animation hook)
- CursorDot now positions relative to TranscendUI bounding rect via `uiRef`; cursor coordinates
  from CHAPTERS.md (480x320 space) are correctly mapped to viewport coordinates
- App.jsx: animation does not auto-play on load; shows TranscendUI home screen with
  "Select a chapter to begin" prompt; chapters start fresh on selection via `started` state
- Step durations aligned to CHAPTERS.md specification values
- Removed VoiceSelector and PlaybackControls from App shell

### Fixed
- Animation no longer auto-plays on load; waits for chapter selection
- TTS-gated step advancement — speech onend drives animation timing
- Callout overlaps eliminated — fadeOut before fadeIn enforced
- Cursor coordinates now relative to TranscendUI bounding rect, not viewport
- Transport bar: all volume icons switched from `sound_on_btn.png` to `audio_on.png`
  per asset map; stop button applies `recPulse` animation; playback scrubber knob
  uses `playback_slider_dot.png` instead of CSS circle
- Transport bar completely rewritten to Figma-derived proportional layout:
  fixed 51px left (hamburger + right border) and right (volume) sections;
  flexible middle section varies per state with exact flex ratios;
  State 2 uses 50/50 flex split with vertical divider;
  State 3 uses centered button group with dividers;
  State 4 uses flex-grow scrubber with border-left volume section;
  all icons use `<img>` tags with `basePath` for GitHub Pages compatibility;
  CSS classes in App.css replace all inline transport styles
- Progress bar animates left-to-right during recording via `recSweep` keyframe;
  playhead dot hidden during recording; animation duration driven by `recStepDuration` prop
- Preset info tooltip now boundary-aware: flips below button when top-row presets
  (Studio A, Studio B, Recital Hall) are active to stay within device screen bounds;
  horizontal clamping prevents overflow on left/right edges
- End-of-chapter bug where intro callout would flash again due to loop restart

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
