import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import archiver from 'archiver';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

// Limpa dist
fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(distDir, { recursive: true });

console.log('📦 Copiando arquivos da extensão...');

// Arquivos e pastas a copiar
const filesToCopy = ['manifest.json'];
const foldersToCopy = ['src', 'icons', 'background'];

// Copia arquivos
for (const file of filesToCopy) {
  const srcPath = path.join(rootDir, file);
  const destPath = path.join(distDir, file);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`✔ Copiado arquivo: ${file}`);
  } else {
    console.warn(`⚠️ Arquivo não encontrado: ${file}`);
  }
}

// Copia pastas
for (const folder of foldersToCopy) {
  const src = path.join(rootDir, folder);
  const dest = path.join(distDir, folder);
  if (fs.existsSync(src)) {
    fs.cpSync(src, dest, { recursive: true });
    console.log(`✔ Copiada pasta: ${folder}`);
  } else {
    console.warn(`⚠️ Pasta não encontrada: ${folder}`);
  }
}

// Cria zip da extensão
const output = fs.createWriteStream(path.join(rootDir, 'dist.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

archive.pipe(output);
archive.directory(distDir, false);
await archive.finalize();

console.log('✔️ Extensão construída em dist/ e empacotada em dist.zip');
