"use client";

import { useState } from "react";
import { StatusBadge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Post } from "@/types";
import { formatDate } from "@/lib/utils";
import { Check, X, ExternalLink, Hash, Calendar, ChevronDown, ChevronUp, Zap } from "lucide-react";

type ApprovalState = "idle" | "awaiting_code" | "confirmed";

interface Props {
  token: string;
  clientId: string;
  posts: Post[];
  clientName: string;
}

export function ApproveClient({ clientId, posts, clientName }: Props) {
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});
  const [expanded, setExpanded] = useState<string | null>(posts[0]?.id ?? null);
  const [state, setState] = useState<ApprovalState>("idle");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const allDecided = posts.every((p) => decisions[p.id]);
  const decidedCount = Object.keys(decisions).length;

  function decide(postId: string, decision: "approved" | "rejected") {
    setDecisions((d) => ({ ...d, [postId]: decision }));
    const next = posts.find((p) => !decisions[p.id] && p.id !== postId);
    if (next) setExpanded(next.id);
  }

  async function handleSendCode() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ client_id: clientId }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setState("awaiting_code");
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Erro ao enviar código");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyCode() {
    if (code.length !== 6) { setCodeError("Digite os 6 dígitos"); return; }
    setLoading(true);
    setCodeError("");
    try {
      const res = await fetch("/api/verify-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          client_id: clientId,
          code,
          decisions: Object.entries(decisions).map(([post_id, status]) => ({ post_id, status })),
        }),
      });
      if (!res.ok) throw new Error((await res.json()).error);
      setState("confirmed");
    } catch (e: unknown) {
      setCodeError(e instanceof Error ? e.message : "Código inválido ou expirado");
    } finally {
      setLoading(false);
    }
  }

  /* ── Confirmado ── */
  if (state === "confirmed") {
    return (
      <div
        className="min-h-screen flex items-center justify-center px-4"
        style={{ backgroundColor: "var(--bg-primary)" }}
      >
        <div className="text-center max-w-sm fade-in">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "var(--success-bg)", border: "1px solid var(--success-border)" }}
          >
            <Check className="w-10 h-10" style={{ color: "var(--success)" }} />
          </div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Aprovação confirmada!
          </h1>
          <p className="text-sm mt-2" style={{ color: "var(--text-secondary)" }}>
            Suas escolhas foram registradas com sucesso. Obrigado!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--bg-primary)" }}>
      {/* Header */}
      <header className="app-header">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className="w-7 h-7 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--accent)" }}
            >
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-[15px]" style={{ color: "var(--text-primary)" }}>
              AprovaZap
            </span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4 pb-10">
        {/* Welcome */}
        <div>
          <h1 className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
            Olá, {clientName}!
          </h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
            Revise e aprove os conteúdos abaixo.
          </p>
        </div>

        {/* Posts */}
        {posts.map((post) => {
          const decision = decisions[post.id];
          const isOpen = expanded === post.id;
          const borderColor = decision === "approved"
            ? "var(--success-border)"
            : decision === "rejected"
            ? "var(--danger-border)"
            : "var(--border-color)";
          const bgColor = decision === "approved"
            ? "var(--success-bg)"
            : decision === "rejected"
            ? "var(--danger-bg)"
            : "var(--bg-secondary)";

          return (
            <div
              key={post.id}
              className="rounded-2xl overflow-hidden transition-all duration-200"
              style={{ border: `1px solid ${borderColor}`, backgroundColor: bgColor }}
            >
              {/* Trigger */}
              <button
                onClick={() => setExpanded(isOpen ? null : post.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: "rgba(99,102,241,0.12)" }}
                  >
                    <Calendar className="w-4 h-4" style={{ color: "var(--accent-light)" }} />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-sm truncate" style={{ color: "var(--text-primary)" }}>
                      {post.theme}
                    </p>
                    <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                      {formatDate(post.date)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {decision && <StatusBadge status={decision} />}
                  {isOpen
                    ? <ChevronUp className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                    : <ChevronDown className="w-4 h-4" style={{ color: "var(--text-muted)" }} />
                  }
                </div>
              </button>

              {/* Content */}
              {isOpen && (
                <div
                  className="px-4 pb-4 space-y-4"
                  style={{ borderTop: `1px solid ${borderColor}` }}
                >
                  <p className="text-sm leading-relaxed pt-4" style={{ color: "var(--text-primary)" }}>
                    {post.description}
                  </p>

                  {post.hashtags && (
                    <div className="flex items-start gap-2">
                      <Hash className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" style={{ color: "var(--accent-light)" }} />
                      <p className="text-xs" style={{ color: "var(--accent-light)" }}>
                        {post.hashtags}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    {post.media_url && (
                      <a
                        href={post.media_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs transition-colors"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver mídias
                      </a>
                    )}
                    {post.docs_url && (
                      <a
                        href={post.docs_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver descritivo
                      </a>
                    )}
                  </div>

                  {!decision && (
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <button
                        onClick={() => decide(post.id, "rejected")}
                        className="az-btn az-btn-danger az-btn-lg gap-2"
                      >
                        <X className="w-4 h-4" /> Rejeitar
                      </button>
                      <button
                        onClick={() => decide(post.id, "approved")}
                        className="az-btn az-btn-success az-btn-lg gap-2"
                      >
                        <Check className="w-4 h-4" /> Aprovar
                      </button>
                    </div>
                  )}

                  {decision && (
                    <button
                      onClick={() => setDecisions((d) => { const n = { ...d }; delete n[post.id]; return n; })}
                      className="text-xs underline underline-offset-2"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Desfazer decisão
                    </button>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Progress */}
        <div className="flex items-center gap-3">
          <div
            className="flex-1 h-1.5 rounded-full overflow-hidden"
            style={{ backgroundColor: "var(--bg-tertiary)" }}
          >
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(decidedCount / posts.length) * 100}%`,
                backgroundColor: "var(--accent)",
              }}
            />
          </div>
          <span className="text-xs flex-shrink-0" style={{ color: "var(--text-muted)" }}>
            {decidedCount}/{posts.length} revisados
          </span>
        </div>

        {error && (
          <p className="text-sm text-center" style={{ color: "var(--danger)" }}>{error}</p>
        )}

        {/* CTA */}
        {state === "idle" && allDecided && (
          <button
            onClick={handleSendCode}
            disabled={loading}
            className="az-btn az-btn-primary az-btn-lg"
          >
            {loading && <span className="spinner" />}
            {loading ? "Enviando..." : "Confirmar aprovações"}
          </button>
        )}

        {/* Código */}
        {state === "awaiting_code" && (
          <div
            className="p-5 rounded-2xl space-y-4"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border-color)",
            }}
          >
            <div>
              <p className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Digite o código
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                Enviamos um código de 6 dígitos para o seu WhatsApp.
              </p>
            </div>
            <input
              type="text"
              inputMode="numeric"
              maxLength={6}
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              placeholder="000000"
              className="az-input"
              style={{
                height: 56,
                textAlign: "center",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "0.3em",
              }}
            />
            {codeError && (
              <p className="text-xs" style={{ color: "var(--danger)" }}>{codeError}</p>
            )}
            <button
              onClick={handleVerifyCode}
              disabled={loading}
              className="az-btn az-btn-primary az-btn-lg"
            >
              {loading && <span className="spinner" />}
              {loading ? "Verificando..." : "Verificar código"}
            </button>
            <button
              onClick={handleSendCode}
              disabled={loading}
              className="w-full text-xs underline underline-offset-2"
              style={{ color: "var(--text-muted)" }}
            >
              Reenviar código
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
