import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Plus } from "lucide-react";
import Link from "next/link";

export default function PostsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">Posts</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">Calendário de conteúdos</p>
        </div>
        <Link href="/admin/posts/new">
          <Button size="sm" className="gap-2">
            <Plus className="w-4 h-4" />
            Novo post
          </Button>
        </Link>
      </div>

      <Card>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-3">
            <FileText className="w-6 h-6 text-[var(--text-muted)]" />
          </div>
          <p className="font-medium text-[var(--text-primary)]">Nenhum post ainda</p>
          <p className="text-sm text-[var(--text-muted)] mt-1">Crie o primeiro post para aprovação</p>
          <Link href="/admin/posts/new" className="mt-4">
            <Button size="sm">Criar post</Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
