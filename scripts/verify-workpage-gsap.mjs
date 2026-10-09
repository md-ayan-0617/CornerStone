import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9231;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile_work_gsap',
    '--hide-scrollbars',
    '--disable-gpu',
    '--no-first-run',
    '--no-default-browser-check'
  ]);

  for (let i = 0; i < 20; i++) {
    await sleep(400);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) break;
    } catch (e) {}
  }

  const res = await fetch(`http://127.0.0.1:${PORT}/json/new?http://localhost:5174/work`, { method: 'PUT' });
  const tab = await res.json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);

  let msgId = 1;
  const send = (method, params = {}) => {
    const id = msgId++;
    ws.send(JSON.stringify({ id, method, params }));
    return id;
  };

  const evaluate = (expr) => {
    return new Promise((resolve) => {
      const id = send("Runtime.evaluate", { expression: expr, returnByValue: true });
      const handler = (e) => {
        const d = JSON.parse(e.data);
        if (d.id === id) {
          ws.removeEventListener('message', handler);
          resolve(d.result?.result?.value);
        }
      };
      ws.addEventListener('message', handler);
    });
  };

  ws.onopen = async () => {
    send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 1100, deviceScaleFactor: 1.5, mobile: false });
    send("Page.enable");
    
    // Wait for loader to fade and GSAP hero entrance to settle
    await sleep(2000);

    const checks = await evaluate(`
      ({
        h1Text: document.querySelector('h1')?.innerText,
        hasTypewriterText: document.body.innerText.includes("SELECTED WORK IN"),
        cardCount: document.querySelectorAll('.live-project-card').length,
        progressBar: !!document.querySelector('.gsap-scroll-progress-line'),
        telemetryItems: document.querySelectorAll('.work-telemetry-item').length,
        hasLenis: !!window.__lenis
      })
    `);

    console.log("PAGE DOM CHECKS:", JSON.stringify(checks, null, 2));

    // Capture Hero Top
    send("Page.captureScreenshot", {
      format: "jpeg",
      quality: 85,
      clip: { x: 0, y: 0, width: 1440, height: 1000, scale: 1 }
    });
  };

  let screenshotCount = 0;
  ws.onmessage = async (e) => {
    const data = JSON.parse(e.data);
    if (data.result && data.result.data) {
      const buf = Buffer.from(data.result.data, 'base64');
      if (screenshotCount === 0) {
        fs.writeFileSync("public/images/projects/verify-hero-gsap.jpg", buf);
        console.log("Saved verify-hero-gsap.jpg:", buf.length);
        screenshotCount++;

        // Now scroll to cards using Lenis
        await evaluate(`
          if (window.__lenis) {
            window.__lenis.scrollTo(1050, { immediate: true });
          } else {
            window.scrollTo(0, 1050);
          }
        `);
        await sleep(1500);

        // Capture current viewport
        send("Page.captureScreenshot", {
          format: "jpeg",
          quality: 85
        });
      } else {
        fs.writeFileSync("public/images/projects/verify-cards-gsap.jpg", buf);
        console.log("Saved verify-cards-gsap.jpg:", buf.length);
        ws.close();
        edge.kill();
        process.exit(0);
      }
    }
  };
}

run();
