
const { execSync } = require('child_process');
const path = require('path');

console.log('--- STARTING PROGRAMMATIC DB PUSH ---');

// Define the target DB URL
// We want to force it to be in prisma/prod.db relative to the project root.
const dbUrl = 'file:./prisma/prod.db';

console.log('Target DATABASE_URL:', dbUrl);

try {
  // Execute passing the env explicitly
  // We use npx -y to ensure no prompting
  const output = execSync('npx -y prisma db push --accept-data-loss', {
    cwd: path.resolve(__dirname, '..'), // Run from ROOT
    env: {
      ...process.env,
      DATABASE_URL: dbUrl
    },
    encoding: 'utf8',
    stdio: 'inherit' // Try to show output
  });
  
  console.log('--- COMMAND SUCCESS ---');
} catch (e) {
  console.error('--- COMMAND FAILED ---');
  console.error(e.message);
  process.exit(1);
}
