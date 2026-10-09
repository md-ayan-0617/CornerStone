import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9226;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile_5',
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  let ready = false;
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        ready = true;
        break;
      }
    } catch (e) {}
  }

  if (!ready) {
    console.error("Edge not ready");
    edge.kill();
    process.exit(1);
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
        // Find loader overlay and hide it
        const all = Array.from(document.querySelectorAll('*'));
        all.forEach(el => {
          if (el.innerText && el.innerText.includes('100') && el.innerText.includes('A U R E N N E')) {
            const s = window.getComputedStyle(el);
            if (s.position === 'fixed' || s.position === 'absolute') {
              el.style.display = 'none';
            }
          }
        });
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
      })()`
    });

    await sleep(1500);

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
      console.log("Captured clean aurenne hero:", buf.length);
      ws.close();
      edge.kill();
      process.exit(0);
    }
  };
}

run();
