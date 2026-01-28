@echo off
REM 浮譯 (Free Translate) 打包腳本 (Windows)
REM 用於創建發布版本的 ZIP 檔案

setlocal

set VERSION=1.0.0
set PACKAGE_NAME=free-translate-v%VERSION%
set BUILD_DIR=build
set DIST_DIR=dist

echo 🎨 浮譯 (Free Translate) 打包工具
echo 版本: %VERSION%
echo ================================
echo.

REM 清理舊的建置檔案
echo 🧹 清理舊檔案...
if exist "%BUILD_DIR%" rmdir /s /q "%BUILD_DIR%"
if exist "%DIST_DIR%" rmdir /s /q "%DIST_DIR%"
mkdir "%BUILD_DIR%\%PACKAGE_NAME%"
mkdir "%DIST_DIR%"

REM 複製必要檔案
echo 📦 複製檔案...
copy manifest.json "%BUILD_DIR%\%PACKAGE_NAME%\" >nul
copy content.js "%BUILD_DIR%\%PACKAGE_NAME%\" >nul
copy content.css "%BUILD_DIR%\%PACKAGE_NAME%\" >nul
copy popup.html "%BUILD_DIR%\%PACKAGE_NAME%\" >nul
copy popup.js "%BUILD_DIR%\%PACKAGE_NAME%\" >nul
copy popup.css "%BUILD_DIR%\%PACKAGE_NAME%\" >nul
copy INSTALL.md "%BUILD_DIR%\%PACKAGE_NAME%\" >nul
copy LICENSE "%BUILD_DIR%\%PACKAGE_NAME%\" >nul

REM 複製資料夾
echo 📁 複製資料夾...
xcopy icons "%BUILD_DIR%\%PACKAGE_NAME%\icons\" /E /I /Q >nul
xcopy fonts "%BUILD_DIR%\%PACKAGE_NAME%\fonts\" /E /I /Q >nul

REM 建立 ZIP 檔案
echo 🗜️  壓縮檔案...
powershell -command "Compress-Archive -Path '%BUILD_DIR%\%PACKAGE_NAME%\*' -DestinationPath '%DIST_DIR%\%PACKAGE_NAME%.zip' -Force"

if %ERRORLEVEL% EQU 0 (
    echo ✅ 打包完成!
    echo 📦 檔案位置: %DIST_DIR%\%PACKAGE_NAME%.zip
    echo.
    echo 🎉 發布準備完成!
    echo 💡 下一步:
    echo    1. 前往 GitHub Releases 創建新版本
    echo    2. 上傳 %PACKAGE_NAME%.zip
    echo    3. 填寫版本說明
) else (
    echo ❌ 打包失敗!
)

echo.
pause
