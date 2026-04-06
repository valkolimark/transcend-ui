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
  const cmd = `python3 -m edge_tts --voice "${VOICE_NAME}" --rate="${RATE}" --text "${safeText}" --write-media "${outputPath}"`;
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
    console.log(`  skip (exists): ${filename}`);
    skipped++;
    continue;
  }

  try {
    generateLine(text, filepath);
    console.log(`  generated: ${filename}`);
    generated++;
  } catch (err) {
    console.error(`  FAILED: "${text}"\n     ${err.message}`);
    failed++;
  }
}

const manifestPath = join(OUTPUT_DIR, 'manifest.json');
writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));

console.log(`\nDone. ${generated} generated, ${skipped} skipped, ${failed} failed.`);
console.log(`Manifest written to public/narration/manifest.json`);
