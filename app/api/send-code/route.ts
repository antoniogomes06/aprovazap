import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendApprovalCode } from "@/lib/whatsapp";
import { generateCode } from "@/lib/utils";

export async function POST(req: NextRequest) {
  try {
    const { client_id } = await req.json();

    if (!client_id) {
      return NextResponse.json({ error: "client_id obrigatório" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Busca o cliente
    const { data: client, error: clientErr } = await supabase
      .from("clients")
      .select("id, name, phone")
      .eq("id", client_id)
      .single();

    if (clientErr || !client) {
      return NextResponse.json({ error: "Cliente não encontrado" }, { status: 404 });
    }

    // Invalida códigos anteriores não usados
    await supabase
      .from("approval_codes")
      .update({ used: true })
      .eq("client_id", client_id)
      .eq("used", false);

    // Gera novo código
    const code = generateCode(6);
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    const { error: insertErr } = await supabase.from("approval_codes").insert({
      client_id,
      code,
      expires_at: expiresAt,
    });

    if (insertErr) throw insertErr;

    // Envia via WhatsApp (Evolution API)
    await sendApprovalCode(client.phone, code, client.name);

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[send-code]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
