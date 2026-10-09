import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9229;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile_local',
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
    send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1100, deviceScaleFactor: 1.5, mobile: false });
    send("Page.enable");
    // Wait for page loader (450ms) to finish and render content
    await sleep(2500);

    // Scroll slightly down to showcase the 7 live website cards
    send("Runtime.evaluate", {
      expression: `window.scrollTo(0, 420);`
    });

    await sleep(1000);

    send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 85,
      clip: { x: 0, y: 0, width: 1440, height: 1100, scale: 1 }
    });
  };

  ws.onmessage = async (e) => {
    const data = JSON.parse(e.data);
    if (data.result && data.result.data) {
      const buf = Buffer.from(data.result.data, 'base64');
      fs.writeFileSync("public/images/projects/workpage-verify.jpg", buf);
      console.log("Captured local work page verification screenshot:", buf.length);
      ws.close();
      edge.kill();
      process.exit(0);
    }
  };
}

run();
