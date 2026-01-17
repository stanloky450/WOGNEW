
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Seeding Content ---')

  // 1. Find or Create an Author (User)
  let author = await prisma.user.findFirst({
    where: { role: 'ADMIN' } // Try to find an admin first
  })

  if (!author) {
    author = await prisma.user.findFirst() // Fallback to any user
  }

  if (!author) {
    console.log('No users found. Creating a default admin user for seeding content...')
    author = await prisma.user.create({
      data: {
        email: 'seed_admin@wgministries.com',
        password: '$2a$12$eX.u5uH9z/..password..hash', // distinct hash not needed for this test content owner
        name: 'Seed Admin',
        role: 'ADMIN'
      }
    })
  }
  
  console.log(`Using Author: ${author.email} (${author.id})`)

  // 2. Seed Posts
  console.log('Seeding Posts...')
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

  // 3. Seed News
  console.log('Seeding News...')
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

  // 4. Seed Events
  console.log('Seeding Events...')
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
