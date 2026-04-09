import { createAdminClient } from "@/lib/supabase/admin";
import { ApproveClient } from "./approve-client";
import { notFound } from "next/navigation";

export default async function ApprovePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = createAdminClient();

  // Valida o token
  const { data: approvalToken } = await supabase
    .from("approval_tokens")
    .select("client_id, used, expires_at")
    .eq("token", token)
    .single();

  if (
    !approvalToken ||
    approvalToken.used ||
    new Date(approvalToken.expires_at) < new Date()
  ) {
    notFound();
  }

  const clientId = approvalToken.client_id;

  // Busca cliente
  const { data: client } = await supabase
    .from("clients")
    .select("id, name")
    .eq("id", clientId)
    .single();

  if (!client) notFound();

  // Busca posts pendentes do cliente
  const { data: posts } = await supabase
    .from("posts")
    .select("*")
    .eq("client_id", clientId)
    .eq("status", "pending")
    .order("date", { ascending: true });

  if (!posts?.length) {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-2xl mb-2">✅</p>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">
            Tudo aprovado!
          </h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Não há conteúdos pendentes de aprovação no momento.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ApproveClient
      token={token}
      clientId={clientId}
      posts={posts}
      clientName={client.name}
    />
  );
}
