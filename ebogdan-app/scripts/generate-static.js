import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dist = path.join(__dirname, '..', 'dist');
const routes = ['/', '/privacy', '/impressum'];

function copyIndexForRoute(route) {
  const targetDir = path.join(dist, route.replace(/^\//, ''));
  const indexSrc = path.join(dist, 'index.html');
  if (!fs.existsSync(indexSrc)) {
    console.error('index.html not found in dist. Did the build succeed?');
    process.exit(1);
  }

  // ensure target directory exists
  fs.mkdirSync(targetDir, { recursive: true });

  const targetPath = path.join(targetDir, 'index.html');
  fs.copyFileSync(indexSrc, targetPath);
  console.log(`Wrote ${targetPath}`);
}

(function main(){
  if (!fs.existsSync(dist)) {
    console.error('dist directory not found. Run the build first.');
    process.exit(1);
  }

  routes.forEach(route => copyIndexForRoute(route));
  console.log('Static route files generated.');
})();
