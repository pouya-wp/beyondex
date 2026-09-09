"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icons } from "@/components/ui/Icon";
import type { Locale } from "@/lib/i18n/config";

type StepKind = "tool" | "think" | "guard" | "done";

interface Step {
  kind: StepKind;
  label: { fa: string; en: string };
  detail: { fa: string; en: string };
  ms: number;
}

const steps: Step[] = [
  {
    kind: "think",
    label: { en: "planning", fa: "برنامه‌ریزی" },
    detail: {
      en: "Win-back campaign for 1,412 lapsed buyers",
      fa: "کمپین بازگرداندن برای ۱٬۴۱۲ مشتری غیرفعال",
    },
    ms: 900,
  },
  {
    kind: "tool",
    label: { en: "shopify.query", fa: "shopify.query" },
    detail: {
      en: "Segment built · last order > 90d · LTV > $180",
      fa: "سگمنت ساخته شد · آخرین خرید بیش از ۹۰ روز · ارزش عمر بالای ۱۸۰ دلار",
    },
    ms: 700,
  },
  {
    kind: "tool",
    label: { en: "copy.generate", fa: "copy.generate" },
    detail: {
      en: "3 subject lines · brand voice matched · 0 policy flags",
      fa: "۳ عنوان ایمیل · هماهنگ با لحن برند · بدون هشدار سیاستی",
    },
    ms: 850,
  },
  {
    kind: "guard",
    label: { en: "guardrail", fa: "کنترل ایمنی" },
    detail: {
      en: "Segment > 1,000 → approval requested in Slack",
      fa: "سگمنت بالای ۱٬۰۰۰ نفر ← درخواست تأیید در اسلک",
    },
    ms: 1100,
  },
  {
    kind: "tool",
    label: { en: "klaviyo.schedule", fa: "klaviyo.schedule" },
    detail: {
      en: "Approved · sending at each contact's peak hour",
      fa: "تأیید شد · ارسال در ساعت اوج هر مخاطب",
    },
    ms: 800,
  },
  {
    kind: "done",
    label: { en: "complete", fa: "تکمیل شد" },
    detail: {
      en: "1,412 queued · est. revenue 412M IRT · run cost $0.38",
      fa: "۱٬۴۱۲ ایمیل در صف · درآمد تخمینی ۴۱۲ میلیون تومان · هزینهٔ اجرا ۰٫۳۸ دلار",
    },
    ms: 2600,
  },
];

const kindStyles: Record<StepKind, { color: string; bg: string }> = {
  think: { color: "#5d5878", bg: "#f1f1f7" },
  tool: { color: "#2563eb", bg: "#e8effd" },
  guard: { color: "#ea8a00", bg: "#fdf1e0" },
  done: { color: "#10a37f", bg: "#e8f7f2" },
};

export function AgentRunPanel({
  locale,
  title,
  caption,
}: {
  locale: Locale;
  title: string;
  caption: string;
}) {
  const [visible, setVisible] = useState(1);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setVisible(steps.length);
      return;
    }

    function advance(index: number) {
      timer.current = setTimeout(() => {
        const next = index + 1 >= steps.length ? 0 : index + 1;
        setVisible(next === 0 ? 1 : next + 1);
        advance(next);
      }, steps[index].ms);
    }

    advance(0);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  const shown = useMemo(() => steps.slice(0, Math.max(visible, 1)), [visible]);

  return (
    <div className="panel overflow-hidden shadow-[var(--shadow-lg)]">
      <div className="flex items-center gap-3 border-b border-line bg-surface-soft px-4 py-3">
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff5f57]" />
          <span className="size-2.5 rounded-full bg-[#febc2e]" />
          <span className="size-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span
          className="text-[0.6875rem] font-medium text-ink-subtle"
          style={{ fontFamily: "var(--font-mono)" }}
          dir="ltr"
        >
          {title}
        </span>
        <span className="ms-auto inline-flex items-center gap-1.5 rounded-lg bg-[#e8f7f2] px-2 py-1 text-[0.625rem] font-bold text-c-green">
          <span className="size-1.5 rounded-full bg-c-green pulse-dot" />
          live
        </span>
      </div>

      <div className="min-h-[17rem] space-y-2.5 p-4 sm:p-5">
        {shown.map((step, i) => {
          const style = kindStyles[step.kind];
          return (
            <div
              key={`${step.label.en}-${i}`}
              className="flex items-start gap-3"
              style={{ animation: "fade-up 0.4s cubic-bezier(0.22,1,0.36,1) both" }}
            >
              <span
                className="mt-px shrink-0 rounded-md px-2 py-1 text-[0.625rem] font-bold"
                style={{ color: style.color, background: style.bg, fontFamily: "var(--font-mono)" }}
                dir="ltr"
              >
                {step.label[locale]}
              </span>
              <span className="pretty text-[0.8125rem] leading-[1.85] text-ink-muted">
                {step.detail[locale]}
              </span>
            </div>
          );
        })}
      </div>

      <div className="flex items-center gap-2 border-t border-line bg-surface-soft px-5 py-3 text-[0.6875rem] text-ink-subtle">
        <Icons.eye size={13} />
        {caption}
      </div>
    </div>
  );
}
