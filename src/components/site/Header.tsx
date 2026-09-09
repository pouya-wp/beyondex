"use client";
import Link from 'next/link';
import {Suspense} from 'react';
import {usePathname} from 'next/navigation';
import {motion,useReducedMotion} from 'framer-motion';
import {Logo} from './Logo';
import {LocaleSwitcher} from './LocaleSwitcher';
import {Icons} from '@/components/ui/Icon';
import {localePath,type Locale} from '@/lib/i18n/config';
import type {Dictionary} from '@/lib/i18n';
export function Header({locale,dict}:{locale:Locale;dict:Dictionary}){
 const pathname=usePathname(),fa=locale==='fa',reduced=useReducedMotion();
 const links=[{path:'',label:fa?'خانه':'Home',icon:Icons.layers},{path:'/agents',label:fa?'ایجنت‌ها':'Agents',icon:Icons.cpu},{path:'/pricing',label:fa?'تعرفه‌ها':'Plans',icon:Icons.wallet},{path:'/about',label:fa?'دربارهٔ ما':'About',icon:Icons.users},{path:'/contact',label:fa?'ارتباط':'Contact',icon:Icons.mail}];
 const active=(path:string)=>path?pathname===localePath(locale,path)||pathname.startsWith(localePath(locale,path)+'/'):pathname===`/${locale}`;
 return <><a href="#main" className="sr-only focus:not-sr-only">{dict.nav.skipToContent}</a><header className="bx-header fl-header"><div className="container-page bx-header-inner"><Logo locale={locale}/><nav className="bx-desktop-nav fl-desktop-nav" aria-label={fa?'منوی اصلی':'Main navigation'}>{links.slice(1).map((l,i)=><Link key={l.path} href={localePath(locale,l.path)} aria-current={active(l.path)?'page':undefined}><small>0{i+1}</small><span>{l.label}</span><i/></Link>)}</nav><div className="bx-header-actions"><Suspense fallback={<span>FA / EN</span>}><LocaleSwitcher current={locale}/></Suspense><Link className="bx-button bx-button-small" href={localePath(locale,'/dashboard')}>{fa?'پنل من':'My workspace'}<Icons.arrowUpRight size={16}/></Link></div></div></header><nav className="fl-island" aria-label={fa?'ناوبری پایین صفحه':'Bottom navigation'}>{links.map(l=><Link key={l.path} href={localePath(locale,l.path)} aria-current={active(l.path)?'page':undefined}>{active(l.path)&&<motion.span className="fl-island-active" layoutId="island-current" transition={reduced?{duration:0}:{type:'spring',stiffness:380,damping:32}}/>}<l.icon size={20}/><span>{l.label}</span></Link>)}</nav></>;
}
