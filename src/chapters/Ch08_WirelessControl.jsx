import { useState, useEffect, useCallback } from 'react';
import { useAnimationSequence } from '../hooks/useAnimationSequence';
import TranscendUI from '../components/TranscendUI';
import CursorDot from '../components/CursorDot';
import Callout from '../components/Callout';


const STEPS = [
  { id: 'intro',               duration: 1500 },
  { id: 'open-quick-settings', duration: 600  },
  { id: 'panel-open',          duration: 1000 },
  { id: 'cursor-to-netcontrol',duration: 500  },
  { id: 'tap-net-control',     duration: 200  },
  { id: 'qr-modal-open',       duration: 3000 },
  { id: 'hold-qr',             duration: 1500 },
  { id: 'tap-close',           duration: 200  },
  { id: 'modal-closed',        duration: 500  },
  { id: 'show-web-ui',         duration: 2500 },
  { id: 'show-standby-state',  duration: 1500 },
  { id: 'outro',               duration: 2200 },
];

const CALLOUT_MAP = {
  'intro': 'Control Transcend from any device on your Wi-Fi network',
  'qr-modal-open': 'Scan the QR code to open the web interface',
  'hold-qr': 'Must be on same Wi-Fi network as Transcend',
  'show-web-ui': 'Full control from any browser \u2014 no app needed',
  'show-standby-state': 'Even the standby screen is accessible remotely',
  'outro': 'Net Control \u2014 your space, from anywhere on the network',
};

export default function Ch08_WirelessControl({ started, uiRef }) {
  const getCalloutText = useCallback((stepId) => CALLOUT_MAP[stepId] || null, []);
  const { currentStep } = useAnimationSequence(STEPS, { started, getCalloutText });

  const [ui, setUi] = useState({
    activePreset: 'studio-a',
    quickSettingsOpen: false,
    modalType: null,
    browserChrome: false,
    cursorPos: { x: 240, y: 10 },
    cursorTapping: false,
    cursorVisible: false,
    calloutText: '',
    calloutVisible: false,
  });

  useEffect(() => {
    switch (currentStep) {
      case 'intro':
        setUi(s => ({
          ...s,
          quickSettingsOpen: false,
          modalType: null,
          browserChrome: false,
          cursorVisible: true,
          cursorPos: { x: 240, y: 10 },
          cursorTapping: false,
          calloutText: CALLOUT_MAP['intro'],
          calloutVisible: true,
        }));
        break;
      case 'open-quick-settings':
        setUi(s => ({
          ...s,
          cursorPos: { x: 240, y: 100 },
          cursorTapping: true,
          quickSettingsOpen: true,
          calloutVisible: false,
        }));
        break;
      case 'panel-open':
        setUi(s => ({ ...s, cursorTapping: false }));
        break;
      case 'cursor-to-netcontrol':
        setUi(s => ({ ...s, cursorPos: { x: 165, y: 110 } }));
        break;
      case 'tap-net-control':
        setUi(s => ({ ...s, cursorTapping: true }));
        break;
      case 'qr-modal-open':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          cursorVisible: false,
          quickSettingsOpen: false,
          modalType: 'qr-web-ui',
          calloutText: CALLOUT_MAP['qr-modal-open'],
          calloutVisible: true,
        }));
        break;
      case 'hold-qr':
        setUi(s => ({
          ...s,
          calloutText: CALLOUT_MAP['hold-qr'],
          calloutVisible: true,
        }));
        break;
      case 'tap-close':
        setUi(s => ({
          ...s,
          cursorVisible: true,
          cursorPos: { x: 240, y: 280 },
          cursorTapping: true,
          calloutVisible: false,
        }));
        break;
      case 'modal-closed':
        setUi(s => ({
          ...s,
          cursorTapping: false,
          modalType: null,
          cursorVisible: false,
        }));
        break;
      case 'show-web-ui':
        setUi(s => ({
          ...s,
          browserChrome: true,
          calloutText: CALLOUT_MAP['show-web-ui'],
          calloutVisible: true,
        }));
        break;
      case 'show-standby-state':
        setUi(s => ({
          ...s,
          modalType: 'standby-screen',
          calloutText: CALLOUT_MAP['show-standby-state'],
          calloutVisible: true,
        }));
        break;
      case 'outro':
        setUi(s => ({
          ...s,
          browserChrome: false,
          modalType: null,
          calloutText: CALLOUT_MAP['outro'],
          calloutVisible: true,
        }));
        break;
    }
  }, [currentStep]);

  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
      <div ref={uiRef} style={{ position: 'relative', width: 480, height: 320 }}>
        <TranscendUI
          activePreset={ui.activePreset}
          quickSettingsOpen={ui.quickSettingsOpen}
          modalType={ui.modalType}
          browserChrome={ui.browserChrome}
        />
        <CursorDot
          x={ui.cursorPos.x}
          y={ui.cursorPos.y}
          tapping={ui.cursorTapping}
          visible={ui.cursorVisible}
          uiRef={uiRef}
        />
        <Callout text={ui.calloutText} visible={ui.calloutVisible} />
      </div>
    </div>
  );
}
