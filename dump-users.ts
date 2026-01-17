import { PrismaClient } from "@prisma/client"
import * as fs from "fs"

const prisma = new PrismaClient()

async function main() {
  const users = await prisma.user.findMany()
  const output = {
    env_db_url: process.env.DATABASE_URL,
    users: users
  }
  
  fs.writeFileSync("users_dump.json", JSON.stringify(output, null, 2))
  console.log("Dumped users to users_dump.json")
}

main()
  .catch(e => {
    console.error(e)
    fs.writeFileSync("users_dump_error.txt", e.toString())
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
