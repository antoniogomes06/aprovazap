import { Card } from "@/components/ui/card";
import { Users, FileText, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Clientes", value: "0", icon: Users, href: "/admin/clients" },
  { label: "Posts", value: "0", icon: FileText, href: "/admin/posts" },
  { label: "Aprovados", value: "0", icon: CheckCircle, href: "/admin/posts?status=approved" },
  { label: "Pendentes", value: "0", icon: Clock, href: "/admin/posts?status=pending" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Dashboard</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Visão geral dos seus conteúdos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:border-[#6366F1]/40 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-[8px] bg-[#6366F1]/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-[#818CF8]" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[var(--text-primary)]">{stat.value}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-0.5">{stat.label}</div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold text-[var(--text-primary)] mb-3">Ações rápidas</h2>
          <div className="space-y-2">
            <Link
              href="/admin/clients/new"
              className="flex items-center gap-3 p-3 rounded-[10px] hover:bg-[var(--bg-tertiary)] transition-all group"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#6366F1]/10 flex items-center justify-center">
                <Users className="w-4 h-4 text-[#818CF8]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">Novo cliente</div>
                <div className="text-xs text-[var(--text-muted)]">Cadastrar cliente e número WhatsApp</div>
              </div>
            </Link>
            <Link
              href="/admin/posts/new"
              className="flex items-center gap-3 p-3 rounded-[10px] hover:bg-[var(--bg-tertiary)] transition-all group"
            >
              <div className="w-8 h-8 rounded-[8px] bg-[#6366F1]/10 flex items-center justify-center">
                <FileText className="w-4 h-4 text-[#818CF8]" />
              </div>
              <div>
                <div className="text-sm font-medium text-[var(--text-primary)]">Novo post</div>
                <div className="text-xs text-[var(--text-muted)]">Adicionar conteúdo para aprovação</div>
              </div>
            </Link>
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold text-[var(--text-primary)] mb-3">Pendentes de aprovação</h2>
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <div className="w-10 h-10 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-2">
              <CheckCircle className="w-5 h-5 text-[var(--text-muted)]" />
            </div>
            <p className="text-sm text-[var(--text-muted)]">Nenhum post pendente</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
