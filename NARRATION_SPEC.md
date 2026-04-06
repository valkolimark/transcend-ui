# NARRATION_SPEC.md — Voice Narration via Edge TTS

All narration audio is **pre-generated** using Microsoft's `edge-tts` Python package,
which provides free access to Azure Neural voices (the same voices used in Microsoft Edge
and Azure Cognitive Services — no API key required).

Audio files are generated once at build time, committed to the repo, and played via the
standard HTML5 Audio API. This works in every browser with zero latency, no runtime
network calls, and no dependency on the Web Speech API.

---

## 1. Voice Selection

**Primary voice:** `en-US-AriaNeural`
Aria is warm, clear, and conversational — the best fit for friendly tutorial narration.

**Alternate (male presenter):** `en-US-AndrewNeural`
Andrew is natural and unhurried — equally well-suited to tutorial content.

Other high-quality options for reference:

| Voice Name | Gender | Character |
|---|---|---|
| `en-US-AriaNeural` | Female | Warm, conversational ✅ recommended |
| `en-US-JennyNeural` | Female | Professional, clear |
| `en-US-AndrewNeural` | Male | Conversational, natural |
| `en-US-GuyNeural` | Male | Authoritative, broadcast |
| `en-US-EmmaNeural` | Female | Friendly, upbeat |

To change the voice project-wide, update `VOICE_NAME` in `scripts/generate-narration.js`
and re-run the generation script. Existing files are skipped unless deleted first.

---

## 2. Speech Parameters

Applied to every line via the `--rate` flag for natural tutorial pacing:

```
rate:   -8%     slightly slower than neural default — clear without dragging
pitch:  default Aria sounds best unmodified; do not adjust
volume: default full volume
```

These are baked into the generation script and require no runtime configuration.

---

## 3. Callout Text → Audio File Mapping

Every unique callout string in `CHAPTERS.md` maps to one MP3 file.
Strings shared across chapters are generated once and reused.

**Output directory:** `public/narration/`
**Naming convention:** slugified callout text, max 60 chars, `.mp3` extension

Examples:
```
"Open the Quick Settings menu."
  → public/narration/open-the-quick-settings-menu.mp3

"You're connected — the Bluetooth button turns solid blue."
  → public/narration/youre-connected-the-bluetooth-button-turns-solid-blue.mp3
```

A manifest at `public/narration/manifest.json` maps each string to its file path
so the React app can look them up at runtime without hardcoding filenames.

---

## 4. Generation Script

Create `scripts/generate-narration.js` and run with `node scripts/generate-narration.js`.

**Prerequisites:**
```bash
pip install edge-tts
```

```javascript
// scripts/generate-narration.js
// Pre-generates all Edge TTS narration audio files for the Transcend tutorial app.
// Requires: pip install edge-tts
// Run from project root: node scripts/generate-narration.js

import { execSync }                            from 'child_process';
import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join }                                from 'path';

const VOICE_NAME = 'en-US-AriaNeural';
const RATE       = '-8%';
const OUTPUT_DIR = join(process.cwd(), 'public', 'narration');

// ── All unique callout lines across all 12 chapters ──────────────────────────
const CALLOUTS = [
  // Chapter 01 — Bluetooth
  "Open the Quick Settings menu.",
  "Tap Bluetooth to begin pairing.",
  "Your device will appear in Bluetooth settings.",
  "You're connected — the Bluetooth button turns solid blue.",
  "Both inputs are now active and running in Stereo Mode.",
  "Bluetooth is connected and ready to use.",

  // Chapter 02 — Recording
  "Tap REC to start recording.",
  "Recording is in progress — watch the red dot pulse.",
  "Recording stopped — review before saving.",
  "Preview your recording.",
  "Your track has been saved to the file manager.",
  "Record, review, and save — all from the home screen.",

  // Chapter 03 — Presets
  "Tap any preset to select a room acoustic.",
  "Studio B is now selected.",
  "Tap the info badge to read a description of the acoustic preset.",
  "Great Hall is now selected.",
  "Grand Cathedral is now active.",
  "9 acoustic presets — one tap to transform your space.",

  // Chapter 04 — Volume
  "The right sidebar controls Active Acoustics volume.",
  "Drag up to increase volume.",
  "Volume is now at maximum.",
  "Drag down to decrease the volume.",
  "Tap the mute button to toggle Active Acoustics on or off.",
  "Volume is independent of recording and playback levels.",

  // Chapter 05 — Playback
  "Select a track to begin playback.",
  "Playback mode — use the scrubber to seek.",
  "Scrub forward through the track.",
  "Playback is running — the progress bar updates in real time.",
  "Tap to skip to the next track.",
  "Adjust playback volume separately from acoustics.",
  "Full transport controls on every screen.",

  // Chapter 06 — Quick Settings
  "Swipe down from the top to open Quick Settings.",
  "Quick Settings gives you fast access to the most-used controls.",
  "Toggle Stereo Mode here.",
  "You can also manage your Bluetooth connection here.",
  "The bottom row includes Help, Net Control, Settings, and Standby.",
  "Quick Settings: always one swipe away.",

  // Chapter 07 — Stereo Mode
  "Stereo Mode processes left and right channels independently.",
  "Stereo Mode is currently off.",
  "Stereo Mode is on — both channels are now processed independently.",
  "Stereo Mode is off — the system returns to mono processing.",
  "Not available on SoundLok units.",
  "You can toggle Stereo Mode anytime from Quick Settings.",

  // Chapter 08 — Wireless Control
  "Control Transcend from any device on your Wi-Fi network.",
  "Scan the QR code to open the web interface.",
  "Your device must be on the same Wi-Fi network as the Transcend unit.",
  "Full control from any browser — no app needed.",
  "Even the standby screen is accessible remotely.",
  "Net Control — your space, from anywhere on the network.",

  // Chapter 09 — Standby
  "Put Transcend into standby to save power.",
  "Confirm to turn off the screen and disable audio output.",
  "The screen is off and the system is now in standby.",
  "Tap Wake Up to resume.",
  "The system has been fully restored.",
  "Standby saves energy without losing your settings.",

  // Chapter 10 — Audio Files
  "The file manager holds all your recordings.",
  "All saved recordings appear here.",
  "Track 2 is now selected.",
  "Track 2 is now playing.",
  "Long press a track to bring up the delete option.",
  "The track has been deleted.",
  "Organize recordings directly from the controller.",

  // Chapter 11 — Settings
  "Access system settings with the admin passcode.",
  "Enter the 6-digit admin passcode.",
  "Settings are now unlocked.",
  "Adjust network, audio, and device preferences.",
  "The default admin passcode is 12345.",

  // Chapter 12 — Help Menu
  "Access the full online user guide instantly.",
  "Scan with your phone to open the user guide.",
  "The QR code links to manuals, how-to videos, and support resources.",
  "Help is always one tap away — no manual required.",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 60)
    .replace(/-$/, '');
}

function generateLine(text, outputPath) {
  const safeText = text.replace(/"/g, '\\"');
  const cmd = `edge-tts --voice "${VOICE_NAME}" --rate="${RATE}" --text "${safeText}" --write-media "${outputPath}"`;
  execSync(cmd, { stdio: 'pipe' });
}

// ── Main ──────────────────────────────────────────────────────────────────────

if (!existsSync(OUTPUT_DIR)) {
  mkdirSync(OUTPUT_DIR, { recursive: true });
}

const manifest = {};
let generated  = 0;
let skipped    = 0;
let failed     = 0;

for (const text of CALLOUTS) {
  const slug     = slugify(text);
  const filename = `${slug}.mp3`;
  const filepath = join(OUTPUT_DIR, filename);

  manifest[text] = `/narration/${filename}`;

  if (existsSync(filepath)) {
    console.log(`  ⏭  skipped (exists): ${filename}`);
    skipped++;
    continue;
  }

  try {
    generateLine(text, filepath);
    console.log(`  ✅  generated: ${filename}`);
    generated++;
  } catch (err) {
    console.error(`  ❌  FAILED: "${text}"\n     ${err.message}`);
    failed++;
  }
}

const manifestPath = join(OUTPUT_DIR, 'manifest.json');
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`\nDone. ${generated} generated, ${skipped} skipped, ${failed} failed.`);
console.log(`Manifest written to public/narration/manifest.json`);
```

Add to `package.json` scripts:
```json
"narration": "node scripts/generate-narration.js"
```

Run once before your first deploy:
```bash
npm run narration
```

---

## 5. React Hook — `useNarration`

Create `src/hooks/useNarration.js`:

```javascript
import { useEffect, useRef, useCallback } from 'react';

// Manifest is fetched once and cached for the lifetime of the app
let manifestCache = null;

async function loadManifest() {
  if (manifestCache) return manifestCache;
  try {
    const res  = await fetch(`${import.meta.env.BASE_URL}narration/manifest.json`);
    manifestCache = await res.json();
  } catch {
    manifestCache = {};
  }
  return manifestCache;
}

export function useNarration() {
  const audioRef    = useRef(null);
  const manifestRef = useRef(null);

  useEffect(() => {
    loadManifest().then(m => { manifestRef.current = m; });
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const speak = useCallback((text) => {
    if (!text || !manifestRef.current) return;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    const path = manifestRef.current[text];
    if (!path) {
      console.warn(`[useNarration] No audio found for: "${text}"`);
      return;
    }

    const base  = import.meta.env.BASE_URL.replace(/\/$/, '');
    const audio = new Audio(`${base}${path}`);
    audioRef.current = audio;
    audio.play().catch(err => {
      // Autoplay blocked on first user interaction — safe to ignore
      console.warn('[useNarration] Playback blocked:', err.message);
    });
  }, []);

  const cancel = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  return { speak, cancel };
}
```

---

## 6. Integration with `useAnimationSequence`

```javascript
import { useNarration } from './useNarration';

// Inside useAnimationSequence hook body:
const { speak, cancel } = useNarration();

useEffect(() => {
  const step = steps[currentStepIndex];
  if (step?.callout && step.callout !== '—') {
    // Strip symbol/emoji characters that should not be spoken aloud
    const cleanText = step.callout
      .replace(/[⚠️⊕✓✕●▶⏸💾🔊📶⏺🎵🎛🌐⏻📁⚙]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();
    speak(cleanText);
  }
  return () => cancel();
}, [currentStepIndex]);
```

---

## 7. Committing the Audio Files

The generated MP3s **must be committed** to the repo so GitHub Pages serves them
without requiring a build step on the hosting side:

```gitignore
# Do NOT add public/narration/ to .gitignore
# These files are intentionally committed
```

Approximate storage: ~70 lines × ~25 KB each ≈ **~1.8 MB total** — well within GitHub's limits.

---

## 8. File Locations

```
project root/
  scripts/
    generate-narration.js       ← run once (or when callouts change)
  public/
    narration/
      manifest.json             ← auto-generated: text → mp3 path map
      *.mp3                     ← ~70 files, one per unique callout line
  src/
    hooks/
      useNarration.js           ← plays audio by looking up callout text
      useAnimationSequence.js   ← updated to call speak() on step change
```

---

## 9. Regenerating Audio After Edits

If callout text in `CHAPTERS.md` is changed:

1. Delete the specific old MP3 from `public/narration/` (or delete the whole folder to regenerate everything)
2. Run `npm run narration` again
3. Commit the new/updated MP3s and the updated `manifest.json`

The script skips files that already exist, so unchanged lines cost nothing to re-run.
