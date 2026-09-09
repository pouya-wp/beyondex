"use client";

import { useState } from "react";
import { Icons } from "@/components/ui/Icon";
import { faqs } from "@/lib/data/site";
import { t, type Locale } from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

export function FaqList({ locale, limit }: { locale: Locale; limit?: number }) {
  const [open, setOpen] = useState<number | null>(0);
  const items = limit ? faqs.slice(0, limit) : faqs;

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line">
        {items.map((item, i) => {
          const isOpen = open === i;
          return (
            <div key={item.q.en}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-start transition-colors hover:bg-bg"
              >
                <span className="text-[0.9375rem] font-semibold leading-snug text-ink">
                  {t(item.q, locale)}
                </span>
                <span
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border border-line text-ink-muted transition-transform duration-300",
                    isOpen && "rotate-180 border-brand-400/50 text-primary",
                  )}
                >
                  <Icons.chevronDown size={15} />
                </span>
              </button>

              <div
                className="grid transition-[grid-template-rows] duration-400 ease-out"
                style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
              >
                <div className="overflow-hidden">
                  <p className="pretty px-6 pb-6 text-[0.875rem] leading-[2] text-ink-muted">
                    {t(item.a, locale)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
