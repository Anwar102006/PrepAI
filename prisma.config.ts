import path from 'node:path';
import { defineConfig } from 'prisma/config';
import { config } from 'dotenv';

// Load .env.local if available
config({ path: '.env.local' });

export default defineConfig({
  schema: path.join(__dirname, 'prisma', 'schema.prisma'),
  datasource: {
    url: process.env.DATABASE_URL ?? '',
  },
  migrations: {
    seed: 'npx ts-node prisma/seed.ts',
  },
});
