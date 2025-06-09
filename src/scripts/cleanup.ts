import { prisma } from "@/lib/prisma";

async function cleanOldDevotionals() {
  const THIRTY_DAYS_AGO = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  const deleted = await prisma.devocional.deleteMany({
    where: { date: { lt: THIRTY_DAYS_AGO } },
  });
  console.log(`Removidos ${deleted.count} devocionais antigos.`);
}

cleanOldDevotionals().then(() => process.exit());