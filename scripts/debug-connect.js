const { PrismaClient } = require('@prisma/client')
const fs = require('fs');

const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
})

async function main() {
  const logStream = fs.createWriteStream('db_test_out.txt');
  function log(msg) {
    console.log(msg);
    logStream.write(msg + '\n');
  }

  log('Testing connection...');
  try {
    await prisma.$connect();
    log('Connected successfully!');
    const userCount = await prisma.user.count();
    log(`User count: ${userCount}`);
  } catch (e) {
    log(`Connection failed: ${e.message}`);
  } finally {
    await prisma.$disconnect();
    logStream.end();
  }
}

main();
