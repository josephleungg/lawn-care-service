"use server";

import { business } from "@/content/business";
import { isServiceSlug, getService } from "@/content/services";

export type QuoteField = "name" | "phone" | "city" | "service";

export type QuoteState = {
  status: "idle" | "invalid" | "sent" | "failed";
  invalid: QuoteField[];
};

const text = (data: FormData, key: string) =>
  String(data.get(key) ?? "").trim().slice(0, 2000);

export async function submitQuote(
  _previous: QuoteState,
  data: FormData,
): Promise<QuoteState> {
  // Bots fill the hidden field; give them a normal-looking success.
  if (text(data, "company")) return { status: "sent", invalid: [] };

  const name = text(data, "name");
  const phone = text(data, "phone");
  const city = text(data, "city");
  const service = text(data, "service");
  const message = text(data, "message");

  const invalid: QuoteField[] = [];
  if (!name) invalid.push("name");
  if (phone.replace(/\D/g, "").length < 10) invalid.push("phone");
  if (!city) invalid.push("city");
  if (!isServiceSlug(service)) invalid.push("service");
  if (invalid.length > 0 || !isServiceSlug(service)) {
    return { status: "invalid", invalid };
  }

  const { RESEND_API_KEY, QUOTE_TO_EMAIL, QUOTE_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !QUOTE_TO_EMAIL || !QUOTE_FROM_EMAIL) {
    console.error("Quote form is missing its email configuration");
    return { status: "failed", invalid: [] };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: QUOTE_FROM_EMAIL,
      to: [QUOTE_TO_EMAIL],
      subject: `Quote request: ${getService(service).nameEn} (${city})`,
      text: [
        `Name: ${name}`,
        `Phone: ${phone}`,
        `City: ${city}`,
        `Service: ${getService(service).nameEn}`,
        "",
        message || "(no message)",
        "",
        `Sent from the ${business.name} website`,
      ].join("\n"),
    }),
  }).catch(() => null);

  if (!response?.ok) {
    console.error("Quote email failed", response?.status);
    return { status: "failed", invalid: [] };
  }

  return { status: "sent", invalid: [] };
}
