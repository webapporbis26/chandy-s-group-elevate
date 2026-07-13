import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

async function exportStatic() {
  console.log('Starting server for static export...');
  const server = spawn('node', ['.output/server/index.mjs'], {
    env: { ...process.env, PORT: '3000' }
  });

  // Wait for server to boot
  await new Promise(resolve => setTimeout(resolve, 2000));

  try {
    console.log('Fetching / ...');
    const res = await fetch('http://localhost:3000/');
    const html = await res.text();
    
    fs.writeFileSync('.output/public/index.html', html);
    console.log('Successfully wrote .output/public/index.html');
  } catch (err) {
    console.error('Failed to fetch static HTML:', err);
  } finally {
    server.kill();
  }
}

exportStatic();
