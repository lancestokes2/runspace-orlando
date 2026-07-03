"use client";

import { useRef, useState } from "react";
import { copy, site } from "@/lib/site";
import { PACES, SOURCES, CITY_SUGGESTIONS } from "@/lib/options";

type Variant = "hero" | "compact";
type Status = "idle" | "submitting" | "success" | "duplicate" | "error";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export function WaitlistForm({ variant = "hero" }: { variant?: Variant }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState<{ name?: boolean; email?: boolean }>({});
  const hp = useRef<HTMLInputElement>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const get = (n: string) =>
      (form.elements.namedItem(n) as HTMLInputElement | HTMLSelectElement | null)?.value.trim() ?? "";

    const name = get("name");
    const email = get("email");
    const city = get("city");
    const pace = get("pace");
    const source = get("source");

    // client-side validation
    if (!name) {
      setInvalid({ name: true });
      setError("Please enter your first name.");
      setStatus("error");
      return;
    }
    if (!EMAIL_RE.test(email)) {
      setInvalid({ email: true });
      setError("Please enter a valid email address.");
      setStatus("error");
      return;
    }
    setInvalid({});
    if (hp.current?.value) return; // honeypot tripped

    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, city, pace, source }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; duplicate?: boolean; error?: string }
        | null;

      if (res.ok && data?.ok) {
        setStatus(data.duplicate ? "duplicate" : "success");
      } else {
        setError(data?.error ?? `Something went wrong — please email ${site.contactEmail}.`);
        setStatus("error");
      }
    } catch {
      setError(`Network error — please try again, or email ${site.contactEmail}.`);
      setStatus("error");
    }
  }

  if (status === "success" || status === "duplicate") {
    return (
      <div className="wl-success" role="status" tabIndex={-1}>
        {status === "duplicate" ? (
          <>
            <b>You&rsquo;re already on the list. ☑</b>
            <br />
            Good news — you&rsquo;re all set. Look out for the Monday email.
          </>
        ) : (
          <>
            <b>You&rsquo;re on the list. ☑</b>
            <br />
            Every Monday you&rsquo;ll get this weekend&rsquo;s Orlando races and any new run clubs —
            nothing else.
          </>
        )}
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className="waitlist" onSubmit={onSubmit} noValidate>
      {variant === "hero" && <label htmlFor={`name-${variant}`}>{copy.heroLabel}</label>}
      <div className="wl-grid">
        <input
          id={`name-${variant}`}
          name="name"
          type="text"
          placeholder="First name"
          autoComplete="given-name"
          aria-label="First name"
          aria-invalid={invalid.name ? true : undefined}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="you@email.com"
          autoComplete="email"
          aria-label="Email address"
          aria-invalid={invalid.email ? true : undefined}
          required
        />
        <input
          name="city"
          type="text"
          placeholder="Your area (e.g. Winter Park)"
          aria-label="Your city or area"
          list="wl-cities"
        />
        <select name="pace" aria-label="Your pace" defaultValue="">
          <option value="" disabled>
            Your pace…
          </option>
          {PACES.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>
      <datalist id="wl-cities">
        {CITY_SUGGESTIONS.map((c) => (
          <option key={c} value={c} />
        ))}
      </datalist>
      <select name="source" aria-label="How did you hear about us?" defaultValue="" className="wl-full">
        <option value="" disabled>
          How did you hear about us?
        </option>
        {SOURCES.map((s) => (
          <option key={s} value={s}>
            {s}
          </option>
        ))}
      </select>

      <input
        ref={hp}
        className="hp"
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
      />

      <div className="wl-submit">
        <button className="btn" type="submit" disabled={submitting}>
          {submitting ? "Joining…" : "Join the waitlist"}
          {!submitting && <span className="arr">→</span>}
        </button>
        {variant === "hero" && (
          <span className="wl-fine">
            {copy.heroFine} <a href="/privacy">Privacy</a>.
          </span>
        )}
      </div>

      {status === "error" && (
        <p className="wl-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
