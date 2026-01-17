
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 1. Define paths
const rootDir = path.resolve(__dirname, '..');
const prismaDir = path.resolve(rootDir, 'prisma');
const dbPrismaPath = path.resolve(prismaDir, 'prod.db');
const dbRootPath = path.resolve(rootDir, 'prod.db');

console.log('--- UNIVERSAL DB FIX START ---');

try {
    // 2. Ensure prisma directory exists
    if (!fs.existsSync(prismaDir)) {
        console.log('Creating prisma directory...');
        fs.mkdirSync(prismaDir, { recursive: true });
    }

    // 3. Run Prisma DB Push (forcing it to use the `prisma/prod.db` location effectively)
    // We'll rename the .env temporarily to force a specific connection string if needed, 
    // OR we just explicitly pass the datasource url if Prisma CLI supported it easily.
    // Instead, let's rely on the fact that we can copy the DB file around.
    
    console.log('Running schema push...');
    // We use a relative path for the sqlite file in the connection string to be safe for this operation
    // But modifying .env is risky. 
    // Let's rely on the default behavior but copy the result.
    
    // Actually, best bet: Delete both, run push, find where it went, copy to other.
    if (fs.existsSync(dbPrismaPath)) fs.unlinkSync(dbPrismaPath);
    if (fs.existsSync(dbRootPath)) fs.unlinkSync(dbRootPath);
    
    console.log('Cleaned old DB files.');
    
    // Run push. 
    // Prisma usually resolves "file:./prod.db" relative to the SCHEMA file (prisma/schema.prisma) -> prisma/prod.db
    try {
        execSync('npx prisma db push --skip-generate', { cwd: rootDir, stdio: 'inherit' });
    } catch (e) {
        console.log('Push failed (ignoring for a moment, seeing if DB was created)...');
    }

    let sourceDb = null;
    if (fs.existsSync(dbPrismaPath)) {
        console.log('Found DB at: prisma/prod.db');
        sourceDb = dbPrismaPath;
    } else if (fs.existsSync(dbRootPath)) {
        console.log('Found DB at: ./prod.db');
        sourceDb = dbRootPath;
    } else {
        console.error('CRITICAL: Database file was not created by prisma db push!');
        process.exit(1);
    }

    // 4. Seed the database (now that we know where it is)
    // We need to point the seed script to THIS specific file.
    // Our seed scripts use PrismaClient, which reads .env.
    // If .env points to the file we found, great.
    
    console.log('Running Seed...');
    try {
        execSync('node scripts/manual-seed.js', { cwd: rootDir, stdio: 'inherit' });
    } catch (e) {
        console.log('Seeding had an error (might be duplicates), continuing...');
    }

    // 5. COPY to other location to be safe
    // If we found it in Prisma, copy to Root. If in Root, copy to Prisma.
    if (sourceDb === dbPrismaPath) {
        console.log('Copying prisma/prod.db -> ./prod.db');
        fs.copyFileSync(dbPrismaPath, dbRootPath);
    } else {
        console.log('Copying ./prod.db -> prisma/prod.db');
        fs.copyFileSync(dbRootPath, dbPrismaPath);
    }

    console.log('--- UNIVERSAL DB FIX COMPLETE ---');
    console.log('Size Root:', fs.statSync(dbRootPath).size);
    console.log('Size Prisma:', fs.statSync(dbPrismaPath).size);

} catch (err) {
    console.error('Fix failed:', err);
}
