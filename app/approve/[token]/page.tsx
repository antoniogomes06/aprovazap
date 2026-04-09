import { ApproveClient } from "./approve-client";

export default async function ApprovePage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // TODO: fetch posts by token from Supabase
  const mockPosts = [
    {
      id: "1",
      date: "2024-04-15",
      theme: "Promoção de Páscoa",
      description:
        "Celebre a Páscoa com a gente! Produtos especiais com até 30% de desconto. Aproveite essa oportunidade única para presentear quem você ama.",
      hashtags: "#pascoa #promocao #desconto",
      media_url: "https://drive.google.com",
      docs_url: null,
      status: "pending" as const,
      client_id: "1",
      created_at: new Date().toISOString(),
    },
    {
      id: "2",
      date: "2024-04-18",
      theme: "Lançamento novo produto",
      description:
        "Novidade chegando! Conheça nossa mais nova linha de produtos, desenvolvida especialmente para você.",
      hashtags: "#novidade #lancamento #produto",
      media_url: "https://drive.google.com",
      docs_url: null,
      status: "pending" as const,
      client_id: "1",
      created_at: new Date().toISOString(),
    },
  ];

  return <ApproveClient token={token} posts={mockPosts} clientName="Cliente" />;
}
