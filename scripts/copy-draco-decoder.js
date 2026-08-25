// Copies the Draco decoder that ships inside the installed `three` package
// into public/draco/, where useGLTF (StellarObjectGeometry.tsx) expects to
// find it at runtime. Runs on every `npm install` (see package.json's
// "postinstall") so a fresh clone, CI run, or redeploy never ends up
// missing it — the decoder isn't itself a source file worth committing,
// since it's fully derived from the three version already pinned in
// package-lock.json.
const fs = require('fs');
const path = require('path');

const SOURCE_DIR = path.join(
  __dirname,
  '..',
  'node_modules',
  'three',
  'examples',
  'jsm',
  'libs',
  'draco',
  'gltf'
);
const DEST_DIR = path.join(__dirname, '..', 'public', 'draco');
const FILES = ['draco_decoder.js', 'draco_decoder.wasm', 'draco_wasm_wrapper.js'];

fs.mkdirSync(DEST_DIR, { recursive: true });

for (const file of FILES) {
  fs.copyFileSync(path.join(SOURCE_DIR, file), path.join(DEST_DIR, file));
}

console.log(`Copied Draco decoder (${FILES.length} files) to public/draco/`);
