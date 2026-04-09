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
    date: "",
    theme: "",
    description: "",
    hashtags: "",
    media_url: "",
    docs_url: "",
  });

  function set(field: string, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    // TODO: save to Supabase
    await new Promise((r) => setTimeout(r, 800));
    router.push("/admin/posts");
  }

  return (
    <div className="max-w-lg space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/admin/posts">
          <button className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-[#6366F1]/50 transition-all">
            <ArrowLeft className="w-4 h-4 text-[var(--text-secondary)]" />
          </button>
        </Link>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">Novo post</h1>
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
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Descritivo
            </label>
            <textarea
              rows={4}
              placeholder="Texto do post..."
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              className="px-4 py-3 rounded-[10px] bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all resize-none"
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

          <Button type="submit" size="lg" loading={loading}>
            Salvar post
          </Button>
        </form>
      </Card>
    </div>
  );
}
