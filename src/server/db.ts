import { PrismaClient } from '@prisma/client';

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.COPILOT_ENVIRONMENT_NAME
      ? ['error']
      : ['query', 'error', 'warn'],
  });

if (process.env.COPILOT_ENVIRONMENT_NAME !== 'prod')
  globalForPrisma.prisma = prisma;
