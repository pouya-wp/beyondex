"use client";
import { useEffect,useRef } from "react";
import { motion,useScroll,useSpring,useReducedMotion } from "framer-motion";
export function ReadingProgress(){const {scrollYProgress}=useScroll();const reduced=useReducedMotion();const smooth=useSpring(scrollYProgress,{stiffness:130,damping:30});return <motion.div aria-hidden="true" className="night-reading-progress" style={{scaleX:reduced?scrollYProgress:smooth}}/>;}
export function NightField(){
 const ref=useRef<HTMLCanvasElement>(null);
 useEffect(()=>{const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext("2d");if(!ctx)return;
 const reduce=matchMedia("(prefers-reduced-motion: reduce)");let w=0,h=0,frame=0,visible=true,last=0;const pointer={x:.5,y:.35};
 function resize(){const box=canvas!.getBoundingClientRect();w=box.width;h=box.height;const dpr=Math.min(devicePixelRatio,1.5);canvas!.width=w*dpr;canvas!.height=h*dpr;ctx!.setTransform(dpr,0,0,dpr,0,0);draw(0);}
 function draw(time:number){ctx!.clearRect(0,0,w,h);const phase=reduce.matches?0:time*.0002;const cols=w<650?20:38,rows=23;
 for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){const nx=x/(cols-1),ny=y/(rows-1);const px=nx*w;const wave=Math.sin(nx*7+phase)*Math.cos(ny*4+phase)*20;const py=ny*h+wave;const side=Math.abs(nx-.5)*2;const dist=Math.hypot(nx-pointer.x,(ny-pointer.y)*.65);const glow=Math.max(0,1-dist*3);const alpha=(.04+side*.2+glow*.28)*(1-ny*.25);ctx!.fillStyle=`rgba(130,181,255,${alpha})`;const size=1+side*.7+glow;ctx!.fillRect(px,py,size,size);if(side>.55&&y%3===0){ctx!.strokeStyle=`rgba(95,145,235,${alpha*.5})`;ctx!.beginPath();ctx!.moveTo(px-3,py+4);ctx!.lineTo(px+4,py-3);ctx!.lineTo(px-1,py-3);ctx!.moveTo(px+4,py-3);ctx!.lineTo(px+4,py+2);ctx!.stroke();}}
 }
 function animate(time:number){if(!visible||document.hidden||reduce.matches){frame=0;return;}if(time-last>33){draw(time);last=time;}frame=requestAnimationFrame(animate);}
 function start(){if(!frame&&visible&&!document.hidden&&!reduce.matches)frame=requestAnimationFrame(animate);else if(reduce.matches)draw(0);}
 function move(e:PointerEvent){const rect=canvas!.getBoundingClientRect();pointer.x=(e.clientX-rect.left)/Math.max(1,w);pointer.y=(e.clientY-rect.top)/Math.max(1,h);}
 const parent=canvas.parentElement!;parent.addEventListener("pointermove",move,{passive:true});const ro=new ResizeObserver(resize);ro.observe(canvas);const io=new IntersectionObserver(([entry])=>{visible=entry.isIntersecting;start();});io.observe(canvas);document.addEventListener("visibilitychange",start);reduce.addEventListener("change",start);resize();start();
 return()=>{cancelAnimationFrame(frame);ro.disconnect();io.disconnect();parent.removeEventListener("pointermove",move);document.removeEventListener("visibilitychange",start);reduce.removeEventListener("change",start);};
 },[]);
 return <canvas ref={ref} className="night-field" aria-hidden="true"/>;
}
