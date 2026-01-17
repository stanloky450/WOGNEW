
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: 'file:../prisma/dev.db',
    },
  },
});

async function main() {
  console.log("--- STARTING DB DEBUG ---");
  const authorId = "debug-user-id";

  try {
    console.log("1. Attempting to UPSERT Debug User...");
    const user = await prisma.user.upsert({
      where: { id: authorId },
      update: {
        role: 'ADMIN' // Force update role just in case
      },
      create: {
        id: authorId,
        email: "debug@test.com",
        name: "Debug Admin",
        password: "debug_hashed_password_placeholder",
        role: "ADMIN",
      }
    });
    console.log("   > Success! User:", user.email, "Role:", user.role);

    console.log("2. Attempting to CREATE Post...");
    const post = await prisma.post.create({
        data: {
            title: "Debug Post Title",
            content: "Debug Post Content",
            excerpt: "Debug Excerpt",
            published: false,
            authorId: authorId
        }
    });
    console.log("   > Success! Post Created ID:", post.id);

  } catch (e) {
    console.error("!!! ERROR !!!");
    console.error(e);
  } finally {
    await prisma.$disconnect();
    console.log("--- FINISHED ---");
  }
}

main();
