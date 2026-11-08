"use client";

import Link from "next/link";
import { startTransition, useActionState } from "react";

import { submitQuote, type QuoteField, type QuoteState } from "@/actions/quote";
import { business } from "@/content/business";
import type { Locale } from "@/content/locales";
import type { Dictionary } from "@/dictionaries";

const initialState: QuoteState = { status: "idle", invalid: [] };

type QuoteFormProps = {
  lang: Locale;
  labels: Dictionary["quote"];
  cities: string[];
  services: { value: string; label: string }[];
};

export function QuoteForm({ lang, labels, cities, services }: QuoteFormProps) {
  const [state, action, pending] = useActionState(submitQuote, initialState);

  if (state.status === "sent") {
    return (
      <p role="status" className="text-xl text-lime">
        {labels.success}
      </p>
    );
  }

  const fieldProps = (field: QuoteField) => {
    const invalid = state.invalid.includes(field);
    return {
      id: `quote-${field}`,
      name: field,
      required: true,
      className: "field",
      "aria-invalid": invalid,
      "aria-describedby": invalid ? `quote-${field}-error` : undefined,
    };
  };

  const error = (field: QuoteField) =>
    state.invalid.includes(field) && (
      <p id={`quote-${field}-error`} className="mt-1 text-sm text-[#f0a57c]">
        {labels.errors[field]}
      </p>
    );

  return (
    <form
      action={action}
      className="flex flex-col gap-5"
      onSubmit={(event) => {
        // Calling the action directly stops React resetting the fields on error.
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        startTransition(() => action(data));
      }}
    >
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          Company
          <input name="company" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="quote-name" className="mb-1 block">
            {labels.name}
          </label>
          <input {...fieldProps("name")} autoComplete="name" />
          {error("name")}
        </div>
        <div>
          <label htmlFor="quote-phone" className="mb-1 block">
            {labels.phone}
          </label>
          <input {...fieldProps("phone")} type="tel" autoComplete="tel" />
          {error("phone")}
        </div>
        <div>
          <label htmlFor="quote-city" className="mb-1 block">
            {labels.city}
          </label>
          <select {...fieldProps("city")} defaultValue="">
            <option value="" disabled>
              {labels.cityPlaceholder}
            </option>
            {cities.map((city) => (
              <option key={city}>{city}</option>
            ))}
            <option>{labels.cityOther}</option>
          </select>
          {error("city")}
        </div>
        <div>
          <label htmlFor="quote-service" className="mb-1 block">
            {labels.service}
          </label>
          <select {...fieldProps("service")} defaultValue="">
            <option value="" disabled>
              {labels.servicePlaceholder}
            </option>
            {services.map((service) => (
              <option key={service.value} value={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {error("service")}
        </div>
      </div>

      <div>
        <label htmlFor="quote-message" className="mb-1 block">
          {labels.message}
        </label>
        <textarea id="quote-message" name="message" rows={4} className="field" />
      </div>

      {state.status === "failed" && (
        <p role="alert" className="text-[#f0a57c]">
          {labels.failure}{" "}
          <a href={business.phoneHref} className="underline">
            {business.phoneDisplay}
          </a>
        </p>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="submit"
          disabled={pending}
          className="btn btn-lime disabled:opacity-60"
        >
          {pending ? labels.sending : labels.submit}
        </button>
        <Link href={`/${lang}/privacy`} className="link-grow text-sm">
          {labels.privacy}
        </Link>
      </div>
    </form>
  );
}
