
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- CHECKING NEON USERS ---');
  try {
    const users = await prisma.user.findMany();
    console.log(`Found ${users.length} users.`);
    users.forEach(u => {
        console.log(`- ID: ${u.id}, Email: ${u.email}, Role: ${u.role}`);
    });
    
    // Also try to find the debug user specifically if logic depends on it
    const debugUser = await prisma.user.findFirst({
        where: { email: 'debug@test.com' }
    });
    console.log('Debug user found:', debugUser ? 'YES' : 'NO');
    
  } catch (e) {
    console.error('Error connecting/querying:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
