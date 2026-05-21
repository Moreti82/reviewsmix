import { existsSync, readFileSync } from "node:fs";
import { defineCliConfig } from "sanity/cli";

function readEnvLocal(key: string, fallback = "") {
  if (!existsSync(".env.local")) return process.env[key] ?? fallback;
  for (const line of readFileSync(".env.local", "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    const k = trimmed.slice(0, i).trim();
    if (k === key) return trimmed.slice(i + 1).trim();
  }
  return process.env[key] ?? fallback;
}

export default defineCliConfig({
  api: {
    projectId: readEnvLocal("NEXT_PUBLIC_SANITY_PROJECT_ID"),
    dataset: readEnvLocal("NEXT_PUBLIC_SANITY_DATASET", "production"),
  },
  studioHost: "reviewsmix",
});
