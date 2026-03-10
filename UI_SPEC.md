# UI Specification — Wenger Transcend TS1
# ✅ VERIFIED FROM HIGH-RESOLUTION REFERENCE IMAGES — ALL DETAILS CONFIRMED

Claude Code must implement every detail in this document exactly as written.
Do not guess. Do not approximate. Do not substitute your own interpretations.
When in doubt, refer back to this document.

---

## ⚠️ CRITICAL CORRECTIONS FROM PREVIOUS SPEC

The following were WRONG in earlier versions and are now corrected:

1. **PRESET NAMES** — Previous spec used wrong names (Studio A, Studio B, etc.)
2. **REC BUTTON IDLE STATE** — The inner dot is BLUE, NOT red, in idle state
3. **SEPARATOR LINE** — Is 1–2px wide, NOT decorative. It is a real structural divider.
4. **VOLUME KNOB STEM** — There is a thin blue line/stem below the knob going to bottom of track
5. **MUTE BUTTON** — Uses the Transcend ⊕ logo, turns fully RED with an "M" subscript when muted
6. **AUX BUTTON** — The ≡‹ button in the top-right has its own bordered rectangular container
7. **MUTE BUTTON CONTAINER** — Also has its own bordered rectangular container

---

## 1. Typography

```
Primary font:   "Avenir LT Pro"
Fallback stack: "Avenir LT Pro", "Avenir", "Nunito", sans-serif

In index.css:
  @font-face {
    font-family: 'Avenir LT Pro';
    src: local('Avenir LT Pro'), local('AvenirLTPro'), local('Avenir');
  }

In index.html <head>:
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600;700&display=swap"
        rel="stylesheet">

Font weights:
  300 → "Active Acoustics" label, "Selected: Track 1", timestamps,
         "Recording...", "Playing recorded track" status text
  400 → Inactive preset button labels, transport labels (REC, Stop, Save, Discard)
  600 → Active preset label, callout captions
  700 → Chapter titles (app shell only), tooltip preset name, modal titles
```

---

## 2. Color Tokens

Define ALL as CSS custom properties in `:root` in `index.css`.
Components NEVER hardcode hex values — always use these variables.

```css
:root {
  /* ── App backgrounds ─────────────────────────────── */
  --bg-app:               #0a0a0f;
  --bg-device:            #0f1116;
  --bg-panel:             #111318;       /* preset grid area */
  --bg-button-idle:       #252830;       /* unselected preset button */
  --bg-button-hover:      #2e3240;
  --bg-transport:         #14161e;       /* bottom transport bar */
  --bg-transport-header:  #1a1c25;       /* "Recording..." row above bar */
  --bg-sidebar:           #0d0f14;       /* right sidebar behind slider */
  --bg-overlay:           rgba(10, 12, 18, 0.97);
  --bg-tooltip:           rgba(12, 15, 35, 0.97);

  /* ── Borders ─────────────────────────────────────── */
  --border-button-idle:     rgba(255, 255, 255, 0.07);
  --border-button-active:   rgba(70, 110, 255, 0.75);
  --border-sidebar-box:     #4169E1;     /* border on ≡‹ button box and mute box */
  --border-device:          rgba(255, 255, 255, 0.10);
  --border-tooltip:         rgba(65, 105, 225, 0.50);
  --border-transport:       rgba(255, 255, 255, 0.05);

  /* ── Brand blue ──────────────────────────────────── */
  --blue-primary:     #4169E1;   /* active preset fill, volume knob,
                                    progress fill, separator line,
                                    sidebar box borders */
  --blue-light:       #5B82FF;
  --blue-glow:        rgba(65, 105, 225, 0.55);
  --blue-dim:         rgba(65, 105, 225, 0.15);

  /* ── THE BLUE SEPARATOR LINE ─────────────────────── */
  /* A thin vertical line running full screen height.   */
  /* Separates the main content area from right sidebar */
  --separator-color:  #4169E1;
  --separator-width:  1.5px;

  /* ── Text ────────────────────────────────────────── */
  --text-primary:     #FFFFFF;
  --text-secondary:   rgba(255, 255, 255, 0.78);
  --text-tertiary:    rgba(255, 255, 255, 0.40);  /* "Active Acoustics" */
  --text-muted:       rgba(255, 255, 255, 0.22);  /* "Selected: " prefix */
  --text-transport:   rgba(255, 255, 255, 0.55);  /* icon labels */
  --text-blue:        #7CA8FF;                    /* tooltip headings */
  --text-status:      rgba(255, 255, 255, 0.38);  /* "Recording..." text */

  /* ── REC button — IDLE state ─────────────────────── */
  /* IMPORTANT: In idle state the inner dot is BLUE,    */
  /* NOT red. It only turns red when recording starts.  */
  --rec-ring-idle:    #FFFFFF;           /* outer ring/circle: WHITE */
  --rec-ring-idle-bg: rgba(255,255,255,0.08);
  --rec-dot-idle:     #4169E1;           /* inner filled dot: BLUE */

  /* ── REC button — ACTIVE/RECORDING state ─────────── */
  --rec-ring-active:  rgba(224, 49, 49, 0.18);
  --rec-dot-active:   #E03131;           /* inner dot turns RED */
  --rec-border-active:rgba(224, 49, 49, 0.65);

  /* ── Volume slider ───────────────────────────────── */
  --slider-track:     rgba(255, 255, 255, 0.10);  /* full track bg */
  --slider-knob:      #4169E1;                    /* solid blue circle */
  --slider-knob-glow: rgba(65, 105, 225, 0.65);
  --slider-stem:      #4169E1;                    /* line below knob */

  /* ── Mute button — NORMAL state ─────────────────── */
  --mute-icon-normal: #38B2C8;           /* teal/cyan Transcend logo */
  --mute-bg-normal:   transparent;

  /* ── Mute button — MUTED state ───────────────────── */
  /* Logo turns RED, "M" subscript appears, bg tinted  */
  --mute-icon-muted:  #E03131;
  --mute-bg-muted:    rgba(224, 49, 49, 0.15);
  --mute-border-muted:rgba(224, 49, 49, 0.55);

  /* ── Progress/scrub bar ──────────────────────────── */
  --progress-track:   rgba(255, 255, 255, 0.08);
  --progress-fill:    #4169E1;
  --progress-dot:     #FFFFFF;

  /* ── Quick Settings ──────────────────────────────── */
  --qs-bg:            rgba(12, 14, 22, 0.98);
  --qs-toggle-on:     #4169E1;
  --qs-toggle-off:    rgba(255, 255, 255, 0.06);
  --qs-btn-bg:        rgba(255, 255, 255, 0.05);

  /* ── Modals ──────────────────────────────────────── */
  --modal-bg:         rgba(16, 18, 28, 0.99);
  --modal-border:     rgba(255, 255, 255, 0.09);
  --modal-btn:        #4169E1;

  /* ── File Manager ────────────────────────────────── */
  --file-tab-active:  rgba(65, 105, 225, 0.20);
  --file-tab-border:  #4169E1;
  --file-row-selected:#4169E1;
  --file-row-bg:      transparent;
  --file-row-hover:   rgba(255, 255, 255, 0.04);

  /* ── Aux Inputs ──────────────────────────────────── */
  --aux-signal-on:    #22C55E;           /* green dot: signal present */
  --aux-signal-off:   rgba(255,255,255,0.18); /* gray dot: no signal */
  --aux-mute-red:     #E03131;
  --aux-row-disabled: rgba(255, 255, 255, 0.08); /* RCA disabled look */
}
```

---

## 3. Screen Layout — Master Structure

```
Total screen width:  480px (fixed)
Total screen height: 320px (fixed)
Overflow:            hidden
```

The screen is split into two columns by a **thin vertical blue line**:

```
┌─────────────────────────────────────────┬──┬─────────┐
│                                         │  │ ┌─────┐ │
│  MAIN CONTENT AREA                      │  │ │ ≡‹  │ │  ← Aux button (own box)
│  (preset grid / sub-screens)            │  │ └─────┘ │
│                                         │  │         │
│                                         │██│  TRACK  │  ← volume track (gray)
│                                         │  │         │
│                                         │  │   ●     │  ← blue knob
│                                         │  │   │     │  ← blue stem below knob
│                                         │  │         │
├─────────────────────────────────────────┤  ├─────────┤
│  [SCRUB ROW] Selected: Track 1  time   │  │         │
├─────────────────────────────────────────┤  │ ┌─────┐ │
│  [TRANSPORT BAR]                        │  │ │ ⊕M  │ │  ← Mute button (own box)
└─────────────────────────────────────────┴──┴─└─────┘─┘
                                          ↑
                           BLUE SEPARATOR LINE
                           var(--separator-color) = #4169E1
                           var(--separator-width) = 1.5px
                           Runs full height top to bottom
                           Absolutely positioned
```

**Exact column widths:**
- Main content: ~432px wide
- Separator line: 1.5px
- Right sidebar: ~46px wide

---

## 4. Header Row ("Active Acoustics")

```
Height:         32px
Padding:        0 12px
Display:        flex, align-center, justify-between
Background:     var(--bg-panel)

Left label:
  Text:           "Active Acoustics"
  Font-size:      11px
  Font-weight:    300
  Color:          var(--text-tertiary)   [rgba(255,255,255,0.40)]
  Letter-spacing: 0.04em
  ⚠ NOT white — intentionally dim
```

---

## 5. Right Sidebar — Full Specification

The right sidebar sits to the RIGHT of the blue separator line.
Width: ~46px. Background: var(--bg-sidebar).

### 5a. Aux Input Button (top of sidebar)

```
Position:       top of sidebar, full width of sidebar
Height:         ~48px
Background:     var(--bg-sidebar)
Border:         1.5px solid var(--border-sidebar-box)  [#4169E1]
Border-radius:  6px
Margin:         4px 4px 0 4px  (small inset from sidebar edges)

Content:        ≡‹ icon
  Description:  Three horizontal lines (≡) with a left-facing chevron/arrow (<)
                These are stacked — lines on left, chevron on right, close together
  Font-size:    13px
  Color:        rgba(255,255,255,0.65)
  Display:      flex, align-center, justify-center
```

### 5b. Volume Slider

```
Position:       center of sidebar, below aux button
Width:          full sidebar width (centered on axis)
Track:
  Width:        6px
  Background:   var(--slider-track)  [rgba(255,255,255,0.10)]
  Border-radius: 4px
  Height:       ~150px  (bulk of sidebar height)

Knob:
  Shape:        circle
  Size:         22px × 22px
  Background:   var(--slider-knob)  [#4169E1]
  Border:       none (solid filled circle)
  Box-shadow:   0 0 10px var(--slider-knob-glow)
  Position:     centered horizontally on track
  Default pos:  ~55% from top of track (mid-low position)

Stem (IMPORTANT — line below the knob):
  Description:  A thin vertical line that runs from the BOTTOM of the knob
                DOWN to the bottom of the slider track.
  Width:        3px
  Color:        var(--slider-stem)  [#4169E1]
  This is NOT a fill of the full track — it is ONLY the segment below the knob.
  The segment ABOVE the knob is the dark track background (no blue fill).
```

### 5c. Mute Button (bottom of sidebar)

```
Position:       bottom of sidebar
Height:         ~48px
Background:     var(--mute-bg-normal)  [transparent in normal state]
Border:         1.5px solid var(--border-sidebar-box)  [#4169E1 in normal state]
Border-radius:  6px
Margin:         0 4px 4px 4px

NORMAL STATE icon:
  Shape:        The Transcend logo — a circle with a + (plus sign) inside,
                styled as ⊕ but with the Transcend brand look
  Color:        var(--mute-icon-normal)  [#38B2C8 — teal/cyan]
  Size:         20px
  No "M" visible in normal state

MUTED STATE — ALL of the following change:
  Background:   var(--mute-bg-muted)    [rgba(224,49,49,0.15)]
  Border:       1.5px solid var(--mute-border-muted)  [rgba(224,49,49,0.55)]
  Icon color:   var(--mute-icon-muted)  [#E03131 — red]
  Subscript M:  A small bold "M" appears at bottom-right of the icon
                Font-size: 8px, font-weight: 700, color: #E03131
                This is what visually communicates "MUTED"
```

---

## 6. Preset Grid

### ⚠️ CORRECT PRESET NAMES

Previous versions had wrong names. The correct preset names, in exact order, are:

```
Row 1:  Studio A   | Studio B      | Recital Hall
Row 2:  Chamber Hall  | Concert Hall  | Great Hall
Row 3:  Chapel         | Arena          | Grand Cathedral
```

Note: "Great Hall" is two words on two lines in its button. This is normal — the button text wraps. Do not abbreviate.

### Grid Container

```
Display:              grid
Grid-template:        repeat(3, 1fr) columns / repeat(3, 1fr) rows
Gap:                  6px
Padding:              8px 10px
Width:                432px (full main content area)
Height:               fills remaining space between header and scrub row
```

### Individual Preset Button

```
Border-radius:  10px
Font-size:      13px
Line-height:    1.3  (allows text wrapping for "Great Hall")
Text-align:     center
Padding:        0 8px
Transition:     all 0.28s cubic-bezier(0.34, 1.45, 0.64, 1)

IDLE STATE:
  Background:   var(--bg-button-idle)   [#252830]
  Border:       1.5px solid var(--border-button-idle)
  Color:        var(--text-secondary)
  Transform:    scale(1.0)
  Box-shadow:   0 2px 8px rgba(0,0,0,0.35)

ACTIVE/SELECTED STATE:
  Background:   var(--blue-primary)     [#4169E1]  — solid flat blue fill
                ⚠ NOT a gradient — the active button is a flat solid blue
  Border:       1.5px solid var(--border-button-active)
  Color:        var(--text-primary)     [#FFFFFF]
  Font-weight:  600
  Transform:    scale(1.02)
  Box-shadow:   0 0 18px var(--blue-glow), 0 4px 12px rgba(0,0,0,0.40)

  ⓘ BADGE on active button:
    Position:   absolute, top: 5px, right: 6px
    Size:       16px × 16px
    Shape:      circle
    Background: rgba(255,255,255,0.18)
    Content:    "i" — lowercase italic i, or the ⓘ circled-i character
    Font-size:  10px
    Color:      rgba(255,255,255,0.85)
    Font-style: italic

TAP ANIMATION:
  On tap: scale(0.94) for 130ms, then spring to active state
```

---

## 7. Scrub Row (between grid and transport bar)

```
Height:         20px
Padding:        0 12px
Display:        flex, align-center, justify-space-between
Background:     var(--bg-panel)  (same as panel)
Border-top:     none

Left text:
  "Selected: " — color: var(--text-muted)   [rgba(255,255,255,0.22)]
  "Track 1"    — color: var(--text-tertiary) [rgba(255,255,255,0.40)]
  Font-size:    10px
  Font-weight:  300

Right text:
  "01:10.32"
  Color:        var(--text-tertiary)
  Font-size:    10px
  Font-weight:  300

Progress bar (sits BELOW the text, spans full width of main area):
  Height:       3px
  Background:   var(--progress-track)
  Fill:
    Width:      22% default
    Background: var(--progress-fill)  [#4169E1]
  Playhead dot:
    Size:       8px circle
    Background: var(--progress-dot)  [#FFFFFF]
    Position:   right end of fill, vertically centered on bar
```

---

## 8. Transport Bar — All States

The transport bar sits at the very bottom of the main content area (not the sidebar).
The sidebar mute button sits at the same vertical level but in the sidebar column.

```
Height:         48px
Background:     var(--bg-transport)
Border-top:     1px solid var(--border-transport)
Padding:        0 10px
Display:        flex, align-center, justify-space-between
```

### STATE 1 — HOME / DEFAULT (ready to record)

```
Layout left → right:
  1. Files/Hamburger icon  2. [REC button group]  3. Skip Back  4. Play/Pause  5. Skip Fwd  6. Volume

1. Files icon (leftmost):
   Icon: three horizontal lines with a small ▶ play triangle
         overlapping at bottom-right corner
   Size: 20px
   Color: rgba(255,255,255,0.50)

2. REC button group (center-left area):
   ⚠ CRITICAL — READ CAREFULLY:

   The REC button is a CIRCLE containing an inner dot.

   IDLE/READY STATE:
     Outer circle:
       Size:       28px × 28px
       Background: rgba(255,255,255,0.10)
       Border:     2px solid rgba(255,255,255,0.80)  ← WHITE border
       Shape:      circle
     Inner dot:
       Size:       10px × 10px
       Shape:      circle
       Background: var(--rec-dot-idle)  [#4169E1]  ← BLUE dot, NOT red
       Position:   centered inside outer circle

   "REC" text label:
     Sits to the RIGHT of the circle
     Font-size:    11px
     Font-weight:  600
     Color:        rgba(255,255,255,0.55)
     Letter-spacing: 0.08em

3. Skip Back (⏮ or |◀):
   Size: 18px, color: rgba(255,255,255,0.45)

4. Play/Pause (▶ or ⏸):
   Size: 20px, color: rgba(255,255,255,0.75)
   In HOME state: shows ⏸ pause icon (|| ) OR ▶ play — match Figma
   In images showing home screen: shows ▶ play

5. Skip Forward (⏭ or ▶|):
   Size: 18px, color: rgba(255,255,255,0.45)

6. Volume/Speaker (🔊):
   Size: 20px, color: rgba(255,255,255,0.50)
   NOTE: This controls PLAYBACK/RECORDING volume, NOT Active Acoustics volume
```

### STATE 2 — RECORDING IN PROGRESS

A thin status header row appears ABOVE the transport bar:

```
Status header row:
  Height:       18px
  Background:   var(--bg-transport-header)
  Border-top:   2px solid var(--blue-primary)  ← blue line at very top of this row
  Padding:      0 12px
  Display:      flex, justify-space-between

  Left text:    "Recording..."
    Font-size:  10px
    Color:      var(--text-status)  [rgba(255,255,255,0.38)]
    Font-weight: 300

  Right text:   timestamp e.g. "01:10.52"
    Font-size:  10px
    Color:      var(--text-status)
```

Transport bar during recording:

```
Layout: [Files icon]  [● Stop]  [✕ Discard]  [🔊]

● Stop button:
  Outer circle:   28px, background rgba(224,49,49,0.18), border 2px solid rgba(224,49,49,0.65)
  Inner shape:    10px × 10px FILLED RED SQUARE (not circle — stop = square)
                  Background: var(--rec-dot-active)  [#E03131]
  "Stop" label:   font-size 12px, color rgba(255,255,255,0.70), margin-left 6px

✕ Discard:
  Icon: × symbol, 14px, color rgba(255,255,255,0.55)
  "Discard" label: font-size 12px, color rgba(255,255,255,0.50)

🔊 Volume: same as default state

Animation: the red dot/circle PULSES using recPulse keyframe while recording:
  @keyframes recPulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.25; }
  }
  Apply: animation: recPulse 1.2s ease-in-out infinite
  Apply ONLY to the inner red dot, not the outer ring
```

### STATE 3 — PREVIEW RECORDING (after Stop, before Save/Discard)

Status header row:

```
  Left text:  "Playing recorded track"
  Right text: timestamp
  Border-top: 2px solid var(--blue-primary)
  (same layout as Recording header row)
```

Transport bar during preview:

```
Layout: [Files icon]  [💾 Save]  [▶ or ⏸]  [✕ Discard]  [🔊 HIGHLIGHTED]

💾 Save:
  Icon: floppy disk save icon, 18px, color rgba(255,255,255,0.75)
  "Save" label: font-size 12px, color rgba(255,255,255,0.70)

▶ / ⏸: play or pause depending on state, 20px

✕ Discard: same as recording state

🔊 HIGHLIGHTED VOLUME (IMPORTANT):
  In the preview/recorded state, the speaker/volume icon button has a
  BLUE BORDER BOX around it — a rectangular highlight indicating it's active
  Border: 1.5px solid var(--blue-primary)
  Border-radius: 6px
  Padding: 4px 6px
  This is visible in the reference images — the volume button is "selected"
```

### STATE 4 — PLAYBACK MODE (from file manager)

Replaces the full transport bar content:

```
Layout: [Files icon]  [Playback  ●────────────○]  [✕]

Files icon: same as default

"Playback" label:
  Font-size:  11px
  Color:      rgba(255,255,255,0.45)
  Margin-right: 8px

Scrubber slider:
  Track: remaining width minus files icon and X button
  Height: 3px
  Background: rgba(255,255,255,0.12)
  Blue fill: left of knob, var(--progress-fill)
  Knob: 14px circle, background #FFFFFF
  Default position: ~60% along track

✕ button:
  Size: 18px
  Color: rgba(255,255,255,0.40)
```

---

## 9. Audio File Management Screen

Accessed by tapping the hamburger/files icon. Replaces the preset grid area.
The transport bar and scrub row remain visible at bottom.
The right sidebar (separator line, volume, mute) remains exactly the same.

```
Header tab row:
  Height:       36px
  Background:   var(--bg-transport)
  Display:      flex, gap: 6px, padding: 6px 10px

  TWO tabs side by side, equal width:
    "Local (120 min. left)"   — left tab
    "USB"                     — right tab

  ACTIVE tab:
    Background:   var(--file-tab-active)   [rgba(65,105,225,0.20)]
    Border:       1.5px solid var(--file-tab-border)  [#4169E1]
    Border-radius: 7px
    Color:        var(--text-primary)

  INACTIVE tab:
    Background:   var(--bg-button-idle)
    Border:       1.5px solid var(--border-button-idle)
    Border-radius: 7px
    Color:        var(--text-tertiary)

  Font-size: 12px, font-weight: 400

File list area:
  Below the tab row, fills available height
  Background: var(--bg-panel)
  Each file row: height 40px

  NORMAL row:
    Display: flex, align-center, padding: 0 12px
    Border-bottom: 1px solid rgba(255,255,255,0.04)
    Text: "Track 1", "Track 2" etc.
    Font-size: 13px, color: var(--text-secondary)
    Music note icon (♪): left side, 14px, color rgba(255,255,255,0.35)

  SELECTED row:
    Background:   rgba(65, 105, 225, 0.12)
    Border:       1.5px solid var(--file-row-selected)  [#4169E1]
    Border-radius: 8px
    Icon:         music note ♪ in blue [var(--blue-primary)]

    RIGHT SIDE of selected row shows 3 action buttons:
      Transfer button (→):
        Icon: arrow pointing right →
        Size: 32px × 28px
        Background: rgba(255,255,255,0.07)
        Border: 1px solid rgba(255,255,255,0.12)
        Border-radius: 6px

      Rename button (✏):
        Icon: pencil ✏
        Same size/style as transfer

      Delete button (🗑):
        Icon: trash can
        Same size/style as transfer
```

---

## 10. Auxiliary Input Management Screen

Accessed by tapping the ≡‹ button. Replaces the preset grid.
The right sidebar remains visible (same as home screen).

```
Title row:
  Height: 36px
  Left: "Aux Inputs" — font-size 14px, font-weight 600, color #FFFFFF
  Right: ≡‹ button — same bordered box style as home screen sidebar button

Four input channel rows (stacked):
  Each row height: ~52px
  Padding: 0 10px
  Display: flex, align-center, gap: 10px

  Channel label:
    Text: "Bluetooth: Connected" / "RCA" / "Balanced 1" / "Balanced 2"
    Font-size: 11px, color: rgba(255,255,255,0.45)

  Signal indicator dot (right of label):
    Size: 8px circle
    ACTIVE/CONNECTED: var(--aux-signal-on)  [#22C55E — green]
    INACTIVE:         var(--aux-signal-off) [rgba(255,255,255,0.18) — gray]

  Volume slider (horizontal, full row width minus label and icon):
    Track height: 3px, background rgba(255,255,255,0.12), border-radius 2px
    Knob: 14px circle, background #FFFFFF

  Mute/speaker icon (right end of row):
    ACTIVE (not muted): 🔊 speaker icon, color rgba(255,255,255,0.55)
    MUTED:              🔇 icon with red background
      Background: rgba(224,49,49,0.18), border-radius 6px
      Icon color: var(--aux-mute-red) [#E03131]

  DISABLED ROW (e.g. RCA when not connected):
    Background: var(--aux-row-disabled) [rgba(255,255,255,0.08)]
    Border: 1px solid rgba(255,255,255,0.06)
    Border-radius: 8px
    All text/icons: reduced opacity 0.35
```

---

## 11. Quick Settings Panel

Triggered by swiping DOWN from the very top edge of the screen.
Panel slides down from top, covering the preset grid area.

```
SWIPE HANDLE INDICATOR (visible on home screen):
  Position: top center of screen, above the "Active Acoustics" row
  Size: ~40px wide × 4px tall
  Background: rgba(255,255,255,0.20)
  Border-radius: 2px
  This is what the blue highlighted bar in the images shows —
  it is the swipe target area, not the panel itself.

PANEL:
  Position:     absolute, top: 0, left: 0, right: (main content width 432px)
  Height:       ~180px
  Background:   var(--qs-bg)  [rgba(12,14,22,0.98)]
  Border-bottom: 1px solid rgba(255,255,255,0.08)
  Border-radius: 0 0 12px 12px
  Padding:      12px 10px 10px

Animation enter:
  transform: translateY(-100%) → translateY(0)
  Duration: 380ms cubic-bezier(0.34, 1.1, 0.64, 1)
```

### Row 1 — Two Large Toggle Pills

```
Display: flex, gap: 8px, margin-bottom: 8px
Each pill: flex: 1, height: 44px, border-radius: 10px

LEFT PILL — "Stereo Mode":
  Icon: stereo/broadcast icon (two overlapping circles or wave icon)
        Render as an ⊙ or similar stereo symbol
  Label: "Stereo Mode" — font-size 13px
  Icon + label displayed side by side, centered

RIGHT PILL — "Bluetooth":
  Icon: ✦ Bluetooth symbol (𝔅 or use Unicode ᛒ or BT SVG)
  Label: "Connected" when paired / "Bluetooth" when unpaired
  Icon + label centered

ACTIVE (ON) pill:
  Background:   var(--qs-toggle-on)  [#4169E1]
  Border:       1.5px solid rgba(70,120,255,0.60)
  Color:        #FFFFFF

INACTIVE (OFF) pill:
  Background:   var(--qs-toggle-off)  [rgba(255,255,255,0.06)]
  Border:       1.5px solid rgba(255,255,255,0.08)
  Color:        rgba(255,255,255,0.45)
```

### Row 2 — Four Action Buttons

```
Display: grid, grid-template-columns: repeat(4, 1fr), gap: 6px

Each button: height 52px, border-radius: 10px
Background:   var(--qs-btn-bg)  [rgba(255,255,255,0.05)]
Border:       1px solid rgba(255,255,255,0.07)
Display:      flex, flex-direction: column, align-center, justify-center, gap: 5px

HELP button:
  Icon: ? inside a circle, 20px, color rgba(255,255,255,0.55)
  Label: "Help" — font-size: 10px, letter-spacing: 0.06em, color rgba(255,255,255,0.40)

NET CONTROL button:
  Icon: globe/network — ⊕ or 🌐 style, 20px
  Label: "Net Control"

SETTINGS button:
  Icon: gear ⚙, 20px
  Label: "Settings"

STANDBY button:
  Icon: power symbol ⏻, 20px
  Label: "Standby"

All labels: font-size 10px, font-weight 600, text-transform uppercase,
            letter-spacing: 0.06em, color rgba(255,255,255,0.38)
```

### Scroll Handle (bottom of panel)

```
Width:        36px
Height:       3px
Background:   rgba(255,255,255,0.18)
Border-radius: 2px
Margin: 8px auto 0
```

---

## 12. Modals

All modals:

```
Position:     absolute, centered in screen
Background:   var(--modal-bg)
Border:       1px solid var(--modal-border)
Border-radius: 14px
Padding:      22px 18px
Width:        260px
Box-shadow:   0 16px 48px rgba(0,0,0,0.75)

Animation enter:
  opacity 0 + scale(0.92) → opacity 1 + scale(1)
  Duration: 280ms cubic-bezier(0.34, 1.4, 0.64, 1)

Title:
  Font-size: 15px, font-weight: 700, color: #FFFFFF
  Text-align: center, margin-bottom: 8px

Body:
  Font-size: 12px, color: rgba(255,255,255,0.50)
  Text-align: center, line-height: 1.6

Primary blue button:
  Width: 100%, height: 42px, border-radius: 9px
  Background: var(--modal-btn)  [#4169E1]
  Font-size: 14px, font-weight: 600, color #FFFFFF

Secondary (ghost) button:
  Background: rgba(255,255,255,0.06)
  Border: 1px solid rgba(255,255,255,0.10)
  Color: rgba(255,255,255,0.60)
```

### Bluetooth Pairing Modal

```
Title:    "Bluetooth Pairing..."
Body:     "Look for the Device ID:"
          Line 2: "Transcend-0186"  ← larger, font-size 14px, color #7CA8FF, font-weight 600
Button:   "Cancel"  ← ghost style, full width
```

### Net Control / QR Code Modal

```
Title:    "Control Over Local Network"
QR code:  140px × 140px — white square, centered
          Use CSS to fake QR pattern (dark squares on white background)
Body:     "Scan to open Web Browser"
          "You must be connected to the same Wi-Fi Network as Transcend."
Button:   "Close"  ← primary blue
```

### Help / Online User Guide Modal

```
Title:    "Online User Guide"
QR code:  140px × 140px centered
Body:     "Scan to access online Product Manuals, How-To Videos,
           and more information."
Button:   "Close"  ← primary blue
```

### Enter Standby Modal

```
Title:    "Enter Standby Mode..."
Body:     "Turn off the screen and disable audio?"
Buttons:  Two side by side — [Cancel] (ghost, 48%) + [Yes] (blue, 48%)
```

### System in Standby (full-screen state)

```
Background:   #000000  (full black)

Top icon row (barely visible):
  4 icons: ⚙ ? 📋 ✕
  Color: rgba(255,255,255,0.12)
  Font-size: 18px
  Spaced evenly across top

Center card:
  Background: rgba(18, 20, 30, 1.0)
  Border: 1px solid rgba(255,255,255,0.08)
  Border-radius: 16px
  Padding: 28px 22px
  Width: 260px

  Title: "System in Standby"
    Font-size: 17px, font-weight: 700, color: #FFFFFF, text-align center

  "Wake Up" button:
    Width: 100%, height: 50px
    Background: var(--modal-btn)  [#4169E1]
    Border-radius: 11px
    Font-size: 15px, font-weight: 700
```

### Admin Login Modal

```
Top row:
  Left: Passcode display  — shows entered digits as ● bullets OR "------" if empty
    Font-size: 24px, font-weight: 700, color: #FFFFFF
    Letter-spacing: 6px
  Right: Eye icon (show/hide toggle)
    Size: 20px, color: rgba(255,255,255,0.40)

Dismiss X: top-right corner of modal
  Size: 26px circle, background rgba(255,255,255,0.08)
  Color: rgba(255,255,255,0.45), font-size 14px

Numpad (3 columns × 4 rows):
  Cell size:  ~72px × 46px
  Gap:        5px
  Background: rgba(255,255,255,0.06)
  Border:     1px solid rgba(255,255,255,0.07)
  Border-radius: 7px

  Numbers (1–9): font-size 17px, font-weight: 400, color: #FFFFFF
  Bottom row: [Delete] [0] [Enter]
    Font-size: 12px, font-weight: 600, color rgba(255,255,255,0.50)
```

---

## 13. Cursor / Tap Indicator

```
Structure: Two elements — outer ring + inner dot

OUTER RING:
  Size:         24px × 24px
  Shape:        circle
  Background:   transparent
  Border:       2px solid rgba(255,255,255,0.85)

INNER DOT:
  Size:         10px × 10px
  Shape:        circle
  Background:   rgba(255,255,255,0.75)
  Position:     centered inside outer ring

IDLE STATE (cursor visible, not tapping):
  Both elements opacity: 0.55
  Box-shadow on ring: 0 0 6px rgba(255,255,255,0.25)
  Transform: scale(1.0)

TAP STATE (during tap action):
  Both elements opacity: 1.0
  Transform: scale(0.68)
  Duration: 130ms ease-in
  Box-shadow: 0 0 14px rgba(255,255,255,0.70)

RIPPLE (emitted AT tap moment, separate element):
  Size:         starts 20px → ends 62px
  Shape:        circle
  Border:       2px solid rgba(255,255,255,0.55)
  Background:   rgba(255,255,255,0.10)
  Animation:    scale(0.35) → scale(3.0), opacity 0.85 → 0
  Duration:     620ms ease-out
  @keyframes ripple {
    0%   { transform: scale(0.35); opacity: 0.85; }
    100% { transform: scale(3.0);  opacity: 0; }
  }

Movement between positions:
  CSS transition: left 480ms, top 480ms
  Easing: cubic-bezier(0.25, 0.46, 0.45, 0.94)
```

---

## 14. Callout Caption Component

```
Position:     fixed, below the device frame, horizontally centered
Display:      inline-flex, align-center

Container:
  Background:   rgba(10, 12, 20, 0.92)
  Border:       1px solid rgba(65, 105, 225, 0.40)
  Border-radius: 22px
  Padding:      8px 20px
  Min-width:    180px, max-width: 360px
  Box-shadow:   0 4px 20px rgba(0,0,0,0.45)

Text:
  Font-size:    13px
  Font-weight:  400
  Color:        rgba(255,255,255,0.85)
  Text-align:   center

ENTER animation:
  opacity 0 + translateY(10px) → opacity 1 + translateY(0)
  Duration: 340ms cubic-bezier(0.34, 1.2, 0.64, 1)

EXIT animation:
  opacity 1 → opacity 0 + translateY(-6px)
  Duration: 180ms ease-in
```

---

## 15. Preset Info Tooltip

```
Position:       absolute, appearing above the active button
Width:          215px
Background:     var(--bg-tooltip)
Border:         1px solid var(--border-tooltip)
Border-radius:  10px
Padding:        10px 13px
Box-shadow:     0 8px 28px rgba(0,0,0,0.65)

ENTER animation:
  opacity 0 + translateY(8px) → opacity 1 + translateY(0)
  Duration: 320ms cubic-bezier(0.34, 1.2, 0.64, 1)

Title:
  Font-size:      9px
  Font-weight:    700
  Letter-spacing: 0.14em
  Text-transform: uppercase
  Color:          var(--text-blue)  [#7CA8FF]
  Margin-bottom:  5px

Body:
  Font-size:  11.5px
  Line-height: 1.55
  Color:      rgba(255,255,255,0.60)

Arrow (pointing down toward button):
  Position: absolute, bottom: -5px, left: 50%, translateX(-50%)
  Size: 9px × 9px
  Background: same as tooltip bg
  Border: right 1px + bottom 1px solid var(--border-tooltip)
  Transform: rotate(45deg)
```

### Correct Preset Descriptions

```
Studio A:        "Intimate recording space with flat, natural response ideal for tracking and mixing."
Studio B:        "Warmer response optimized for vocal booths and live tracking sessions."
Recital Hall:    "Small hall acoustics with subtle reverb and balanced reflection patterns."
Chamber Hall:    "Rich chamber sound with moderate reverb and warm early reflections."
Concert Hall:    "Full orchestral hall with extended decay and natural audience absorption."
Great Hall:      "Grand performance space with expansive reverb and dramatic spatial depth."
Chapel:          "Sacred space acoustic with long reverb tail and bright upper frequencies."
Arena:           "Large venue simulation with wide stereo field and stadium-scale reflections."
Grand Cathedral: "Majestic cathedral acoustics with soaring reverb and ethereal decay."
```

---

## 16. Global CSS Keyframes

Define ALL of these in `index.css`:

```css
@keyframes ripple {
  0%   { transform: scale(0.35); opacity: 0.85; }
  100% { transform: scale(3.0);  opacity: 0; }
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
  50%       { opacity: 0.20; }
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
  to   { opacity: 1; transform: scale(1.0); }
}
```

---

## 17. Chapter Nav Sidebar (App Shell)

```
Width:      72px
Background: #08090d
Border-right: 1px solid rgba(255,255,255,0.05)
Display:    flex, flex-direction: column, align-center
Padding:    14px 0

Each chapter button:
  Size:       56px × 56px
  Border-radius: 11px
  Margin:     3px 8px
  Display:    flex, flex-direction: column, align-center, justify-center, gap: 3px

  Number:     font-size 9px, font-weight 700, letter-spacing 0.08em
  Icon:       16px

  IDLE:
    Background: transparent
    Border: 1px solid transparent
    Number color: rgba(255,255,255,0.28)
    Icon color:   rgba(255,255,255,0.35)

  ACTIVE:
    Background: rgba(65,105,225,0.18)
    Border: 1px solid rgba(65,105,225,0.45)
    Number color: #7CA8FF
    Icon color:   #7CA8FF

Wenger text (bottom of sidebar):
  "WENGER" — font-size 8px, font-weight 700, letter-spacing 0.18em
  Color: rgba(255,255,255,0.18)
  Text-transform: uppercase
  Margin-top: auto (push to bottom)
  Margin-bottom: 12px
```
