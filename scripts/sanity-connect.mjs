import { execSync } from "node:child_process";
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env.local");
const seedPath = join(root, "sanity", "seed", "seed.ndjson");

function loadEnv() {
  if (!existsSync(envPath)) {
    console.error("\n❌ Arquivo .env.local não encontrado.\n");
    console.log("1. Crie um projeto em https://www.sanity.io/manage");
    console.log("2. Copie o Project ID");
    console.log("3. Crie .env.local com:");
    console.log(`
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2025-01-01
`);
    process.exit(1);
  }

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

function run(cmd) {
  console.log(`\n→ ${cmd}\n`);
  execSync(cmd, { stdio: "inherit", cwd: root, shell: true });
}

const env = loadEnv();
const projectId = env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = env.NEXT_PUBLIC_SANITY_DATASET || "production";

if (!projectId) {
  console.error("\n❌ NEXT_PUBLIC_SANITY_PROJECT_ID está vazio no .env.local\n");
  process.exit(1);
}

console.log(`\n🔗 Conectando ReviewsMix ao Sanity`);
console.log(`   Project: ${projectId}`);
console.log(`   Dataset: ${dataset}`);

const corsOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
];

for (const origin of corsOrigins) {
  try {
    run(`npx sanity cors delete ${origin} -p ${projectId}`);
  } catch {
    // origin pode não existir ainda
  }

  try {
    run(`npx sanity cors add ${origin} --credentials -p ${projectId}`);
  } catch {
    console.log(`ℹ️  CORS ${origin} pode já existir — continuando...`);
  }
}

if (existsSync(seedPath)) {
  run(
    `npx sanity dataset import "${seedPath}" ${dataset} --replace -p ${projectId}`
  );
} else {
  console.warn("⚠️  Seed não encontrado, pulando importação.");
}

if (!env.NEXT_PUBLIC_SITE_URL) {
  const content = readFileSync(envPath, "utf8");
  if (!content.includes("NEXT_PUBLIC_SITE_URL")) {
    writeFileSync(
      envPath,
      `NEXT_PUBLIC_SITE_URL=http://localhost:3000\n${content}`,
      "utf8"
    );
  }
}

console.log("\n✅ Sanity conectado!");
console.log("   1. npm run dev");
console.log("   2. Abra http://localhost:3000/studio");
console.log("   3. Publique/edite conteúdo no CMS\n");
