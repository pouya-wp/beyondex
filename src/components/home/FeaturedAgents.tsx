import { AgentCard } from "@/components/agents/AgentCard";
import { ButtonLink } from "@/components/ui/Button";
import { Icons } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Primitives";
import { Reveal } from "@/components/ui/Reveal";
import { agents, featuredAgentSlugs } from "@/lib/data/agents";
import type { Dictionary } from "@/lib/i18n";
import { localePath, type Locale } from "@/lib/i18n/config";

export function FeaturedAgents({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const featured = featuredAgentSlugs
    .map((slug) => agents.find((a) => a.slug === slug))
    .filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <section id="agents" className="section relative">
      <div className="container-page">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            align="start"
            eyebrow={dict.agentsSection.eyebrow}
            title={dict.agentsSection.title}
            subtitle={dict.agentsSection.subtitle}
          />
          <ButtonLink
            href={localePath(locale, "/agents")}
            variant="outline"
            className="shrink-0 self-start md:self-end"
          >
            {dict.agentsSection.cta}
            <Icons.arrowRight size={15} className="flip-rtl" />
          </ButtonLink>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((agent, i) => (
            <Reveal key={agent.slug} delay={i * 70}>
              <AgentCard agent={agent} locale={locale} dict={dict} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
