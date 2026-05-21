import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env.local");

function loadEnv() {
  if (!existsSync(envPath)) return {};
  const env = {};
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const i = trimmed.indexOf("=");
    if (i === -1) continue;
    env[trimmed.slice(0, i).trim()] = trimmed.slice(i + 1).trim();
  }
  return env;
}

const env = loadEnv();
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = env.NEXT_PUBLIC_SANITY_API_VERSION || "2025-01-01";

if (!projectId) {
  console.log("❌ NEXT_PUBLIC_SANITY_PROJECT_ID não configurado em .env.local");
  process.exit(1);
}

const query = encodeURIComponent('count(*[_type == "post"])');
const url = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${query}`;

const res = await fetch(url);
const json = await res.json();

if (!res.ok) {
  console.log("❌ Erro ao conectar:", json.error?.description || res.statusText);
  process.exit(1);
}

console.log("✅ Sanity conectado");
console.log(`   Project ID: ${projectId}`);
console.log(`   Dataset:    ${dataset}`);
console.log(`   Reviews:    ${json.result ?? 0} documento(s)`);
