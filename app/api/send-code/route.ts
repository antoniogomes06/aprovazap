import { NextRequest, NextResponse } from "next/server";
import { generateCode } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const { client_id, token } = await req.json();

  if (!client_id || !token) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // TODO: implement with Supabase + WhatsApp API
  const code = generateCode(6);
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 min

  // 1. Save code to approval_codes table
  // 2. Send WhatsApp message with code

  console.log(`Code for ${client_id}: ${code}`);

  return NextResponse.json({ ok: true, expires_at: expiresAt });
}
