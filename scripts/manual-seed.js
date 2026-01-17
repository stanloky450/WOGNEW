
const { PrismaClient } = require('@prisma/client')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const prisma = new PrismaClient()

async function main() {
  console.log('--- Seeding Content (Manual JS) ---')

  // 1. Find or Create an Author (User)
  let author = await prisma.user.findFirst({
    where: { role: 'ADMIN' }
  })

  if (!author) {
    author = await prisma.user.findFirst() 
  }

  if (!author) {
    console.log('No users found. Creating a default admin user...')
    author = await prisma.user.create({
      data: {
        email: 'seed_admin@wgministries.com',
        password: '$2a$12$eX.u5uH9z/..password..hash',
        name: 'Seed Admin',
        role: 'ADMIN'
      }
    })
  }
  
  console.log(`Using Author: ${author.email} (${author.id})`)

  // 2. Seed Posts
  console.log('Seeding Posts...')
  try {
      await prisma.post.create({
        data: {
          title: 'Welcome to Our New Website',
          content: 'We are excited to launch our new digital platform to better serve our community.',
          excerpt: 'Big announcements coming soon!',
          published: true,
          publishedAt: new Date(),
          authorId: author.id
        }
      })
      
      await prisma.post.create({
        data: {
          title: 'Weekly Service Schedule',
          content: 'Join us every Sunday at 9 AM and 11 AM for our worship services.',
          excerpt: 'Sunday Service times.',
          published: true,
          publishedAt: new Date(),
          authorId: author.id
        }
      })
  } catch(e) { console.log("Post seeding error/dupe:", e.message) }

  // 3. Seed News
  console.log('Seeding News...')
  try {
      await prisma.news.create({
        data: {
          title: 'Community Outreach Program',
          content: 'Our monthly outreach program will take place this Saturday downtown.',
          excerpt: 'Helping our neighbors.',
          published: true,
          publishedAt: new Date(),
          authorId: author.id
        }
      })

      await prisma.news.create({
        data: {
          title: 'Youth Ministry Update',
          content: 'The youth ministry is planning a summer camp retreat. Registration opens next week.',
          excerpt: 'Summer Camp 2026',
          published: true,
          publishedAt: new Date(),
          authorId: author.id
        }
      })
  } catch(e) { console.log("News seeding error/dupe:", e.message) }

  // 4. Seed Events
  console.log('Seeding Events...')
  try {
      await prisma.event.create({
        data: {
          title: 'Worship Night',
          description: 'An evening of song and prayer.',
          date: new Date('2026-02-15T18:00:00Z'),
          location: 'Main Sanctuary',
          published: true,
          authorId: author.id
        }
      })

      await prisma.event.create({
        data: {
          title: 'Annual Picnic',
          description: 'Food, games, and fun for the whole family.',
          date: new Date('2026-05-20T12:00:00Z'),
          location: 'City Park',
          published: true,
          authorId: author.id
        }
      })
  } catch(e) { console.log("Event seeding error/dupe:", e.message) }

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
