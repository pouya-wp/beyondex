import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const tones = {
  brand: "text-brand-700 bg-primary-soft border-brand-200",
  green: "text-c-green bg-[#e8f7f2] border-[#bfe9dc]",
  cyan: "text-c-blue bg-[#e8effd] border-[#c3d6fa]",
  blue: "text-c-blue bg-[#e8effd] border-[#c3d6fa]",
  amber: "text-c-amber bg-[#fdf1e0] border-[#f7d9ac]",
  rose: "text-c-rose bg-[#fdeaf4] border-[#f8c6e1]",
  neutral: "text-ink-muted bg-bg border-line",
} as const;

export function Badge({
  children,
  className,
  tone = "brand",
}: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof tones;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[0.6875rem] font-bold leading-none",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  align?: "center" | "start";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3.5",
        align === "center" ? "items-center text-center" : "items-start text-start",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="balance max-w-3xl text-[clamp(1.625rem,3.4vw,2.5rem)] font-extrabold leading-[1.3] tracking-[-0.01em] text-ink-strong">
        {title}
      </h2>
      {subtitle ? (
        <p className="pretty max-w-2xl text-[0.9375rem] leading-[2] text-ink-muted">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function Card({
  children,
  className,
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return <div className={cn("card", hover && "card-hover", className)}>{children}</div>;
}

export function Divider({ className }: { className?: string }) {
  return <div className={cn("divider", className)} />;
}
