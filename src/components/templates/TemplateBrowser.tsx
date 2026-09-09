"use client";

import { useState } from "react";
import Link from "next/link";
import { Icons } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Primitives";
import { templates, templateCategories, type TemplateCategory } from "@/lib/data/templates";
import type { Dictionary } from "@/lib/i18n";
import { localePath, t, type Locale } from "@/lib/i18n/config";
import { cn, formatNumber, formatPrice } from "@/lib/utils";

export function TemplateBrowser({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [category, setCategory] = useState<TemplateCategory | "all">("all");
  const shown = category === "all" ? templates : templates.filter((tpl) => tpl.category === category);

  return (
    <div>
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {templateCategories.map((cat) => {
          const active = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              aria-pressed={active}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-[0.8125rem] font-medium transition-all",
                active
                  ? "border-brand-400/50 bg-primary-soft text-brand-700"
                  : "border-line text-ink-muted hover:border-brand-400 hover:text-ink",
              )}
            >
              {t(cat.label, locale)}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {shown.map((tpl) => (
          <article
            key={tpl.slug}
            id={tpl.slug}
            className="card card-hover group flex h-full flex-col overflow-hidden scroll-mt-32"
          >
            <div
              className="relative h-48 overflow-hidden"
              style={{ background: `linear-gradient(140deg, ${tpl.gradient[0]}26, ${tpl.gradient[1]}1a)` }}
            >
              <div
                className="absolute inset-0 opacity-70"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, rgb(255 255 255 / 0.07) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 0.07) 1px, transparent 1px)",
                  backgroundSize: "26px 26px",
                }}
              />
              <div className="absolute inset-0 flex flex-col gap-2 p-6 transition-transform duration-700 group-hover:scale-[1.04]">
                <div className="h-2 w-14 rounded-full" style={{ background: tpl.gradient[0], opacity: 0.9 }} />
                <div className="h-3.5 w-3/4 rounded-full bg-white/25" />
                <div className="h-3.5 w-1/2 rounded-full bg-white/16" />
                <div className="mt-2 flex gap-2">
                  <div className="h-6 w-20 rounded-full" style={{ background: tpl.gradient[0], opacity: 0.85 }} />
                  <div className="h-6 w-16 rounded-full border border-white/25" />
                </div>
                <div className="mt-auto grid grid-cols-3 gap-2">
                  {[0, 1, 2].map((k) => (
                    <div key={k} className="h-9 rounded-lg bg-white/10" />
                  ))}
                </div>
              </div>
              <div className="absolute top-3 end-3 flex gap-1.5">
                {tpl.rtlReady ? <Badge tone="neutral">RTL</Badge> : null}
                <Badge tone="cyan">{tpl.lift}</Badge>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <h3 className="text-[1.0625rem] font-bold tracking-tight">{t(tpl.name, locale)}</h3>
              <p className="pretty mt-2 flex-1 text-[0.8125rem] leading-[1.9] text-ink-muted">
                {t(tpl.description, locale)}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {tpl.tags.map((tag) => (
                  <span
                    key={tag.en}
                    className="rounded-full border border-line px-2.5 py-1 text-[0.625rem] text-ink-subtle"
                  >
                    {t(tag, locale)}
                  </span>
                ))}
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                <div>
                  <span className="block text-[0.625rem] text-ink-subtle tabular">
                    {formatNumber(tpl.sections, locale)} {dict.templates.sections} · {tpl.lift}{" "}
                    {dict.templates.conversion}
                  </span>
                  <span className="text-[0.9375rem] font-bold">
                    {formatPrice(tpl.price, locale)}
                    <span className="ms-1 text-[0.625rem] font-medium text-ink-subtle">
                      {dict.common.oneTime}
                    </span>
                  </span>
                </div>

                <Link
                  href={localePath(locale, `/checkout?template=${tpl.slug}`)}
                  className="inline-flex h-9 items-center gap-1.5 rounded-full bg-[linear-gradient(100deg,var(--brand-600),var(--brand-400))] px-4 text-[0.75rem] font-semibold text-white transition-transform hover:-translate-y-0.5"
                >
                  {dict.common.buyNow}
                  <Icons.arrowRight size={13} className="flip-rtl" />
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
