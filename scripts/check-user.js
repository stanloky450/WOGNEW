
const { PrismaClient } = require('@prisma/client')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const prisma = new PrismaClient()

async function main() {
  console.log('--- USER CHECK ---')
  try {
    const users = await prisma.user.findMany()
    console.log(`Total Users: ${users.length}`)
    users.forEach(u => console.log(` - ${u.email} (${u.role}) ID: ${u.id}`))

    const debugUser = await prisma.user.findUnique({ where: { id: 'debug-user-id' } })
    console.log(`Debug User Exists: ${!!debugUser}`)
    
  } catch (e) {
    console.error('Error:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
