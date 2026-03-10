#!/usr/bin/env node
/**
 * Pre-generate Edge TTS audio files for all callout texts.
 *
 * Usage:
 *   node scripts/generate-tts.mjs
 *
 * Generates MP3 files in public/audio/<voice>/<hash>.mp3
 * and writes a manifest at src/audioManifest.json
 */

import { createHash } from 'crypto';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// ── Voices to generate ──────────────────────────────────────────────
const VOICES = [
  { id: 'ava',      name: 'Ava',      edgeVoice: 'en-US-AvaNeural' },
  { id: 'jenny',    name: 'Jenny',    edgeVoice: 'en-US-JennyNeural' },
  { id: 'aria',     name: 'Aria',     edgeVoice: 'en-US-AriaNeural' },
  { id: 'michelle', name: 'Michelle', edgeVoice: 'en-US-MichelleNeural' },
];

// ── All callout texts across 12 chapters ─────────────────────────────
const TEXTS = [
  // Ch01
  "First, open the Quick Settings menu by swiping down",
  "Now tap Bluetooth to begin pairing your device",
  "Your device will appear here once it is discovered",
  "Your Bluetooth device is now connected",
  "Both inputs are now active in Stereo Mode",
  "Bluetooth is connected and ready to use",
  // Ch02
  "To begin recording, tap the REC button",
  "The red dot pulses to indicate recording is in progress",
  "Recording has stopped. You can now review it before saving",
  "Tap play to preview your recording",
  "Your track has been saved to the file manager",
  "You can record, review, and save all from the home screen",
  // Ch03
  "Tap any preset button to select a room acoustic",
  "Studio B is now selected",
  "Tap the info icon to read the acoustic description",
  "Great Hall is now selected",
  "Here is the Grand Cathedral preset",
  "There are 9 acoustic presets to transform your space with just one tap",
  // Ch04
  "Use the right sidebar to control the Active Acoustics volume",
  "Drag the slider up to increase the volume",
  "The volume is now at maximum",
  "Drag the slider down to decrease the volume",
  "Tap here to mute or unmute Active Acoustics",
  "The volume control is independent of recording and playback levels",
  // Ch05
  "Select a track to begin playback",
  "You are now in playback mode. Use the scrubber to seek through the track",
  "You can scrub forward through the track like this",
  "The progress bar moves in real time as the track plays",
  "Tap the skip button to jump to the next track",
  "You can adjust playback volume separately from the acoustics volume",
  "Full transport controls are available on every screen",
  // Ch06
  "Swipe down from the top of the screen to open Quick Settings",
  "Quick Settings lets you access key controls quickly",
  "You can toggle Stereo Mode on or off here",
  "Or manage your Bluetooth connections here",
  "You also have quick access to Help, Net Control, Settings, and Standby",
  "Quick Settings is always just one swipe away",
  // Ch07
  "Stereo Mode processes the left and right channels independently",
  "Stereo Mode is currently turned off",
  "Stereo Mode is now on with dual-channel processing active",
  "Stereo Mode is now off, returning to mono processing",
  "Please note that Stereo Mode is not available on SoundLok units",
  "You can toggle Stereo Mode anytime from Quick Settings",
  // Ch08
  "You can control Transcend from any device on your Wi-Fi network",
  "Scan this QR code with your phone to open the web interface",
  "Make sure your device is on the same Wi-Fi network as Transcend",
  "You get full control from any browser with no app needed",
  "Even the standby screen can be accessed remotely",
  "With Net Control, you can manage your space from anywhere on the network",
  // Ch09
  "You can put Transcend into standby mode to save power",
  "Tap confirm to turn off the screen and disable audio",
  "The screen is now off and the system is in standby",
  "Tap the Wake Up button to resume operation",
  "The system has been restored and is ready to use",
  "Standby mode saves energy without losing any of your settings",
  // Ch10
  "The file manager stores all of your recordings",
  "All of your saved recordings will appear here",
  "Track 2 is now selected",
  "Track 2 is now playing",
  "Long press on a track to access the delete option",
  "The track has been deleted",
  "You can organize all your recordings directly from the controller",
  // Ch11
  "To access system settings, you will need the admin passcode",
  "Enter the 6-digit admin passcode to continue",
  "Settings are now unlocked and accessible",
  "From here you can adjust network, audio, and device preferences",
  "The default admin passcode is 1 2 3 4 5",
  // Ch12
  "You can access the full online user guide instantly",
  "Scan this code with your phone to open the user guide",
  "Here you will find links to manuals, videos, and support resources",
  "Help is always just one tap away with no manual required",
];

function textToKey(text) {
  // Strip special chars for TTS but keep the original for display
  return createHash('md5').update(text).digest('hex').slice(0, 10);
}

async function main() {
  // Dynamic import for ESM
  const { EdgeTTS } = await import('edge-tts-universal');

  const manifest = {};

  for (const voice of VOICES) {
    const voiceDir = join(ROOT, 'public', 'audio', voice.id);
    mkdirSync(voiceDir, { recursive: true });

    console.log(`\n── Generating voice: ${voice.name} (${voice.edgeVoice}) ──`);

    for (const text of TEXTS) {
      const key = textToKey(text);
      const outPath = join(voiceDir, `${key}.mp3`);

      // Track in manifest
      if (!manifest[key]) {
        manifest[key] = { text };
      }

      if (existsSync(outPath)) {
        console.log(`  [skip] ${text.slice(0, 50)}...`);
        continue;
      }

      try {
        const tts = new EdgeTTS(text, voice.edgeVoice);
        const result = await tts.synthesize();
        const audioBuffer = Buffer.from(await result.audio.arrayBuffer());
        writeFileSync(outPath, audioBuffer);
        console.log(`  [done] ${text.slice(0, 50)}...`);
      } catch (err) {
        console.error(`  [FAIL] ${text.slice(0, 50)}: ${err.message}`);
      }

      // Small delay to avoid rate limiting
      await new Promise(r => setTimeout(r, 200));
    }
  }

  // Write manifest
  const manifestPath = join(ROOT, 'src', 'audioManifest.json');
  writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
  console.log(`\nManifest written to ${manifestPath}`);
  console.log('Done!');
}

main().catch(console.error);
