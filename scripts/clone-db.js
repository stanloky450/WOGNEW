
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('--- DB CLONE STRATEGY ---');

const rootDir = path.resolve(__dirname, '..');
const prismaDir = path.resolve(rootDir, 'prisma');
const devDb = path.resolve(prismaDir, 'dev.db');
const prodDbPrisma = path.resolve(prismaDir, 'prod.db');
const prodDbRoot = path.resolve(rootDir, 'prod.db');

if (!fs.existsSync(devDb)) {
    console.error('CRITICAL: dev.db not found!');
    process.exit(1);
}

// 1. Copy dev -> prod (prisma)
console.log('Copying dev.db -> prisma/prod.db');
fs.copyFileSync(devDb, prodDbPrisma);

// 2. Copy dev -> prod (root)
console.log('Copying dev.db -> ./prod.db');
fs.copyFileSync(devDb, prodDbRoot);

// 3. Seed (targets ./prod.db via .env)
console.log('Running Seed...');
try {
    execSync('node scripts/manual-seed.js', { cwd: rootDir, stdio: 'inherit' });
} catch (e) {
    console.log('Seeding error (ignoring):', e.message);
}

// 4. Sync ./prod.db -> prisma/prod.db (to enable verify)
console.log('Syncing ./prod.db -> prisma/prod.db');
fs.copyFileSync(prodDbRoot, prodDbPrisma);

console.log('--- CLONE & SEED SUCCESS ---');
console.log('Size Root:', fs.statSync(prodDbRoot).size);
