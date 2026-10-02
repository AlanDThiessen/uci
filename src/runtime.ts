type Runtime = 'nodejs' | 'tauri' | 'none';

function detectRuntime(): Runtime {
  let runtime: Runtime = 'none';
  const environment = globalThis as {
    window?: {
      __TAURI_INTERNALS__?: unknown; // Tauri v2
    };
    process?: {
      release?: { name?: string };
      versions?: { node?: string; bun?: string };
    };
  };

  if (environment.window?.__TAURI_INTERNALS__ !== undefined) {
    runtime = 'tauri';
  } else if (
    environment.process?.release?.name === 'node' &&
    typeof environment.process.versions?.node === 'string' &&
    !environment.process.versions.bun
  ) {
    runtime = 'nodejs';
  }

  return runtime;
}

export type { Runtime };
export default detectRuntime;
