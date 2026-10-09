import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9228;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile_7',
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

  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?https://aurenne-six.vercel.app/`, { method: 'PUT' });
  const tab = await res.json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  let msgId = 1;
  const send = (method, params = {}) => {
    const id = msgId++;
    ws.send(JSON.stringify({ id, method, params }));
    return id;
  };

  ws.onopen = async () => {
    send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1.5, mobile: false });
    send("Page.enable");
    send("Runtime.enable");
    await sleep(4000);

    send("Runtime.evaluate", {
      expression: `(() => {
        const all = Array.from(document.querySelectorAll('*'));
        all.forEach(el => {
          if (el.innerText && el.innerText.includes('100') && el.innerText.includes('A U R E N N E')) {
            const s = window.getComputedStyle(el);
            if (s.position === 'fixed' || s.position === 'absolute') {
              el.remove();
            }
          }
        });
        document.body.style.overflow = 'auto';
        window.scrollTo(0, 0);
      })()`
    });

    await sleep(1000);

    send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 88,
      clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
    });
  };

  ws.onmessage = async (e) => {
    const data = JSON.parse(e.data);
    if (data.result && data.result.data) {
      const buf = Buffer.from(data.result.data, 'base64');
      fs.writeFileSync("public/images/projects/aurenne.jpg", buf);
      console.log("Captured aurenne hero:", buf.length);
      ws.close();
      edge.kill();
      process.exit(0);
    }
  };
}

run();
