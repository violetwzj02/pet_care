import { spawn } from "node:child_process";

const preferredBaseURL = "http://127.0.0.1:3020";
const existingBaseURL = "http://localhost:3000";

function startServer() {
  return spawn("cmd.exe", ["/c", "npm.cmd", "run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3020"], {
    stdio: "inherit",
    windowsHide: true,
  });
}

async function canReach(url) {
  try {
    const response = await fetch(url);
    return response.ok;
  } catch {
    return false;
  }
}

async function waitForServer(url, timeout = 60_000) {
  const deadline = Date.now() + timeout;

  while (Date.now() < deadline) {
    if (await canReach(url)) {
      return;
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  throw new Error(`Timed out waiting for ${url}`);
}

function stopServer(server) {
  if (!server?.pid) {
    return;
  }

  server.kill();
  const cleanup = spawn("taskkill", ["/pid", String(server.pid), "/t", "/f"], {
    stdio: "ignore",
    windowsHide: true,
  });
  cleanup.unref();
}

function runPlaywright(baseURL) {
  return new Promise((resolve) => {
    const child = spawn("cmd.exe", ["/c", "npx.cmd", "playwright", "test", "--config=playwright.e2e.config.ts"], {
      env: { ...process.env, PLAYWRIGHT_BASE_URL: baseURL },
      stdio: "inherit",
      windowsHide: true,
    });

    child.on("exit", (code) => resolve(code ?? 1));
    child.on("error", () => resolve(1));
  });
}

let server;
let baseURL = preferredBaseURL;

try {
  if (await canReach(existingBaseURL)) {
    baseURL = existingBaseURL;
  } else {
    server = startServer();
    await waitForServer(baseURL);
  }

  const exitCode = await runPlaywright(baseURL);
  process.exitCode = exitCode;
} finally {
  stopServer(server);
}
