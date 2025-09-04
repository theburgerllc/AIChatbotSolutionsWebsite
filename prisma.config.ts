// Prisma configuration file (Prisma 6/7 ready)
// Ensures Prisma CLI loads environment variables for the schema.
// Strategy:
// 1) Load .env at repo root (optional)
// 2) If prisma/.env exists, load it and let it override root vars
// This mirrors Prisma's historical behavior when no config file was present.

import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { config as loadEnv } from 'dotenv'

const cwd = process.cwd()
const rootEnv = resolve(cwd, '.env')
const prismaEnv = resolve(cwd, 'prisma', '.env')

// Load root .env first (if present)
if (existsSync(rootEnv)) {
  loadEnv({ path: rootEnv, override: false })
}
// Load prisma/.env afterwards to take precedence if it exists
if (existsSync(prismaEnv)) {
  loadEnv({ path: prismaEnv, override: true })
}

export default {
  schema: './prisma/schema.prisma',
} as const;
