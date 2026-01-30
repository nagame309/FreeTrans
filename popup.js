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

  const LANGUAGES = {
    'zh-TW': '繁體中文',
    'zh-CN': '簡體中文',
    'en': 'English',
    'ja': '日本語',
    'ko': '한국어',
    'fr': 'Français',
    'de': 'Deutsch',
    'es': 'Español',
    'it': 'Italiano',
    'ru': 'Русский',
    'pt': 'Português',
    'nl': 'Nederlands',
    'pl': 'Polski',
    'vi': 'Tiếng Việt',
    'th': 'ไทย',
    'id': 'Bahasa Indonesia',
    'tr': 'Türkçe',
    'ar': 'العربية'
  };

  function populateLanguages(lang) {
    const t = translations[lang] || translations['zh-TW'];
    
    // Clear existing
    sourceLangSelect.innerHTML = `<option value="auto">${t.autoDetect}</option>`;
    targetLangSelect.innerHTML = '';

    Object.entries(LANGUAGES).forEach(([code, name]) => {
      const sourceOpt = document.createElement('option');
      sourceOpt.value = code;
      sourceOpt.textContent = name;
      sourceLangSelect.appendChild(sourceOpt);

      const targetOpt = document.createElement('option');
      targetOpt.value = code;
      targetOpt.textContent = name;
      targetLangSelect.appendChild(targetOpt);
    });
  }

  // Load settings
  chrome.storage.sync.get({
    sourceLang: 'auto',
    targetLang: 'zh-TW',
    autoTranslate: true,
    service: 'google',
    theme: null,
    uiLanguage: 'zh-TW'
  }, (items) => {
    // Populate dropdowns first
    populateLanguages(items.uiLanguage);

    // Set values
    sourceLangSelect.value = items.sourceLang;
    targetLangSelect.value = items.targetLang;
    autoTranslateCheck.checked = items.autoTranslate;
    serviceSelect.value = items.service;
    
    // Apply Theme (If no theme saved, detect system)
    const activeTheme = items.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    applyTheme(activeTheme);

    // Apply Language
    updateLanguage(items.uiLanguage);

    // Initial Button State
    toggleSaveButton(items.autoTranslate);
  });

  // Listen for storage changes to sync theme in real-time
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync') {
      if (changes.theme) applyTheme(changes.theme.newValue);
      if (changes.uiLanguage) {
        populateLanguages(changes.uiLanguage.newValue);
        updateLanguage(changes.uiLanguage.newValue);
        // Re-apply values after re-populating
        chrome.storage.sync.get(['sourceLang', 'targetLang'], (items) => {
            sourceLangSelect.value = items.sourceLang;
            targetLangSelect.value = items.targetLang;
        });
      }
    }
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