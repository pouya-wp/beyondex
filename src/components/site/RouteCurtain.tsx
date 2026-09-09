"use client";
import {useEffect,useRef} from 'react';
import {usePathname,useRouter} from 'next/navigation';
import {motion,useAnimationControls,useReducedMotion} from 'framer-motion';
let crossing=false;
export function RouteCurtain(){
 const path=usePathname(),router=useRouter(),controls=useAnimationControls(),reduced=useReducedMotion(),busy=useRef(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 useEffect(()=>{if(!busy.current&&!crossing)return;void controls.start('reveal').then(()=>{busy.current=false;crossing=false;if(timer.current)clearTimeout(timer.current);});},[path,controls]);
 useEffect(()=>{if(reduced)return;
 function reset(){crossing=false;void controls.start('reveal');busy.current=false;}
 function click(e:MouseEvent){const a=e.target instanceof Element?e.target.closest('a'):null;if(!a||e.defaultPrevented||e.button!==0||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||a.hasAttribute('download')||(a.target&&a.target!=='_self')||a.dataset.nativeNavigation!==undefined)return;const url=new URL(a.href,location.href);if(url.origin!==location.origin||url.pathname===location.pathname)return;if(busy.current){e.preventDefault();return;}e.preventDefault();e.stopPropagation();router.prefetch(url.pathname+url.search);busy.current=true;timer.current=setTimeout(reset,8000);void controls.start('cover').then(()=>{if(busy.current){crossing=true;router.push(url.pathname+url.search+url.hash);}});}
 document.addEventListener('click',click,true);return()=>{document.removeEventListener('click',click,true);if(timer.current)clearTimeout(timer.current);busy.current=false;};},[controls,reduced,router]);
 if(reduced)return null;
 return <div className="ax-curtain" aria-hidden="true">{[0,1,2,3,4].map(i=><motion.div key={i} custom={i} initial={crossing?"cover":"idle"} animate={controls} variants={{idle:{scaleY:0},cover:n=>({scaleY:1,transformOrigin:'top',transition:{duration:.26,delay:n*.02,ease:[.76,0,.24,1]}}),reveal:n=>({scaleY:0,transformOrigin:'bottom',transition:{duration:.3,delay:n*.02,ease:[.76,0,.24,1]}})}}/>)}</div>;
}
