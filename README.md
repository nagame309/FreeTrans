# 🌐 浮譯 (Free Translate)

<div align="center">

**一個優雅、現代的 Chrome 翻譯擴充功能**

選取文字即可即時翻譯,配備精美的毛玻璃浮動視窗

[![Version](https://img.shields.io/badge/version-1.0-f38ba8.svg)](https://github.com/nagame309/free-translate)
[![License](https://img.shields.io/badge/license-MIT-94e2d5.svg)](LICENSE)

</div>

---

## ✨ 功能特色

### 🎯 核心功能
- **即時翻譯** - 選取文字後立即顯示翻譯結果
- **智能過濾** - 自動跳過純中文內容,避免不必要的翻譯
- **點擊複製** - 點擊翻譯內容即可複製到剪貼簿
- **多語言支援** - 支援英文、日文、韓文、法文、德文、西班牙文等多種語言
- **自動翻譯開關** - 可選擇開啟或關閉自動翻譯功能

### 🎨 精緻設計
- **毛玻璃效果** - 採用現代 Glassmorphism 設計風格
- **流暢動畫** - 淡入淡出與縮放動畫,提供絕佳使用體驗
- **智能定位** - 浮動視窗自動避開螢幕邊緣
- **語言標籤** - 清楚顯示來源語言與目標語言
- **極簡操作** - 無關閉按鈕,點擊空白處或滾動即可關閉
- **Catppuccin 配色** - 使用柔和的 Catppuccin Latte 配色主題

### ⚡ 效能優化
- **防抖機制** - 150ms 延遲,避免頻繁選取造成過多請求
- **最少字元限制** - 過濾 1-2 字元的短文字,減少誤觸
- **載入動畫** - 翻譯過程顯示優雅的 loading 效果
- **錯誤處理** - 友善的錯誤提示訊息

---

## 📦 安裝方式

### 方法一:從 Chrome 擴充功能商店安裝(即將推出)

_即將上架 Chrome Web Store_

### 方法二:手動安裝開發版本

1. 下載或 Clone 此專案
   ```bash
   git clone https://github.com/nagame309/free-translate.git
   cd free-translate
   ```

2. 開啟 Chrome 瀏覽器,前往 `chrome://extensions/`

3. 開啟右上角的「開發人員模式」

4. 點擊「載入未封裝項目」

5. 選擇專案資料夾 `translation-extension`

6. 完成!擴充功能圖示會出現在工具列

---

## 🚀 使用方式

### 基本操作

1. **翻譯文字**
   - 在任何網頁上用滑鼠選取文字(至少 3 個字元)
   - 翻譯結果會自動顯示在浮動視窗中
   - 點擊翻譯內容可複製到剪貼簿

2. **關閉翻譯視窗**
   - 點擊網頁空白處
   - 滾動頁面
   - 選取新的文字

3. **調整設定**
   - 點擊瀏覽器工具列中的擴充功能圖示
   - 調整來源語言、目標語言
   - 可選擇開啟/關閉自動翻譯功能
   - 設定會自動儲存

### 支援的語言

#### 來源語言
- 🌍 自動偵測(推薦)
- 🇺🇸 英文
- 🇯🇵 日文
- 🇰🇷 韓文
- 🇫🇷 法文
- 🇩🇪 德文
- 🇪🇸 西班牙文

#### 目標語言
- 🇹🇼 繁體中文
- 🇨🇳 簡體中文
- 🇺🇸 英文
- 🇯🇵 日文

---

## 🎨 設計特色

### 浮動視窗
- **毛玻璃背景** - 半透明深色背景 + 20px 高斯模糊
- **Catppuccin Mocha 配色** - 深色主題配色
- **圓角設計** - 4px 圓角,俐落專業
- **自適應寬度** - 最大 500px,最小 120px,根據內容自動調整
- **極簡設計** - 無關閉按鈕,點擊空白或滾動即關閉
- **MapleMono 字體** - 使用等寬字體,中英文混排更美觀

### 設定面板
- **Catppuccin Latte 配色** - 淺色主題設計
- **水平排版** - 來源語言和目標語言左右並列,中間箭頭分隔
- **粉紅色調** - 使用 #f38ba8 作為主題色
- **動態箭頭** - 下拉選單展開時箭頭向上,更直觀
- **Toggle 開關** - 簡潔的自動翻譯開關
- **即時回饋** - 儲存成功顯示 1.2 秒提示訊息

---

## 🛠️ 技術細節

### 技術棧
- **Manifest V3** - 使用最新的 Chrome Extension API
- **原生 JavaScript** - 無框架依賴,輕量高效
- **CSS3 動畫** - 流暢的過渡效果
- **Google Translate API** - 免費的翻譯服務
- **Catppuccin 配色系統** - 現代美觀的配色方案

### 專案結構
```
translation-extension/
├── manifest.json       # 擴充功能配置檔
├── content.js          # 內容腳本 - 核心翻譯邏輯
├── content.css         # 浮動視窗樣式 (Catppuccin Mocha)
├── popup.html          # 設定面板 HTML
├── popup.js            # 設定面板邏輯
├── popup.css           # 設定面板樣式 (Catppuccin Latte)
├── icons/              # 擴充功能圖示
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── fonts/              # MapleMono 等寬字體
    ├── MapleMono-NF-CN-Regular.ttf
    ├── MapleMono-NF-CN-Bold.ttf
    └── README.md
```

### 關鍵特性
- **防抖機制** - 150ms 延遲,避免頻繁觸發
- **智能過濾** - 檢測純中文內容並跳過(80% 以上中文字元)
- **位置計算** - 動態計算浮動視窗最佳位置,優先顯示在上方
- **錯誤重試** - 友善的網路錯誤提示
- **滾動監測** - 每 100ms 檢查滾動位置,自動隱藏視窗
- **本地儲存** - 使用 Chrome Storage API 同步設定

---

## 📝 注意事項

### 使用限制
- 翻譯服務依賴 Google Translate API
- 選取文字需至少 3 個字元才會觸發翻譯
- 純中文內容(80% 以上中文字元)會被自動跳過

### 隱私說明
- 本擴充功能不收集任何個人資料
- 翻譯請求直接發送到 Google Translate
- 設定資料僅儲存在本地瀏覽器中
- 無需註冊或登入

### 已知問題
- 在 `chrome://` 開頭的內建頁面無法使用(Chrome 安全限制)
- 部分網站可能因 CSP 政策無法正常運作
- 某些動態載入的內容可能需要重新選取

---

## 🤝 貢獻

歡迎提交 Issue 或 Pull Request!

### 開發設定
```bash
# Clone 專案
git clone https://github.com/nagame309/free-translate.git
cd free-translate

# 載入到 Chrome
1. 前往 chrome://extensions/
2. 開啟開發人員模式
3. 載入未封裝項目
4. 選擇 translation-extension 資料夾
```

### 開發指南
- 修改 `content.js` 調整翻譯邏輯
- 修改 `content.css` 調整浮動視窗樣式
- 修改 `popup.html/js/css` 調整設定面板
- 修改 `manifest.json` 更新擴充功能設定

---

## 📄 授權

本專案採用 MIT 授權條款 - 詳見 [LICENSE](LICENSE) 檔案

---

## 🙏 致謝

- [Google Translate API](https://translate.google.com) - 提供免費的翻譯服務
- [MapleMono Font](https://github.com/subframe7536/maple-font) - 優雅的等寬字體
- [Catppuccin](https://github.com/catppuccin/catppuccin) - 美麗的配色系統
- 所有使用者的回饋與建議

---

## 📮 聯絡方式

如有任何問題或建議,歡迎透過以下方式聯絡:

- 🐛 Issues: [GitHub Issues](https://github.com/nagame309/free-translate/issues)
- 💡 功能建議: [GitHub Discussions](https://github.com/nagame309/free-translate/discussions)

---

<div align="center">

Made with ❤️ 

⭐ 如果覺得這個專案有幫助,請給個 Star!

</div>
