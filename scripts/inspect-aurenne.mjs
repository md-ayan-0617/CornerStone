import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9224;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile_3',
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  await sleep(1500);

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
    console.log("Waiting 6s...");
    await sleep(6000);

    // Let's inspect buttons or text
    send("Runtime.evaluate", {
      expression: `(() => {
        const btns = Array.from(document.querySelectorAll('button, a')).map(b => b.innerText);
        const text = document.body.innerText.slice(0, 500);
        return { btns, text };
      })()`,
      returnByValue: true
    });
  };

  ws.onmessage = async (e) => {
    const data = JSON.parse(e.data);
    if (data.result && data.result.result && data.result.result.value) {
      console.log("Evaluation:", data.result.result.value);

      // Try scrolling or clicking
      send("Runtime.evaluate", {
        expression: `(() => {
          const btn = document.querySelector('button');
          if (btn) btn.click();
          window.scrollTo(0, 400);
        })()`
      });

      await sleep(3000);

      send("Page.captureScreenshot", {
        format: "jpeg",
        quality: 88,
        clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
      });
    } else if (data.result && data.result.data) {
      const buf = Buffer.from(data.result.data, 'base64');
      fs.writeFileSync("public/images/projects/aurenne.jpg", buf);
      console.log("Captured updated aurenne screenshot:", buf.length);
      ws.close();
      edge.kill();
      process.exit(0);
    }
  };
}

run();
