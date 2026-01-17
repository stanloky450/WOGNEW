const { PrismaClient } = require('@prisma/client')
const { hash } = require('bcryptjs')

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:./prisma/dev.db',
    },
  },
})

async function main() {
  console.log("Checking DB Content in ./prisma/dev.db...");
  
  const password = await hash("password123", 12)
  
  // Force create/update
  const user = await prisma.user.upsert({
    where: { email: "news@wgministries.com" },
    update: { 
        password: password,
        role: "NEWS_ADMIN" 
    },
    create: {
      email: "news@wgministries.com",
      name: "News Admin",
      password: password,
      role: "NEWS_ADMIN",
    },
  })
  
  console.log("Upserted User:", user.email, user.role);
  
  const count = await prisma.user.count();
  console.log("Total Users in DB:", count);
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
