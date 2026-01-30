// Options page script

// i18n Dictionary
const translations = {
  'zh-TW': {
    title: '浮譯',
    general: '一般設定',
    uiLang: '介面語言',
    langHint: '設定將自動儲存並套用至全域介面。',
    aiSettings: 'AI 翻譯設定',
    aiCompatibilityHint: '支援 OpenAI 官方 API 及所有相容其格式的第三方 AI 服務（如：DeepSeek, OpenRouter, Ollama, Local AI 等）。',
    apiKey: 'API Key',
    keyHint: '您的金鑰僅會儲存在本機瀏覽器中，不會上傳至任何伺服器。',
    baseUrl: 'Base URL',
    urlHint: '預設為 OpenAI 官方節點。如使用轉發服務或 Local AI，請填入完整 URL。',
    model: 'Model',
    advancedSettings: '進階',
    tempLabel: 'Temperature',
    userPromptLabel: 'User Prompt',
    sysPrompt: 'System Prompt',
    saveGeneral: '儲存一般設定',
    testAI: '測試連線',
    saveAI: '儲存 AI 翻譯設定',
    saved: '設定已儲存 ✓',
    testSuccess: '連線成功！(Hello → 你好)',
    testFail: '連線失敗: ',
    aboutTitle: '關於與支持',
    aboutDesc: '浮譯 (FreeTrans) 是一款追求極致簡約與美感的劃詞翻譯工具。',
    aboutCredits: 'Made with ❤️ by nagame309 & Gemini CLI',
    supportText: '如果這個專案對你有幫助，歡迎請我喝杯咖啡！',
    donateBtn: '贊助支持'
  },
  'en': {
    title: 'FreeTrans',
    general: 'General Settings',
    uiLang: 'Interface Language',
    langHint: 'Settings are automatically saved and applied globally.',
    aiSettings: 'AI Translation Settings',
    aiCompatibilityHint: 'Supports OpenAI official API and all third-party AI services compatible with its format (e.g., DeepSeek, OpenRouter, Ollama, Local AI, etc.).',
    apiKey: 'API Key',
    keyHint: 'Your key is stored locally in your browser and never uploaded to any server.',
    baseUrl: 'Base URL',
    urlHint: 'Default is OpenAI official. Fill full URL for proxy or Local AI.',
    model: 'Model',
    advancedSettings: 'Advanced',
    tempLabel: 'Temperature',
    userPromptLabel: 'User Prompt',
    sysPrompt: 'System Prompt',
    saveGeneral: 'Save General Settings',
    testAI: 'Test Connection',
    saveAI: 'Save AI Settings',
    saved: 'Settings Saved ✓',
    testSuccess: 'Success! (Hello → 你好)',
    testFail: 'Failed: ',
    aboutTitle: 'About & Support',
    aboutDesc: 'FreeTrans is a select-to-translate tool focused on simplicity and aesthetics.',
    aboutCredits: 'Made with ❤️ by nagame309 & Gemini CLI',
    supportText: 'If this project helps you, consider buying me a coffee!',
    donateBtn: 'Donate'
  }
};

const DEFAULT_SYS_PROMPT = `You are a professional {{to}} native translator who needs to fluently translate text into {{to}}. 

## Translation Rules
1. Output only the translated content, without explanations or additional content (such as "Here's the translation:" or "Translation as follows:")
2. The returned translation must maintain exactly the same number of paragraphs and format as the original text
3. If the text contains HTML tags, consider where the tags should be placed in the translation while maintaining fluency
4. For content that should not be translated (such as proper nouns, code, etc.), keep the original text.
5. If input contains %%, use %% in your output, if input has no %%, don't use %% in your output{{title_prompt}}{{summary_prompt}}{{terms_prompt}}

## OUTPUT FORMAT:
- **Single paragraph input** → Output translation directly (no separators, no extra text)
- **Multi-paragraph input** → Use %% as paragraph separator between translations`;

const DEFAULT_USER_PROMPT = 'Translate to {{to}} (output translation only):\n\n{{text}}';

document.addEventListener('DOMContentLoaded', () => {
  const uiLanguageSelect = document.getElementById('ui-language');
  
  const apiKeyInput = document.getElementById('openai-api-key');
  const baseUrlInput = document.getElementById('openai-base-url');
  const modelInput = document.getElementById('openai-model');
  const tempInput = document.getElementById('openai-temperature');
  const userPromptInput = document.getElementById('openai-user-prompt');
  const promptInput = document.getElementById('openai-prompt');
  
  const deeplApiKeyInput = document.getElementById('deepl-api-key');
  const deeplPlanSelect = document.getElementById('deepl-plan');
  
  const saveAiBtn = document.getElementById('save-ai-btn');
  const testAiBtn = document.getElementById('test-ai-btn');
  const testStatus = document.getElementById('test-status');
  const saveDeeplBtn = document.getElementById('save-deepl-btn');
  
  const toggleApiKeyBtn = document.getElementById('toggle-api-key');
  const toggleDeeplKeyBtn = document.getElementById('toggle-deepl-key');

  const toast = document.getElementById('toast');
  const themeToggleBtn = document.getElementById('theme-toggle');
  const sunIcon = themeToggleBtn.querySelector('.sun-icon');
  const moonIcon = themeToggleBtn.querySelector('.moon-icon');

  // Load settings
  loadSettings();

  // Set Default Placeholders
  tempInput.placeholder = "0";
  userPromptInput.placeholder = DEFAULT_USER_PROMPT;
  promptInput.placeholder = DEFAULT_SYS_PROMPT;

  // Language Change Listener
  uiLanguageSelect.addEventListener('change', () => {
    const newLang = uiLanguageSelect.value;
    updateLanguage(newLang);
    chrome.storage.sync.set({ uiLanguage: newLang }, () => {
      showToast();
    });
  });

  // Theme Toggle Logic
  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const newTheme = isDark ? 'light' : 'dark';
    applyTheme(newTheme);
    chrome.storage.sync.set({ theme: newTheme });
  });

  // API Key Visibility Toggle
  function setupPasswordToggle(button, input) {
    const eyeIcon = button.querySelector('.eye-icon');
    const eyeOffIcon = button.querySelector('.eye-off-icon');
    
    button.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      
      if (isPassword) {
        eyeIcon.classList.add('hidden');
        eyeOffIcon.classList.remove('hidden');
      } else {
        eyeIcon.classList.remove('hidden');
        eyeOffIcon.classList.add('hidden');
      }
    });
  }

  setupPasswordToggle(toggleApiKeyBtn, apiKeyInput);
  setupPasswordToggle(toggleDeeplKeyBtn, deeplApiKeyInput);

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

  function updateLanguage(lang) {
    const t = translations[lang] || translations['zh-TW'];
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (t[key]) {
        el.innerText = t[key]; 
      }
    });
  }

  function loadSettings() {
    chrome.storage.local.get({
      openaiApiKey: '',
      openaiBaseUrl: '',
      openaiModel: 'gpt-3.5-turbo',
      openaiTemperature: 0,
      openaiUserPrompt: '',
      openaiPrompt: '',
      deeplApiKey: '',
      deeplPlan: 'free'
    }, (items) => {
      apiKeyInput.value = items.openaiApiKey;
      baseUrlInput.value = items.openaiBaseUrl;
      modelInput.value = items.openaiModel;
      tempInput.value = items.openaiTemperature;
      userPromptInput.value = items.openaiUserPrompt;
      promptInput.value = items.openaiPrompt;
      
      deeplApiKeyInput.value = items.deeplApiKey;
      deeplPlanSelect.value = items.deeplPlan;
    });

    chrome.storage.sync.get({
      theme: null,
      uiLanguage: 'zh-TW'
    }, (items) => {
      const activeTheme = items.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      applyTheme(activeTheme);
      const currentLang = items.uiLanguage || 'zh-TW';
      uiLanguageSelect.value = currentLang;
      updateLanguage(currentLang);
    });
  }

  // Listen for storage changes to sync theme in real-time
  chrome.storage.onChanged.addListener((changes, namespace) => {
    if (namespace === 'sync' && changes.theme) {
      applyTheme(changes.theme.newValue);
    }
  });

  // Helper to get current AI settings object from inputs
  function getCurrentAISettings() {
    return {
      openaiApiKey: apiKeyInput.value.trim(),
      openaiBaseUrl: baseUrlInput.value.trim(),
      openaiModel: modelInput.value.trim(),
      openaiTemperature: parseFloat(tempInput.value) || 0,
      openaiUserPrompt: userPromptInput.value.trim(),
      openaiPrompt: promptInput.value.trim()
    };
  }

  saveAiBtn.addEventListener('click', () => {
    const localSettings = getCurrentAISettings();
    chrome.storage.local.set(localSettings, () => {
      showToast();
    });
  });

  saveDeeplBtn.addEventListener('click', () => {
    chrome.storage.local.set({
      deeplApiKey: deeplApiKeyInput.value.trim(),
      deeplPlan: deeplPlanSelect.value
    }, () => {
      showToast();
    });
  });

  testAiBtn.addEventListener('click', () => {
    const currentSettings = getCurrentAISettings();
    
    testStatus.textContent = 'Testing...';
    testStatus.style.color = 'var(--ctp-text)';
    testAiBtn.disabled = true;

    // Send test request WITH current settings
    chrome.runtime.sendMessage({
        type: 'TRANSLATE',
        text: 'Hello',
        sourceLang: 'en',
        targetLang: 'zh-TW',
        service: 'openai',
        settings: currentSettings // Pass explicit settings
    }, (response) => {
        testAiBtn.disabled = false;
        
        // Handle response
        if (response && response.success) {
            // Success
            const currentLang = uiLanguageSelect.value;
            const t = translations[currentLang] || translations['zh-TW'];
            testStatus.textContent = t.testSuccess;
            testStatus.style.color = 'var(--ctp-green)';
        } else {
            // Error
            const currentLang = uiLanguageSelect.value;
            const t = translations[currentLang] || translations['zh-TW'];
            const errorMsg = response ? response.error : 'Unknown Error';
            testStatus.textContent = t.testFail + errorMsg;
            testStatus.style.color = 'var(--ctp-red)';
        }
    });
  });

  function showToast() {
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 2000);
  }
});