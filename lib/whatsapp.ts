/**
 * Evolution API — WhatsApp integration
 * Settings lidos do Supabase (app_settings) com fallback para env vars.
 */

import { createAdminClient } from "./supabase/admin";

interface EvolutionConfig {
  url: string;
  apiKey: string;
  instance: string;
}

async function getConfig(): Promise<EvolutionConfig> {
  try {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("app_settings")
      .select("key, value")
      .in("key", ["evolution_api_url", "evolution_api_key", "evolution_instance"]);

    const map: Record<string, string> = {};
    data?.forEach((r) => { map[r.key] = r.value ?? ""; });

    return {
      url: map.evolution_api_url || process.env.EVOLUTION_API_URL || "",
      apiKey: map.evolution_api_key || process.env.EVOLUTION_API_KEY || "",
      instance: map.evolution_instance || process.env.EVOLUTION_INSTANCE || "",
    };
  } catch {
    // Fallback para env vars se DB não disponível
    return {
      url: process.env.EVOLUTION_API_URL ?? "",
      apiKey: process.env.EVOLUTION_API_KEY ?? "",
      instance: process.env.EVOLUTION_INSTANCE ?? "",
    };
  }
}

async function evRequest(config: EvolutionConfig, path: string, body: object) {
  const base = config.url.replace(/\/$/, "");

  const res = await fetch(`${base}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: config.apiKey,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Evolution API ${res.status}: ${err}`);
  }

  return res.json();
}

export async function sendTextMessage(phone: string, text: string) {
  const config = await getConfig();

  if (!config.url || !config.apiKey || !config.instance) {
    throw new Error("Evolution API não configurada. Acesse Configurações.");
  }

  const number = phone.replace(/\D/g, "");

  return evRequest(config, `/message/sendText/${config.instance}`, {
    number,
    text,
  });
}

export async function sendApprovalCode(phone: string, code: string, clientName: string) {
  const text =
    `✅ *AprovaZap*\n\n` +
    `Olá, ${clientName}!\n\n` +
    `Seu código de confirmação é:\n\n` +
    `*${code}*\n\n` +
    `_Este código expira em 10 minutos._`;

  return sendTextMessage(phone, text);
}

export async function sendApprovalLink(phone: string, clientName: string, link: string) {
  const text =
    `📋 *AprovaZap*\n\n` +
    `Olá, ${clientName}!\n\n` +
    `Há conteúdos aguardando sua aprovação.\n\n` +
    `Acesse o link abaixo:\n${link}\n\n` +
    `_Leva menos de 2 minutos!_ 🚀`;

  return sendTextMessage(phone, text);
}
