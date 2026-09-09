"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
export function Reveal({children, delay=0, className, as="div"}: {children:ReactNode; delay?:number; className?:string; as?:"div"|"li"|"section"|"article"}) {
 const reduced = useReducedMotion();
 const Tag = motion[as];
 return <Tag className={className} initial={false} whileInView={reduced ? undefined : {y:[18,0],opacity:[0.65,1]}} viewport={{once:true,amount:0.12}} transition={{duration:.6,delay:delay/1000,ease:[.22,1,.36,1]}}>{children}</Tag>;
}
