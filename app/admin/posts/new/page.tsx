"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    date: "", theme: "", description: "", hashtags: "", media_url: "", docs_url: "",
  });

  function set(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: save to Supabase
    await new Promise((r) => setTimeout(r, 800));
    router.push("/admin/posts");
  }

  return (
    <div className="max-w-lg space-y-5 fade-in">
      <div className="flex items-center gap-3">
        <Link href="/admin/posts">
          <button className="az-icon-btn">
            <ArrowLeft className="w-4 h-4" />
          </button>
        </Link>
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Novo post
          </h1>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Preencha os dados do conteúdo
          </p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Data"
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
              required
            />
            <Input
              label="Tema"
              placeholder="Ex: Promoção"
              value={form.theme}
              onChange={(e) => set("theme", e.target.value)}
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" style={{ color: "var(--text-secondary)" }}>
              Descritivo
            </label>
            <textarea
              rows={4}
              placeholder="Texto do post..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="az-input"
              style={{ height: "auto", paddingTop: 12, paddingBottom: 12 }}
              required
            />
          </div>

          <Input
            label="Hashtags"
            placeholder="#marketing #promo"
            value={form.hashtags}
            onChange={(e) => set("hashtags", e.target.value)}
          />
          <Input
            label="Link das mídias"
            placeholder="https://drive.google.com/..."
            value={form.media_url}
            onChange={(e) => set("media_url", e.target.value)}
          />
          <Input
            label="Link dos descritivos"
            placeholder="https://docs.google.com/..."
            value={form.docs_url}
            onChange={(e) => set("docs_url", e.target.value)}
          />

          <div className="pt-2">
            <Button type="submit" size="lg" loading={loading}>
              Salvar post
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
