'use server'

import { getOrCreateDevocionalDeHoje } from "@/lib/devocional";
import { NextResponse } from "next/server";

export async function GET() {
  const devocional = await getOrCreateDevocionalDeHoje();
  return NextResponse.json(devocional);
}