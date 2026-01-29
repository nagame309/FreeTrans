// Popup Logic

const translations = {
  'zh-TW': {
    title: '浮譯',
    sourceLang: '來源語言',
    targetLang: '目標語言',
    autoTranslate: '啟用翻譯 (Alt + 選取)',
    service: '翻譯服務',
    save: '儲存設定',
    saved: '設定已儲存 ✓',
    autoDetect: '自動偵測'
  },
  'en': {
    title: 'FreeTrans',
    sourceLang: 'Source',
    targetLang: 'Target',
    autoTranslate: 'Enable (Alt + Select)',
    service: 'Service',
    save: 'Save',
    saved: 'Saved ✓',
    autoDetect: 'Auto Detect'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const sourceLangSelect = document.getElementById('source-lang');
  const targetLangSelect = document.getElementById('target-lang');
  const autoTranslateCheck = document.getElementById('auto-translate');
  const serviceSelect = document.getElementById('service-select');
  const saveBtn = document.getElementById('save-settings');
  const optionsBtn = document.getElementById('options-btn');
  const feedback = document.getElementById('save-feedback');
  
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = themeToggleBtn.querySelector('.sun-icon');
  const moonIcon = themeToggleBtn.querySelector('.moon-icon');

  // Load settings
  chrome.storage.sync.get({
    sourceLang: 'auto',
    targetLang: 'zh-TW',
    autoTranslate: true,
    service: 'google',
    theme: 'light',
    uiLanguage: 'zh-TW'
  }, (items) => {
    sourceLangSelect.value = items.sourceLang;
    targetLangSelect.value = items.targetLang;
    autoTranslateCheck.checked = items.autoTranslate;
    serviceSelect.value = items.service;
    
    // Apply Theme
    applyTheme(items.theme);

    // Apply Language
    updateLanguage(items.uiLanguage);

    // Initial Button State
    toggleSaveButton(items.autoTranslate);
  });

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (theme === 'dark') {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    } else {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    }
  }

  // Theme Toggle Logic
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    chrome.storage.sync.set({ theme: newTheme });
  });

  function toggleSaveButton(isEnabled) {
    saveBtn.disabled = !isEnabled;
  }

  // Auto-save toggle state and update button
  autoTranslateCheck.addEventListener('change', () => {
    const isChecked = autoTranslateCheck.checked;
    toggleSaveButton(isChecked);
    
    // Auto-save the toggle state immediately
    chrome.storage.sync.set({ autoTranslate: isChecked });
  });

  function updateLanguage(lang) {
    const t = translations[lang] || translations['zh-TW'];
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        // Only update text content to preserve potential structure
        el.textContent = t[key];
      }
    });

    // Update the 'Auto Detect' option text specifically
    const autoOption = sourceLangSelect.querySelector('option[value="auto"]');
    if (autoOption) autoOption.textContent = t.autoDetect;
  }

  // Save Settings
  saveBtn.addEventListener('click', () => {
    chrome.storage.sync.set({
      sourceLang: sourceLangSelect.value,
      targetLang: targetLangSelect.value,
      autoTranslate: autoTranslateCheck.checked,
      service: serviceSelect.value
    }, () => {
      // Show feedback
      feedback.style.opacity = '1';
      feedback.style.animation = 'none';
      feedback.offsetHeight; /* trigger reflow */
      feedback.style.animation = 'saveFeedback 1.2s ease forwards';
    });
  });

  // Open Options Page
  optionsBtn.addEventListener('click', () => {
    chrome.runtime.openOptionsPage();
  });
});