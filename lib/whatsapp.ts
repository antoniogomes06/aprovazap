/**
 * Evolution API — WhatsApp integration
 * Docs: https://doc.evolution-api.com
 */

const BASE_URL = process.env.EVOLUTION_API_URL!;
const API_KEY = process.env.EVOLUTION_API_KEY!;
const INSTANCE = process.env.EVOLUTION_INSTANCE!;

async function evRequest(path: string, body: object) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apikey: API_KEY,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Evolution API error ${res.status}: ${err}`);
  }

  return res.json();
}

export async function sendTextMessage(phone: string, text: string) {
  // Evolution API expects number WITHOUT + and WITHOUT special chars
  const number = phone.replace(/\D/g, "");

  return evRequest(`/message/sendText/${INSTANCE}`, {
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
    `Acesse o link abaixo para revisar:\n${link}\n\n` +
    `_Leva menos de 2 minutos!_ 🚀`;

  return sendTextMessage(phone, text);
}
