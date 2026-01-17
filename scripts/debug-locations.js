
const fs = require('fs');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const locations = [
  path.resolve(__dirname, '../prod.db'),
  path.resolve(__dirname, '../prisma/prod.db'),
  path.resolve(__dirname, '../dev.db'),
  path.resolve(__dirname, '../prisma/dev.db')
];

async function checkDb(name, filePath) {
  console.log(`\nChecking [${name}] at ${filePath}...`);
  if (!fs.existsSync(filePath)) {
    console.log('  -> File does not exist.');
    return;
  }
  const size = fs.statSync(filePath).size;
  console.log(`  -> File exists. Size: ${size} bytes.`);
  
  if (size === 0) {
      console.log('  -> File is empty (0 bytes).');
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
    console.log(`  -> SUCCESS: Connection established. User count: ${userCount}`);
    
    // Check for Post table too
    const postCount = await prisma.post.count();
    console.log(`  -> SUCCESS: Post count: ${postCount}`);

  } catch (e) {
    console.log('  -> ERROR: Could not query database.');
    console.log('     ' + e.message.split('\n')[0]); // Log first line of error
  } finally {
    await prisma.$disconnect();
  }
}

async function main() {
  console.log('--- DATABASE LOCATION DIAGNOSTIC ---');
  console.log('Current Working Directory:', process.cwd());
  console.log('Environment DATABASE_URL:', process.env.DATABASE_URL);
  
  for (const loc of locations) {
      await checkDb(path.basename(loc), loc);
  }
  console.log('\n--- END DIAGNOSTIC ---');
}

main();
