import {AccessConstellation} from "@/components/experiments/SignatureSelections";
import {SectionExit} from "@/components/home/SectionExit";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SpotlightCard,Workflow } from "@/components/home/Experience";
import { NewSections } from "@/components/home/NewSections";
import { Hero } from "@/components/home/Hero";
import { PricingTable } from "@/components/home/PricingTable";
import { FaqList } from "@/components/home/Faq";
import { Reveal } from "@/components/ui/Reveal";
import { Icons } from "@/components/ui/Icon";
import { getDictionary } from "@/lib/i18n";
import { isLocale, localePath, t } from "@/lib/i18n/config";
import { agents } from "@/lib/data/agents";
import { formatPrice } from "@/lib/utils";

export default async function HomePage({params}: {params:Promise<{locale:string}>}) {
 const {locale}=await params;
 if(!isLocale(locale)) notFound();
 const fa=locale==="fa",dict=getDictionary(locale);
 const perks=[{icon:Icons.layers,title:fa?"همه‌چیز در یک پنل":"One home for your work",body:fa?"خریدها، تمدیدها و دسترسی‌ها کنار هم":"Purchases, renewals and access together"},{icon:Icons.globe,title:fa?"به زبان خودمان":"Feels right at home",body:fa?"تجربهٔ فارسی، ساده و راست‌به‌چپ":"A simple Persian and English experience"},{icon:Icons.shield,title:fa?"با کنترل خود شما":"You stay in control",body:fa?"اشتراک و دسترسی پنل‌ها را مدیریت کنید":"Manage subscriptions and panel access"},{icon:Icons.headset,title:fa?"در کنارتان هستیم":"People you can talk to",body:fa?"از انتخاب ایجنت تا شروع به کار":"From choosing an agent to getting started"}];
 return <>
 <Hero locale={locale}/>
 <section className="iv-light-benefits"><svg className="iv-curve" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true"><path d="M0 100V85H240C400 85 455 0 600 0H840C985 0 1040 85 1200 85H1440V100Z"/></svg><div className="container-page"><div className="iv-benefits-heading"><span className="iv-eyebrow">{fa?"پیچیدگی کمتر. امکان بیشتر.":"LESS FRICTION. MORE POSSIBILITY."}</span><h2>{fa?"یک پنل. همه‌چیز، سر جای خودش.":"One panel. Everything in its place."}</h2></div><div className="bx-perks">{perks.map(p=><div key={p.title}><span className="bx-perk-icon"><p.icon size={23}/></span><div><h3>{p.title}</h3><p>{p.body}</p></div></div>)}</div></div><SectionExit/></section>
 <section className="bx-section container-page" id="agents"><div className="ex-section-index"><span>01 / {fa?"تیم آیندهٔ شما":"YOUR NEXT TEAM"}</span><span>INTELLIGENCE, ON DEMAND ↗</span></div><Reveal><div className="bx-section-heading"><div><span className="bx-eyebrow">{fa?"برای هر کاری، یک همکار":"A TEAMMATE FOR EVERY TASK"}</span><h2>{fa?"کدوم کار رو سبک‌تر کنیم؟":"What can we take off your plate?"}</h2><p>{fa?"ایجنت موردنیازتان را انتخاب کنید و در پنل اختصاصی خودتان به کار بگیرید.":"Choose the right agent and put it to work in your dedicated panel."}</p></div><Link className="bx-text-link" href={localePath(locale,"/agents")}>{fa?"همهٔ ایجنت‌ها":"All agents"}<Icons.arrowRight className="flip-rtl" size={18}/></Link></div></Reveal><div className="bx-agent-grid">{agents.slice(0,4).map((agent,i)=>{const Icon=Icons[agent.icon];return <Reveal key={agent.slug} delay={i*70}><SpotlightCard><Link className="bx-agent-card" href={localePath(locale,`/agents/${agent.slug}`)}><div className="bx-agent-card-top"><span className={`bx-service-icon bx-service-${i}`}><Icon size={29}/></span><span className="bx-card-number">0{i+1}</span></div><h3>{t(agent.name,locale)}</h3><p>{t(agent.tagline,locale)}</p><div className="bx-agent-card-bottom"><span>{fa?"ماهانه از":"From"} <strong>{formatPrice(agent.price,locale)}</strong></span><span className="bx-round-arrow"><Icons.arrowRight size={18} className="flip-rtl"/></span></div></Link></SpotlightCard></Reveal>})}</div></section>
 <AccessConstellation locale={locale}/><Workflow locale={locale}/><NewSections locale={locale}/>
 <section className="bx-pricing-section" id="pricing"><div className="container-page"><div className="bx-centered-heading"><span className="bx-eyebrow">{fa?"متناسب با اندازهٔ کار شما":"ROOM FOR EVERY AMBITION"}</span><h2>{fa?"یک انتخاب روشن برای قدم بعدی":"A clear choice for your next step"}</h2><p>{fa?"امکانات و هزینهٔ هر پنل را مقایسه کنید؛ هر وقت آماده بودید، شروع کنید.":"Compare each panel’s features and price. Get started when you’re ready."}</p></div><PricingTable locale={locale} dict={dict}/></div></section>
 <section className="bx-section container-page bx-faq-layout" id="faq"><div><span className="bx-eyebrow">{fa?"قبل از شروع":"BEFORE YOU BEGIN"}</span><h2 className="bx-section-title">{fa?<>شاید سؤال شما<br/>هم همین باشد.</>:<>A few things<br/>you might wonder.</>}</h2><p className="bx-section-copy">{fa?"هنوز مطمئن نیستید کدام ایجنت مناسب شماست؟ با هم پیدایش می‌کنیم.":"Not sure which agent fits? Let’s figure it out together."}</p><Link className="bx-text-link" href={localePath(locale,"/contact")}>{fa?"گفتگو با تیم بیاندکس":"Talk to Beyondex"}<Icons.arrowRight className="flip-rtl" size={17}/></Link></div><FaqList locale={locale} limit={5}/></section>
 <div className="container-page"><section className="bx-final-cta"><span className="bx-cta-spark" aria-hidden="true">✳</span><div><h2>{fa?"جای یک همکار هوشمند خالی نیست؟":"Room for one more teammate?"}</h2><p>{fa?"از همین‌جا، یک قدم به روزهای سبک‌تر نزدیک شوید.":"Take the first step toward a lighter workday."}</p></div><Link className="bx-button" href={localePath(locale,"/pricing")}>{fa?"انتخاب پنل اختصاصی":"Choose your panel"}<Icons.arrowRight className="flip-rtl" size={18}/></Link></section></div>
 </>;
}


