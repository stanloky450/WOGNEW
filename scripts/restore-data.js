
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function restore() {
  console.log('--- RESTORE START ---');
  const backupPath = path.resolve(__dirname, 'data-backup.json');
  
  if (!fs.existsSync(backupPath)) {
      console.error('No backup file found at ' + backupPath);
      return;
  }

  const data = JSON.parse(fs.readFileSync(backupPath, 'utf8'));
  console.log(`Loaded backup: ${data.users.length} users, ${data.posts.length} posts, ${data.news.length} news, ${data.events.length} events.`);

  try {
    // 1. Users
    for (const u of data.users) {
        await prisma.user.upsert({
            where: { email: u.email },
            update: { name: u.name, role: u.role, password: u.password },
            create: { ...u }
        });
    }
    console.log('Users restored.');

    // 2. Posts (must link to author)
    for (const p of data.posts) {
        // Check if author exists, else default to first admin or debug user
        const authorExists = await prisma.user.findUnique({ where: { id: p.authorId } });
        if (!authorExists) {
            console.log(`Post ${p.id} author ${p.authorId} missing. Skipping or reassigning...`);
            continue; 
        }
        
        await prisma.post.upsert({
            where: { id: p.id },
            update: { ...p },
            create: { ...p }
        });
    }
    console.log('Posts restored.');
    
    // 3. News
    for (const n of data.news) {
         const authorExists = await prisma.user.findUnique({ where: { id: n.authorId } });
         if (!authorExists) continue;
         
         await prisma.news.upsert({
            where: { id: n.id },
            update: { ...n },
            create: { ...n }
        });
    }
    console.log('News restored.');
    
    // 4. Events
    for (const e of data.events) {
         const authorExists = await prisma.user.findUnique({ where: { id: e.authorId } });
         if (!authorExists) continue;

        await prisma.event.upsert({
            where: { id: e.id },
            update: { ...e },
            create: { ...e }
        });
    }
    console.log('Events restored.');

    console.log('--- RESTORE COMPLETE ---');
  } catch (e) {
    console.error('Restore failed:', e);
  } finally {
    await prisma.$disconnect();
  }
}

restore();
