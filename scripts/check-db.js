
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const dotenv = require('dotenv');

// Explicitly load .env from project root
const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

console.log("--- DB Check Script ---");
console.log("DATABASE_URL:", process.env.DATABASE_URL);

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Connecting to DB...");
    const count = await prisma.user.count();
    console.log(`Total Users: ${count}`);

    if (count === 0) {
      console.log("WARNING: Database is empty! You may need to run seeding.");
    } else {
      const adminEmail = "admin@example.com"; // Common default, checking if it exists
      const admin = await prisma.user.findUnique({
        where: { email: adminEmail }
      });
      
      if (admin) {
        console.log(`Admin User found: ${admin.email}`);
        console.log(`Role: ${admin.role}`);
        // We verify the hash visually or simple assume it matches 'password' if seeded standardly
      } else {
        console.log(`Admin user '${adminEmail}' NOT found.`);
        const firstUser = await prisma.user.findFirst();
        console.log(`First available user: ${firstUser.email}`);
      }
    }

  } catch (e) {
    console.error("DB Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
