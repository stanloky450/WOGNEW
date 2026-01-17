
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- Database Content Verification ---')
  
  try {
    const userCount = await prisma.user.count()
    console.log(`Users: ${userCount}`)

    const postCount = await prisma.post.count()
    console.log(`Posts: ${postCount}`)

    const newsCount = await prisma.news.count()
    console.log(`News: ${newsCount}`)

    const eventCount = await prisma.event.count()
    console.log(`Events: ${eventCount}`)
    
    // Check if any published content exists
    const publishedPosts = await prisma.post.count({ where: { published: true } })
    console.log(`Published Posts: ${publishedPosts}`)

  } catch (e) {
    console.error('Error connecting to database:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
