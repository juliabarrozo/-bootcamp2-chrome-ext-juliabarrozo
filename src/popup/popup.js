const textarea = document.getElementById('note');
const saveBtn = document.getElementById('save');
const status = document.getElementById('status');

// Carregar nota ao abrir
chrome.storage.local.get(['note'], (result) => {
  if (result.note) {
    textarea.value = result.note;
  }
});

// Salvar nota
saveBtn.addEventListener('click', () => {
  const content = textarea.value;

  chrome.storage.local.set({ note: content }, () => {
    status.textContent = 'Salvo!';
    setTimeout(() => (status.textContent = ''), 1500);
  });
});
