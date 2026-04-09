import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Plus } from "lucide-react";
import Link from "next/link";

export default function ClientsPage() {
  return (
    <div className="space-y-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
            Clientes
          </h1>
          <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
            Gerencie seus clientes
          </p>
        </div>
        <Link href="/admin/clients/new">
          <Button size="sm" className="gap-1.5">
            <Plus className="w-4 h-4" />
            Novo cliente
          </Button>
        </Link>
      </div>

      <Card>
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-4"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <Users className="w-7 h-7" style={{ color: "var(--text-muted)" }} />
          </div>
          <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
            Nenhum cliente ainda
          </p>
          <p className="text-sm mt-1 mb-5" style={{ color: "var(--text-muted)" }}>
            Comece cadastrando seu primeiro cliente
          </p>
          <Link href="/admin/clients/new">
            <Button size="sm">Cadastrar cliente</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
