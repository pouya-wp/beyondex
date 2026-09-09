"use client";
import {useEffect,useRef,useState} from "react";
export function BrandSculpture(){
 const host=useRef<HTMLDivElement>(null);const [live,setLive]=useState(false);
 useEffect(()=>{const el=host.current;if(!el)return;let disposed=false,cleanup=()=>{},started=false;
 const visibility=new IntersectionObserver(async([entry])=>{if(!entry.isIntersecting||started)return;started=true;
 try{const [T,{RoomEnvironment}]=await Promise.all([import('three'),import('three/addons/environments/RoomEnvironment.js')]);if(disposed)return;
 const renderer=new T.WebGLRenderer({alpha:true,antialias:true,powerPreference:'low-power'});renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));renderer.setClearColor(0,0);renderer.toneMapping=T.ACESFilmicToneMapping;renderer.toneMappingExposure=1.15;renderer.outputColorSpace=T.SRGBColorSpace;el.appendChild(renderer.domElement);
 const scene=new T.Scene(),camera=new T.PerspectiveCamera(35,1,.1,100);camera.position.set(0,.2,7.3);
 const room=new RoomEnvironment(),pmrem=new T.PMREMGenerator(renderer);const environment=pmrem.fromScene(room,.04);scene.environment=environment.texture;scene.environmentIntensity=1.1;room.dispose();pmrem.dispose();
 const group=new T.Group();scene.add(group);const geo=new T.TorusGeometry(1,.27,40,128),mat=new T.MeshPhysicalMaterial({color:0x183dcc,metalness:.88,roughness:.19,clearcoat:1,clearcoatRoughness:.09,iridescence:.18,iridescenceIOR:1.35,iridescenceThicknessRange:[100,240]});
 const a=new T.Mesh(geo,mat),b=new T.Mesh(geo,mat.clone());b.material.color.setHex(0x759eff);b.material.metalness=.94;b.material.roughness=.16;a.rotation.x=.72;a.rotation.y=-.35;b.rotation.y=Math.PI/2;b.position.x=.7;a.position.x=-.5;group.add(a,b);group.rotation.z=-.45;
 scene.add(new T.AmbientLight(0xb1caff,.35));const key=new T.DirectionalLight(0xfff5e9,3.5);key.position.set(-3,4,2);scene.add(key);const fill=new T.DirectionalLight(0x8db8ff,2.8);fill.position.set(3,-1,2);scene.add(fill);const rim=new T.DirectionalLight(0xd5edff,4);rim.position.set(1,2,-3);scene.add(rim);
 let active=true,frame=0,last=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)');const target={x:0,y:0};
 function resize(){const w=el!.clientWidth,h=el!.clientHeight;renderer.setSize(w,h);camera.aspect=w/Math.max(h,1);camera.updateProjectionMatrix();renderer.render(scene,camera);}
 function draw(time:number){frame=0;if(disposed||!active||document.hidden)return;if(time-last>32){group.rotation.y+=(target.x-group.rotation.y)*.025;group.rotation.x+=(target.y-group.rotation.x)*.025;if(!reduced.matches)group.rotation.z=-.45+Math.sin(time*.00035)*.14;renderer.render(scene,camera);last=time;}if(!reduced.matches)frame=requestAnimationFrame(draw);}
 function start(){if(!frame&&!disposed&&active&&!document.hidden)frame=requestAnimationFrame(draw);}
 function pointer(e:PointerEvent){if(reduced.matches||e.pointerType!=='mouse')return;const r=el!.getBoundingClientRect();target.x=((e.clientX-r.left)/r.width-.5)*.8;target.y=((e.clientY-r.top)/r.height-.5)*.4;}
 function leave(){target.x=0;target.y=0;}
 function lost(e:Event){e.preventDefault();setLive(false);active=false;cancelAnimationFrame(frame);}
 const ro=new ResizeObserver(resize);ro.observe(el);const io=new IntersectionObserver(([e])=>{active=e.isIntersecting;start();});io.observe(el);el.addEventListener('pointermove',pointer);el.addEventListener('pointerleave',leave);renderer.domElement.addEventListener('webglcontextlost',lost);document.addEventListener('visibilitychange',start);reduced.addEventListener('change',start);resize();setLive(true);start();
 cleanup=()=>{cancelAnimationFrame(frame);io.disconnect();ro.disconnect();el.removeEventListener('pointermove',pointer);el.removeEventListener('pointerleave',leave);document.removeEventListener('visibilitychange',start);reduced.removeEventListener('change',start);renderer.domElement.removeEventListener('webglcontextlost',lost);geo.dispose();mat.dispose();b.material.dispose();environment.dispose();renderer.dispose();renderer.domElement.remove();};
 }catch{if(!disposed)setLive(false);}
 });visibility.observe(el);return()=>{disposed=true;visibility.disconnect();cleanup();};},[]);
 return <div className={`iv-sculpture ${live?'is-live':''}`} ref={host} aria-hidden="true"><img src="/brand/beyondex-mark.svg" className="iv-sculpture-fallback" alt=""/></div>;
}
