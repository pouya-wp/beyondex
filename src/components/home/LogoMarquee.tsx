import { integrationLogos } from "@/lib/data/site";
import type { Dictionary } from "@/lib/i18n";

export function LogoMarquee({ dict }: { dict: Dictionary }) {
  const items = [...integrationLogos, ...integrationLogos];

  return (
    <section className="relative border-y border-line py-10">
      <div className="container-page">
        <p className="text-center text-[0.75rem] font-medium uppercase tracking-[0.16em] text-ink-subtle">
          {dict.marquee.title}
        </p>
      </div>

      <div className="marquee-mask mt-7 overflow-hidden">
        <div className="marquee-track gap-10 px-5">
          {items.map((name, i) => (
            <span
              key={`${name}-${i}`}
              className="shrink-0 whitespace-nowrap text-[1.0625rem] font-semibold tracking-tight text-ink-subtle/70 transition-colors hover:text-ink"
              style={{ fontFamily: "var(--font-en)" }}
              aria-hidden={i >= integrationLogos.length}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
