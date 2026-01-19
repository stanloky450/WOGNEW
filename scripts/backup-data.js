
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const logPath = path.resolve(__dirname, 'backup_internal.log');
const backupPath = path.resolve(__dirname, 'data-backup.json');

function log(msg) {
  console.log(msg);
  try {
    fs.appendFileSync(logPath, msg + '\n');
  } catch (e) {}
}

// Clear log
try { fs.unlinkSync(logPath); } catch (e) {}

log('--- BACKUP START ---');

const prisma = new PrismaClient();

async function backup() {
  try {
    log('Connecting to Prisma...');
    const users = await prisma.user.findMany();
    log(`Found ${users.length} users`);
    
    const posts = await prisma.post.findMany();
    log(`Found ${posts.length} posts`);
    
    const news = await prisma.news.findMany();
    log(`Found ${news.length} news`);
    
    const events = await prisma.event.findMany();
    log(`Found ${events.length} events`);

    const data = { users, posts, news, events };
    
    fs.writeFileSync(backupPath, JSON.stringify(data, null, 2));
    log(`Backup written to ${backupPath}`);
  } catch (e) {
    log('Backup failed: ' + e.message);
    log(e.stack);
  } finally {
    await prisma.$disconnect();
  }
}

backup();
