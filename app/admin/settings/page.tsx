"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Smartphone, Check, AlertCircle, Loader2 } from "lucide-react";

type Settings = {
  evolution_api_url: string;
  evolution_api_key: string;
  evolution_instance: string;
};

const empty: Settings = {
  evolution_api_url: "",
  evolution_api_key: "",
  evolution_instance: "",
};

export default function SettingsPage() {
  const [form, setForm] = useState<Settings>(empty);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [saved, setSaved] = useState(false);
  const [testResult, setTestResult] = useState<"ok" | "error" | null>(null);

  function set(k: keyof Settings, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
    setTestResult(null);
  }

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        setForm({ ...empty, ...data });
        setLoading(false);
      });
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(res.ok);
  }

  async function handleTest() {
    if (!form.evolution_api_url || !form.evolution_api_key || !form.evolution_instance) return;
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(
        `${form.evolution_api_url.replace(/\/$/, "")}/instance/fetchInstances`,
        {
          headers: { apikey: form.evolution_api_key },
        }
      );
      setTestResult(res.ok ? "ok" : "error");
    } catch {
      setTestResult("error");
    } finally {
      setTesting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-6 h-6 animate-spin text-[var(--text-muted)]" />
      </div>
    );
  }

  return (
    <div className="max-w-lg space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">Configurações</h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          Integração com WhatsApp via Evolution API
        </p>
      </div>

      {/* WhatsApp Card */}
      <Card>
        <div className="flex items-center gap-3 mb-5">
          <div className="w-9 h-9 rounded-[10px] bg-green-500/10 flex items-center justify-center">
            <Smartphone className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="font-semibold text-[var(--text-primary)]">Evolution API</p>
            <p className="text-xs text-[var(--text-secondary)]">
              Configure sua instância do WhatsApp
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          {/* URL */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              URL da API
            </label>
            <input
              type="url"
              placeholder="https://api.seudominio.com"
              value={form.evolution_api_url}
              onChange={(e) => set("evolution_api_url", e.target.value)}
              className="w-full h-11 px-4 rounded-[10px] bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all text-sm"
            />
          </div>

          {/* API Key */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              API Key (Global)
            </label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              value={form.evolution_api_key}
              onChange={(e) => set("evolution_api_key", e.target.value)}
              className="w-full h-11 px-4 rounded-[10px] bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all text-sm"
            />
            <p className="text-xs text-[var(--text-muted)]">
              Encontre em: <span className="text-[#818CF8]">Painel Evolution → API Key global</span>
            </p>
          </div>

          {/* Instance */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-[var(--text-secondary)]">
              Nome da Instância
            </label>
            <input
              type="text"
              placeholder="aprovazap"
              value={form.evolution_instance}
              onChange={(e) => set("evolution_instance", e.target.value)}
              className="w-full h-11 px-4 rounded-[10px] bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all text-sm"
            />
            <p className="text-xs text-[var(--text-muted)]">
              Nome da instância criada na Evolution API. Deve estar conectada ao WhatsApp.
            </p>
          </div>

          {/* Status da conexão */}
          {testResult && (
            <div
              className={`flex items-center gap-2.5 px-4 py-3 rounded-[10px] border text-sm ${
                testResult === "ok"
                  ? "bg-green-500/10 border-green-500/20 text-green-400"
                  : "bg-red-500/10 border-red-500/20 text-red-400"
              }`}
            >
              {testResult === "ok" ? (
                <Check className="w-4 h-4 flex-shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
              )}
              {testResult === "ok"
                ? "Conexão com a Evolution API está funcionando!"
                : "Não foi possível conectar. Verifique a URL e a API Key."}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleTest}
              disabled={testing || !form.evolution_api_url}
              className="flex-1 h-11 rounded-[10px] border border-[var(--border-color)] bg-[var(--bg-tertiary)] text-[var(--text-secondary)] text-sm font-medium hover:border-[#6366F1]/50 hover:text-[var(--text-primary)] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {testing && <Loader2 className="w-4 h-4 animate-spin" />}
              {testing ? "Testando..." : "Testar conexão"}
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex-1 h-11 rounded-[10px] bg-[#6366F1] hover:bg-[#4F46E5] text-white text-sm font-semibold transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_4px_12px_rgba(99,102,241,0.3)]"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : saved ? (
                <Check className="w-4 h-4" />
              ) : null}
              {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
            </button>
          </div>
        </form>
      </Card>

      {/* Guia rápido */}
      <Card>
        <p className="font-semibold text-[var(--text-primary)] mb-3">Como configurar</p>
        <ol className="space-y-2 text-sm text-[var(--text-secondary)]">
          {[
            "Instale a Evolution API no seu servidor ou use um serviço hospedado",
            'No painel da Evolution, crie uma instância (ex: "aprovazap")',
            "Conecte ao WhatsApp escaneando o QR Code",
            "Copie a URL da API e a API Key global",
            "Cole os dados acima e clique em Salvar",
          ].map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className="w-5 h-5 rounded-full bg-[#6366F1]/15 text-[#818CF8] text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-bold">
                {i + 1}
              </span>
              <span>{step}</span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
