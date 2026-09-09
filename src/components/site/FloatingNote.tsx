"use client";
import {useEffect,useState} from 'react';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {AnimatePresence,motion,useReducedMotion} from 'framer-motion';
import {Icons} from '@/components/ui/Icon';
import {localePath,type Locale} from '@/lib/i18n/config';
export function FloatingNote({locale}:{locale:Locale}){
 const [visible,setVisible]=useState(false),path=usePathname(),reduced=useReducedMotion(),fa=locale==='fa';
 useEffect(()=>{let dismissed=false;try{dismissed=sessionStorage.getItem('beyondex-note-dismissed')==='1';}catch{}if(dismissed)return;const timer=setTimeout(()=>setVisible(true),3500);const end=setTimeout(()=>setVisible(false),14000);return()=>{clearTimeout(timer);clearTimeout(end);};},[]);
 function close(){setVisible(false);try{sessionStorage.setItem('beyondex-note-dismissed','1');}catch{}}
 return <AnimatePresence>{visible&&!/\/(contact|checkout|dashboard|lab)/.test(path)&&<motion.aside className="fl-note" aria-label={fa?'آشنایی با پنل':'Explore the workspace'} initial={reduced?false:{opacity:0,y:20,rotate:3}} animate={{opacity:1,y:0,rotate:0}} exit={{opacity:0,y:reduced?0:12}}><button className="fl-note-close" onClick={close} aria-label={fa?'بستن اعلان':'Dismiss announcement'}><Icons.close size={15}/></button><span className="fl-note-mark"><img src="/brand/beyondex-mark-white.svg" width="27" height="26" alt=""/></span><div><small>BEYONDEX / A LITTLE POSSIBILITY</small><p>{fa?'همکار بعدی‌تان، همین‌جاست.':'Meet your next teammate.'}</p><Link href={localePath(locale,'/agents')}>{fa?'ایجنت مناسبم را پیدا کنم':'Find my agent'}<Icons.arrowUpRight size={14}/></Link></div></motion.aside>}</AnimatePresence>;
}

