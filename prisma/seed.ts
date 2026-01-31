import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

// const neonUrl = 'postgresql://neondb_owner:npg_Zwft1SOLCg2B@ep-restless-lake-ahetnrw5-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
const neonUrl = "postgresql://neondb_owner:npg_Zwft1SOLCg2B@ep-restless-lake-ahetnrw5-pooler.c-3.us-east-1.aws.neon.tech:5432/neondb?sslmode=require&pgbouncer=true&connection_limit=1";

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: neonUrl,
    },
  },
})

async function main() {
  console.log('--- Starting Explicit Seed (Neon) ---')
  // Create admin user
  const password = await hash("password123", 12)

  // 1. Super Admin
  // const superAdmin = await prisma.user.upsert({
  //   where: { email: "superadmin@wgministries.com" },
  //   update: { role: "SUPERADMIN", password: password },
  //   create: {
  //     email: "superadmin@wgministries.com",
  //     name: "Super Admin",
  //     password: password,
  //     role: "SUPERADMIN",
  //   },
  // })
  // console.log("Super Admin created: superadmin@wgministries.com")

  // 2. News Admin
  await prisma.user.upsert({
    where: { email: "news@wgministries.com" },
    update: { role: "NEWS_ADMIN", password: password },
    create: {
      email: "news@wgministries.com",
      name: "News Admin",
      password: password,
      role: "NEWS_ADMIN",
    },
  })
  console.log("News Admin created: news@wgministries.com")

  // 3. Events Admin
  await prisma.user.upsert({
    where: { email: "events@wgministries.com" },
    update: { role: "EVENT_ADMIN", password: password },
    create: {
      email: "events@wgministries.com",
      name: "Events Admin",
      password: password,
      role: "EVENT_ADMIN",
    },
  })
  console.log("Event Admin created: events@wgministries.com")

  // 4. Post Admin
  await prisma.user.upsert({
    where: { email: "posts@wgministries.com" },
    update: { role: "POST_ADMIN", password: password },
    create: {
      email: "posts@wgministries.com",
      name: "Posts Admin",
      password: password,
      role: "POST_ADMIN",
    },
  })
  console.log("Post Admin created: posts@wgministries.com")

  // const passwords = await hash("2026@Ekeze", 12)
  // await prisma.user.upsert({
  //   where: { email: "ekezefaith2003@gmail.com" },
  //   update: { role: "POST_ADMIN", password: passwords },
  //   create: {
  //     email: "ekezefaith2003@gmail.com",
  //     name: "Posts Admin",
  //     password: passwords,
  //     role: "POST_ADMIN",
  //   },
  // })
  // console.log("Post Admin created: ekezefaith2003@gmail.com")

  const passwords = await hash("2026@Ajayi", 12)
  await prisma.user.upsert({
    where: { email: "ajayiosetohamen@gmail.com" },
    update: { role: "ADMIN", password: passwords },
    create: {
      email: "ajayiosetohamen@gmail.com",
      name: "Samson Admin",
      password: passwords,
      role: "ADMIN",
    },
  })
  console.log("Post Admin created: ajayiosetohamen@gmail.com")

  await prisma.user.upsert({
    where: { email: "okpuzorexcel900@gmail.com" },
    update: { role: "ADMIN", password: password },
    create: {
      email: "okpuzorexcel900@gmail.com",
      name: "Excel Admin",
      password: password,
      role: "ADMIN",
    },
  })
  console.log("Post Admin created: okpuzorexcel900@gmail.com")

  await prisma.user.upsert({
    where: { email: "humblefamouxconceptz@gmail.com" },
    update: { role: "ADMIN", password: password },
    create: {
      email: "humblefamouxconceptz@gmail.com",
      name: "Humble Admin",
      password: password,
      role: "ADMIN",
    },
  })
  console.log("Post Admin created: humblefamouxconceptz@gmail.com")

  // 5. Legacy Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@wgministries.com" },
    update: { role: "ADMIN", password: password },
    create: {
      email: "admin@wgministries.com",
      name: "Admin User",
      password: password,
      role: "ADMIN",
    },
  })
  console.log("Legacy Admin created: admin@wgministries.com")

  // --- Seed Content ---
  console.log('--- Seeding Content ---')
  // const author = superAdmin; // Use superAdmin as the author for seed content
  // const author = admin; // Use superAdmin as the author for seed content

  // Seed Posts
  // console.log('Seeding Posts...')
  // const postsData = [
  //   {
  //     title: 'Welcome to Our New Website',
  //     content: 'We are excited to launch our new digital platform to better serve our community.',
  //     excerpt: 'Big announcements coming soon!',
  //     published: true,
  //     publishedAt: new Date(),
  //     authorId: author.id
  //   },
  //   {
  //     title: 'Sunday Service Schedule',
  //     content: 'Join us every Sunday at 9 AM and 11 AM for our worship services.',
  //     excerpt: 'Sunday Service times.',
  //     published: true,
  //     publishedAt: new Date(),
  //     authorId: author.id
  //   },
  //   {
  //     title: 'Weekly Service Schedule',
  //     content: 'Join us every Sunday at 9 AM and 11 AM for our worship services.',
  //     excerpt: 'Wednesday Service times.',
  //     published: true,
  //     publishedAt: new Date(),
  //     authorId: author.id
  //   }
  // ]

  // for (const post of postsData) {
  //    // Check if post with same title exists to avoid duplicates
  //    const existingValue = await prisma.post.findFirst({ where: { title: post.title }});
  //    if (!existingValue) {
  //       await prisma.post.create({ data: post });
  //       console.log(`Created post: ${post.title}`);
  //    }
  // }

  // // Seed News
  // console.log('Seeding News...')
  // const newsData = [
  //   {
  //     title: 'Community Outreach Program',
  //     content: 'Our monthly outreach program will take place this Saturday downtown.',
  //     excerpt: 'Helping our neighbors.',
  //     published: true,
  //     publishedAt: new Date(),
  //     authorId: author.id
  //   },
  //   {
  //     title: 'Youth Ministry Update',
  //     content: 'The youth ministry is planning a summer camp retreat. Registration opens next week.',
  //     excerpt: 'Summer Camp 2026',
  //     published: true,
  //     publishedAt: new Date(),
  //     authorId: author.id
  //   }
  // ]
  
  // for (const news of newsData) {
  //    const existingValue = await prisma.news.findFirst({ where: { title: news.title }});
  //    if (!existingValue) {
  //       await prisma.news.create({ data: news });
  //       console.log(`Created news: ${news.title}`);
  //    }
  // }

  // // Seed Events
  // console.log('Seeding Events...')
  // const eventsData = [
  //   {
  //     title: 'Worship Night',
  //     description: 'An evening of song and prayer.',
  //     date: new Date('2026-02-15T18:00:00Z'),
  //     location: 'Main Sanctuary',
  //     published: true,
  //     authorId: author.id
  //   },
  //   {
  //     title: 'Annual Picnic',
  //     description: 'Food, games, and fun for the whole family.',
  //     date: new Date('2026-05-20T12:00:00Z'),
  //     location: 'City Park',
  //     published: true,
  //     authorId: author.id
  //   }
  // ]
  
  // for (const event of eventsData) {
  //   const existingValue = await prisma.event.findFirst({ where: { title: event.title }});
  //   if (!existingValue) {
  //      await prisma.event.create({ data: event });
  //      console.log(`Created event: ${event.title}`);
  //   }
  // }

  console.log('--- Seeding Completed ---')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
