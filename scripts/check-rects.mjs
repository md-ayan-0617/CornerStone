import { spawn } from 'child_process';

const EDGE_PATH = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
const PORT = 9234;

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function run() {
  const edge = spawn(EDGE_PATH, [
    '--headless=new',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=C:\\Users\\Ayan\\AppData\\Local\\Temp\\edge_cdp_profile_rects2',
    '--hide-scrollbars',
    '--disable-gpu'
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

  ws.onopen = async () => {
    ws.send(JSON.stringify({ id: 1, method: "Runtime.enable" }));
    await sleep(3000);

    ws.send(JSON.stringify({
      id: 2,
      method: "Runtime.evaluate",
      params: {
        expression: `(() => {
          const cards = Array.from(document.querySelectorAll('.live-project-card'));
          return cards.map(c => {
            const r = c.getBoundingClientRect();
            const title = c.querySelector('h3')?.innerText;
            return { title, top: r.top + window.scrollY, height: r.height, width: r.width };
          });
        })()`,
        returnByValue: true
      }
    }));
  };

  ws.onmessage = (e) => {
    const data = JSON.parse(e.data);
    if (data.id === 2) {
      console.log("Card rects:", data.result.result.value);
      edge.kill();
      process.exit(0);
    }
  };
}

run();
