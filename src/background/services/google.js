
export async function translateWithGoogle(text, sourceLang, targetLang) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`;
    
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data && data[0] && data[0][0] && data[0][0][0]) {
      // Extract detected source language if available
      const detectedLang = data[2] || sourceLang;
      return {
        translation: data[0][0][0],
        sourceLang: detectedLang
      };
    } else {
      throw new Error('無效的回應格式');
    }
  } catch (error) {
    console.error('Google Translation error:', error);
    if (error.message.includes('Failed to fetch')) {
      throw new Error('網路連線失敗');
    }
    throw error;
  }
}
