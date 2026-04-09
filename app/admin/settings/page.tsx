"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Smartphone, Check, AlertCircle, Loader2 } from "lucide-react";

type Settings = {
  evolution_api_url: string;
  evolution_api_key: string;
  evolution_instance: string;
};

const empty: Settings = { evolution_api_url: "", evolution_api_key: "", evolution_instance: "" };

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
      .then((data) => { setForm({ ...empty, ...data }); setLoading(false); });
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
    if (!form.evolution_api_url || !form.evolution_api_key) return;
    setTesting(true);
    setTestResult(null);
    try {
      const res = await fetch(
        `${form.evolution_api_url.replace(/\/$/, "")}/instance/fetchInstances`,
        { headers: { apikey: form.evolution_api_key } }
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
        <Loader2 className="w-6 h-6 animate-spin" style={{ color: "var(--text-muted)" }} />
      </div>
    );
  }

  return (
    <div className="max-w-lg space-y-6 fade-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
          Configurações
        </h1>
        <p className="text-sm mt-0.5" style={{ color: "var(--text-secondary)" }}>
          Integração com WhatsApp via Evolution API
        </p>
      </div>

      {/* WhatsApp config */}
      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ backgroundColor: "var(--success-bg)", border: "1px solid var(--success-border)" }}
          >
            <Smartphone className="w-5 h-5" style={{ color: "var(--success)" }} />
          </div>
          <div>
            <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
              Evolution API
            </p>
            <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
              Configure sua instância do WhatsApp
            </p>
          </div>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium block" style={{ color: "var(--text-secondary)" }}>
              URL da API
            </label>
            <input
              type="url"
              placeholder="https://api.seudominio.com"
              value={form.evolution_api_url}
              onChange={(e) => set("evolution_api_url", e.target.value)}
              className="az-input"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium block" style={{ color: "var(--text-secondary)" }}>
              API Key (Global)
            </label>
            <input
              type="password"
              placeholder="••••••••••••••••"
              value={form.evolution_api_key}
              onChange={(e) => set("evolution_api_key", e.target.value)}
              className="az-input"
            />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Encontre em: Painel Evolution → Configurações → API Key global
            </p>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium block" style={{ color: "var(--text-secondary)" }}>
              Nome da Instância
            </label>
            <input
              type="text"
              placeholder="aprovazap"
              value={form.evolution_instance}
              onChange={(e) => set("evolution_instance", e.target.value)}
              className="az-input"
            />
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              Nome exato da instância criada na Evolution, já conectada ao WhatsApp
            </p>
          </div>

          {/* Test result */}
          {testResult && (
            <div
              className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-sm"
              style={{
                backgroundColor: testResult === "ok" ? "var(--success-bg)" : "var(--danger-bg)",
                border: `1px solid ${testResult === "ok" ? "var(--success-border)" : "var(--danger-border)"}`,
                color: testResult === "ok" ? "var(--success)" : "var(--danger)",
              }}
            >
              {testResult === "ok"
                ? <Check className="w-4 h-4 flex-shrink-0" />
                : <AlertCircle className="w-4 h-4 flex-shrink-0" />
              }
              {testResult === "ok"
                ? "Conexão com Evolution API funcionando!"
                : "Não foi possível conectar. Verifique a URL e API Key."}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleTest}
              disabled={testing || !form.evolution_api_url}
              className="az-btn az-btn-secondary az-btn-md flex-1"
            >
              {testing && <span className="spinner spinner-dark" />}
              {testing ? "Testando..." : "Testar conexão"}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="az-btn az-btn-primary az-btn-md flex-1"
            >
              {saving
                ? <span className="spinner" />
                : saved
                ? <Check className="w-4 h-4" />
                : null
              }
              {saving ? "Salvando..." : saved ? "Salvo!" : "Salvar"}
            </button>
          </div>
        </form>
      </Card>

      {/* Guide */}
      <Card>
        <p className="font-semibold mb-4" style={{ color: "var(--text-primary)" }}>
          Como configurar
        </p>
        <ol className="space-y-3">
          {[
            "Instale a Evolution API no seu servidor ou use um serviço hospedado",
            "No painel da Evolution, crie uma instância (ex: \"aprovazap\")",
            "Conecte ao WhatsApp escaneando o QR Code gerado",
            "Copie a URL da API e a API Key global",
            "Cole os dados acima e clique em Salvar",
          ].map((step, i) => (
            <li key={i} className="flex gap-3 text-sm" style={{ color: "var(--text-secondary)" }}>
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold"
                style={{
                  backgroundColor: "rgba(99,102,241,0.12)",
                  color: "var(--accent-light)",
                }}
              >
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}
