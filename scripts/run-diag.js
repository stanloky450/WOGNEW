
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const locations = [
  path.resolve(__dirname, '../prod.db'),
  path.resolve(__dirname, '../prisma/prod.db'),
  path.resolve(__dirname, '../dev.db'),
  path.resolve(__dirname, '../prisma/dev.db')
];

async function checkDb(name, filePath, logFn) {
  logFn(`\nChecking [${name}] at ${filePath}...`);
  if (!fs.existsSync(filePath)) {
    logFn('  -> File does not exist.');
    return;
  }
  const size = fs.statSync(filePath).size;
  logFn(`  -> File exists. Size: ${size} bytes.`);
  
  if (size === 0) {
      logFn('  -> File is empty (0 bytes).');
      return;
  }

  // Connect specifically to this file
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: `file:${filePath}`,
      },
    },
  });

  try {
    const userCount = await prisma.user.count();
    logFn(`  -> SUCCESS: Connection established. User count: ${userCount}`);
    const postCount = await prisma.post.count();
    logFn(`  -> SUCCESS: Post count: ${postCount}`);
  } catch (e) {
    logFn('  -> ERROR: Could not query database.');
    logFn('     ' + e.message.split('\n')[0]);
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  const logFile = path.resolve(__dirname, '../diag_results.txt');
  let logs = '';
  const logFn = (msg) => {
      console.log(msg);
      logs += msg + '\n';
  };

  logFn('--- DATABASE LOCATION DIAGNOSTIC ---');
  logFn('Current Working Directory: ' + process.cwd());
  
  for (const loc of locations) {
      await checkDb(path.basename(loc), loc);
  }
  
  fs.writeFileSync(logFile, logs);
  console.log('Results written to diag_results.txt');
}

main();
