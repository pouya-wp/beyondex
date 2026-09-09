import Link from 'next/link';
import {Icons} from '@/components/ui/Icon';
import type {Agent} from '@/lib/data/agents';
import type {Dictionary} from '@/lib/i18n';
import {localePath,t,type Locale} from '@/lib/i18n/config';
import {formatPrice} from '@/lib/utils';
export function AgentCard({agent,locale}:{agent:Agent;locale:Locale;dict:Dictionary}){
 const fa=locale==='fa',Icon=Icons[agent.icon];return <article className="ax-agent-card"><Link href={localePath(locale,'/agents/'+agent.slug)} className="ax-agent-preview" aria-label={t(agent.name,locale)}><div className="ax-mini-toolbar"><i/><i/><i/><span>{agent.slug.toUpperCase()}</span></div><div className="ax-mini-app"><aside><Icon size={25}/><i/><i/><i/></aside><div><small>{fa?'پیش‌نمایش مفهومی':'CONCEPT PREVIEW'}</small><strong>{t(agent.name,locale)}</strong><div className="ax-mini-widgets"><span/><span/><span/></div><div className="ax-mini-chart">{[35,55,42,72,60,88,76].map((h,i)=><i key={i} style={{height:h+'%'}}/>)}</div></div></div><span className="ax-agent-view">{fa?'کشف ایجنت':'Explore agent'}<Icons.arrowUpRight size={17}/></span></Link><div className="ax-agent-info"><span className="ax-agent-type"><Icons.layers size={13}/>{fa?'رابط اختصاصی · دسترسی اشتراکی':'Dedicated UI · Subscription access'}</span><h3><Link href={localePath(locale,'/agents/'+agent.slug)}>{t(agent.name,locale)}</Link></h3><p>{t(agent.tagline,locale)}</p><div className="ax-agent-price"><div><small>{fa?'دسترسی ماهانه از':'Monthly access from'}</small><strong>{formatPrice(agent.price,locale)}</strong></div><Link href={localePath(locale,'/agents/'+agent.slug)} aria-label={(fa?'مشاهدهٔ صفحهٔ ':'Explore ')+t(agent.name,locale)}><span>{fa?'مشاهده':'Explore'}</span><Icons.arrowUpRight size={19}/></Link></div></div></article>;
}
