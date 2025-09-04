// Prisma configuration file (Prisma 6/7 ready)
// Keeps all behavior the same; simply declares where the schema lives.
// Client generation is still explicitly invoked by scripts to avoid Vercel cache issues.

export default {
  schema: './prisma/schema.prisma',
} as const;
