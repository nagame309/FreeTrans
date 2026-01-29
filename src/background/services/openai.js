export async function translateWithOpenAI(text, sourceLang, targetLang, manualConfig = null) {
  // 1. Determine configuration (Manual override > Local Storage > Default)
  let config = manualConfig;
  
  if (!config) {
    config = await new Promise((resolve) => {
      chrome.storage.local.get({
        openaiApiKey: '',
        openaiBaseUrl: 'https://api.openai.com/v1',
        openaiModel: 'gpt-3.5-turbo',
        openaiTemperature: 0,
        openaiUserPrompt: 'Translate to {{to}} (output translation only):\n\n{{text}}',
        openaiPrompt: ''
      }, resolve);
    });
  }

  const apiKey = config.openaiApiKey;
  if (!apiKey) {
    console.warn('[OpenAI] No API Key provided. This might only work for local services like Ollama.');
  }

  let baseUrl = config.openaiBaseUrl || 'https://api.openai.com/v1';
  baseUrl = baseUrl.trim();
  
  // Use the URL as provided. 
  // If it doesn't contain 'completions', we append the standard path for convenience.
  // Otherwise, we assume the user knows what they are doing and provided the full endpoint.
  let url = baseUrl;
  if (!url.includes('/completions')) {
    url = url.replace(/\/$/, '') + '/chat/completions';
  }

  const model = config.openaiModel || 'gpt-3.5-turbo';
  const temperature = parseFloat(config.openaiTemperature) || 0;

  // Map language codes to names for the prompt
  const langMap = {
    'zh-TW': 'Traditional Chinese (Taiwan)',
    'zh-CN': 'Simplified Chinese',
    'en': 'English',
    'ja': 'Japanese',
    'ko': 'Korean',
    'auto': 'Target Language'
  };

  const targetLangName = langMap[targetLang] || targetLang;
  
  // System Prompt processing
  const defaultSystemPrompt = `You are a professional {{to}} native translator who needs to fluently translate text into {{to}}.

## Translation Rules
1. Output only the translated content, without explanations or additional content (such as "Here's the translation:" or "Translation as follows:")
2. The returned translation must maintain exactly the same number of paragraphs and format as the original text
3. If the text contains HTML tags, consider where the tags should be placed in the translation while maintaining fluency
4. For content that should not be translated (such as proper nouns, code, etc.), keep the original text.
5. If input contains %%, use %% in your output, if input has no %%, don't use %% in your output{{title_prompt}}{{summary_prompt}}{{terms_prompt}}

## OUTPUT FORMAT:
- **Single paragraph input** → Output translation directly (no separators, no extra text)
- **Multi-paragraph input** → Use %% as paragraph separator between translations`;

  let systemPrompt = config.openaiPrompt || defaultSystemPrompt;
  systemPrompt = systemPrompt.replace(/{{to}}/g, targetLangName);
  systemPrompt = systemPrompt.replace(/{{title_prompt}}|{{summary_prompt}}|{{terms_prompt}}/g, "");

  // Prepare input text
  let processedInput = text.trim();
  const hasParagraphs = processedInput.includes('\n');
  if (hasParagraphs) {
    const paragraphs = processedInput.split(/\n+/);
    if (paragraphs.length > 1) {
        processedInput = paragraphs.join('\n%%\n');
    }
  }

  // User Prompt processing
  let userMessageTemplate = config.openaiUserPrompt || 'Translate to {{to}} (output translation only):\n\n{{text}}';
  let userMessage = userMessageTemplate
    .replace(/{{to}}/g, targetLangName)
    .replace(/{{text}}/g, processedInput);

  try {
    const headers = {
      'Content-Type': 'application/json'
    };

    // Only add Authorization if apiKey is provided
    if (apiKey) {
      headers['Authorization'] = `Bearer ${apiKey}`;
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      mode: 'cors',
      credentials: 'omit',
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: temperature
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      if (response.status === 401) throw new Error('API Key 無效 (401)');
      if (response.status === 404) throw new Error(`路徑錯誤 (404) - 請檢查 Base URL 是否需要加上 /v1\n請求網址: ${url}`);
      throw new Error(errorData.error?.message || `API Error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      let result = data.choices[0].message.content.trim();
      
      if (hasParagraphs && result.includes('%%')) {
          result = result.split(/%%/).map(p => p.trim()).join('\n\n');
      }

      return {
        translation: result,
        sourceLang: sourceLang
      };
    } else {
      throw new Error('無效的回應格式');
    }

  } catch (error) {
    console.error('OpenAI Error:', error);
    throw error;
  }
}