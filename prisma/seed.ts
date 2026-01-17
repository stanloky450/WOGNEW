import { PrismaClient } from "@prisma/client"
import { hash } from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const password = await hash("password123", 12)

  // 1. Super Admin
  const superAdmin = await prisma.user.upsert({
    where: { email: "superadmin@wgministries.com" },
    update: { role: "SUPERADMIN", password: password },
    create: {
      email: "superadmin@wgministries.com",
      name: "Super Admin",
      password: password,
      role: "SUPERADMIN",
    },
  })
  console.log("Super Admin created: superadmin@wgministries.com")

  // 2. News Admin
  const newsAdmin = await prisma.user.upsert({
    where: { email: "news@wgministries.com" },
    update: { role: "NEWS_ADMIN", password: password },
    create: {
      email: "news@wgministries.com",
      name: "News Admin",
      password: password,
      role: "NEWS_ADMIN",
    },
  })
  console.log("News Admin created: news@wgministries.com")

  // 3. Events Admin
  const eventAdmin = await prisma.user.upsert({
    where: { email: "events@wgministries.com" },
    update: { role: "EVENT_ADMIN", password: password },
    create: {
      email: "events@wgministries.com",
      name: "Events Admin",
      password: password,
      role: "EVENT_ADMIN",
    },
  })
  console.log("Event Admin created: events@wgministries.com")

  // 4. Post Admin
  const postAdmin = await prisma.user.upsert({
    where: { email: "posts@wgministries.com" },
    update: { role: "POST_ADMIN", password: password },
    create: {
      email: "posts@wgministries.com",
      name: "Posts Admin",
      password: password,
      role: "POST_ADMIN",
    },
  })
  console.log("Post Admin created: posts@wgministries.com")

  // 5. Legacy Admin
  const admin = await prisma.user.upsert({
    where: { email: "admin@wgministries.com" },
    update: { role: "ADMIN", password: password },
    create: {
      email: "admin@wgministries.com",
      name: "Admin User",
      password: password,
      role: "ADMIN",
    },
  })
  console.log("Legacy Admin created: admin@wgministries.com")

  console.log("All passwords are: password123")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
