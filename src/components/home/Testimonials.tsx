import { Icons } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/data/site";
import type { Dictionary } from "@/lib/i18n";
import { t, type Locale } from "@/lib/i18n/config";

export function Testimonials({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section relative">
      <div className="container-page">
        <SectionHeading eyebrow={dict.testimonials.eyebrow} title={dict.testimonials.title} className="mx-auto" />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {testimonials.map((item, i) => (
            <Reveal key={item.company} delay={i * 80}>
              <figure className="card card-hover flex h-full flex-col p-8">
                <Icons.quote size={26} className="text-brand-400/40" />

                <blockquote className="pretty mt-5 flex-1 text-[0.9375rem] leading-[2] text-ink">
                  {t(item.quote, locale)}
                </blockquote>

                <figcaption className="mt-7 flex items-center justify-between gap-4 border-t border-line pt-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="grid size-10 shrink-0 place-items-center rounded-full text-[0.8125rem] font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, var(--brand-500), ${
                          ["#22d3ee", "#f59e0b", "#2dd4bf", "#fb7185"][i % 4]
                        })`,
                      }}
                      aria-hidden="true"
                    >
                      {t(item.name, locale).charAt(0)}
                    </div>
                    <div>
                      <div className="text-[0.8125rem] font-semibold">{t(item.name, locale)}</div>
                      <div className="text-[0.6875rem] text-ink-subtle">
                        {t(item.role, locale)} · {item.company}
                      </div>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full border border-c-green/25 bg-c-green/10 px-3 py-1.5 text-[0.6875rem] font-semibold text-c-green">
                    {t(item.metric, locale)}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
