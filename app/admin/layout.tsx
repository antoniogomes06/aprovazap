import { ThemeToggle } from "@/components/theme-toggle";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#6366F1] rounded-[8px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-[15px] text-[var(--text-primary)]">AprovaZap</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/admin"
              className="px-3 py-1.5 rounded-[8px] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
            >
              Dashboard
            </Link>
            <Link
              href="/admin/clients"
              className="px-3 py-1.5 rounded-[8px] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
            >
              Clientes
            </Link>
            <Link
              href="/admin/posts"
              className="px-3 py-1.5 rounded-[8px] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
            >
              Posts
            </Link>
          </nav>

          <ThemeToggle />
        </div>
      </header>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
