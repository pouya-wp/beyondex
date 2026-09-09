"""Trace the user-supplied white logo into transparent vector paths."""
from PIL import Image
from pathlib import Path
import sys, math
src = Image.open(sys.argv[1]).convert('RGB')
out = Path('beyondex/public/brand')
def distance(p,a,b):
    dx,dy=b[0]-a[0],b[1]-a[1]
    if not dx and not dy: return math.dist(p,a)
    t=max(0,min(1,((p[0]-a[0])*dx+(p[1]-a[1])*dy)/(dx*dx+dy*dy)))
    return math.dist(p,(a[0]+t*dx,a[1]+t*dy))
def simplify(points,eps=1.0):
    if len(points)<3:return points
    distances=[distance(p,points[0],points[-1]) for p in points[1:-1]]
    d=max(distances,default=0)
    if d<=eps:return [points[0],points[-1]]
    idx=distances.index(d)+1
    return simplify(points[:idx+1],eps)[:-1]+simplify(points[idx:],eps)
def trace(box,name):
    im=src.crop(box)
    w,h=im.size
    pixels=im.load()
    inside={(x,y) for y in range(h) for x in range(w) if min(pixels[x,y])>165}
    edges={}
    def add(a,b):edges.setdefault(a,[]).append(b)
    for x,y in inside:
        if (x,y-1) not in inside:add((x,y),(x+1,y))
        if (x+1,y) not in inside:add((x+1,y),(x+1,y+1))
        if (x,y+1) not in inside:add((x+1,y+1),(x,y+1))
        if (x-1,y) not in inside:add((x,y+1),(x,y))
    paths=[]
    while edges:
        start=next(iter(edges));p=start;loop=[p]
        while True:
            nxt=edges[p].pop()
            if not edges[p]:del edges[p]
            loop.append(nxt);p=nxt
            if p==start:break
        area=abs(sum(a[0]*b[1]-b[0]*a[1] for a,b in zip(loop,loop[1:]))/2)
        if area<3:continue
        half=len(loop)//2
        pts=simplify(loop[:half+1])[:-1]+simplify(loop[half:])
        pts=pts[:-1] if pts[-1]==pts[0] else pts
        commands=[]
        for i,p in enumerate(pts):
            a,b=pts[i-1],pts[(i+1)%len(pts)]
            u=(p[0]-a[0],p[1]-a[1]);v=(b[0]-p[0],b[1]-p[1])
            norm=math.hypot(*u)*math.hypot(*v)
            angle=math.acos(max(-1,min(1,(u[0]*v[0]+u[1]*v[1])/norm))) if norm else 3.14
            ratio=.28 if angle<.95 else 0
            entry=(p[0]-u[0]*ratio,p[1]-u[1]*ratio)
            leave=(p[0]+v[0]*ratio,p[1]+v[1]*ratio)
            commands.append(('M' if i==0 else 'L')+f'{entry[0]:.2f},{entry[1]:.2f}')
            if ratio:commands.append(f'Q{p[0]},{p[1]} {leave[0]:.2f},{leave[1]:.2f}')
        paths.append(' '.join(commands)+' Z')
    d=' '.join(paths)
    for suffix,color in [('', '#111B68'),('-white','#FFFFFF')]:
        (out/f'{name}{suffix}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" fill="none"><title>Beyondex</title><path fill="{color}" fill-rule="evenodd" d="{d}"/></svg>',encoding='utf8')
    print(name,len(paths),'contours',w,h)
trace((250,155,797,260),'beyondex-logo')
trace((250,155,365,255),'beyondex-mark')
