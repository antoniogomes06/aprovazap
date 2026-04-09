"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";

const links = [
  { href: "/admin",          label: "Dashboard",      icon: LayoutDashboard },
  { href: "/admin/clients",  label: "Clientes",       icon: Users },
  { href: "/admin/posts",    label: "Posts",          icon: FileText },
  { href: "/admin/settings", label: "Configurações",  icon: Settings },
];

export function AdminNav() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Desktop nav */}
      <nav className="hidden md:flex items-center gap-1 flex-1 ml-2">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`az-nav-link flex items-center gap-1.5 ${isActive(l.href) ? "active" : ""}`}
          >
            <l.icon className="w-3.5 h-3.5" />
            {l.label}
          </Link>
        ))}
      </nav>

      {/* Mobile bottom tab bar */}
      <div
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t"
        style={{
          backgroundColor: "var(--bg-header)",
          borderColor: "var(--border-color)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="grid grid-cols-4">
          {links.map((l) => {
            const active = isActive(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="flex flex-col items-center gap-1 py-3 transition-colors"
                style={{ color: active ? "var(--accent-light)" : "var(--text-muted)" }}
              >
                <l.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{l.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
