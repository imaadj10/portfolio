// Compresses every .glb in public/planet_models/ in place: Draco geometry
// compression + WebP texture recompression, capped at 1024px. Uniform
// across every file rather than tuned per model — which specific file
// plays which role (moon vs. planet vs. sun) is an assignment made in
// SolarSystem.tsx, not a property of the file itself, and that assignment
// is expected to change over time. Re-run this any time models in
// public/planet_models/ are swapped or added.
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const MODELS_DIR = path.join(__dirname, '..', 'public', 'planet_models');

const files = fs.readdirSync(MODELS_DIR).filter((f) => f.endsWith('.glb'));

if (files.length === 0) {
  console.log('No .glb files found in public/planet_models/.');
  process.exit(0);
}

let totalBefore = 0;
let totalAfter = 0;
let failed = false;

for (const file of files) {
  const input = path.join(MODELS_DIR, file);
  const tmpOutput = path.join(MODELS_DIR, `.${file}.compressing.glb`);
  const before = fs.statSync(input).size;

  try {
    execFileSync(
      'npx',
      [
        'gltf-transform',
        'optimize',
        input,
        tmpOutput,
        '--compress',
        'draco',
        '--texture-compress',
        'webp',
        '--texture-size',
        '1024',
      ],
      { stdio: 'pipe' }
    );

    const after = fs.statSync(tmpOutput).size;
    fs.renameSync(tmpOutput, input);

    totalBefore += before;
    totalAfter += after;

    const pct = (((before - after) / before) * 100).toFixed(1);
    console.log(
      `${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(
        0
      )}KB (-${pct}%)`
    );
  } catch (err) {
    failed = true;
    console.error(`FAILED: ${file}`);
    console.error(err.stderr ? err.stderr.toString() : err.message);
    if (fs.existsSync(tmpOutput)) fs.unlinkSync(tmpOutput);
  }
}

if (totalBefore > 0) {
  const totalPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(2)}MB -> ${(
      totalAfter /
      1024 /
      1024
    ).toFixed(2)}MB (-${totalPct}%)`
  );
}

if (failed) {
  console.error('\nOne or more files failed to compress — see above.');
  process.exit(1);
}
