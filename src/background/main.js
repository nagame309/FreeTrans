import { translateWithGoogle } from './services/google.js';
import { translateWithOpenAI } from './services/openai.js';
import { translateWithBing } from './services/bing.js';

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'TRANSLATE') {
    handleTranslation(request)
      .then(result => sendResponse({ success: true, data: result }))
      .catch(error => sendResponse({ success: false, error: error.message }));
    return true; // Keep channel open for async response
  }
});

async function handleTranslation(request) {
  const { text, sourceLang, targetLang, service, settings } = request;
  
  // Default to Google if no service specified
  const serviceType = service || 'google';

  switch (serviceType) {
    case 'google':
      return await translateWithGoogle(text, sourceLang, targetLang);
    case 'openai':
      return await translateWithOpenAI(text, sourceLang, targetLang, settings);
    case 'bing':
      return await translateWithBing(text, sourceLang, targetLang);
    default:
      throw new Error(`Unknown service: ${serviceType}`);
  }
}
