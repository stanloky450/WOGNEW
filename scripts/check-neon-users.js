const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');
const prisma = new PrismaClient();
const logPath = path.resolve(__dirname, 'check_result.txt');

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logPath, msg + '\n');
}

async function main() {
  try {
    fs.writeFileSync(logPath, '--- CHECK START ---\n');
    log('Connecting...');
    const users = await prisma.user.findMany();
    log(`Found ${users.length} users.`);
    users.forEach(u => log(`- ID: ${u.id}, Email: ${u.email}`));
  } catch (e) {
    log('ERROR: ' + e.message);
  } finally {
    await prisma.$disconnect();
  }
}
main();
