import { PrismaClient } from "@prisma/client"
import { compare } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "superadmin@wgministries.com"
  const password = "password123"

  console.log(`Checking user: ${email}`)
  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    console.error("User NOT FOUND in database.")
    return
  }

  console.log("User found:", user.role)
  console.log("stored hash:", user.password)

  const isValid = await compare(password, user.password)
  console.log(`Password '${password}' valid?`, isValid)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
