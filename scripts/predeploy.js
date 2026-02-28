const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');
const dist = path.join(root, 'dist');

if (!fs.existsSync(dist)) fs.mkdirSync(dist, { recursive: true });
fs.copyFileSync(path.join(root, 'index.html'), path.join(dist, 'index.html'));
fs.writeFileSync(path.join(dist, '.nojekyll'), '');
console.log('Predeploy: dist/ ready (index.html + .nojekyll)');
