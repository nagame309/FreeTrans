#!/bin/bash

# 浮譯 (Free Translate) 打包腳本
# 用於創建發布版本的 ZIP 檔案

VERSION="1.0.0"
PACKAGE_NAME="free-translate-v${VERSION}"
BUILD_DIR="build"
DIST_DIR="dist"

echo "🎨 浮譯 (Free Translate) 打包工具"
echo "版本: ${VERSION}"
echo "================================"

# 清理舊的建置檔案
echo "🧹 清理舊檔案..."
rm -rf "${BUILD_DIR}"
rm -rf "${DIST_DIR}"
mkdir -p "${BUILD_DIR}/${PACKAGE_NAME}"
mkdir -p "${DIST_DIR}"

# 複製必要檔案
echo "📦 複製檔案..."
cp manifest.json "${BUILD_DIR}/${PACKAGE_NAME}/"
cp content.js "${BUILD_DIR}/${PACKAGE_NAME}/"
cp content.css "${BUILD_DIR}/${PACKAGE_NAME}/"
cp popup.html "${BUILD_DIR}/${PACKAGE_NAME}/"
cp popup.js "${BUILD_DIR}/${PACKAGE_NAME}/"
cp popup.css "${BUILD_DIR}/${PACKAGE_NAME}/"
cp INSTALL.md "${BUILD_DIR}/${PACKAGE_NAME}/"
cp LICENSE "${BUILD_DIR}/${PACKAGE_NAME}/"

# 複製資料夾
echo "📁 複製資料夾..."
cp -r icons/ "${BUILD_DIR}/${PACKAGE_NAME}/"
cp -r fonts/ "${BUILD_DIR}/${PACKAGE_NAME}/"

# 建立 ZIP 檔案
echo "🗜️  壓縮檔案..."
cd "${BUILD_DIR}"
if command -v zip &> /dev/null; then
    zip -r "../${DIST_DIR}/${PACKAGE_NAME}.zip" "${PACKAGE_NAME}"
else
    echo "❌ 找不到 zip 命令,請手動壓縮 ${BUILD_DIR}/${PACKAGE_NAME}"
    cd ..
    exit 1
fi
cd ..

# 顯示結果
echo "✅ 打包完成!"
echo "📦 檔案位置: ${DIST_DIR}/${PACKAGE_NAME}.zip"
echo ""
echo "📊 檔案資訊:"
ls -lh "${DIST_DIR}/${PACKAGE_NAME}.zip"
echo ""
echo "🎉 發布準備完成!"
echo "💡 下一步:"
echo "   1. 前往 GitHub Releases 創建新版本"
echo "   2. 上傳 ${PACKAGE_NAME}.zip"
echo "   3. 填寫版本說明"
