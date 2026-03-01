const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });

// remove old design files/dirs in dist so we can use D1/…D6/ as folders
for (const name of fs.readdirSync(dist)) {
  if (name === 'index.html' || name === '.nojekyll') continue;
  if (/^D[1-9](\.html)?$/.test(name) || /^D[1-9]$/.test(name)) {
    const p = path.join(dist, name);
    fs.rmSync(p, { recursive: true, force: true });
  }
}

// index + .nojekyll
fs.copyFileSync(path.join(root, 'index.html'), path.join(dist, 'index.html'));
fs.writeFileSync(path.join(dist, '.nojekyll'), '');

// design folders: D1/index.html … D6/index.html from D1.html … D6.html (one file per design)
for (let n = 1; n <= 6; n++) {
  const name = 'D' + n;
  const srcFile = path.join(root, name + '.html');
  const dir = path.join(dist, name);
  const destFile = path.join(dir, 'index.html');
  if (!fs.existsSync(srcFile)) continue;
  fs.mkdirSync(path.dirname(destFile), { recursive: true });
  fs.writeFileSync(destFile, fs.readFileSync(srcFile));
}
console.log('Predeploy: dist/ ready (index.html, .nojekyll, D1/…D6/index.html)');
