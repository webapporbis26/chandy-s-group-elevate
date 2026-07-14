import fs from 'fs';
import path from 'path';

function generateIndex() {
  const outputIndexPath = path.join('.output', 'public', 'index.html');

  // With static preset, TanStack Start pre-renders index.html with correct SSR data.
  // We only need to verify it exists.
  if (fs.existsSync(outputIndexPath)) {
    console.log('Generating index.html...');
    console.log('Successfully generated .output/public/index.html');
    return;
  }

  // Fallback: generate a basic index.html if the pre-rendered one doesn't exist
  console.log('Pre-rendered index.html not found, generating fallback...');
  const assetsDir = path.join('.output', 'public', 'assets');
  if (!fs.existsSync(assetsDir)) {
    console.error('Assets directory not found!');
    return;
  }

  const files = fs.readdirSync(assetsDir);
  const cssFile = files.find(f => f.startsWith('styles-') && f.endsWith('.css'));
  const jsFile = files.find(f => f.startsWith('index-') && f.endsWith('.js'));

  if (!jsFile) {
    console.error('Could not find index JS file in assets');
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chandy's Elevate</title>
    <link rel="icon" type="image/png" href="/favicon.png">
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}">` : ''}
</head>
<body>
    <div id="root"></div>
    <script type="module" src="/assets/${jsFile}"></script>
</body>
</html>`;

  fs.writeFileSync(outputIndexPath, html);
  console.log('Successfully generated .output/public/index.html');
}

generateIndex();
