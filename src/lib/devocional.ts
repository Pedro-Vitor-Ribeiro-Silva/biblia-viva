import { prisma } from "./prisma";
import { getTodaysDevocional } from "./gemini";
import { startOfMonth, endOfMonth } from "date-fns";

export async function getOrCreateDevocionalDeHoje() {
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  let devocional = await prisma.devocional.findUnique({
    where: { date: hoje },
  });

  if (!devocional) {
    const content = await getTodaysDevocional();
    devocional = await prisma.devocional.create({
      data: { date: hoje, content },
    });
  }

  return devocional;
}

export async function getDevocionaisDoMes() {
  const agora = new Date();
  const inicio = startOfMonth(agora);
  const fim = endOfMonth(agora);

  return prisma.devocional.findMany({
    where: {
      date: {
        gte: inicio,
        lte: fim,
      },
    },
    orderBy: {
      date: "asc",
    },
  });
}
