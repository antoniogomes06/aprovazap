import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

interface Decision {
  post_id: string;
  status: "approved" | "rejected";
  note?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { client_id, code, decisions } = (await req.json()) as {
      client_id: string;
      code: string;
      decisions: Decision[];
    };

    if (!client_id || !code || !decisions?.length) {
      return NextResponse.json({ error: "Parâmetros inválidos" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Valida o código
    const { data: approvalCode, error: codeErr } = await supabase
      .from("approval_codes")
      .select("id")
      .eq("client_id", client_id)
      .eq("code", code)
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .single();

    if (codeErr || !approvalCode) {
      return NextResponse.json(
        { error: "Código inválido ou expirado" },
        { status: 400 }
      );
    }

    // Marca código como usado
    await supabase
      .from("approval_codes")
      .update({ used: true })
      .eq("id", approvalCode.id);

    // Salva as aprovações e atualiza status dos posts
    const approvals = decisions.map((d) => ({
      post_id: d.post_id,
      client_id,
      status: d.status,
      note: d.note ?? null,
    }));

    const { error: approvalErr } = await supabase.from("approvals").insert(approvals);
    if (approvalErr) throw approvalErr;

    // Atualiza status dos posts
    for (const d of decisions) {
      await supabase
        .from("posts")
        .update({ status: d.status })
        .eq("id", d.post_id)
        .eq("client_id", client_id);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[verify-code]", err);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
