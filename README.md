# 🧠 Bootcamp Helper

Extensão de anotações para Google Chrome (Manifest V3), desenvolvida no Bootcamp II.

---

## 🔧 Funcionalidades

* Permite que o usuário escreva anotações
* Salva elas localmente no **Chrome Storage**
* Interface simples e intuitiva no popup
* Feedback visual ao salvar as anotações

---

## 📦 Instalação manual (sem Docker)

1. Baixe o repositório ou [versão compactada aqui](https://github.com/<usuario>/<repo>/releases).
2. Vá para `chrome://extensions` no Google Chrome.
3. Ative o **Modo do desenvolvedor**.
4. Clique em **“Carregar sem compactação”** e selecione a pasta da extensão.

---

## 🗜️ Gerar ZIP da extensão

Caso queira distribuir a extensão como arquivo `.zip`:

### Com npm (recomendado)

Se houver um script configurado no `package.json`:

```bash
npm run zip
```

O arquivo ZIP será gerado na pasta definida pelo script, normalmente `./dist/my-chrome-extension.zip`.

### Manualmente

**No Windows (PowerShell):**
```powershell
Compress-Archive -Path * -DestinationPath ../my-chrome-extension.zip
```

**No Linux/macOS:**
```bash
zip -r ../my-chrome-extension.zip *
```

💡 Certifique-se de que o **manifest.json** está na raiz do ZIP.

---

## 🧩 Estrutura

```
my-chrome-extension/
├─ src/
│  ├─ popup/
│  │  ├─ popup.html
│  │  ├─ popup.js
│  │  └─ popup.css
│  ├─ background/
│  │  └─ service-worker.js
│  ├─ content/
│  │  └─ content.js
│  ├─ assets/
│  │  └─ logo.svg
│  └─ styles/
│     └─ global.css
├─ icons/
│  ├─ icon16.png
│  ├─ icon32.png
│  ├─ icon48.png
│  └─ icon128.png
├─ docs/
│  └─ index.html
├─ manifest.json
├─ Dockerfile
├─ docker-compose.yml
├─ scripts/
│  ├─ build-extension.mjs
│  └─ zip-extension.mjs
├─ tests/
│  └─ e2e/
└─ README.md
```

---

## 🐳 Executando com Docker

Este projeto possui um ambiente Docker configurado para **build e testes automáticos** com **Playwright**.

### 🧰 Pré-requisitos

* **Docker Desktop** instalado e em execução
* **WSL 2** habilitado (no Windows)

### ▶️ Rodar o container e executar os testes

```bash
docker compose up --build
```

O Docker fará:

1. Build da imagem com base em `mcr.microsoft.com/playwright:v1.46.0-jammy`
2. Instalação das dependências (`npm install`)
3. Instalação dos navegadores do Playwright (`npx playwright install --with-deps chromium`)
4. Build da extensão (`node scripts/build-extension.mjs`)
5. Execução automática dos testes E2E via:

   ```bash
   npm run test:e2e
   ```

Durante a execução, o terminal exibirá o log dos testes.

---

### 🧪 Rodar novamente sem reconstruir

```bash
docker compose up
```

Parar a execução:

```bash
CTRL + C
```

Remover containers e rede:

```bash
docker compose down
```

---

### 🧱 Comandos úteis

| Ação                                   | Comando                         |
| -------------------------------------- | ------------------------------- |
| Construir imagem                       | `docker compose build`          |
| Subir container (reconstruindo imagem) | `docker compose up --build`     |
| Parar containers                       | `docker compose down`           |
| Ver logs                               | `docker logs nome_do_container` |
| Ver containers ativos                  | `docker ps`                     |

---

## 🎭 Testes End-to-End (Playwright)

### 🔹 Dentro do container

```bash
docker exec -it nome_do_container bash
npx playwright test
npx playwright show-report   # abrir relatório HTML
```

### 🔹 Localmente

```bash
npm install
npx playwright install       # instala navegadores
npx playwright test
npx playwright show-report   # abrir relatório HTML
```

💡 Dica: os testes E2E ficam em `tests/e2e/`.

---

## ⚙️ Uso da extensão

* Clique no ícone da extensão na barra do Chrome
* Digite sua anotação no campo de texto
* Clique em **Salvar** para armazenar localmente
* A anotação será carregada automaticamente ao reabrir o popup

---

## 📝 Licença

Este projeto está licenciado sob a **MIT License**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
