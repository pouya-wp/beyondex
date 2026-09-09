import Link from "next/link";
import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { Badge, SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { templates } from "@/lib/data/templates";
import type { Dictionary } from "@/lib/i18n";
import { localePath, t, type Locale } from "@/lib/i18n/config";
import { formatNumber, formatPrice } from "@/lib/utils";

export function TemplatesShowcase({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="section relative">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="start"
            eyebrow={dict.templates.eyebrow}
            title={dict.templates.title}
            subtitle={dict.templates.subtitle}
          />
          <ButtonLink
            href={localePath(locale, "/templates")}
            variant="outline"
            className="shrink-0 self-start md:self-end"
          >
            {dict.templates.cta}
            <Icons.arrowRight size={15} className="flip-rtl" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {templates.slice(0, 6).map((tpl, i) => (
            <Reveal key={tpl.slug} delay={i * 60}>
              <Link
                href={localePath(locale, `/templates#${tpl.slug}`)}
                className="card card-hover group flex h-full flex-col overflow-hidden hover:-translate-y-1"
              >
                {/* Abstract preview: a wireframe of the page the template builds. */}
                <div
                  className="relative h-44 overflow-hidden"
                  style={{
                    background: `linear-gradient(140deg, ${tpl.gradient[0]}26, ${tpl.gradient[1]}1a)`,
                  }}
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
                    <div
                      className="h-2 w-14 rounded-full"
                      style={{ background: tpl.gradient[0], opacity: 0.9 }}
                    />
                    <div className="h-3.5 w-3/4 rounded-full bg-white/25" />
                    <div className="h-3.5 w-1/2 rounded-full bg-white/16" />
                    <div className="mt-2 flex gap-2">
                      <div
                        className="h-6 w-20 rounded-full"
                        style={{ background: tpl.gradient[0], opacity: 0.85 }}
                      />
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

                  <div className="mt-5 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-[0.6875rem] text-ink-subtle tabular">
                      {formatNumber(tpl.sections, locale)} {dict.templates.sections}
                    </span>
                    <span className="text-[0.9375rem] font-bold">
                      {formatPrice(tpl.price, locale)}
                      <span className="ms-1 text-[0.6875rem] font-medium text-ink-subtle">
                        {dict.common.oneTime}
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <ul className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-3">
            {dict.templates.includesList.map((item) => (
              <li key={item} className="inline-flex items-center gap-2 text-[0.8125rem] text-ink-muted">
                <Icons.check size={14} className="text-c-green" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
