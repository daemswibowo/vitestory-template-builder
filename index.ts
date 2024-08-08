import { Hono } from "hono";
import { readFileSync } from "fs";
import { resolve } from "path";
import { watch } from "chokidar";
import { WebSocketServer } from "ws";
import { JSDOM } from "jsdom";
import { formExample } from "./src/schema";
import {
  buildTemplateView,
  renderTemplate,
} from "vitestory-core/src/utils/template";

const app = new Hono();
const port = 8080;
const wsPort = 8081;

let templateHtml = readFileSync(resolve("./src/template.html"), "utf8");

// WebSocket server for hot module replacement
const wss = new WebSocketServer({ port: wsPort });
let clients: any[] = [];

wss.on("connection", (ws) => {
  clients.push(ws);
  ws.on("close", () => {
    clients = clients.filter((client) => client !== ws);
  });
});

// Watch the template file for changes
const watcher = watch(resolve("./src/template.html"));

watcher.on("change", (path) => {
  console.log(`File ${path} has been changed`);
  templateHtml = readFileSync(resolve(path), "utf8");
  // Notify all connected clients to refresh
  clients.forEach((client) => {
    if (client.readyState === client.OPEN) {
      client.send(JSON.stringify({ type: "update", content: templateHtml }));
    }
  });
});

app.get("/", (c) => {
  const html = templateHtml;

  const dom: JSDOM = new JSDOM(html);

  // inject ws hmr functionality to body
  let body = dom.window.document.querySelector("body");

  if (body && body.innerHTML) {
    body.innerHTML += `<script>
      const ws = new WebSocket('ws://localhost:${wsPort}');
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'update') {
          document.body.innerHTML = data.content;
          // Re-establish the WebSocket connection after replacing the body content
          const newScript = document.createElement('script');
          newScript.innerHTML = \`
            const ws = new WebSocket('ws://localhost:${wsPort}');
            ws.onmessage = \${event} => {
              const data = JSON.parse(event.data);
              if (data.type === 'update') {
                document.body.innerHTML = data.content;
              }
            };
          \`;
          document.body.appendChild(newScript);
        }
      };
    </script>
  `;
  }

  const view = buildTemplateView(formExample);

  return c.html(renderTemplate(view, dom.serialize()));
});

Bun.serve({
  fetch: app.fetch,
  port,
});

console.log(`Server is running at http://localhost:${port}`);
console.log(`WebSocket server is running at ws://localhost:${wsPort}`);
