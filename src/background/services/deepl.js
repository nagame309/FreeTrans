
export async function translateWithDeepL(text, sourceLang, targetLang) {
  const config = await new Promise((resolve) => {
    chrome.storage.local.get({
      deeplApiKey: '',
      deeplPlan: 'free'
    }, resolve);
  });

  if (!config.deeplApiKey) {
    throw new Error('請在詳細設定中配置 DeepL API Key');
  }

  const baseUrl = config.deeplPlan === 'pro' 
    ? 'https://api.deepl.com/v2/translate' 
    : 'https://api-free.deepl.com/v2/translate';

  // DeepL language code mapping (DeepL uses ISO 639-1)
  const langMap = {
    'zh-TW': 'ZH-HANT',
    'zh-CN': 'ZH-HANS',
    'en': 'EN-US', // Defaulting to US English
    'auto': null
  };

  const target = langMap[targetLang] || targetLang.toUpperCase();
  const source = langMap[sourceLang] || (sourceLang !== 'auto' ? sourceLang.toUpperCase() : null);

  const body = new URLSearchParams();
  body.append('text', text);
  body.append('target_lang', target);
  if (source) {
    body.append('source_lang', source);
  }

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Authorization': `DeepL-Auth-Key ${config.deeplApiKey}`,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: body
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 403) throw new Error('DeepL API Key 無效或方案錯誤 (403)');
      if (response.status === 456) throw new Error('DeepL 配額已耗盡 (456)');
      throw new Error(errorData.message || `DeepL API Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.translations && data.translations.length > 0) {
      return {
        translation: data.translations[0].text,
        sourceLang: data.translations[0].detected_source_language.toLowerCase()
      };
    } else {
      throw new Error('DeepL 回傳格式不符');
    }
  } catch (error) {
    console.error('DeepL Translation Error:', error);
    throw error;
  }
}
