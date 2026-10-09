import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const SITES = [
  { slug: 'vale-selvatico', url: 'https://vale-selvatico.vercel.app/' },
  { slug: 'aurenne', url: 'https://aurenne-six.vercel.app/' },
];

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9223;
const OUTPUT_DIR = path.resolve("public/images/projects");

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("Starting Edge for splash completion...");
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile_2',
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
    console.error("Could not connect to Edge");
    edge.kill();
    process.exit(1);
  }

  for (const site of SITES) {
    console.log(`Capturing with 9s delay: ${site.slug}...`);
    try {
      const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(site.url)}`, { method: 'PUT' });
      const tabData = await newTabRes.json();
      const wsUrl = tabData.webSocketDebuggerUrl;

      await new Promise((resolve, reject) => {
        const ws = new WebSocket(wsUrl);
        let msgId = 1;

        const send = (method, params = {}) => {
          const id = msgId++;
          ws.send(JSON.stringify({ id, method, params }));
          return id;
        };

        ws.onopen = async () => {
          send("Emulation.setDeviceMetricsOverride", {
            width: 1440,
            height: 900,
            deviceScaleFactor: 1.5,
            mobile: false
          });
          send("Page.enable");
          // Wait 9 seconds for splash/intro to completely fade out
          await sleep(9000);
          send("Page.captureScreenshot", {
            format: "jpeg",
            quality: 88,
            clip: { x: 0, y: 0, width: 1440, height: 900, scale: 1 }
          });
        };

        ws.onmessage = async (event) => {
          const data = JSON.parse(event.data);
          if (data.result && data.result.data) {
            const buf = Buffer.from(data.result.data, 'base64');
            const dest = path.join(OUTPUT_DIR, `${site.slug}.jpg`);
            fs.writeFileSync(dest, buf);
            console.log(`Saved screenshot: ${dest} (${buf.length} bytes)`);
            ws.close();
            try {
              await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);
            } catch (err) {}
            resolve();
          }
        };

        ws.onerror = (err) => reject(err);
      });
    } catch (err) {
      console.error(err);
    }
  }

  edge.kill();
  console.log("Done!");
  process.exit(0);
}

run();
