'use server'

import { getDevocionaisDoMes } from "@/lib/devocional";
import { NextResponse } from "next/server";

export async function GET() {
  const devocionais = await getDevocionaisDoMes();
  return NextResponse.json(devocionais);
}