const { PrismaClient } = require('@prisma/client')
// Try to load env like Next.js might (or just rely on process.env if run via node -r dotenv/config)
// We will manually load .env file to be sure
const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '.env');
console.log("Loading .env from:", envPath);
const envContent = fs.readFileSync(envPath, 'utf8');
console.log("Env content snippet:", envContent.split('\n').find(l => l.startsWith('DATABASE_URL')));

// Manual parse to ensure we see what node sees
const dbUrlLine = envContent.split('\n').find(l => l.startsWith('DATABASE_URL='));
if (dbUrlLine) {
    const val = dbUrlLine.split('=')[1].replace(/"/g, '').trim();
    process.env.DATABASE_URL = val;
    console.log("Manually set DATABASE_URL to:", process.env.DATABASE_URL);
}

const prisma = new PrismaClient()

async function main() {
  console.log("Connecting to DB...");
  try {
    const user = await prisma.user.findUnique({
        where: { email: 'news@wgministries.com' }
    });
    console.log("User lookup result:", user);
    fs.writeFileSync("verify_result.txt", "User Found: " + JSON.stringify(user));
  } catch (e) {
    console.error("Error:", e);
    fs.writeFileSync("verify_result.txt", "Error: " + e.toString());
  } finally {
    await prisma.$disconnect();
  }
}

main();
