import { Card } from "@/components/ui/card";
import { Users, FileText, CheckCircle, Clock, Plus } from "lucide-react";
import Link from "next/link";

const stats = [
  { label: "Clientes",  value: "0", icon: Users,       href: "/admin/clients" },
  { label: "Posts",     value: "0", icon: FileText,    href: "/admin/posts" },
  { label: "Aprovados", value: "0", icon: CheckCircle, href: "/admin/posts?status=approved" },
  { label: "Pendentes", value: "0", icon: Clock,       href: "/admin/posts?status=pending" },
];

const actions = [
  { href: "/admin/clients/new", icon: Users,    label: "Novo cliente", desc: "Cadastrar cliente e número WhatsApp" },
  { href: "/admin/posts/new",   icon: FileText, label: "Novo post",    desc: "Adicionar conteúdo para aprovação" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Dashboard
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
          Visão geral dos seus conteúdos
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="cursor-pointer transition-all duration-150 hover:shadow-md">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                style={{ backgroundColor: "rgba(99,102,241,0.12)" }}
              >
                <s.icon className="w-4 h-4" style={{ color: "var(--accent-light)" }} />
              </div>
              <div className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
                {s.value}
              </div>
              <div className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                {s.label}
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* Grid bottom */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Ações rápidas
          </h2>
          <div className="space-y-1">
            {actions.map((a) => (
              <Link key={a.href} href={a.href} className="az-hover-row flex items-center gap-3 p-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "rgba(99,102,241,0.12)" }}
                >
                  <a.icon className="w-4 h-4" style={{ color: "var(--accent-light)" }} />
                </div>
                <div>
                  <div className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
                    {a.label}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {a.desc}
                  </div>
                </div>
                <Plus className="w-4 h-4 ml-auto flex-shrink-0" style={{ color: "var(--text-muted)" }} />
              </Link>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
            Pendentes de aprovação
          </h2>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
              style={{ backgroundColor: "var(--bg-tertiary)" }}
            >
              <CheckCircle className="w-6 h-6" style={{ color: "var(--text-muted)" }} />
            </div>
            <p className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Nenhum post pendente
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Tudo aprovado por enquanto
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
