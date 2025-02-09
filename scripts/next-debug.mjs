#!/usr/bin/env node
import * as net from "net";
import { spawn } from "child_process";
import http from "http";

const DEBUG_PORT = 9230;
const SERVER_URL = "http://localhost:3000";

// Check if the debug port is in use.
function checkDebugPort(port) {
  return new Promise((resolve) => {
    const client = net.createConnection({ port }, () => {
      client.end();
      resolve(true);
    });
    client.on("error", () => resolve(false));
  });
}

// Try to GET the server URL to check if Next.js is responding.
function checkServerReady() {
  return new Promise((resolve) => {
    const req = http.get(SERVER_URL, () => {
      // Any response indicates the server is up.
      resolve(true);
    });
    req.on("error", () => resolve(false));
  });
}

// Poll until the server is ready or timeout is reached.
async function waitForServer(timeoutMs = 30000, intervalMs = 500) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (await checkServerReady()) {
      return true;
    }
    await new Promise((r) => setTimeout(r, intervalMs));
  }
  return false;
}

(async () => {
  const inUse = await checkDebugPort(DEBUG_PORT);
  if (inUse) {
    console.log(
      `Port ${DEBUG_PORT} is already in use. Assuming Next.js is already running.`
    );
    process.exit(0);
  } else {
    console.log(
      `Port ${DEBUG_PORT} is free. Starting Next.js in debug mode...`
    );
    // Spawn Next.js in debug mode.
    const proc = spawn("next", ["dev"], {
      env: { ...process.env, NODE_OPTIONS: `--inspect=${DEBUG_PORT}` },
      stdio: "inherit",
      shell: true,
      detached: true, // Detach so the child keeps running after this script exits.
    });
    proc.unref(); // Allow the parent to exit independently.

    // Wait for the server to respond on the defined URL.
    const ready = await waitForServer();
    if (ready) {
      console.log("ready - started server");
      // Exit this script to signal that the preLaunchTask is complete.
      process.exit(0);
    } else {
      console.error("Server did not become ready within the timeout period.");
      process.exit(1);
    }
  }
})();
