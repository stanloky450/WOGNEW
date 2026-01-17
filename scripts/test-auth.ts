
import { PrismaClient } from '@prisma/client'
import { compare } from 'bcryptjs'
import * as dotenv from 'dotenv'

dotenv.config()

const prisma = new PrismaClient()

async function main() {
  console.log("1. Testing DB Connection...")
  try {
    const userCount = await prisma.user.count()
    console.log(`   - Connected! Found ${userCount} users.`)
  } catch (error) {
    console.error("   - FAILED to connect to DB:", error)
    return
  }

  console.log("2. Searching for Admin User...")
  const email = "admin@example.com" // Assuming this is the seed email
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    console.error(`   - User ${email} NOT FOUND.`)
    return
  }
  console.log(`   - Found user: ${user.email}`)
  console.log(`   - Role: ${user.role}`)
  console.log(`   - Hashed Password: ${user.password.substring(0, 10)}...`)

  console.log("3. Testing Password Verification...")
  const testPassword = "password" // Assuming this is the seed password
  const isValid = await compare(testPassword, user.password)

  if (isValid) {
    console.log("   - Password 'password' is VALID.")
  } else {
    console.error("   - Password 'password' is INVALID.")
  }
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
