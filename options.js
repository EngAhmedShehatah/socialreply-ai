const saveOptions = () => {
  const apiKey = document.getElementById('apiKey').value.trim();
  chrome.storage.sync.set({ apiKey }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(() => {
      status.textContent = '';
    }, 1000);
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get('apiKey', (items) => {
    document.getElementById('apiKey').value = items.apiKey || '';
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
