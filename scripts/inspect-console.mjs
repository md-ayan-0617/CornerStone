import { spawn } from 'child_process';
import fs from 'fs';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9230;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile_console',
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
    send("Log.enable");
    send("Runtime.enable");
    send("Page.enable");
    send("Emulation.setDeviceMetricsOverride", { width: 1440, height: 900, deviceScaleFactor: 1.5, mobile: false });
    
    await sleep(4000);

    send("Runtime.evaluate", {
      expression: `(() => {
        return {
          title: document.title,
          bodyText: document.body.innerText.slice(0, 300),
          htmlLength: document.documentElement.outerHTML.length
        };
      })()`,
      returnByValue: true
    });
  };

  ws.onmessage = async (e) => {
    const data = JSON.parse(e.data);
    if (data.method === "Runtime.consoleAPICalled") {
      console.log("Browser Console:", data.params.type, data.params.args.map(a => a.value || a.description));
    }
    if (data.method === "Log.entryAdded") {
      console.log("Browser Log:", data.params.entry);
    }
    if (data.result && data.result.result && data.result.result.value) {
      console.log("Page info:", data.result.result.value);

      // Now capture screenshot
      send("Page.captureScreenshot", {
        format: "jpeg",
        quality: 85
      });
    } else if (data.result && data.result.data) {
      fs.writeFileSync("public/images/projects/workpage-verify.jpg", Buffer.from(data.result.data, 'base64'));
      console.log("Screenshot saved!");
      ws.close();
      edge.kill();
      process.exit(0);
    }
  };
}

run();
