/**
 * Serves ./dist on a fixed port, then opens a Cloudflare quick tunnel (trycloudflare.com).
 * Run: npm run build && npm run share:trycloudflare
 * Each run gets a new random *.trycloudflare.com URL until you stop the process.
 */
import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import http from "node:http";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const PORT = 8787;
const host = "127.0.0.1";

const cfCandidate =
  process.platform === "win32"
    ? path.join(root, "cloudflared.exe")
    : path.join(root, "cloudflared");
const cfExe = fs.existsSync(cfCandidate) ? cfCandidate : "cloudflared";

const preview = spawn("npx", ["vite", "preview", "--host", host, "--port", String(PORT)], {
  cwd: root,
  stdio: ["ignore", "pipe", "pipe"],
  shell: true,
  env: process.env,
});
preview.stdout.pipe(process.stdout);
preview.stderr.pipe(process.stderr);

function waitForServer() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const max = 120;
    const tick = () => {
      attempts += 1;
      if (attempts > max) {
        reject(new Error("Preview server did not become ready in time."));
        return;
      }
      const req = http.get(`http://${host}:${PORT}/`, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode < 500) resolve();
        else setTimeout(tick, 400);
      });
      req.on("error", () => setTimeout(tick, 400));
      req.setTimeout(800, () => {
        req.destroy();
        setTimeout(tick, 400);
      });
    };
    tick();
  });
}

await waitForServer();

const tunnel = spawn(cfExe, ["tunnel", "--url", `http://${host}:${PORT}`], {
  cwd: root,
  stdio: "inherit",
  shell: false,
  env: process.env,
});

function shutdown() {
  try {
    tunnel.kill("SIGTERM");
  } catch {
    /* ignore */
  }
  try {
    preview.kill("SIGTERM");
  } catch {
    /* ignore */
  }
  process.exit(0);
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
tunnel.on("exit", () => preview.kill());
preview.on("exit", (code) => {
  if (code && code !== null && code !== 0) process.exit(code);
});
