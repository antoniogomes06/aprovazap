import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  const supabase = createAdminClient();
  const { data } = await supabase.from("app_settings").select("key, value");

  const settings: Record<string, string> = {};
  data?.forEach((row) => { settings[row.key] = row.value ?? ""; });

  return NextResponse.json(settings);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const supabase = createAdminClient();

  const upserts = Object.entries(body).map(([key, value]) => ({
    key,
    value: value as string,
    updated_at: new Date().toISOString(),
  }));

  const { error } = await supabase
    .from("app_settings")
    .upsert(upserts, { onConflict: "key" });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
