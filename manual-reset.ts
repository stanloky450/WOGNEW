import { PrismaClient } from "@prisma/client"
import { hash, compare } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "news@wgministries.com"
  const plainPassword = "password123"
  
  console.log(`Resetting password for ${email}...`)
  
  const hashedPassword = await hash(plainPassword, 12)
  console.log("New Hash generated.")

  const updatedUser = await prisma.user.update({
    where: { email },
    data: { 
      password: hashedPassword,
      role: "NEWS_ADMIN" // Reinforce role
    }
  })

  console.log("User updated in DB.")

  // Verify immediately
  const valid = await compare(plainPassword, updatedUser.password)
  console.log(`Verification check: Password valid? ${valid}`)
  
  if (valid) {
      console.log("SUCCESS: Password reset complete. Please try logging in as news@wgministries.com")
  } else {
      console.error("ERROR: Hash verification failed immediately after update.")
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
