
const { PrismaClient } = require('@prisma/client');
console.log('--- TESTING CONNECTION ---');
console.log('Expectation: URL should resolve to prisma/dev.db relative to schema');

// We need to simulate the app execution.
// The app loads .env.
// But here we are running a script.
// If we use dotenv, we should set it to what we just changed the file to.

process.env.DATABASE_URL = "file:./dev.db";

const prisma = new PrismaClient();

async function main() {
  try {
    const c = await prisma.user.count();
    console.log('SUCCESS. User count:', c);
  } catch (e) {
    console.error('FAIL:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
