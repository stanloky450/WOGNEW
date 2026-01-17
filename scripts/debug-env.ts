
import * as dotenv from 'dotenv'
import path from 'path'
import fs from 'fs'

dotenv.config()

console.log("--- Debug Env Script ---")
console.log("CWD:", process.cwd())
console.log("DATABASE_URL:", process.env.DATABASE_URL)

const prismaDbPath = path.join(process.cwd(), 'prisma', 'dev.db')
const rootDbPath = path.join(process.cwd(), 'dev.db')

console.log(`Checking path: ${prismaDbPath} -> Exists: ${fs.existsSync(prismaDbPath)}`)
console.log(`Checking path: ${rootDbPath} -> Exists: ${fs.existsSync(rootDbPath)}`)

console.log("--- End Debug ---")
