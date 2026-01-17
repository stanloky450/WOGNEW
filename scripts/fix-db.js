
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('--- START DATABASE FIX ---');

try {
  // 1. Force remove prod.db if it exists/is corrupted
  // Adjusted path to match actual location in prisma folder
  const dbPath = path.resolve(__dirname, '../prisma/prod.db');
  console.log('Target DB Path:', dbPath);
  
  if (fs.existsSync(dbPath)) {
    console.log('Deleting existing prod.db...');
    try {
        fs.unlinkSync(dbPath);
        console.log('Deleted.');
    } catch(e) {
        console.log('Could not delete prod.db (might be locked):', e.message);
    }
  } else {
    console.log('prod.db does not exist.');
  }

  // 2. Run Prisma DB Push
  console.log('Running: npx prisma db push --accept-data-loss');
  // Inherit stdio to show output in realtime if possible, or capture it
  const output = execSync('npx -y prisma db push --accept-data-loss', { 
    cwd: path.resolve(__dirname, '..'),
    encoding: 'utf8',
    timeout: 60000 // 1 minute timeout
  });
  console.log('Prisma Output:\n', output);
  console.log('Database Schema Pushed Successfully.');

} catch (error) {
  console.error('FAILED to push database schema:');
  console.error(error.message);
  if (error.stdout) console.log('STDOUT:', error.stdout.toString());
  if (error.stderr) console.error('STDERR:', error.stderr.toString());
  process.exit(1);
}

console.log('--- SUCCESS ---');
