const fs = require('node:fs');
const assert = require('node:assert/strict');
const ts = require('typescript');
const mod = {exports:{}};
new Function('exports','require','module',ts.transpileModule(fs.readFileSync('src/lib/data/experiments.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText)(mod.exports,require,mod);
const {experiments} = mod.exports;
assert.equal(experiments.length,60);
assert.equal(new Set(experiments.map(e=>e.id)).size,60);
assert.equal(new Set(experiments.map(e=>e.kind)).size,60);
assert.equal(experiments.filter(e=>e.group==='new').length,50);
for(const e of experiments){assert.equal(new URL(e.source).hostname,'www.awwwards.com');assert.ok(e.fa&&e.en&&e.instructionFa&&e.instructionEn);}
(async()=>{
 for(const locale of ['fa','en']){
  const response=await fetch(`http://localhost:3001/${locale}/lab`);
  assert.equal(response.status,200);
  const html=await response.text();
  for(const e of experiments)assert.ok(html.includes(locale==='fa'?e.fa:e.en.replaceAll('&','&amp;')),`Missing study ${e.id} in ${locale}`);
  assert.ok(html.includes('lab-workbench')&&html.includes('lab-index'));
  const detail=await(await fetch(`http://localhost:3001/${locale}/agents/customer-support`)).text();
  assert.ok(detail.includes('lab-accent')&&detail.includes('lab-compare'));
  assert.ok(detail.includes(`/${locale}/lab`));
  console.log(`PASS ${locale}: 60 studies, lab route, selected agent integration, footer link`);
 }
 const map=await(await fetch('http://localhost:3001/sitemap.xml')).text();
 assert.ok(map.includes('/fa/lab')&&map.includes('/en/lab'));
 console.log('PASS 10 original + 50 new, unique IDs/modes, bilingual guides, sources and sitemap');
})().catch(e=>{console.error(e);process.exitCode=1});
