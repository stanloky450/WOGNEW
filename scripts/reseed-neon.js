
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('--- RESEED NEON START ---');
  try {
    // 1. Create/Update Debug User
    const debugUser = await prisma.user.upsert({
      where: { email: 'debug@test.com' },
      update: {},
      create: {
        id: 'debug-user-id',
        email: 'debug@test.com',
        name: 'Debug Admin',
        role: 'ADMIN',
        password: 'debugpassword123' // Added password just in case
      },
    });
    console.log('Debug User Ensured:', debugUser.id);

    // 2. Create/Update Seed Admin (from manual-seed logic)
    const seedAdmin = await prisma.user.upsert({
      where: { email: 'seed_admin@wgministries.com' },
      update: {},
      create: {
        email: 'seed_admin@wgministries.com',
        name: 'Seed Admin',
        role: 'ADMIN',
        password: 'password123'
      }
    });
    console.log('Seed Admin Ensured:', seedAdmin.id);
    
    console.log('--- RESEED SUCCESS ---');
  } catch (e) {
    console.error('Reseed Failed:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
