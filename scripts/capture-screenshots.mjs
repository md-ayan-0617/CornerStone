import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const SITES = [
  { slug: 'vale-selvatico', url: 'https://vale-selvatico.vercel.app/' },
  { slug: 'aurenne', url: 'https://aurenne-six.vercel.app/' },
  { slug: 'paloma-house', url: 'https://paloma-socail-house.vercel.app/' },
  { slug: 'noise-dept', url: 'https://noise-dept-six.vercel.app/' },
  { slug: 'spinform', url: 'https://spinform-eight.vercel.app/' },
  { slug: 'mosaic', url: 'https://mosaic-state.vercel.app/' },
  { slug: 'auto-mobile', url: 'https://auto-mobile-black.vercel.app/' },
];

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9222;
const OUTPUT_DIR = path.resolve("public/images/projects");

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log("Starting Edge in headless CDP mode...");
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile',
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  edge.stderr.on('data', (d) => {
    // console.log("Edge err:", d.toString());
  });

  // Wait for debugger to be ready
  let ready = false;
  for (let i = 0; i < 20; i++) {
    await sleep(500);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) {
        ready = true;
        console.log("Edge CDP is ready!");
        break;
      }
    } catch (e) {}
  }

  if (!ready) {
    console.error("Could not connect to Edge CDP");
    edge.kill();
    process.exit(1);
  }

  for (const site of SITES) {
    console.log(`\nCapturing: ${site.slug} (${site.url})...`);
    try {
      // Create new tab
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
          // Wait 4.5 seconds for React components, fonts, images and webgl to render
          await sleep(4500);
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
            // Close tab
            try {
              await fetch(`http://127.0.0.1:${PORT}/json/close/${tabData.id}`);
            } catch (err) {}
            resolve();
          }
        };

        ws.onerror = (err) => {
          console.error(`WebSocket error for ${site.slug}:`, err);
          reject(err);
        };
      });
    } catch (err) {
      console.error(`Failed to capture ${site.slug}:`, err);
    }
  }

  console.log("\nFinished all captures. Stopping Edge...");
  edge.kill();
  process.exit(0);
}

run();
