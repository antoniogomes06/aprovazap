import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendApprovalLink } from "@/lib/whatsapp";

export async function POST(req: NextRequest) {
  try {
    const { client_id } = await req.json();

    if (!client_id) {
      return NextResponse.json({ error: "client_id obrigatório" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data: client, error: clientErr } = await supabase
      .from("clients")
      .select("id, name, phone")
      .eq("id", client_id)
      .single();

    if (clientErr || !client) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
    }

    // Cria ou reutiliza token de aprovação válido
    const { data: existing } = await supabase
      .from("approval_tokens")
      .select("token")
      .eq("client_id", client_id)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    let token: string;

    if (existing?.token) {
      token = existing.token;
    } else {
      const { data: newToken, error: tokenErr } = await supabase
        .from("approval_tokens")
        .insert({ client_id })
        .select("token")
        .single();

      if (tokenErr || !newToken) throw tokenErr;
      token = newToken.token;
    }

    const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://aprovazap.vercel.app";
    const link = `${baseUrl}/approve/${token}`;

    await sendApprovalLink(client.phone, client.name, link);

    return NextResponse.json({ ok: true, link });
  } catch (err) {
    console.error("[send-link]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
