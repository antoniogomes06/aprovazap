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
    <div className="max-w-lg space-y-5 fade-in">
      <div className="flex items-center gap-3">
        <Link href="/admin/clients">
          <button className="az-icon-btn">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Novo cliente
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Preencha os dados abaixo
          </p>
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
            placeholder="5511999999999"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            required
          />
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Número com DDD e código do país (ex: 5511999999999)
          </p>
          <div className="pt-2">
            <Button type="submit" size="lg" loading={loading}>
              Salvar cliente
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
