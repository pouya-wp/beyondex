"use client";
import {useEffect,useRef,useState} from 'react';
import type {Locale} from '@/lib/i18n/config';

const notes=[261.63,293.66,329.63,349.23,392,440,493.88,523.25,587.33,659.25,698.46,783.99,880,987.77,1046.5];
const names=['C4','D4','E4','F4','G4','A4','B4','C5','D5','E5','F5','G5','A5','B5','C6'];
export function NoteKeys({locale,variant}:{locale:Locale;variant:number}){
 const context=useRef<AudioContext|null>(null),voices=useRef(new Set<OscillatorNode>()),alive=useRef(false),timer=useRef<ReturnType<typeof setTimeout>|null>(null);
 const [playing,setPlaying]=useState(-1),[error,setError]=useState(false);const fa=locale==='fa';
 useEffect(()=>{alive.current=true;return()=>{alive.current=false;if(timer.current)clearTimeout(timer.current);for(const voice of voices.current){try{voice.stop();}catch{}voice.disconnect();}voices.current.clear();const ctx=context.current;context.current=null;if(ctx&&ctx.state!=='closed')void ctx.close().catch(()=>{});};},[]);
 async function play(index:number){
  try{
   const AudioCtor=window.AudioContext??(window as unknown as {webkitAudioContext?:typeof AudioContext}).webkitAudioContext;
   if(!AudioCtor)throw new Error('Audio unavailable');
   // Create and resume only from the user's activation, including the first tap.
   if(!context.current||context.current.state==='closed')context.current=new AudioCtor();
   const ctx=context.current;await ctx.resume();
   if(!alive.current||ctx.state!=='running')return;
   if(voices.current.size>=8){const oldest=voices.current.values().next().value;if(oldest){try{oldest.stop();}catch{}voices.current.delete(oldest);}}
   const oscillator=ctx.createOscillator(),gain=ctx.createGain(),now=ctx.currentTime;
   oscillator.type='triangle';oscillator.frequency.setValueAtTime(notes[index],now);
   gain.gain.setValueAtTime(0,now);gain.gain.linearRampToValueAtTime(.12,now+.012);gain.gain.exponentialRampToValueAtTime(.001,now+.65);
   oscillator.connect(gain);gain.connect(ctx.destination);voices.current.add(oscillator);
   oscillator.onended=()=>{voices.current.delete(oscillator);oscillator.disconnect();gain.disconnect();};
   oscillator.start(now);oscillator.stop(now+.7);setError(false);setPlaying(index);
   if(timer.current)clearTimeout(timer.current);timer.current=setTimeout(()=>{if(alive.current)setPlaying(-1);},350);
  }catch{if(alive.current)setError(true);}
 }
 return <div className="sg-note-instrument"><div className="sg-note-keys" role="group" aria-label={fa?'کلیدهای موسیقی؛ برای پخش نت انتخاب کنید':'Musical keys; select to play a note'} dir="ltr">{notes.map((_,i)=><button key={i} type="button" aria-label={(fa?'پخش نت ':'Play note ')+names[i]} className={playing===i?'is-playing':''} style={{height:22+((i*17+variant*23)%75)+'%'}} onClick={()=>void play(i)}><span>{names[i]}</span></button>)}</div><small role="status">{error?(fa?'پخش صدا در مرورگر ممکن نشد؛ دوباره روی یک نت بزنید.':'Audio could not start. Try selecting a note again.'):(fa?'روی میله‌ها بزنید و نت‌ها را بشنوید؛ صدا فقط با انتخاب شما پخش می‌شود.':'Tap the bars to hear the notes. Sound plays only when you choose a key.')}</small></div>;
}
