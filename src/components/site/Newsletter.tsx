"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n";
import { isValidEmail } from "@/lib/utils";

export function Newsletter({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setState("error");
      return;
    }
    setState("loading");
    try {
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="card relative overflow-hidden p-8 md:p-10">
      <div
        className="pointer-events-none absolute -top-24 end-0 size-64 rounded-full opacity-40 blur-3xl"
        style={{ background: "radial-gradient(circle, var(--brand-500), transparent 70%)" }}
      />
      <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="max-w-md">
          <h3 className="text-xl font-bold tracking-tight md:text-2xl">{dict.newsletter.title}</h3>
          <p className="pretty mt-2 text-sm leading-[1.85] text-ink-muted">{dict.newsletter.subtitle}</p>
        </div>

        <form onSubmit={onSubmit} className="w-full max-w-md" noValidate>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label className="sr-only" htmlFor="newsletter-email">
              {dict.newsletter.placeholder}
            </label>
            <input
              id="newsletter-email"
              type="email"
              dir="ltr"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (state === "error") setState("idle");
              }}
              placeholder={dict.newsletter.placeholder}
              className="h-12 flex-1 rounded-full border border-line bg-bg px-5 text-sm text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-brand-400"
            />
            <Button type="submit" disabled={state === "loading"} className="h-12 shrink-0">
              {state === "loading" ? dict.common.loading : (locale==='fa'?'بررسی نمونه':'Validate preview')}
            </Button>
          </div>

          <p
            className="mt-3 flex items-center gap-1.5 text-xs"
            style={{
              color:
                state === "error"
                  ? "var(--rose)"
                  : state === "done"
                    ? "var(--teal)"
                    : "var(--fg-subtle)",
            }}
            role={state === "error" ? "alert" : undefined}
          >
            {state === "done" ? <Icons.check size={13} /> : null}
            {state === "error"
              ? dict.newsletter.error
              : state === "done"
                ? (locale==='fa'?'ایمیل معتبر است؛ عضویت هنوز فعال نیست و چیزی ثبت نشد.':'Valid email. Subscriptions are not connected; nothing was registered.')
                : (locale==='fa'?'پیش‌نمایش؛ اتصال خبرنامه هنوز فعال نیست.':'Preview: newsletter delivery is not connected.')}
          </p>
        </form>
      </div>
    </div>
  );
}
