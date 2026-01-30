// Text processing utilities
window.FreeTrans = window.FreeTrans || {};
window.FreeTrans.Utils = {};

/**
 * Check if text is pure Chinese (no English/numbers/other languages)
 * @param {string} text 
 * @returns {boolean}
 */
window.FreeTrans.Utils.isPureChinese = function(text) {
  // Remove all whitespace and punctuation
  const cleaned = text.replace(/[\s\p{P}]/gu, '');
  
  if (cleaned.length === 0) return false;
  
  // Check if text contains Chinese characters
  const chineseRegex = /[\u4e00-\u9fff\u3400-\u4dbf\uf900-\ufaff]/g;
  const chineseMatches = cleaned.match(chineseRegex);
  
  if (!chineseMatches) return false;
  
  // Calculate the ratio of Chinese characters
  const chineseRatio = chineseMatches.length / cleaned.length;
  
  // If more than 80% is Chinese and no English letters, consider it pure Chinese
  const hasEnglish = /[a-zA-Z]/.test(cleaned);
  
  return chineseRatio > 0.8 && !hasEnglish;
};

window.FreeTrans.Utils.LANGUAGES = {
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

/**
 * Format language tag for display
 */
window.FreeTrans.Utils.getLanguageTag = function(sourceLang, targetLang) {
  const langNames = {
    ...window.FreeTrans.Utils.LANGUAGES,
    'en': 'ENGLISH',
    'ja': 'JAPANESE',
    'ko': 'KOREAN',
    'fr': 'FRENCH',
    'de': 'GERMAN',
    'es': 'SPANISH',
    'it': 'ITALIAN',
    'ru': 'RUSSIAN',
    'pt': 'PORTUGUESE',
    'zh': '中文',
    'auto': 'DETECTING'
  };
  
  const source = langNames[sourceLang] || (sourceLang ? sourceLang.toUpperCase() : 'UNKNOWN');
  const target = langNames[targetLang] || (targetLang ? targetLang.toUpperCase() : '');
  
  return target ? `${source} → ${target}` : source;
};

/**
 * Escape HTML special characters
 */
window.FreeTrans.Utils.escapeHtml = function(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
};
