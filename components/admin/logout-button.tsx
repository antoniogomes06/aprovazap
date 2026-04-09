"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="w-9 h-9 rounded-full flex items-center justify-center bg-[var(--bg-tertiary)] border border-[var(--border-color)] hover:border-red-500/40 hover:text-red-400 text-[var(--text-secondary)] transition-all"
      title="Sair"
    >
      <LogOut className="w-4 h-4" />
    </button>
  );
}
