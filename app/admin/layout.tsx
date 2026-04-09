import { AdminNav } from "@/components/admin/admin-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoutButton } from "@/components/admin/logout-button";
import { Zap } from "lucide-react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Header */}
      <header className="app-header">
        <div
          className="max-w-6xl mx-auto px-4 h-14 flex items-center gap-4"
          style={{ minHeight: 56 }}
        >
          {/* Logo */}
          <Link href="/admin" className="flex items-center gap-2 flex-shrink-0">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-[15px]" style={{ color: "var(--text-primary)" }}>
              AprovaZap
            </span>
          </Link>

          {/* Nav (desktop inline, mobile is bottom bar) */}
          <AdminNav />

          {/* Actions */}
          <div className="flex items-center gap-2 ml-auto">
            <ThemeToggle />
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Main — pb-20 no mobile para não sobrepor com bottom nav */}
      <main className="max-w-6xl mx-auto px-4 py-6 pb-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}
