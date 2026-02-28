const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');
const mainSitePath = process.env.MAIN_SITE_PATH || path.join(root, '..', 'tolkium.github.io');
const targetDir = path.join(mainSitePath, 'autoscelem');

if (!fs.existsSync(dist)) {
  console.error('Run "npm run deploy" first, or ensure dist/ exists.');
  process.exit(1);
}
if (!fs.existsSync(mainSitePath)) {
  console.error('Main site repo not found at:', mainSitePath);
  console.error('Set MAIN_SITE_PATH to the path of your tolkium.net repo.');
  process.exit(1);
}

if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
for (const name of fs.readdirSync(dist)) {
  const src = path.join(dist, name);
  const dest = path.join(targetDir, name);
  if (fs.statSync(src).isFile()) {
    fs.copyFileSync(src, dest);
    console.log('Copied', name, '->', targetDir);
  }
}
console.log('\nDone. To publish to tolkium.net/autoscelem, run in the main site repo:');
console.log('  cd', mainSitePath);
console.log('  git add autoscelem');
console.log('  git commit -m "Update autoscelem"');
console.log('  git push');
