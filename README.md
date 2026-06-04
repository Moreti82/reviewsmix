# ReviewsMix — Blog de reviews

Blog de reviews com análises, prós, contras, notas editoriais e vereditos.

## Stack

- Next.js 16 (App Router)
- Sanity CMS (`/studio`)
- Tailwind CSS 4 + shadcn/ui

## Começar

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra [http://localhost:3002](http://localhost:3002).

Sem variáveis do Sanity, o site usa **dados de demonstração** (mock).

## Conectar o Sanity CMS

Você já está logado no CLI (`engmoreti@gmail.com`). Falta criar o projeto e ligar ao site.

### Passo a passo

1. **Crie o projeto** em [sanity.io/manage](https://www.sanity.io/manage) → **Create project** → nome: `ReviewsMix` → dataset: `production`

2. **Copie o Project ID** (ex.: `abc123xy`) e cole em `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=seu_project_id_aqui
```

3. **Conecte e importe conteúdo de exemplo**:

```bash
npm run sanity:connect
```

Esse comando configura CORS para `localhost:3002` e importa reviews de exemplo.

4. **Verifique a conexão**:

```bash
npm run sanity:check
```

5. **Inicie o site e o CMS**:

```bash
npm run dev
```

- Site: [http://localhost:3002](http://localhost:3002)
- CMS: [http://localhost:3002/studio](http://localhost:3002/studio)

### Scripts Sanity

| Comando | Função |
|---------|--------|
| `npm run sanity:connect` | CORS + importar seed |
| `npm run sanity:check` | Testar conexão com a API |
| `npm run sanity` | Studio standalone (porta 3333) |
| `npm run sanity:deploy` | Publicar Studio na nuvem Sanity |

### Tipos de conteúdo no CMS

- **Review / Artigo**

Publique e organize os reviews diretamente no CMS.

---

## Rotas

| Rota | Descrição |
|------|-----------|
| `/` | Home com destaques |
| `/blog` | Lista de reviews |
| `/blog/[slug]` | Review completo |
| `/busca` | Busca de reviews |
| `/sobre` | Sobre + política editorial |
| `/studio` | Painel Sanity |

## SEO

- `app/sitemap.ts` — sitemap dinâmico com todas as rotas
- `app/robots.ts` — bloqueia `/studio` para crawlers
- JSON-LD em reviews e site (SearchAction)
- Open Graph com imagens do Sanity quando disponíveis

## Atalhos

- **Ctrl+K** ou **⌘K** — abrir busca na navbar

## Deploy na Vercel (via GitHub)

### 1. Enviar o código para o GitHub

Na pasta do projeto:

```bash
git add .
git commit -m "feat: ReviewsMix com Sanity CMS"
git branch -M main
gh repo create reviewsmix --public --source=. --remote=origin --push
```

Se o repositório já existir no GitHub, use:

```bash
git remote add origin https://github.com/SEU_USUARIO/reviewsmix.git
git push -u origin main
```

### 2. Importar na Vercel

1. Acesse [vercel.com/new](https://vercel.com/new)
2. **Import Git Repository** → escolha o repo `reviewsmix`
3. Framework: **Next.js** (detectado automaticamente)
4. Em **Environment Variables**, adicione:

| Variável | Valor |
|----------|--------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `tn8nblib` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-01-01` |
| `NEXT_PUBLIC_SITE_URL` | `https://SEU-PROJETO.vercel.app` |

5. Clique em **Deploy**

> Use a URL final da Vercel em `NEXT_PUBLIC_SITE_URL` (ex.: `https://reviewsmix.vercel.app`). Se ainda não souber, faça o primeiro deploy e depois atualize a variável e redeploy.

### 3. CORS do Sanity para produção

Depois do deploy, libere a URL da Vercel no Sanity:

```bash
npm run sanity:cors:prod -- https://SEU-PROJETO.vercel.app
```

Isso permite o **Studio** (`/studio`) funcionar em produção.

### 4. Conferir

- Site: `https://SEU-PROJETO.vercel.app`
- CMS: `https://SEU-PROJETO.vercel.app/studio`
- Sitemap: `https://SEU-PROJETO.vercel.app/sitemap.xml`

### Domínio próprio (opcional)

Na Vercel: **Settings → Domains** → adicione seu domínio.  
Depois atualize `NEXT_PUBLIC_SITE_URL` e rode `sanity:cors:prod` com o domínio novo.

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run sanity` — Studio Sanity (porta separada)
