import { execSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const envPath = join(root, ".env.local");

function loadProjectId() {
  if (!existsSync(envPath)) {
    console.error("\n❌ .env.local não encontrado.\n");
    process.exit(1);
  }

  for (const line of readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (trimmed.startsWith("NEXT_PUBLIC_SANITY_PROJECT_ID=")) {
      return trimmed.slice("NEXT_PUBLIC_SANITY_PROJECT_ID=".length).trim();
    }
  }

  console.error("\n❌ NEXT_PUBLIC_SANITY_PROJECT_ID não encontrado no .env.local\n");
  process.exit(1);
}

const productionUrl = process.argv[2];

if (!productionUrl) {
  console.log(`
Uso: npm run sanity:cors:prod -- https://seu-dominio.vercel.app

Adiciona a URL de produção no CORS do Sanity (com credenciais, para o /studio).
`);
  process.exit(1);
}

let origin;
try {
  origin = new URL(productionUrl).origin;
} catch {
  console.error("\n❌ URL inválida. Exemplo: https://reviewsmix.vercel.app\n");
  process.exit(1);
}

const projectId = loadProjectId();

console.log(`\n🌐 CORS de produção`);
console.log(`   Origin:  ${origin}`);
console.log(`   Project: ${projectId}\n`);

execSync(`npx sanity cors add ${origin} --credentials -p ${projectId}`, {
  stdio: "inherit",
  cwd: root,
  shell: true,
});

console.log("\n✅ CORS de produção adicionado!");
console.log("   Atualize NEXT_PUBLIC_SITE_URL na Vercel com a mesma URL.\n");
