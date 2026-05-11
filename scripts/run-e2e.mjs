import { spawn } from "node:child_process";

const baseURL = "http://127.0.0.1:3020";

function startServer() {
  return spawn("cmd.exe", ["/c", "npm.cmd", "run", "dev", "--", "--hostname", "127.0.0.1", "--port", "3020"], {
    stdio: "inherit",
    windowsHide: true,
  });
}

async function waitForServer(timeout = 60_000) {
  const deadline = Date.now() + timeout;

  while (Date.now() < deadline) {
    try {
      const response = await fetch(baseURL);
      if (response.ok) {
        return;
      }
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  throw new Error(`Timed out waiting for ${baseURL}`);
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

function runPlaywright() {
  return new Promise((resolve) => {
    const child = spawn("cmd.exe", ["/c", "npx.cmd", "playwright", "test", "--config=playwright.e2e.config.ts"], {
      stdio: "inherit",
      windowsHide: true,
    });

    child.on("exit", (code) => resolve(code ?? 1));
    child.on("error", () => resolve(1));
  });
}

const server = startServer();

try {
  await waitForServer();
  const exitCode = await runPlaywright();
  process.exitCode = exitCode;
} finally {
  stopServer(server);
}
