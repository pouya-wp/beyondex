"use client";
import Link from "next/link";
import { NightField } from "@/components/ui/NightField";
import { LogoMark } from "@/components/site/Logo";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Icons } from "@/components/ui/Icon";
import { localePath, type Locale } from "@/lib/i18n/config";

export function Hero({locale}: {locale:Locale}) {
 const fa=locale==="fa";
 const reduced=useReducedMotion();
 const [active,setActive]=useState(0);
 const demos=fa ? [
  {name:"پشتیبانی",icon:Icons.headset,task:"پاسخ‌گویی به سوالات مشتریان",message:"سفارش من چه زمانی ارسال می‌شه؟",answer:"سلام! سفارشتون آمادهٔ ارسال است. کد رهگیری رو همین‌جا براتون می‌فرستم.",count:"۱۲۸",unit:"گفت‌وگوی پاسخ‌داده‌شده"},
  {name:"فروش",icon:Icons.target,task:"پیگیری فرصت‌های فروش",message:"کدام مشتری‌ها نیاز به پیگیری دارند؟",answer:"۳ مشتری منتظر پیشنهاد قیمت هستند. پیش‌نویس پیام پیگیری آمادهٔ بررسی شماست.",count:"۲۴",unit:"فرصت فروش شناسایی‌شده"},
  {name:"محتوا",icon:Icons.pen,task:"آماده‌سازی محتوای برند شما",message:"برای معرفی محصول جدید یک کپشن بنویس.",answer:"پیش‌نویس کپشن با لحن برند شما آماده شد؛ می‌توانید قبل از انتشار ویرایشش کنید.",count:"۱۶",unit:"پیش‌نویس آمادهٔ بررسی"},
 ] : [
  {name:"Support",icon:Icons.headset,task:"Answering customer questions",message:"When will my order ship?",answer:"Hi! Your order is ready to ship. I’ll share your tracking code right here.",count:"128",unit:"Conversations answered"},
  {name:"Sales",icon:Icons.target,task:"Following up on sales opportunities",message:"Which customers need a follow-up?",answer:"3 customers are awaiting a quote. Your follow-up drafts are ready to review.",count:"24",unit:"Sales opportunities identified"},
  {name:"Content",icon:Icons.pen,task:"Preparing content for your brand",message:"Write a caption for our new product.",answer:"Your caption draft is ready in your brand’s voice. Review it before publishing.",count:"16",unit:"Drafts ready to review"},
 ];
 const demo=demos[active];
 return <section className="bx-hero bx-atmosphere"><NightField/><div className="night-horizon" aria-hidden="true"/><div className="night-orbital" aria-hidden="true"/><div className="bx-hero-grain" aria-hidden="true"/><span className="bx-hero-edition" aria-hidden="true">EST. 2026 / INTELLIGENCE WITHOUT LIMITS</span><div className="container-page bx-hero-grid">
  <div className="bx-hero-copy"><div className="bx-kicker"><span/>{fa ? "نسل جدید همکارهای هوشمند" : "MEET YOUR NEXT TEAMMATE"}</div><h1>{fa ? "کارها رو بسپار،" : "Hand off the busywork."}<br/><span>{fa ? "به رشدت برس." : "Make room to grow."}</span><svg className="bx-underline" viewBox="0 0 330 15" aria-hidden="true"><path d="M4 10Q140-3 326 8" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round"/></svg></h1><p>{fa ? "هر ایجنت، پنل مدیریت مستقل خودش را دارد. ایجنت مناسب را انتخاب کنید، اشتراک و دسترسی‌اش را در بیاندکس مدیریت کنید و کار را در پنل خودش پیش ببرید." : "Each agent has its own independent management panel. Choose your agent, manage its subscription and access in Beyondex, and work in its dedicated environment."}</p><div className="bx-hero-actions"><Link className="bx-button" href={localePath(locale,"/agents")}>{fa ? "ایجنت مناسبم رو پیدا کنم" : "Find my agent"}<Icons.arrowRight className="flip-rtl" size={18}/></Link><a className="bx-text-link" href={localePath(locale,"/dashboard")}><span className="bx-play"><Icons.play size={14}/></span>{fa ? "پنل چه شکلیه؟" : "Explore the panel"}</a></div><div className="bx-hero-checks"><span><Icons.check size={16}/>{fa ? "پنل فارسی و اختصاصی" : "Your dedicated workspace"}</span><span><Icons.check size={16}/>{fa ? "تست محدود با ۲ اجرا" : "Two limited trial runs"}</span><span><Icons.check size={16}/>{fa ? "همراهی تیم پشتیبانی" : "A helpful support team"}</span></div></div>
  <div className="bx-hero-art"><div className="bx-light-columns" aria-hidden="true"/><span className="bx-stage-caption" aria-hidden="true">YOUR IDEAS. CONNECTED.</span><div className="bx-orbit" aria-hidden="true"/><div className="bx-orbit bx-orbit-inner" aria-hidden="true"/>
   <motion.div className="bx-demo" initial={false} >
    <div className="bx-demo-top"><span className="bx-mini-brand" dir="ltr">beyondex<span> / panel</span></span><span className="bx-demo-label">{fa ? "نمونهٔ پنل مستقل ایجنت" : "Independent agent panel concept"}</span></div>
    <div className="bx-demo-body"><div className="bx-demo-greeting"><div><small>{fa ? "فضای کاری اختصاصی شما" : "Your dedicated workspace"}</small><h2>{fa ? "سلام، روزتون پربازده ☀" : "Hello, make today count ☀"}</h2></div><span className="bx-avatar">B</span></div>
    <div className="bx-demo-tabs" role="tablist" aria-label={fa ? "نمونه عملکرد ایجنت" : "Agent examples"}>{demos.map((d,i)=><button key={d.name} id={`demo-tab-${i}`} type="button" role="tab" aria-selected={i===active} aria-controls="demo-content" tabIndex={active===i ? 0 : -1} onKeyDown={(event)=>{const direction=event.key==="ArrowRight" ? (fa ? -1 : 1) : event.key==="ArrowLeft" ? (fa ? 1 : -1) : 0; const next=event.key==="Home" ? 0 : event.key==="End" ? demos.length-1 : direction ? (active+direction+demos.length)%demos.length : null; if(next!==null){event.preventDefault();setActive(next);document.getElementById(`demo-tab-${next}`)?.focus();}}} onClick={()=>setActive(i)} className={active===i ? "active" : ""}><d.icon size={16}/>{d.name}</button>)}</div>
    <div id="demo-content" role="tabpanel" aria-labelledby={`demo-tab-${active}`}><AnimatePresence mode="wait" initial={false}><motion.div key={active} initial={{opacity:reduced ? 1 : 0,y:reduced ? 0 : 6}} animate={{opacity:1,y:0}} exit={{opacity:reduced ? 1 : 0}} transition={{duration:.18}}><div className="bx-demo-task"><span><demo.icon size={18}/>{demo.task}</span><i>{fa ? "فعال" : "Active"}</i></div><div className="bx-chat-user">{demo.message}</div><div className="bx-chat-agent"><span className="bx-agent-spark"><Icons.sparkles size={17}/></span><p>{demo.answer}</p></div><div className="bx-demo-metric"><span><strong>{demo.count}</strong><small>{demo.unit}</small></span><div className="bx-bars" aria-hidden="true">{[30,48,36,65,48,78,66,95,80,110].map((h,i)=><span key={i} style={{height:h/2}}/>)}</div></div></motion.div></AnimatePresence></div>
    <div className="bx-demo-bottom"><span className="bx-status-dot"/>{fa ? "نمایش نمونه با داده‌های نمایشی" : "Interactive preview · sample data"}<Icons.shield size={14}/></div></div>
   </motion.div><motion.div className="bx-float-note" ><span><Icons.check size={17}/></span>{fa ? "شما تصمیم می‌گیرید؛ ایجنت انجام می‌دهد." : "You decide. Your agent gets it done."}</motion.div>
  </div>
 </div></section>;
}
