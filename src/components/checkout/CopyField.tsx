"use client";

import { useState } from "react";
import { Icons } from "@/components/ui/Icon";

export function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard can be blocked; the value stays selectable by hand */
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-bg p-4">
      <span className="block text-[0.6875rem] text-ink-subtle">{label}</span>
      <div className="mt-2 flex items-center gap-3">
        <code
          className="min-w-0 flex-1 break-all text-[0.8125rem] font-semibold text-ink"
          style={{ fontFamily: "var(--font-mono)" }}
          dir="ltr"
        >
          {value || "—"}
        </code>
        <button
          type="button"
          onClick={copy}
          className="shrink-0 rounded-full border border-line-strong px-3 py-1.5 text-[0.6875rem] font-semibold transition-colors hover:border-brand-400 hover:text-brand-700"
        >
          {copied ? <Icons.check size={13} /> : "copy"}
        </button>
      </div>
    </div>
  );
}
