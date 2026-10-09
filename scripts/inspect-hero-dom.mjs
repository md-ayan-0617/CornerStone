import fs from 'fs';

async function run() {
  const res = await fetch('http://127.0.0.1:9231/json/list').catch(() => null);
  if (!res || !res.ok) {
    console.log("Edge on 9231 not running, starting test directly");
    return;
  }
  const tabs = await res.json();
  const ws = new WebSocket(tabs[0].webSocketDebuggerUrl);
  let id = 1;
  const send = (method, params) => new Promise(r => {
    const cur = id++;
    const h = (e) => {
      const d = JSON.parse(e.data);
      if (d.id === cur) { ws.removeEventListener('message', h); r(d.result?.result?.value); }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id: cur, method, params }));
  });
  ws.onopen = async () => {
    const info = await send('Runtime.evaluate', {
      expression: `
        Array.from(document.querySelectorAll("section:first-of-type *")).slice(0, 20).map(el => ({
          tag: el.tagName,
          cls: el.className,
          text: (el.innerText || '').slice(0, 30),
          opacity: getComputedStyle(el).opacity,
          display: getComputedStyle(el).display,
          background: getComputedStyle(el).backgroundColor,
          h: el.clientHeight,
          w: el.clientWidth
        }))
      `,
      returnByValue: true
    });
    console.log("Hero DOM:", JSON.stringify(info, null, 2));
    ws.close();
    process.exit(0);
  };
}

run();
