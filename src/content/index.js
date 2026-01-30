// Main Content Script

const TranslationTooltip = window.FreeTrans.Tooltip;
const { isPureChinese, getLanguageTag, escapeHtml } = window.FreeTrans.Utils;

class TranslationManager {
  constructor() {
    this.tooltip = new TranslationTooltip();
    this.selectedText = '';
    this.settings = {
      sourceLang: 'auto',
      targetLang: 'zh-TW',
      autoTranslate: true,
      service: 'google'
    };
    this.translationTimeout = null;
    this.init();
  }

  init() {
    this.loadSettings();

    // Event Listeners
    document.addEventListener('mouseup', this.handleMouseUp.bind(this));
    document.addEventListener('mousedown', this.handleMouseDown.bind(this));
    
    // Scroll handling (passive)
    const scrollOpts = { passive: true, capture: true };
    window.addEventListener('scroll', this.handleScroll.bind(this), scrollOpts);
    document.addEventListener('scroll', this.handleScroll.bind(this), scrollOpts);
    window.addEventListener('wheel', this.handleScroll.bind(this), { passive: true });

    // Storage listener
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener((changes, namespace) => {
        if (namespace === 'sync') this.loadSettings();
      });
    }
  }

  async loadSettings() {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.sync) {
      const result = await chrome.storage.sync.get(null); // Get all
      // Merge defaults
      this.settings = {
        sourceLang: 'auto',
        targetLang: 'zh-TW',
        autoTranslate: true,
        service: 'google',
        theme: null,
        uiLanguage: 'zh-TW',
        ...result
      };
      
      // Apply theme (If null, detect system)
      const activeTheme = this.settings.theme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', activeTheme);
      
      // Apply Language to Tooltip
      if (this.tooltip && this.tooltip.setLanguage) {
        this.tooltip.setLanguage(this.settings.uiLanguage);
      }
    }
  }

  handleMouseDown(e) {
    if (this.tooltip.element && !this.tooltip.element.contains(e.target)) {
      this.tooltip.hide();
    }
  }

  handleScroll() {
    if (this.tooltip.element) {
      this.tooltip.hide();
    }
  }

  handleMouseUp(e) {
    if (this.translationTimeout) clearTimeout(this.translationTimeout);

    // Only translate if Alt key is pressed
    if (!e.altKey) return;

    this.translationTimeout = setTimeout(async () => {
      const selection = window.getSelection();
      const text = selection.toString().trim();

      if (this.shouldTranslate(text)) {
        try {
          const range = selection.getRangeAt(0);
          const rect = range.getBoundingClientRect();

          if (text !== this.selectedText) {
            this.selectedText = text;
            await this.performTranslation(text, rect);
          }
        } catch (err) {
          console.error('Selection Error:', err);
        }
      }
    }, 150);
  }

  shouldTranslate(text) {
    if (!text || text.length < 3) return false;
    if (!this.settings.autoTranslate) return false;
    if (isPureChinese(text)) return false;
    return true;
  }

  async performTranslation(text, rect) {
    // Show Loading
    this.tooltip.showLoading(rect, text.length);

    try {
      const response = await this.requestTranslation(text);
      
      const langTag = getLanguageTag(response.sourceLang, this.settings.targetLang);
      const content = `
        <div class="translation-language-tag">${langTag}</div>
        <div class="translation-content">${escapeHtml(response.translation)}</div>
      `;
      
      this.tooltip.showResult(content, rect);
    } catch (error) {
      this.tooltip.showError(error.message, rect);
    }
  }

  async requestTranslation(text) {
    return new Promise((resolve, reject) => {
      chrome.runtime.sendMessage({
        type: 'TRANSLATE',
        text: text,
        sourceLang: this.settings.sourceLang,
        targetLang: this.settings.targetLang,
        service: this.settings.service
      }, (response) => {
        if (chrome.runtime.lastError) {
          reject(new Error(chrome.runtime.lastError.message));
        } else if (response && response.success) {
          resolve(response.data);
        } else {
          reject(new Error(response ? response.error : 'Unknown error'));
        }
      });
    });
  }
}

// Initialize
new TranslationManager();
