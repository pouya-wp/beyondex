"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { isValidEmail } from "@/lib/utils";

const fieldClass =
  "h-12 w-full rounded-2xl border border-line bg-bg px-4 text-sm text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-brand-400";

export function ContactForm({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    if(!formElement.reportValidity()) return;
    const form = new FormData(formElement);
    const email = String(form.get("email") ?? "");

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
    <form onSubmit={onSubmit} className="card p-7 md:p-8" noValidate>
      <p className="mb-5 text-sm text-ink-muted">{locale==='fa'?'این فرم هنوز به ارسال پیام متصل نیست. متن شما حفظ می‌شود؛ برای ارتباط از لینک ایمیل صفحه استفاده کنید.':'Message delivery is not connected. Your text stays in this form; use the email link on this page to contact us.'}</p><div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-2 block text-[0.75rem] font-semibold text-ink-muted">
            {dict.contact.name}
          </label>
          <input id="name" name="name" required className={fieldClass} />
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-[0.75rem] font-semibold text-ink-muted">
            {dict.contact.email}
          </label>
          <input id="email" name="email" type="email" dir="ltr" required className={fieldClass} />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="subject" className="mb-2 block text-[0.75rem] font-semibold text-ink-muted">
          {dict.contact.subject}
        </label>
        <input id="subject" name="subject" className={fieldClass} />
      </div>

      <div className="mt-4">
        <label htmlFor="message" className="mb-2 block text-[0.75rem] font-semibold text-ink-muted">
          {dict.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          minLength={5}
          rows={6}
          required
          className="w-full resize-y rounded-2xl border border-line bg-bg p-4 text-sm leading-[1.9] text-ink outline-none transition-colors placeholder:text-ink-subtle focus:border-brand-400"
        />
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={state === "loading"}>
          {state === "loading" ? dict.common.loading : locale==='fa'?'بررسی فرم نمونه':'Validate preview'}
          <Icons.arrowRight size={16} className="flip-rtl" />
        </Button>

        {state === "done" ? (
          <span role="status" className="inline-flex items-center gap-1.5 text-[0.8125rem] text-c-green">
            <Icons.check size={15} />
            {locale==='fa'?'فرم نمونه بررسی شد؛ برای ارسال پیام از ایمیل استفاده کنید.':'Preview validated. Use email to send your message.'}
          </span>
        ) : null}
        {state === "error" ? (
          <span className="text-[0.8125rem] text-c-rose" role="alert">
            {dict.newsletter.error}
          </span>
        ) : null}
      </div>
    </form>
  );
}
