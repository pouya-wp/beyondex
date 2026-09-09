import { Icons } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import type { Dictionary } from "@/lib/i18n";

const items = [
  { icon: Icons.bolt, accent: "#6428d2" },
  { icon: Icons.shield, accent: "#10a37f" },
  { icon: Icons.cpu, accent: "#2563eb" },
  { icon: Icons.eye, accent: "#ea8a00" },
  { icon: Icons.wallet, accent: "#ec4899" },
  { icon: Icons.lock, accent: "#0d9488" },
];

export function Features({ dict }: { dict: Dictionary }) {
  return (
    <section className="section band">
      <div className="container-page">
        <SectionHeading
          eyebrow={dict.features.eyebrow}
          title={dict.features.title}
          subtitle={dict.features.subtitle}
          className="mx-auto"
        />

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {dict.features.items.map((item, i) => {
            const { icon: Icon, accent } = items[i % items.length];
            return (
              <Reveal key={item.title} delay={i * 55}>
                <div className="card card-hover h-full p-6">
                  <span
                    className="grid size-11 place-items-center rounded-2xl text-white"
                    style={{ backgroundColor: accent }}
                  >
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-4 text-[1rem] font-extrabold text-ink-strong">{item.title}</h3>
                  <p className="pretty mt-2 text-[0.8125rem] leading-[2] text-ink-muted">{item.body}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
