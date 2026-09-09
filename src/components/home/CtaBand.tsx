import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/i18n/config";

export function CtaBand({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section">
      <div className="container-page">
        <Reveal>
          <div
            className="bx-access-banner relative overflow-hidden rounded-[var(--radius-xl)] px-6 py-14 text-center md:px-16 md:py-20"
            style={{
              background: "linear-gradient(125deg, #101b45, #203c81 55%, #172b67)",
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-25"
              style={{
                backgroundImage: "radial-gradient(rgb(255 255 255 / 0.4) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                maskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, #000, transparent 75%)",
                WebkitMaskImage: "radial-gradient(ellipse 65% 65% at 50% 50%, #000, transparent 75%)",
              }}
            />

            <div className="relative mx-auto max-w-2xl">
              <h2 className="balance text-[clamp(1.625rem,3.8vw,2.75rem)] font-extrabold leading-[1.3] text-white">
                {dict.cta.title}
              </h2>
              <p className="pretty mx-auto mt-4 max-w-lg text-[0.9375rem] leading-[2] text-white/80">
                {dict.cta.subtitle}
              </p>

              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ButtonLink
                  href={localePath(locale, "/agents")}
                  size="lg"
                  className="cta-primary"
                >
                  {dict.cta.primary}
                  <Icons.arrowRight size={16} className="flip-rtl" />
                </ButtonLink>
                <ButtonLink
                  href={localePath(locale, "/contact")}
                  size="lg"
                  className="cta-secondary"
                >
                  {dict.cta.secondary}
                </ButtonLink>
              </div>

              <p className="mt-6 text-[0.75rem] text-white/60">{dict.cta.note}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
