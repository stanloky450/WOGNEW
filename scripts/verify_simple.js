
const { PrismaClient } = require('@prisma/client')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const prisma = new PrismaClient()

async function main() {
  console.log('--- Simple Database Verification ---')
  try {
    const userCount = await prisma.user.count()
    console.log(`Users: ${userCount}`)
    
    const postCount = await prisma.post.count()
    console.log(`Posts: ${postCount}`)
    
    const newsCount = await prisma.news.count()
    console.log(`News: ${newsCount}`)
    
    const eventCount = await prisma.event.count()
    console.log(`Events: ${eventCount}`)
    
  } catch (e) {
    console.error('Error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
