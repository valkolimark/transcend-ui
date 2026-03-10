# Chapter Scripts — All 12 Animated Shorts

Each chapter defines its step sequence, cursor movements, UI state transitions, and callout text. Implement each as a chapter file in `src/chapters/` following the template in `ANIMATION_SPEC.md`.

All durations in milliseconds. Cursor coordinates are relative to the 480×320 device screen.

---

## Chapter 01 — Connect to Bluetooth

**File:** `Ch01_Bluetooth.jsx`
**Title:** "Connect to Bluetooth"
**Duration:** ~18 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home screen, cursor visible at aux button | "Open the Quick Settings menu" |
| `swipe-down` | 600 | Cursor drags from (240,10) to (240,100); Quick Settings panel slides down | — |
| `panel-open` | 1200 | Panel fully open, Bluetooth button highlighted with ring | "Tap Bluetooth to begin pairing" |
| `cursor-to-bt` | 500 | Cursor moves to Bluetooth button (295, 340) | — |
| `tap-bt` | 200 | Cursor taps, Bluetooth button activates | — |
| `bt-modal-open` | 2800 | Bluetooth Pairing modal appears: "Look for Transcend-01M6" | "Your device will appear in Bluetooth settings" |
| `pause-modal` | 1000 | Hold on modal | — |
| `bt-paired` | 2000 | Modal closes, Bluetooth button in Quick Settings shows "Connected" state (solid blue) | "Bluetooth connected ✓" |
| `panel-view-paired` | 1500 | Stereo Mode = active (blue), Bluetooth = active (blue), row 2 shows Connected label | "Both inputs now active in Stereo Mode" |
| `close-panel` | 500 | Cursor swipes panel back up / taps outside | — |
| `outro` | 2200 | Home screen, BT icon in transport area glowing | "Bluetooth connected — ready to use" |

### Notes
- Bluetooth button inactive state: text "Bluetooth", gray, BT symbol dim
- Bluetooth button active state (after pair): text "Connected", full blue, BT symbol bright
- Show "Quick Settings BT Paired" state from Figma (both toggle pills are blue)

---

## Chapter 02 — Make & Save a Recording

**File:** `Ch02_Recording.jsx`
**Title:** "Make & Save a Recording"
**Duration:** ~26 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home screen, cursor near REC button | "Tap REC to start recording" |
| `cursor-to-rec` | 500 | Cursor moves to REC button (65, 295) | — |
| `tap-rec` | 200 | Tap REC button | — |
| `recording-active` | 3500 | Transport bar switches to RECORDING STATE: "● Stop" + "✕ Discard" + 🔊; Header above transport shows "Recording..." in red; Red dot pulses (recPulse animation) | "Recording in progress — red dot pulses" |
| `cursor-away` | 400 | Cursor moves away from transport to mid-screen | — |
| `dwell-recording` | 1500 | Hold on recording state | — |
| `cursor-to-stop` | 400 | Cursor moves to Stop button position | — |
| `tap-stop` | 200 | Tap Stop | — |
| `recorded-pause` | 2500 | Transport switches to RECORDED TRACK (PAUSED): "💾 Save" + "▶" + "✕ Discard" + 🔊; Header: "Playing recorded track" | "Recording stopped — review before saving" |
| `cursor-to-play` | 400 | Cursor to Play button | — |
| `tap-play-review` | 200 | Tap Play | — |
| `recorded-playing` | 2000 | Transport: "💾 Save" + "⏸" + "✕ Discard"; Progress bar animates forward | "Preview your recording" |
| `cursor-to-save` | 500 | Cursor moves to 💾 Save button | — |
| `tap-save` | 200 | Tap Save | — |
| `saved-confirm` | 2000 | Transport returns to DEFAULT STATE; Brief flash/highlight on hamburger icon (file was saved) | "Track saved to file manager ✓" |
| `outro` | 2200 | Home screen default | "Record, review, and save — all from the home screen" |

### Notes
- "Recording..." header: use `recPulse` keyframe on the red dot — NOT on the text
- The recording header row sits **above** the transport bar, between progress bar and transport buttons
- Save confirmation: brief 400ms pulse/glow on hamburger/files icon

---

## Chapter 03 — Selecting a Preset (& Description)

**File:** `Ch03_SelectPreset.jsx`
**Title:** "Selecting a Preset"
**Duration:** ~22 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home, Studio A active, cursor near Studio A | "Tap any preset to select a room acoustic" |
| `cursor-to-b` | 500 | Cursor to Studio B (215, 65) | — |
| `tap-studio-b` | 200 | Tap | — |
| `active-studio-b` | 1800 | Studio B activates (blue, ⓘ badge); Studio A deactivates | "Studio B selected" |
| `cursor-to-info` | 400 | Cursor to ⓘ badge on Studio B (top-right of button) | — |
| `tap-info` | 200 | Tap info badge | — |
| `show-info-b` | 2500 | Info tooltip appears above Studio B with preset description | "ⓘ — read the acoustic description" |
| `dismiss-info` | 300 | Tooltip fades out | — |
| `cursor-to-great` | 500 | Cursor to Great Hall (350, 130) | — |
| `tap-great` | 200 | Tap | — |
| `active-great` | 1800 | Great Hall activates; Studio B deactivates | "Great Hall selected" |
| `show-info-great` | 2200 | Info tooltip for Great Hall | — |
| `dismiss-info-2` | 300 | Tooltip out | — |
| `cursor-to-cathedral` | 500 | Cursor to Grand Cathedral (350, 195) | — |
| `tap-cathedral` | 200 | Tap | — |
| `active-cathedral` | 1500 | Grand Cathedral activates | "Grand Cathedral" |
| `outro` | 2200 | Hold on Grand Cathedral active | "9 acoustic presets — one tap to transform your space" |

---

## Chapter 04 — Preset Volume

**File:** `Ch04_PresetVolume.jsx`
**Title:** "Preset Volume"
**Duration:** ~18 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home screen, cursor near volume slider | "The right sidebar controls Active Acoustics volume" |
| `cursor-to-knob` | 500 | Cursor moves to volume knob (455, 140) | — |
| `drag-up-start` | 300 | Cursor tapping = true | — |
| `drag-up` | 1200 | Cursor moves from (455,140) to (455,80); slider knob follows; blue fill grows upward; volume level increases | "Drag up to increase volume" |
| `hold-high` | 1500 | Hold at high volume | "Volume at maximum" |
| `drag-down` | 1200 | Cursor moves (455,80) to (455,200); knob follows; fill shrinks | "Drag down to decrease" |
| `hold-low` | 1500 | Hold at low volume | — |
| `drag-mid` | 800 | Return to center (455,140) | — |
| `release` | 300 | Cursor tapping = false | — |
| `mute-cursor` | 500 | Cursor moves to mute button bottom-right (455, 292) | — |
| `tap-mute` | 200 | Tap mute | — |
| `muted` | 1800 | Mute button turns red; icon shows strike-through; volume knob grays out | "Mute/unmute Active Acoustics" |
| `tap-unmute` | 200 | Tap again | — |
| `unmuted` | 1200 | Returns to normal | — |
| `outro` | 2200 | Home screen default volume | "Volume is independent of recording/playback levels" |

### Notes
- Volume slider knob drag: CSS transition on `top` property with 1200ms ease-in-out
- Blue fill height: calculated as percentage of track height from bottom
- Muted state: `--red-rec` color scheme, diagonal strike SVG over speaker icon

---

## Chapter 05 — Playback Controls

**File:** `Ch05_Playback.jsx`
**Title:** "Playback Controls"
**Duration:** ~20 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home, transport in default state | "Select a track to begin playback" |
| `cursor-to-hamburger` | 500 | Cursor to hamburger/files icon (20, 295) | — |
| `tap-hamburger` | 200 | Tap | — |
| `playback-mode` | 2000 | Transport switches to PLAYBACK MODE: "Playback" + scrubber slider + ✕; Track label updates | "Playback mode — use the scrubber to seek" |
| `cursor-to-scrubber` | 500 | Cursor to scrubber knob center | — |
| `scrub-right` | 1200 | Cursor drags scrubber right; timestamp advances | "Scrub forward through the track" |
| `hold-scrubbed` | 1000 | Hold at new position | — |
| `cursor-to-play` | 400 | Cursor back to play button (215,295) | — |
| `tap-play` | 200 | Tap play | — |
| `playing` | 2000 | Progress bar animates forward; play becomes pause icon | "Playing — progress bar moves in real time" |
| `cursor-to-skip-fwd` | 400 | Cursor to skip forward (275, 295) | — |
| `tap-skip` | 200 | Tap | — |
| `next-track` | 1500 | Track label updates to "Track 2"; progress resets | "Skip to next track" |
| `cursor-to-volume` | 400 | Cursor to volume speaker (355, 295) | — |
| `tap-volume` | 200 | Tap | — |
| `volume-slider-appears` | 2000 | Small horizontal volume popup appears above speaker icon | "Adjust playback volume separately from acoustics" |
| `outro` | 2200 | Back to default playback state | "Full transport controls on every screen" |

---

## Chapter 06 — Quick Settings Menu

**File:** `Ch06_QuickSettings.jsx`
**Title:** "Quick Settings Menu"
**Duration:** ~20 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home screen | "Swipe down from the top to open Quick Settings" |
| `swipe-gesture` | 700 | Cursor drags (240,5) → (240,100) | — |
| `panel-open` | 2200 | Quick Settings panel slides down; shows 2 rows | "Quick Settings — access key controls fast" |
| `highlight-stereo` | 1200 | Cursor moves to Stereo Mode pill (115, 340), gentle pulsing highlight | "Toggle Stereo Mode here" |
| `highlight-bt` | 1200 | Cursor to Bluetooth pill (295, 340) | "Or manage Bluetooth" |
| `highlight-help` | 800 | Cursor to Help (60, 395) | — |
| `highlight-netcontrol` | 800 | Cursor to Net Control (165, 395) | — |
| `highlight-settings` | 800 | Cursor to Settings (270, 395) | — |
| `highlight-standby` | 800 | Cursor to Standby (375, 395) | — |
| `callout-summary` | 1500 | All 4 bottom buttons highlighted with subtle glow | "Help · Net Control · Settings · Standby" |
| `swipe-close` | 600 | Cursor drags (240,100) → (240,5); panel slides back up | — |
| `outro` | 2200 | Home screen | "Quick Settings: always one swipe away" |

---

## Chapter 07 — Stereo Mode

**File:** `Ch07_StereoMode.jsx`
**Title:** "Stereo Mode"
**Duration:** ~18 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home screen | "Stereo Mode processes left and right channels independently" |
| `open-quick-settings` | 600 | Swipe down; panel opens | — |
| `panel-showing-off` | 1500 | Quick Settings open; Stereo Mode pill is INACTIVE (gray) | "Stereo Mode is currently OFF" |
| `cursor-to-stereo` | 400 | Cursor to Stereo Mode pill | — |
| `tap-stereo-on` | 200 | Tap | — |
| `stereo-active` | 2000 | Stereo Mode pill turns ACTIVE (blue), icon highlights | "Stereo Mode ON — dual-channel processing active" |
| `hold-on` | 1000 | Hold | — |
| `cursor-tap-again` | 400 | Cursor to pill again | — |
| `tap-stereo-off` | 200 | Tap | — |
| `stereo-inactive` | 1800 | Pill returns to gray/inactive | "Stereo Mode OFF — mono processing" |
| `note-soundlok` | 1500 | Callout only, no cursor move | "⚠ Not available on SoundLok units" |
| `close-panel` | 500 | Swipe panel closed | — |
| `outro` | 2200 | Home | "Toggle Stereo Mode in Quick Settings" |

---

## Chapter 08 — Wireless Control (Net Control / QR Code)

**File:** `Ch08_WirelessControl.jsx`
**Title:** "Wireless / Net Control"
**Duration:** ~20 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home screen | "Control Transcend from any device on your Wi-Fi network" |
| `open-quick-settings` | 600 | Swipe down | — |
| `panel-open` | 1000 | Quick Settings visible | — |
| `cursor-to-netcontrol` | 500 | Cursor to Net Control button (165, 395) | — |
| `tap-net-control` | 200 | Tap | — |
| `qr-modal-open` | 3000 | QR Web UI modal opens: "Control Over Local Network" + QR code + URL hint + "Close" button | "Scan the QR code to open the web interface" |
| `hold-qr` | 1500 | Hold on QR | "Must be on same Wi-Fi network as Transcend" |
| `tap-close` | 200 | Cursor to Close button, tap | — |
| `modal-closed` | 500 | Modal fades out | — |
| `show-web-ui` | 2500 | Display a simplified web UI replica (same Transcend UI, browser frame around it) | "Full control from any browser — no app needed" |
| `show-standby-state` | 1500 | Show System in Standby variant of web UI | "Even the standby screen is accessible remotely" |
| `outro` | 2200 | Return to home | "Net Control — your space, from anywhere on the network" |

### Notes
- Web UI representation: same TranscendUI component, wrapped in a simple browser chrome bar (address bar, back/forward buttons) to suggest browser context
- Browser chrome: dark gray bar (#1a1a1a), pill-shaped URL bar showing "https://transcend.local/webui"

---

## Chapter 09 — Power Save / Standby Mode

**File:** `Ch09_PowerSave.jsx`
**Title:** "Power Save / Standby"
**Duration:** ~18 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home screen | "Put Transcend into standby to save power" |
| `open-quick-settings` | 600 | Swipe down | — |
| `panel-open` | 1000 | Quick Settings panel visible | — |
| `cursor-to-standby` | 400 | Cursor to Standby button (375, 395) | — |
| `tap-standby` | 200 | Tap | — |
| `confirm-modal` | 2500 | "Enter Standby Mode..." confirmation modal with Cancel + Yes | "Confirm to turn off screen and disable audio" |
| `cursor-to-yes` | 400 | Cursor to Yes button | — |
| `tap-yes` | 200 | Tap Yes | — |
| `standby-screen` | 3000 | FULL SCREEN STANDBY: black bg, "System in Standby" card, "Wake Up" blue button; top icons very dim | "Screen off — system in standby" |
| `cursor-to-wakeup` | 600 | Cursor appears on "Wake Up" button | "Tap Wake Up to resume" |
| `tap-wakeup` | 200 | Tap | — |
| `wake-transition` | 800 | Brief fade from black to home screen | — |
| `home-restored` | 1200 | Home screen fully restored | "System restored ✓" |
| `outro` | 2200 | Home | "Standby saves energy without losing your settings" |

---

## Chapter 10 — Managing Audio Files

**File:** `Ch10_AudioFiles.jsx`
**Title:** "Managing Audio Files"
**Duration:** ~22 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home, cursor near hamburger icon | "The file manager holds all your recordings" |
| `cursor-to-hamburger` | 400 | Cursor to hamburger (20, 295) | — |
| `tap-hamburger` | 200 | Tap | — |
| `file-list-open` | 2500 | File list panel slides up from bottom: shows Track 1 / Track 2 / Track 3 etc. | "All saved recordings appear here" |
| `cursor-to-track2` | 500 | Cursor to Track 2 in list | — |
| `tap-track2` | 200 | Tap Track 2 | — |
| `track2-selected` | 1500 | Track label updates to "Selected: Track 2"; progress bar resets | "Track 2 selected" |
| `cursor-to-play` | 400 | Cursor to play button | — |
| `tap-play` | 200 | Tap play | — |
| `playing-track2` | 2000 | Progress bar animates; transport in playback mode | "Playing Track 2" |
| `cursor-to-delete-hint` | 500 | Cursor sweeps toward hamburger again | — |
| `file-manager-reopen` | 200 | Hamburger tap | — |
| `long-press-track` | 600 | Cursor holds on Track 1 | "Long press to access delete option" |
| `delete-option` | 2000 | Small context menu: "Delete" | — |
| `cursor-to-delete` | 300 | Cursor to Delete | — |
| `tap-delete` | 200 | Tap | — |
| `track-removed` | 1500 | Track 1 fades from list | "Track deleted" |
| `outro` | 2200 | Home | "Organize recordings directly from the controller" |

### Notes
- File list panel: slides up from bottom transport area; list items are 40px tall rows; dark background; each row shows "Track N" left + "01:10" timestamp right + play icon
- Context menu: small dark popup, 120px wide, single "Delete" row in red text

---

## Chapter 11 — Settings (Admin Login)

**File:** `Ch11_Settings.jsx`
**Title:** "Settings"
**Duration:** ~20 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home screen | "Access system settings with the admin passcode" |
| `open-quick-settings` | 600 | Swipe down | — |
| `panel-open` | 1000 | Quick Settings open | — |
| `cursor-to-settings` | 400 | Cursor to Settings gear button (270, 395) | — |
| `tap-settings` | 200 | Tap | — |
| `login-modal-open` | 2000 | Admin Login modal: numpad, passcode display showing "------" | "Enter the 6-digit admin passcode" |
| `type-1` | 300 | Cursor to "1" key; tap; display shows "1-----" | — |
| `type-2` | 300 | Tap "2"; "12----" | — |
| `type-3` | 300 | Tap "3"; "123---" | — |
| `type-4` | 300 | Tap "4"; "1234--" | — |
| `type-5` | 300 | Tap "5"; "12345-" | — |
| `type-enter` | 400 | Tap "Enter" | — |
| `settings-open` | 2500 | Settings screen slides in (simplified list of settings categories) | "Settings unlocked ✓" |
| `browse-settings` | 2000 | Cursor moves down a list of settings options | "Adjust network, audio, and device preferences" |
| `outro` | 2200 | Return to home | "Default passcode: 12345" |

### Notes
- Passcode display: each digit shown as ● (filled circle) once entered; show digits typing in one by one
- The actual default passcode per reference manual is **12345** (5 digits). The modal in Figma shows "123456" as a display placeholder — use 12345 in the animation.
- Settings screen (simplified): dark list, rows for "Network", "Audio", "Display", "Device Info", "Factory Reset" — each 44px tall with chevron right

---

## Chapter 12 — Help Menu (QR Code)

**File:** `Ch12_HelpMenu.jsx`
**Title:** "Help Menu"
**Duration:** ~16 seconds

### Step Sequence

| Step ID | Duration | UI Action | Callout |
|---------|----------|-----------|---------|
| `intro` | 1500 | Home screen | "Access the full online user guide instantly" |
| `open-quick-settings` | 600 | Swipe down | — |
| `panel-open` | 1000 | Quick Settings open | — |
| `cursor-to-help` | 400 | Cursor to Help button (60, 395) | — |
| `tap-help` | 200 | Tap | — |
| `help-modal-open` | 3500 | Help QR modal: "Online User Guide" + QR code + text: "Scan to access online Product Manuals, How-To Videos, and more information." + "Close" button | "Scan with your phone to open the user guide" |
| `hold-qr` | 1500 | Hold | "Links to manuals, videos, and support resources" |
| `cursor-to-close` | 400 | Cursor to Close | — |
| `tap-close` | 200 | Tap Close | — |
| `modal-closed` | 400 | Modal exits | — |
| `outro` | 2200 | Home | "Help is always one tap away — no manual required" |

### Notes
- QR code placeholder: white square (#FFFFFF) 140×140px with a simple grid pattern (use CSS to suggest a QR code — diagonal/grid pattern in dark on white)
- QR code URL shown beside modal (very small text): `https://www.wengercorp.com/fts/transcend`

---

## App Navigation Chapter Metadata

Used by `ChapterNav.jsx` to render the sidebar:

```javascript
export const CHAPTERS = [
  { id: 1, key: 'bluetooth',       icon: '📶', title: 'Connect to Bluetooth' },
  { id: 2, key: 'recording',       icon: '⏺',  title: 'Make & Save a Recording' },
  { id: 3, key: 'preset',          icon: '🎵', title: 'Selecting a Preset' },
  { id: 4, key: 'volume',          icon: '🔊', title: 'Preset Volume' },
  { id: 5, key: 'playback',        icon: '▶',  title: 'Playback Controls' },
  { id: 6, key: 'quicksettings',   icon: '⚡', title: 'Quick Settings Menu' },
  { id: 7, key: 'stereo',          icon: '🎛', title: 'Stereo Mode' },
  { id: 8, key: 'wireless',        icon: '🌐', title: 'Wireless Control' },
  { id: 9, key: 'standby',         icon: '⏻',  title: 'Power Save / Standby' },
  { id: 10, key: 'audiofiles',     icon: '📁', title: 'Managing Audio Files' },
  { id: 11, key: 'settings',       icon: '⚙',  title: 'Settings' },
  { id: 12, key: 'help',           icon: '?',  title: 'Help Menu' },
];
```
