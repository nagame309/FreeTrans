import os
import shutil
import zipfile
from pathlib import Path

VERSION = "1.0.0"
PACKAGE_NAME = f"free-translate-v{VERSION}"
BUILD_DIR = "build"
DIST_DIR = "dist"

print("Free Translate Packaging Tool")
print(f"Version: {VERSION}")
print("=" * 40)
print()

# Clean old files
print("Cleaning old files...")
if os.path.exists(BUILD_DIR):
    shutil.rmtree(BUILD_DIR)
if os.path.exists(DIST_DIR):
    shutil.rmtree(DIST_DIR)

# Create directories
os.makedirs(f"{BUILD_DIR}/{PACKAGE_NAME}")
os.makedirs(DIST_DIR)

# Copy files
print("Copying files...")
files_to_copy = [
    "manifest.json",
    "content.js",
    "content.css",
    "popup.html",
    "popup.js",
    "popup.css",
    "INSTALL.md",
    "LICENSE"
]

for file in files_to_copy:
    shutil.copy(file, f"{BUILD_DIR}/{PACKAGE_NAME}/")
    print(f"   + {file}")

# Copy folders
print("Copying folders...")
folders_to_copy = ["icons", "fonts"]

for folder in folders_to_copy:
    shutil.copytree(folder, f"{BUILD_DIR}/{PACKAGE_NAME}/{folder}")
    print(f"   + {folder}/")

# Create ZIP file
print("Compressing files...")
zip_path = f"{DIST_DIR}/{PACKAGE_NAME}.zip"

with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
    base_path = Path(f"{BUILD_DIR}/{PACKAGE_NAME}")
    for file_path in base_path.rglob('*'):
        if file_path.is_file():
            arcname = file_path.relative_to(BUILD_DIR)
            zipf.write(file_path, arcname)
            
print()
print("Package completed!")
print(f"File location: {zip_path}")
print(f"File size: {os.path.getsize(zip_path) / 1024:.2f} KB")
print()
print("Next steps:")
print(f"   1. Go to GitHub Releases")
print(f"   2. Upload {PACKAGE_NAME}.zip")
print(f"   3. Add release notes")
