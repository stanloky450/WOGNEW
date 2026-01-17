const { PrismaClient } = require('@prisma/client')
const fs = require('fs')

const prisma = new PrismaClient()

async function main() {
  console.log("Starting debug script...")
  console.log("DATABASE_URL:", process.env.DATABASE_URL)
  
  try {
    const users = await prisma.user.findMany()
    console.log("Users found:", users.length)
    
    const output = {
        db_url: process.env.DATABASE_URL,
        users: users
    }
    
    fs.writeFileSync("debug_output.json", JSON.stringify(output, null, 2))
    console.log("Successfully wrote debug_output.json")
  } catch (e) {
    console.error("Error:", e)
    fs.writeFileSync("debug_error.txt", e.toString())
  } finally {
    await prisma.$disconnect()
  }
}

main()
