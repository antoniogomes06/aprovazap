"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewClientPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    // TODO: save to Supabase
    await new Promise((r) => setTimeout(r, 800));

    router.push("/admin/clients");
  }

  return (
    <div className="max-w-lg space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/clients">
          <button className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-[#6366F1]/50 transition-all">
            <ArrowLeft className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Novo cliente</h1>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Nome do cliente"
            placeholder="Ex: Restaurante Sabor"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <Input
            label="WhatsApp"
            placeholder="+55 11 99999-9999"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <Button type="submit" size="lg" loading={loading}>
            Salvar cliente
          </Button>
        </form>
      </Card>
    </div>
  );
}
