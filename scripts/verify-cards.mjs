import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9232;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile_cards2',
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) break;
    } catch (e) {}
  }

  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5175/work`, { method: 'PUT' });
  const tab = await res.json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  let msgId = 1;
  const send = (method, params = {}) => {
    const id = msgId++;
    ws.send(JSON.stringify({ id, method, params }));
    return id;
  };

  ws.onopen = async () => {
    send("Page.enable");
    send("Runtime.enable");
    send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false });
    
    await sleep(2500);

    // Scroll to the live projects grid
    send("Runtime.evaluate", {
      expression: `(() => {
        const el = document.querySelector('.live-project-card');
        if (el) el.scrollIntoView({ behavior: 'instant', block: 'center' });
      })()`
    });

    await sleep(1500);

    send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 85,
      clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
    });
  };

  ws.onmessage = async (e) => {
    const data = JSON.parse(e.data);
    if (data.result && data.result.data) {
      fs.writeFileSync("public/images/projects/cards-verify.jpg", Buffer.from(data.result.data, 'base64'));
      console.log("Cards screenshot saved cleanly!");
      ws.close();
      edge.kill();
      process.exit(0);
    }
  };
}

run();
