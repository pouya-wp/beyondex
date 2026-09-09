"use client";
import {useEffect,useState} from "react";
import {usePathname} from "next/navigation";
import {motion,useMotionValue,useReducedMotion} from "framer-motion";
import {RouteCurtain} from "./RouteCurtain";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
export function SiteEffects(){
 const pathname=usePathname(),reduced=useReducedMotion();const x=useMotionValue(-100),y=useMotionValue(-100);const [cursor,setCursor]=useState(false),[hover,setHover]=useState(false),[pressed,setPressed]=useState(false);
 useEffect(()=>{if(reduced)return;const particles=new Set<HTMLElement>();function click(e:MouseEvent){if(e.detail===0)return;const target=e.target instanceof Element?e.target.closest('button,a,[role="tab"]'):null;if(!target||target.matches(':disabled,[aria-disabled="true"]'))return;for(let i=0;i<4;i++){const dot=document.createElement('i');dot.className='fl-click-spark';dot.setAttribute('aria-hidden','true');dot.style.left=e.clientX+'px';dot.style.top=e.clientY+'px';document.body.appendChild(dot);particles.add(dot);const angle=Math.PI/4+i*Math.PI/2;const animation=dot.animate([{transform:'translate(-50%,-50%) rotate(45deg) scale(.4)',opacity:.8},{transform:'translate('+Math.cos(angle)*22+'px,'+Math.sin(angle)*22+'px) rotate(90deg) scale(0)',opacity:0}],{duration:380,easing:'cubic-bezier(.22,1,.36,1)'});animation.onfinish=()=>{dot.remove();particles.delete(dot);};}}document.addEventListener('click',click);return()=>{document.removeEventListener('click',click);particles.forEach(dot=>{dot.getAnimations().forEach(a=>a.cancel());dot.remove();});};},[reduced]);
 useEffect(()=>{if(reduced)return;const lenis=new Lenis({autoRaf:true,lerp:.085,smoothWheel:true,anchors:{offset:-110},prevent:node=>!!node.closest('dialog,.db-messages,.db-chat-agents,.db-sidebar,.db-agent-library,textarea,[data-lenis-prevent]')});return()=>lenis.destroy();},[reduced,pathname]);
 useEffect(()=>{if(reduced||!matchMedia('(hover:hover) and (pointer:fine)').matches)return;
 const root=document.documentElement;
 function down(){setPressed(true);} function up(){setPressed(false);}
 function hide(){setPressed(false);setCursor(false);root.removeAttribute('data-art-cursor');}
 function move(e:PointerEvent){if(e.pointerType!=='mouse'){hide();return;}const target=e.target instanceof Element?e.target:null;if(target?.closest('input,textarea,select,[contenteditable="true"],dialog')){hide();return;}x.set(e.clientX);y.set(e.clientY);setHover(!!target?.closest('a,button,[role="tab"],[role="switch"]'));setCursor(true);root.setAttribute('data-art-cursor','true');}
 function key(e:KeyboardEvent){if(e.key==='Tab')hide();}
 window.addEventListener('pointerdown',down);window.addEventListener('pointerup',up);window.addEventListener('pointermove',move,{passive:true});document.addEventListener('pointerleave',hide);window.addEventListener('blur',hide);window.addEventListener('keydown',key);
 return()=>{hide();window.removeEventListener('pointerdown',down);window.removeEventListener('pointerup',up);window.removeEventListener('pointermove',move);document.removeEventListener('pointerleave',hide);window.removeEventListener('blur',hide);window.removeEventListener('keydown',key);};
 },[reduced,x,y]);
 return <><motion.div className={`iv-cursor ${hover?'is-action':''} ${pressed?'is-pressed':''}`} style={{x,y,opacity:cursor?1:0}} aria-hidden="true"><i className="iv-cursor-tip"/><div className="iv-cursor-emblem"><img src="/brand/beyondex-mark-white.svg" width="30" height="27" alt="" draggable="false"/><i className="iv-cursor-echo"/></div></motion.div><RouteCurtain/></>;
}
