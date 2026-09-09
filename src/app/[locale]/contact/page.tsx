import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactForm } from "@/components/site/ContactForm";
import { Icons } from "@/components/ui/Icon";
import { SectionHeading } from "@/components/ui/Primitives";
import { getDictionary } from "@/lib/i18n";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { siteConfig } from "@/lib/data/site";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const dict = getDictionary(locale);
  return {
    title: dict.nav.contact,
    description: dict.contact.subtitle,
    alternates: { canonical: `/${locale}/contact` },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale = raw as Locale;
  const dict = getDictionary(locale);

  const channels = [
    {
      icon: Icons.target,
      title: dict.contact.salesTitle,
      body: dict.contact.salesBody,
      value: siteConfig.salesEmail,
    },
    {
      icon: Icons.headset,
      title: dict.contact.supportTitle,
      body: dict.contact.supportBody,
      value: siteConfig.supportEmail,
    },
    {
      icon: Icons.layers,
      title: dict.contact.partnersTitle,
      body: dict.contact.partnersBody,
      value: siteConfig.email,
    },
  ];

  const fa=locale==='fa';
  return <section className="fl-contact container-page"><div className="fl-contact-heading"><span className="fl-overline">GOOD THINGS START WITH A CONVERSATION</span><h1>{fa?<>از یک سلام،<br/><em>تا یک اتفاق خوب.</em></>:<>A simple hello.<br/><em>A new possibility.</em></>}</h1><p>{dict.contact.subtitle}</p></div><div className="fl-contact-grid"><div className="fl-contact-aside"><div className="fl-contact-postcard"><span>BEYONDEX / OPEN A CONVERSATION</span><Icons.mail size={70}/><h2>{fa?'گوش می‌دهیم. با هم فکر می‌کنیم.':'We listen. We think together.'}</h2><p>{fa?'از ایدهٔ اولیه تا انتخاب ایجنت مناسب، گفت‌وگو را از همین‌جا شروع کنید.':'From an early idea to finding the right agent, start the conversation here.'}</p></div><div className="fl-contact-channels">{channels.map((c,i)=><a href={'mailto:'+c.value} key={c.value+c.title}><span>0{i+1}</span><div><h2>{c.title}</h2><small dir="ltr">{c.value}</small></div><Icons.arrowUpRight size={21}/></a>)}</div></div><div className="fl-contact-form"><div className="fl-form-heading"><span>WRITE TO US / ↗</span><h2>{fa?'از کارتان برایمان بگویید.':'Tell us what you have in mind.'}</h2><p>{fa?'فرم در حالت پیش‌نمایش است؛ برای ارتباط واقعی از ایمیل‌های کنار فرم استفاده کنید.':'This form is a preview. Use the email links for actual contact.'}</p></div><ContactForm locale={locale} dict={dict}/></div></div></section>;
}
