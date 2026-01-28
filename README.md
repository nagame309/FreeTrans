<div align="center">

# 🌸 浮譯 Free Translate

**一個優雅、輕量的 Chrome 翻譯擴充功能**

選取即翻譯 • 毛玻璃設計 • 極簡體驗

[![Version](https://img.shields.io/badge/version-1.0-FD5586?style=flat-square)](https://github.com/nagame309/free-translate)
[![License](https://img.shields.io/badge/license-MIT-94e2d5?style=flat-square)](LICENSE)
[![Chrome](https://img.shields.io/badge/Chrome-Extension-4285F4?style=flat-square&logo=googlechrome&logoColor=white)](https://github.com/nagame309/free-translate)
[![Stars](https://img.shields.io/github/stars/nagame309/free-translate?style=flat-square&color=FD5586)](https://github.com/nagame309/free-translate/stargazers)

[功能特色](#-功能特色) • [安裝方式](#-安裝) • [使用方法](#-使用) • [開發](#-開發貢獻)

---

### 📸 預覽

> *截圖區域 - 請放置實際使用畫面*

**浮動翻譯視窗**
```
待加入: 翻譯視窗截圖
展示選取文字後的翻譯效果
```

**設定面板**
```
待加入: 設定頁面截圖  
展示簡潔優雅的設定介面
```

</div>

---

## ✨ 功能特色

<table>
<tr>
<td width="50%">

### 🎯 核心功能

- **⚡️ 即時翻譯** - 選取文字立即顯示翻譯
- **🧠 智能過濾** - 自動跳過純中文內容
- **📋 一鍵複製** - 點擊翻譯內容即可複製
- **🌏 多國語言** - 支援英日韓法德西等語言
- **🎚️ 自由開關** - 可隨時啟用/停用翻譯

</td>
<td width="50%">

### 🎨 設計理念

- **✨ 毛玻璃效果** - 現代 Glassmorphism 風格
- **🎭 雙色主題** - Catppuccin Latte 配色
- **🌊 流暢動畫** - 淡入淡出與縮放效果  
- **🎯 智能定位** - 自動避開螢幕邊緣
- **🖱️ 極簡互動** - 無多餘按鈕,自然體驗

</td>
</tr>
</table>

### 💡 為什麼選擇浮譯？

- **輕量高效** - 無框架依賴,純原生 JavaScript
- **隱私優先** - 不收集任何個人資料
- **完全免費** - 使用 Google Translate API
- **開源透明** - MIT 授權,歡迎貢獻

---

## 🚀 安裝

### 方法一：從 Chrome Web Store 安裝 (即將推出)

_正在準備上架,敬請期待..._

### 方法二：手動安裝開發版

```bash
# 1. Clone 專案
git clone https://github.com/nagame309/free-translate.git

# 2. 進入專案目錄
cd free-translate
```

**3. 載入到 Chrome**
1. 開啟 Chrome 並前往 `chrome://extensions/`
2. 右上角開啟「開發人員模式」
3. 點擊「載入未封裝項目」
4. 選擇 `translation-extension` 資料夾
5. 完成!擴充功能圖示會出現在工具列 🎉

---

## 📖 使用

### 基本操作

<table>
<tr>
<td width="33%" align="center">

**1️⃣ 選取文字**

在任何網頁選取文字  
(至少 3 個字元)

</td>
<td width="33%" align="center">

**2️⃣ 自動翻譯**

浮動視窗自動顯示  
點擊內容即可複製

</td>
<td width="33%" align="center">

**3️⃣ 自然關閉**

點擊空白或滾動頁面  
視窗優雅地消失

</td>
</tr>
</table>

### 進階設定

點擊工具列圖示 <img src="icons/icon16.png" width="16" align="center"> 可以調整:

- **來源語言** - 自動偵測或指定語言
- **目標語言** - 繁中/簡中/英文/日文
- **自動翻譯** - 開關翻譯功能

### 支援語言

<details>
<summary>📜 點擊展開完整語言列表</summary>

#### 來源語言
- 🌍 自動偵測 (推薦)
- 🇺🇸 English (英文)
- 🇯🇵 日本語 (日文)
- 🇰🇷 한국어 (韓文)
- 🇫🇷 Français (法文)
- 🇩🇪 Deutsch (德文)
- 🇪🇸 Español (西班牙文)

#### 目標語言
- 🇹🇼 繁體中文
- 🇨🇳 简体中文
- 🇺🇸 English
- 🇯🇵 日本語

</details>

---

## 🎨 設計細節

### 技術特性

```javascript
// 核心技術棧
{
  "manifest": "V3",           // Chrome Extension Manifest V3
  "framework": "Vanilla JS",  // 無框架依賴
  "styling": "Pure CSS3",     // 純 CSS 動畫
  "api": "Google Translate",  // 免費翻譯 API
  "theme": "Catppuccin",      // 美觀配色系統
  "font": "MapleMono NF CN"   // 等寬中文字體
}
```

### 效能優化

- ⏱️ **防抖機制** - 150ms 延遲避免頻繁請求
- 🔍 **智能過濾** - 80% 以上中文內容自動跳過
- 📐 **動態定位** - 實時計算最佳顯示位置
- 🎯 **滾動偵測** - 每 100ms 監測並自動隱藏

### 配色系統

使用 [Catppuccin](https://github.com/catppuccin/catppuccin) 配色主題:

- **浮動視窗**: Latte (淺色) + 毛玻璃效果
- **設定面板**: Latte (淺色) 主題
- **主題色**: `#FD5586` 粉紅色

---

## 📁 專案結構

```
free-translate/
├── 📄 manifest.json          # 擴充功能配置
├── 🎨 content.css            # 浮動視窗樣式
├── ⚙️  content.js             # 核心翻譯邏輯
├── 🎛️  popup.html             # 設定面板
├── 🎛️  popup.js               # 設定面板邏輯
├── 🎨 popup.css              # 設定面板樣式
├── 📁 icons/                 # 擴充功能圖示
│   ├── icon16.png
│   ├── icon48.png
│   ├── icon128.png
│   └── translate.png
├── 📁 fonts/                 # MapleMono 字體
│   ├── MapleMono-NF-CN-Regular.ttf
│   └── MapleMono-NF-CN-Bold.ttf
├── 📖 README.md              # 專案說明
├── 📋 LICENSE                # MIT 授權
└── 🎨 UI_DESIGN.md           # UI 設計文件
```

---

## 🛠 開發貢獻

我們歡迎任何形式的貢獻!無論是:

- 🐛 回報 Bug
- 💡 提出新功能建議
- 📝 改善文件
- 🔧 提交 Pull Request

### 開發環境設定

```bash
# 1. Fork 並 Clone 專案
git clone https://github.com/your-username/free-translate.git
cd free-translate

# 2. 建立新分支
git checkout -b feature/your-feature-name

# 3. 載入到 Chrome 進行測試
# 前往 chrome://extensions/ 載入 translation-extension 資料夾

# 4. 開發完成後提交
git add .
git commit -m "feat: 你的功能描述"
git push origin feature/your-feature-name

# 5. 開啟 Pull Request
```

### 開發指南

- **修改翻譯邏輯** → `content.js`
- **調整浮動視窗樣式** → `content.css`
- **更新設定面板** → `popup.html` / `popup.js` / `popup.css`
- **擴充功能設定** → `manifest.json`

---

## ❓ 常見問題

<details>
<summary><b>為什麼選取文字沒有出現翻譯?</b></summary>

- 確認選取的文字至少有 3 個字元
- 純中文內容(80%以上中文字)會被自動跳過
- 檢查設定面板中的「自動翻譯」是否開啟
- 某些網站可能因安全政策無法使用

</details>

<details>
<summary><b>可以在任何網站使用嗎?</b></summary>

幾乎可以!但以下情況例外:
- `chrome://` 開頭的內建頁面
- 某些有嚴格 CSP 政策的網站
- 需要特殊權限的網頁

</details>

<details>
<summary><b>會收集我的資料嗎?</b></summary>

**完全不會!**
- 不收集任何個人資料
- 翻譯請求直接發送到 Google
- 設定僅存在本地瀏覽器
- 無需註冊或登入

</details>

<details>
<summary><b>如何更改主題色?</b></summary>

目前暫不支援自訂顏色,但你可以:
1. Fork 專案
2. 修改 `content.css` 和 `popup.css` 中的顏色
3. 重新載入擴充功能

未來版本可能會加入主題切換功能!

</details>

---

## 📝 更新日誌

### v1.0.0 (2026-01-28)

🎉 **初始版本發布!**

- ✨ 選取文字即時翻譯功能
- 🎨 毛玻璃浮動視窗設計
- 🎛️ 簡潔的設定面板
- 🌏 多語言支援
- 📋 點擊複製功能
- 🧠 智能過濾純中文內容
- 🎨 Catppuccin 配色主題

---

## 📄 授權

本專案採用 [MIT License](LICENSE) 授權

這意味著你可以:
- ✅ 商業使用
- ✅ 修改
- ✅ 發布
- ✅ 私人使用

只需保留版權聲明即可!

---

## 💖 致謝

這個專案的誕生要感謝:

- [Google Translate API](https://translate.google.com) - 提供免費翻譯服務
- [Catppuccin](https://github.com/catppuccin/catppuccin) - 美麗的配色系統  
- [MapleMono Font](https://github.com/subframe7536/maple-font) - 優雅的等寬字體
- 所有提供回饋和建議的使用者 ❤️

---

## 📬 聯絡

有任何問題或建議嗎?

- 💬 [GitHub Issues](https://github.com/nagame309/free-translate/issues) - 回報問題
- 💡 [GitHub Discussions](https://github.com/nagame309/free-translate/discussions) - 功能討論
- ⭐️ [GitHub Star](https://github.com/nagame309/free-translate) - 給個星星支持我們!

---

<div align="center">

**如果這個專案對你有幫助,請給個 ⭐️ Star 支持一下!**

Made with ❤️ and ☕️

*讓翻譯變得更簡單、更優雅*

[⬆️ 回到頂部](#-浮譯-free-translate)

</div>
