import { test, expect, chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// ===== Helpers para ES Modules =====
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Caminho da extensão
const dist = path.resolve(__dirname, '..', 'dist');

let context;
let extensionId;

// ===== Espera o service worker da extensão estar ativo =====
async function waitForServiceWorker(context, timeout = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    const sws = context.serviceWorkers();
    if (sws.length > 0) return sws[0];
    await new Promise(r => setTimeout(r, 100));
  }
  throw new Error('Service worker não encontrado após timeout');
}

// ===== Antes de todos os testes =====
test.beforeAll(async () => {
  // Lança Chrome com extensão carregada
  context = await chromium.launchPersistentContext('', {
    headless: true,
    args: [
      `--disable-extensions-except=${dist}`,
      `--load-extension=${dist}`,
    ],
  });

  // Espera service worker aparecer
  const sw = await waitForServiceWorker(context);
  extensionId = sw.url().split('/')[2];
  console.log('Extension ID real:', extensionId);
});

// ===== Depois de todos os testes =====
test.afterAll(async () => {
  await context.close();
});

// ===== Testes =====
test('salva anotação no popup', async () => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/src/popup/popup.html`, {
    waitUntil: 'load',
    timeout: 60000,
  });

  // Digita uma anotação e salva
  await page.fill('#input-note', 'Teste Playwright');
  await page.click('#btn-save');

  // Verifica se a anotação aparece na lista
  const text = await page.textContent('#notes-list');
  expect(text).toContain('Teste Playwright');
});

test('persiste anotação após reload', async () => {
  const page = await context.newPage();
  await page.goto(`chrome-extension://${extensionId}/src/popup/popup.html`, {
    waitUntil: 'load',
    timeout: 60000,
  });

  // Verifica se a anotação anterior persiste
  const text = await page.textContent('#notes-list');
  expect(text).toContain('Teste Playwright');
});
