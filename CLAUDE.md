# CLAUDE.md — Persistent Instructions for Claude Code

---

## Section 1: Project Identity

- **App:** Wenger Transcend TS1 — 12 animated tutorial shorts
- **Framework:** Vite + React 18. No CSS frameworks. No animation libraries.
- **Repo:** https://github.com/valkolimark/transcend-ui.git
- **Live:** https://valkolimark.github.io/transcend-ui/
- **Deploy:** gh-pages (`npm run deploy`)

---

## Section 2: Spec Files (read before every session)

| File | Purpose |
|------|---------|
| `UI_SPEC.md` | Pixel-accurate component specs, all colors |
| `ANIMATION_SPEC.md` | Timing system, useAnimationSequence hook, keyframes |
| `CHAPTERS.md` | Step-by-step scripts for all 12 chapters |
| `NARRATION_SPEC.md` | Voice narration — natural TTS voice selection, useNarration hook |
| `GIT_SETUP.md` | Build order, commit messages, README/CHANGELOG templates |

These files are authoritative. Never override them with assumptions.

---

## Section 3: Hard Rules (never violate)

- All colors via CSS custom properties only — never hardcode hex in JSX
- No CSS frameworks, no animation libraries (no Framer Motion, GSAP, etc.)
- `TranscendUI.jsx` is a shared display component — driven by props only, zero logic inside
- All 12 chapters control TranscendUI purely through props
- Font stack: `"Avenir LT Pro", "Avenir", "Nunito", sans-serif` (exact order)
- `key={activeChapter}` on active chapter component to reset animation on switch
- `vite.config.js` base must be `'/transcend-ui/'` for GitHub Pages
- **Voice narration:** always use `useNarration` hook — never call `speechSynthesis` directly. Voice selection, speech parameters, and text sanitization must follow `NARRATION_SPEC.md` exactly. Never use the browser default voice without running the priority selection algorithm first.

---

## Section 4: UI Accuracy — Critical Corrections

These were wrong in earlier versions. Never revert them:

1. **REC button idle state:** inner dot is BLUE (`#4169E1`), NOT red. Only turns red during active recording.
2. **Preset names (exact, never change):** Studio A, Studio B, Recital Hall, Chamber Hall, Concert Hall, Great Hall, Chapel, Arena, Grand Cathedral
3. **Blue vertical separator:** 1.5px wide, color `#4169E1`, runs full screen height, divides main content from right sidebar
4. **Volume slider:** blue knob (`#4169E1`) with a thin blue stem line below the knob running down to the bottom of the track
5. **Mute button:** shows Transcend logo in teal (`#38B2C8`) at rest; turns fully RED (`#E03131`) with bold "M" subscript when muted
6. **Aux button (triple-line chevron):** has its own bordered rectangular container (border: `#4169E1`)
7. **Mute button:** also has its own bordered rectangular container (border: `#4169E1`)

---

## Section 5: Git & Quality Gates

- Update `CHANGELOG.md` `[Unreleased]` before every commit
- Follow exact commit messages from `GIT_SETUP.md` section 9
- Before committing, verify the quality checklist in `GIT_SETUP.md` section 12
