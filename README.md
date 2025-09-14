# Bootcamp Helper

Extensão de anotações para Google Chrome (Manifest V3), desenvolvida no Bootcamp II.

## 🔧 Funcionalidades

- Permite que o usuário escreva anotações
- Salva elas localmente no chrome storage
- Interface simples e intuitiva no popup
- Feedback visual ao salvar as anotações

## 📦 Instalação

1. Baixe o repositório ou [versão compactada aqui](https://github.com/<usuario>/<repo>/releases).
2. Vá para `chrome://extensions`.
3. Ative o **Modo do desenvolvedor**.
4. Clique em **"Carregar sem compactação"** e selecione a pasta da extensão.

## 🧩 Estrutura
my-chrome-extension/  
├─ src/  
│ ├─ popup/  
│ │ ├─ popup.html # Interface do popup da extensão  
│ │ ├─ popup.js # Lógica do popup (salvar/carregar notas)  
│ │ └─ popup.css # Estilos do popup  
│ ├─ background/  
│ │ └─ service-worker.js # Service worker para background (eventos)  
│ ├─ content/  
│ │ └─ content.js # (Opcional) Script de conteúdo para manipular   páginas
│ ├─ assets/  
│ │ └─ logo.svg # Logo da extensão 
│ └─ styles/  
│ └─ global.css # Estilos globais  
├─ icons/  
│ ├─ icon16.png # Ícone 16x16 px  
│ ├─ icon32.png # Ícone 32x32 px  
│ ├─ icon48.png # Ícone 48x48 px  
│ └─ icon128.png # Ícone 128x128 px  
├─ docs/  
│ └─ index.html # Página para GitHub Pages  
├─ manifest.json # Manifesto da extensão  
├─ README.md # Este arquivo  
└─ LICENSE # Licença do projeto  


## ⚙️ Uso

- Clique no ícone da extensão na barra do Chrome.
- Digite sua anotação no campo de texto.
- Clique em **Salvar** para armazenar a anotação localmente.
- A anotação será carregada automaticamente quando você abrir o popup novamente.

## 📝 Licença

Este projeto está licenciado sob a licença MIT — veja o arquivo [LICENSE](LICENSE) para detalhes.

