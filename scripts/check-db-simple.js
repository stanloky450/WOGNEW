
const { PrismaClient } = require('@prisma/client');

// Hardcoding the connection string for verification purposes
// We know the file is at prisma/dev.db
// Use default env
const prisma = new PrismaClient()

async function main() {
  try {
    console.log("Connecting to DB (Direct Path)...");
    const count = await prisma.user.count();
    console.log(`Total Users: ${count}`);

    if (count > 0) {
        const user = await prisma.user.findUnique({
            where: { email: 'admin@example.com' }
        });
        if (user) {
            console.log("Admin User Found:", user.email);
            console.log("Password Hash Start:", user.password.substring(0, 10));
        } else {
            console.log("Admin user NOT found.");
        }
    } else {
        console.log("Database is empty.");
    }
  } catch (e) {
    console.error("DB Error:", e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
