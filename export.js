import { spawn } from 'child_process';
import fs from 'fs';
import { execSync } from 'child_process';

async function exportStatic() {
  console.log('Building with node-server preset for static extraction...');
  execSync('npx nitro build --preset node-server --output.dir=.output-temp', { stdio: 'inherit' });

  console.log('Starting server for static export...');
  const server = spawn('node', ['.output-temp/server/index.mjs'], {
    env: { ...process.env, PORT: '3000', NITRO_PORT: '3000' },
    stdio: 'inherit'
  });

  let res;
  for (let i = 0; i < 20; i++) {
    try {
      res = await fetch('http://localhost:3000/');
      if (res.ok) break;
    } catch (err) {
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }

  try {
    if (!res) throw new Error("Server never responded");
    console.log('Fetching / ...');
    const html = await res.text();
    
    fs.writeFileSync('.output/public/index.html', html);
    console.log('Successfully wrote .output/public/index.html');
  } catch (err) {
    console.error('Failed to generate static HTML:', err);
  } finally {
    server.kill();
    fs.rmSync('.output-temp', { recursive: true, force: true });
  }
}

exportStatic();
