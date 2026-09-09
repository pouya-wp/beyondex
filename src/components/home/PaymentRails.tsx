import { Icons } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n/config";

export function PaymentRails({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const rails = [
    {
      icon: Icons.wallet,
      accent: "#6428d2",
      title: dict.payments.rialTitle,
      body: dict.payments.rialBody,
      points: dict.payments.rialPoints,
      chips:
        locale === "fa" ? ["زرین‌پال", "زیبال", "آیدی‌پی", "شتاب"] : ["Zarinpal", "Zibal", "IDPay", "Shetab"],
    },
    {
      icon: Icons.bitcoin,
      accent: "#0d9488",
      title: dict.payments.cryptoTitle,
      body: dict.payments.cryptoBody,
      points: dict.payments.cryptoPoints,
      chips: ["USDT TRC20", "USDT ERC20", "BTC", "ETH"],
    },
  ];

  return (
    <section className="section band">
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.payments.eyebrow}
          title={dict.payments.title}
          subtitle={dict.payments.subtitle}
          className="mx-auto"
        />

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          {rails.map((rail, i) => {
            const Icon = rail.icon;
            return (
              <Reveal key={rail.title} delay={i * 90}>
                <div className="card card-hover h-full overflow-hidden">
                  <div
                    className="flex items-center gap-4 px-7 py-6"
                    style={{ backgroundColor: `${rail.accent}0f` }}
                  >
                    <span
                      className="grid size-12 place-items-center rounded-2xl text-white"
                      style={{ backgroundColor: rail.accent }}
                    >
                      <Icon size={22} />
                    </span>
                    <h3 className="text-[1.125rem] font-extrabold text-ink-strong">{rail.title}</h3>
                  </div>

                  <div className="p-7 pt-6">
                    <p className="pretty text-[0.875rem] leading-[2] text-ink-muted">{rail.body}</p>

                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {rail.points.map((p) => (
                        <li key={p} className="flex items-center gap-2 text-[0.8125rem] text-ink">
                          <Icons.check size={14} style={{ color: rail.accent }} />
                          {p}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-6">
                      {rail.chips.map((chip) => (
                        <span
                          key={chip}
                          className="rounded-lg bg-bg px-3 py-1.5 text-[0.6875rem] font-semibold text-ink-muted"
                          dir={/[A-Z]/.test(chip) ? "ltr" : undefined}
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <p className="mt-7 flex items-center justify-center gap-2 text-center text-[0.8125rem] text-ink-subtle">
            <Icons.lock size={14} />
            {dict.payments.footnote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
