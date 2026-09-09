import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/i18n/config";

/** A static rendering of the Studio canvas: trigger → tools → memory → approval. */
function CanvasPreview({ locale }: { locale: Locale }) {
  const nodes = [
    { label: locale === "fa" ? "تریگر" : "Trigger", sub: "cron · 07:00", icon: Icons.clock, accent: "#6428d2" },
    { label: locale === "fa" ? "ابزارها" : "Tools", sub: "4 connected", icon: Icons.plug, accent: "#2563eb" },
    { label: locale === "fa" ? "حافظه" : "Memory", sub: "vector · 12k", icon: Icons.database, accent: "#0d9488" },
    { label: locale === "fa" ? "تأیید" : "Approval", sub: "> $500", icon: Icons.shield, accent: "#ea8a00" },
  ];

  return (
    <div className="panel overflow-hidden p-6 shadow-[var(--shadow-lg)]">
      <div className="space-y-2.5">
        {nodes.map((node, i) => {
          const Icon = node.icon;
          return (
            <div key={node.label}>
              <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface-soft p-3.5 transition-transform duration-300 hover:translate-x-1 rtl:hover:-translate-x-1">
                <span
                  className="grid size-9 shrink-0 place-items-center rounded-xl text-white"
                  style={{ backgroundColor: node.accent }}
                >
                  <Icon size={17} />
                </span>
                <div className="min-w-0">
                  <div className="text-[0.8125rem] font-bold leading-tight text-ink-strong">{node.label}</div>
                  <div
                    className="mt-0.5 text-[0.6875rem] text-ink-subtle"
                    style={{ fontFamily: "var(--font-mono)" }}
                    dir="ltr"
                  >
                    {node.sub}
                  </div>
                </div>
                <span className="ms-auto flex items-center gap-1" aria-hidden="true">
                  <span className="size-1.5 rounded-full" style={{ background: node.accent }} />
                  <span className="size-1.5 rounded-full opacity-30" style={{ background: node.accent }} />
                </span>
              </div>

              {i < nodes.length - 1 ? <div className="ms-[2.1rem] h-3 w-0.5 rounded bg-line-strong" /> : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Studio({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section">
      <div className="container-page">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <Eyebrow>{dict.studio.eyebrow}</Eyebrow>
            <h2 className="balance mt-4 text-[clamp(1.625rem,3.4vw,2.5rem)] font-extrabold leading-[1.3] tracking-[-0.01em] text-ink-strong">
              {dict.studio.title}
            </h2>
            <p className="pretty mt-4 text-[0.9375rem] leading-[2.1] text-ink-muted">{dict.studio.subtitle}</p>

            <ul className="mt-7 space-y-3">
              {dict.studio.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                    <Icons.check size={12} />
                  </span>
                  <span className="text-[0.875rem] leading-[1.9] text-ink">{b}</span>
                </li>
              ))}
            </ul>

            <ButtonLink href={localePath(locale, "/studio")} size="lg" className="mt-8">
              {dict.studio.cta}
              <Icons.arrowRight size={16} className="flip-rtl" />
            </ButtonLink>
          </Reveal>

          <Reveal delay={110}>
            <CanvasPreview locale={locale} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
