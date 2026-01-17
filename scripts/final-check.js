
const { PrismaClient } = require('@prisma/client');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('--- FINAL CHECK ---');
  try {
    const userCount = await prisma.user.count();
    const postCount = await prisma.post.count();
    const newsCount = await prisma.news.count();
    
    console.log(`Users: ${userCount}`);
    console.log(`Posts: ${postCount}`);
    console.log(`News: ${newsCount}`);
    
    if (userCount > 0 && postCount > 0) {
        console.log('SUCCESS: Database is populated.');
    } else {
        console.log('FAILURE: Database is empty.');
    }
  } catch (e) {
    console.error('ERROR:', e.message);
  } finally {
    await prisma.$disconnect();
  }
}

main();
