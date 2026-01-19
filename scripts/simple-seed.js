
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const logPath = path.resolve(__dirname, 'seed_result.txt');
const prisma = new PrismaClient();

function log(msg) {
    console.log(msg);
    fs.appendFileSync(logPath, msg + '\n');
}

async function main() {
  try {
    fs.writeFileSync(logPath, '--- SEED START ---\n');
    log('Connecting...');
    
    // Create debug user
    const user = await prisma.user.upsert({
        where: { email: 'debug@test.com' },
        update: {},
        create: {
            id: 'debug-user-id',
            email: 'debug@test.com',
            name: 'Debug Admin',
            role: 'ADMIN',
            password: 'debugpassword123'
        }
    });
    log('User created: ' + user.id);
    
  } catch (e) {
    log('ERROR: ' + e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
