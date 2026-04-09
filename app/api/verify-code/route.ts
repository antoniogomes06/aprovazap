import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { client_id, code, decisions } = await req.json();

  if (!client_id || !code || !decisions) {
    return NextResponse.json({ error: "Missing params" }, { status: 400 });
  }

  // TODO:
  // 1. Find code in approval_codes where client_id = client_id AND code = code AND used = false AND expires_at > now
  // 2. If not found: return 400
  // 3. Mark code as used
  // 4. Save each decision to approvals table
  // 5. Update posts status

  return NextResponse.json({ ok: true });
}
