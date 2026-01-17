
const path = require('path');
const fs = require('fs');

console.log("--- Debug Env Script (JS) ---");
console.log("CWD:", process.cwd());

// Manually load .env since we don't assume dotenv is working/installed in run time context easily without it
try {
  const envPath = path.join(process.cwd(), '.env');
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf8');
    const dbUrlLine = envContent.split('\n').find(line => line.startsWith('DATABASE_URL='));
    console.log("Found .env manually.");
    console.log("DATABASE_URL line:", dbUrlLine ? dbUrlLine.trim() : "Not found");
  } else {
    console.log(".env file NOT found at:", envPath);
  }
} catch (e) {
  console.log("Error reading .env:", e.message);
}

const prismaDbPath = path.join(process.cwd(), 'prisma', 'dev.db');
const rootDbPath = path.join(process.cwd(), 'dev.db');

console.log(`Checking path: ${prismaDbPath} -> Exists: ${fs.existsSync(prismaDbPath)}`);
console.log(`Checking path: ${rootDbPath} -> Exists: ${fs.existsSync(rootDbPath)}`);

console.log("--- End Debug ---");
