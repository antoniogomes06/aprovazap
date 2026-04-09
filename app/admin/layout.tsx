import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/admin/logout-button";
import { Zap } from "lucide-react";
import Link from "next/link";

const navLinks = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/clients", label: "Clientes" },
  { href: "/admin/posts", label: "Posts" },
  { href: "/admin/settings", label: "Configurações" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <Link href="/admin" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-7 h-7 bg-[#6366F1] rounded-[8px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-[15px] text-[var(--text-primary)]">AprovaZap</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 flex-1">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="px-3 py-1.5 rounded-[8px] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden border-t border-[var(--border-color)] flex overflow-x-auto">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex-shrink-0 px-4 py-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] whitespace-nowrap"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
}
