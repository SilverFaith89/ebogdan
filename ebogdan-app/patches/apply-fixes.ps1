# Apply-fixes: overwrite vite.config.ts and package.json with the fixed versions
# Run this from the project root or double-click in File Explorer to apply.

$projectRoot = "C:\Users\Lenovo\ebogdan-git\ebogdan-app"

# Overwrite vite.config.ts
$viteContent = @'
import { defineConfig } from 'vite';

export default defineConfig({
  // Vite configuration
});
'@
Set-Content -Path (Join-Path $projectRoot 'vite.config.ts') -Value $viteContent -Encoding UTF8

# Overwrite package.json
$packageJson = @'
{
  "name": "ebogdan-app",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "build:ssg": "npm run build && node scripts/generate-static.js",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@ant-design/icons": "^6.3.2",
    "@tanstack/react-query": "^5.101.2",
    "antd": "^6.5.0",
    "axios": "^1.18.1",
    "clsx": "^2.1.1",
    "dayjs": "^1.11.21",
    "react": "^19.2.7",
    "react-dom": "^19.2.7",
    "react-hook-form": "^7.81.0",
    "react-router-dom": "^7.18.1",
    "zod": "^4.4.3",
    "zustand": "^5.0.14"
  },
  "devDependencies": {
    "@eslint/js": "^10.0.1",
    "@types/node": "^24.13.2",
    "@types/react": "^19.2.17",
    "@types/react-dom": "^19.2.3",
    "@vitejs/plugin-react": "^6.0.3",
    "eslint": "^10.6.0",
    "eslint-plugin-react-hooks": "^7.1.1",
    "eslint-plugin-react-refresh": "^0.5.3",
    "globals": "^17.7.0",
    "sharp": "^0.35.3",
    "typescript": "~6.0.2",
    "typescript-eslint": "^8.62.0",
    "vite": "^8.1.1"
  }
}
'@
Set-Content -Path (Join-Path $projectRoot 'package.json') -Value $packageJson -Encoding UTF8

Write-Output "Files updated: vite.config.ts, package.json"
Write-Output "If you had @wroud/vite-plugin-ssg installed, run: npm uninstall @wroud/vite-plugin-ssg"
Write-Output "Then run: npm install && npm run build && node scripts/generate-static.js"
