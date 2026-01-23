import { PrismaClient } from '@prisma/client'

const neonUrl = 'postgresql://neondb_owner:npg_Zwft1SOLCg2B@ep-restless-lake-ahetnrw5-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: neonUrl,
    },
  },
})

async function main() {
  console.log('--- Checking Neon Database Content ---')
  console.log('URL utilized:', neonUrl);
  
  try {
    const userCount = await prisma.user.count();
    console.log(`User Count: ${userCount}`);
    
    if (userCount > 0) {
        const users = await prisma.user.findMany({ select: { email: true, role: true }});
        console.log('Users found:', users);
    }

    const postCount = await prisma.post.count();
    console.log(`Post Count: ${postCount}`);

    const newsCount = await prisma.news.count();
    console.log(`News Count: ${newsCount}`);

    const eventCount = await prisma.event.count();
    console.log(`Event Count: ${eventCount}`);

  } catch (e) {
    console.error('Error connecting or querying Neon:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
