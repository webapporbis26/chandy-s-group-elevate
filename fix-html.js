import fs from 'fs';

const htmlPath = 'dist/index.html';
if (fs.existsSync(htmlPath)) {
  let html = fs.readFileSync(htmlPath, 'utf-8');
  // Add the basic TSR state before the first script tag
  const tsrScript = `<script>window.$_TSR={matches:[],streamed:false,buffer:[],router:{matches:[],state:{}}}</script>`;
  if (!html.includes('window.$_TSR')) {
    html = html.replace(/<script /, tsrScript + '\n<script ');
    fs.writeFileSync(htmlPath, html);
    console.log('Injected $_TSR state into index.html');
  }
} else {
  console.error('dist/index.html not found!');
}
