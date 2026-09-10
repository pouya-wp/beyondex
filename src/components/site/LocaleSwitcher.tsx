"use client";
import Link from 'next/link';
import {usePathname,useSearchParams} from 'next/navigation';
import {locales,localeMeta,type Locale} from '@/lib/i18n/config';
export function LocaleSwitcher({current,className=''}:{current:Locale;className?:string}){
 const pathname=usePathname(),params=useSearchParams();
 function hrefFor(target:Locale){const parts=pathname.split('/').filter(Boolean);if((locales as readonly string[]).includes(parts[0]))parts[0]=target;else parts.unshift(target);const query=params.toString();return '/'+parts.join('/')+(query?'?'+query:'');}
 return <div className={`fl-language ${className}`} role="group" aria-label={current==='fa'?'انتخاب زبان':'Choose language'} dir="ltr"><span className="fl-language-glyph" aria-hidden="true">↔</span>{locales.map(loc=><Link key={loc} href={hrefFor(loc)} hrefLang={localeMeta[loc].htmlLang} lang={localeMeta[loc].htmlLang} aria-label={loc==='fa'?'فارسی':'English'} aria-current={current===loc?'true':undefined}>{current===loc&&<i/>}<span className={'ax-flag ax-flag-'+loc} aria-hidden="true"><b/><b/><b/></span><span>{loc==='fa'?'فا':'EN'}</span></Link>)}</div>;
}
