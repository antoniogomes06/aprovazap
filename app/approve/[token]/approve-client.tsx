"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { Post } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  Check,
  X,
  ExternalLink,
  Hash,
  Calendar,
  ChevronDown,
  ChevronUp,
  Zap,
} from "lucide-react";

type ApprovalState = "idle" | "awaiting_code" | "confirmed";

interface Props {
  token: string;
  posts: Post[];
  clientName: string;
}

export function ApproveClient({ token, posts, clientName }: Props) {
  const [decisions, setDecisions] = useState<Record<string, "approved" | "rejected">>({});
  const [expanded, setExpanded] = useState<string | null>(posts[0]?.id ?? null);
  const [state, setState] = useState<ApprovalState>("idle");
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [loading, setLoading] = useState(false);

  const allDecided = posts.every((p) => decisions[p.id]);

  function decide(postId: string, decision: "approved" | "rejected") {
    setDecisions((d) => ({ ...d, [postId]: decision }));
    // Auto-expand next undecided
    const nextUndecided = posts.find((p) => !decisions[p.id] && p.id !== postId);
    if (nextUndecided) setExpanded(nextUndecided.id);
  }

  async function handleSendCode() {
    setLoading(true);
    // TODO: call /api/send-code
    await new Promise((r) => setTimeout(r, 1000));
    setState("awaiting_code");
    setLoading(false);
  }

  async function handleVerifyCode() {
    if (code.length !== 6) {
      setCodeError("Digite os 6 dígitos");
      return;
    }
    setLoading(true);
    setCodeError("");
    // TODO: call /api/verify-code
    await new Promise((r) => setTimeout(r, 1000));
    setState("confirmed");
    setLoading(false);
  }

  if (state === "confirmed") {
    return (
      <div className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-green-500/15 flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Aprovação confirmada!</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-2">
            Suas escolhas foram registradas com sucesso. Obrigado!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/80 backdrop-blur-md">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-[#6366F1] rounded-[8px] flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" fill="white" />
            </div>
            <span className="font-bold text-[15px] text-[var(--text-primary)]">AprovaZap</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-4">
        {/* Welcome */}
        <div className="mb-2">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">Olá, {clientName}!</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Revise e aprove os conteúdos abaixo.
          </p>
        </div>

        {/* Posts */}
        {posts.map((post) => {
          const decision = decisions[post.id];
          const isExpanded = expanded === post.id;

          return (
            <div
              key={post.id}
              className={`rounded-[16px] border transition-all overflow-hidden ${
                decision === "approved"
                  ? "border-green-500/30 bg-green-500/5"
                  : decision === "rejected"
                  ? "border-red-500/30 bg-red-500/5"
                  : "border-[var(--border-color)] bg-[var(--bg-secondary)]"
              }`}
            >
              {/* Post header */}
              <button
                onClick={() => setExpanded(isExpanded ? null : post.id)}
                className="w-full flex items-center justify-between p-4 text-left"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-9 h-9 rounded-[10px] bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-[#818CF8]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[var(--text-primary)] text-sm truncate">
                      {post.theme}
                    </p>
                    <p className="text-xs text-[var(--text-secondary)]">{formatDate(post.date)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                  {decision && (
                    <StatusBadge status={decision} />
                  )}
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[var(--text-muted)]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
                  )}
                </div>
              </button>

              {/* Post details */}
              {isExpanded && (
                <div className="px-4 pb-4 space-y-4 border-t border-[var(--border-color)]">
                  <div className="pt-4">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                      {post.description}
                    </p>
                  </div>

                  {post.hashtags && (
                    <div className="flex items-start gap-2">
                      <Hash className="w-3.5 h-3.5 text-[#818CF8] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-[#818CF8]">{post.hashtags}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    {post.media_url && (
                      <a
                        href={post.media_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[#818CF8] transition-colors"
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
                        className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[#818CF8] transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Ver descritivo
                      </a>
                    )}
                  </div>

                  {/* Action buttons */}
                  {!decision && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <Button
                        variant="danger"
                        size="lg"
                        onClick={() => decide(post.id, "rejected")}
                        className="gap-2"
                      >
                        <X className="w-4 h-4" />
                        Rejeitar
                      </Button>
                      <Button
                        variant="success"
                        size="lg"
                        onClick={() => decide(post.id, "approved")}
                        className="gap-2"
                      >
                        <Check className="w-4 h-4" />
                        Aprovar
                      </Button>
                    </div>
                  )}

                  {decision && (
                    <button
                      onClick={() => setDecisions((d) => { const n = {...d}; delete n[post.id]; return n; })}
                      className="text-xs text-[var(--text-muted)] underline underline-offset-2"
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
        <div className="flex items-center gap-2 py-2">
          <div className="flex-1 h-1.5 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#6366F1] rounded-full transition-all duration-500"
              style={{ width: `${(Object.keys(decisions).length / posts.length) * 100}%` }}
            />
          </div>
          <span className="text-xs text-[var(--text-muted)] flex-shrink-0">
            {Object.keys(decisions).length}/{posts.length}
          </span>
        </div>

        {/* Confirm section */}
        {state === "idle" && allDecided && (
          <Button size="lg" onClick={handleSendCode} loading={loading}>
            Confirmar aprovações
          </Button>
        )}

        {state === "awaiting_code" && (
          <div className="space-y-4 p-5 rounded-[16px] bg-[var(--bg-secondary)] border border-[var(--border-color)]">
            <div>
              <p className="font-semibold text-[var(--text-primary)]">Digite o código</p>
              <p className="text-sm text-[var(--text-secondary)] mt-1">
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
              className="w-full h-14 text-center text-2xl font-bold tracking-[0.3em] rounded-[10px] bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[#6366F1] focus:ring-2 focus:ring-[#6366F1]/20 transition-all"
            />
            {codeError && <p className="text-xs text-red-400">{codeError}</p>}
            <Button size="lg" onClick={handleVerifyCode} loading={loading}>
              Verificar código
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
