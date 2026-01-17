
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('--- DIAGNOSTIC START ---')
  console.log('Service: Post/News/Event Verification')
  
  try {
    // 1. Check Connection & User Count
    const userCount = await prisma.user.count()
    console.log(`[PASS] DB Connection Successful. Users found: ${userCount}`)
    
    // 2. Check Posts
    const postCount = await prisma.post.count()
    const validPosts = await prisma.post.findMany({ 
        where: { published: true }, 
        take: 3,
        include: { author: { select: { email: true } } } 
    })
    console.log(`[DATA] Posts Total: ${postCount}`)
    console.log(`[DATA] Published Posts: ${validPosts.length}`)
    validPosts.forEach(p => console.log(` - Post: "${p.title}" by ${p.author.email}`))

    // 3. Check News
    const newsCount = await prisma.news.count()
    console.log(`[DATA] News Total: ${newsCount}`)

    // 4. Check Events
    const eventCount = await prisma.event.count()
    console.log(`[DATA] Events Total: ${eventCount}`)
    
  } catch (error) {
    console.error('[FAIL] Database Error:', error)
  } finally {
    await prisma.$disconnect()
    console.log('--- DIAGNOSTIC END ---')
  }
}

main()
