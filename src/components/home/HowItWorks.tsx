import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";
import { formatNumber } from "@/lib/utils";

export function HowItWorks({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="how" className="section">
      <div className="container-page">
        <SectionHeading eyebrow={dict.how.eyebrow} title={dict.how.title} className="mx-auto" />

        <ol className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {dict.how.steps.map((step, i) => (
            <Reveal as="li" key={step.title} delay={i * 80}>
              <div className="card card-hover relative h-full p-6">
                <span className="absolute top-5 end-5 text-[2.5rem] font-extrabold leading-none text-brand-100 tabular">
                  {formatNumber(i + 1, locale)}
                </span>

                <span className="grid size-10 place-items-center rounded-xl bg-primary text-[0.875rem] font-extrabold text-white tabular">
                  {formatNumber(i + 1, locale)}
                </span>

                <h3 className="mt-4 text-[1rem] font-extrabold text-ink-strong">{step.title}</h3>
                <p className="pretty mt-2 text-[0.8125rem] leading-[2] text-ink-muted">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
