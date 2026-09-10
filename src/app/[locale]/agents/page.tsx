import {AgentMarquee} from "@/components/experiments/SelectedEffects";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AgentBrowser } from "@/components/agents/AgentBrowser";
import { CtaBand } from "@/components/home/CtaBand";
import { SectionHeading } from "@/components/ui/Primitives";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return localizedMetadata({ locale, path: "/agents", title: dict.nav.agents, description: dict.agentsSection.subtitle });
}

export default async function AgentsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const fa=locale==='fa';
  return <div className="ax-catalog"><section className="container-page ax-catalog-hero"><div><span className="fl-overline">INDEPENDENT TOOLS. ONE ACCESS POINT.</span><h1>{fa?<>برای هر کار،<br/><em>یک دنیای اختصاصی.</em></>:<>A dedicated world.<br/><em>For every kind of work.</em></>}</h1><p>{fa?'هر ایجنت، رابط و پنل مدیریت مستقل خودش را دارد. اینجا دسترسی مناسب را پیدا کنید؛ خرید و اشتراک‌هایتان را در «پنل من» مدیریت کنید.':'Each agent has its own interface and management panel. Find your access here and manage purchases and subscriptions in My workspace.'}</p></div><div className="ax-pass-art" aria-hidden="true"><span>BEYONDEX / ACCESS COLLECTION</span><div className="ax-pass"><b>BX</b><strong>ONE ACCOUNT.<br/>MANY WORLDS.</strong><i/><small>DEDICATED AGENT ACCESS ↗</small></div><span>YOUR TOOLS. YOUR OWN SPACE.</span></div></section><AgentMarquee locale={locale}/><section className="container-page ax-catalog-body" id="agent-collection"><div className="ax-catalog-caption"><span>{fa?'مجموعهٔ ایجنت‌ها':'THE COLLECTION'}</span><span>{fa?'انتخاب ← خرید دسترسی ← ورود به پنل مستقل':'DISCOVER → GET ACCESS → OPEN YOUR TOOL'}</span></div><AgentBrowser locale={locale} dict={dict}/></section><CtaBand locale={locale} dict={dict}/></div>;
}
