const fs=require('fs'),path=require('path'),ts=require('typescript'),assert=require('node:assert/strict');
const cache=new Map();
function load(file){file=path.resolve(file);if(cache.has(file))return cache.get(file);const mod={exports:{}};cache.set(file,mod.exports);const src=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;const local=id=>{if(id.startsWith('@/'))return load(path.join(process.cwd(),'src',id.slice(2))+'.ts');if(id.startsWith('.'))return load(path.resolve(path.dirname(file),id)+'.ts');return require(id);};new Function('require','module','exports',src)(local,mod,mod.exports);return mod.exports;}
const {resolveItem}=load('src/lib/data/catalog.ts');
assert.equal(resolveItem({plan:'growth',cycle:'monthly'}).price.irt,35000000);
assert.equal(resolveItem({plan:'growth',cycle:'yearly'}).price.irt,30000000*12);
assert.equal(resolveItem({plan:'scale',cycle:'yearly'}).price.usd,374*12);
assert.equal(resolveItem({plan:'starter',cycle:'monthly'}).price.irt,10000000);
assert.equal(resolveItem({plan:'starter',cycle:'yearly'}).price.irt,120000000);
assert.equal(resolveItem({plan:'scale',cycle:'monthly'}).price.irt,120000000);
const {agents}=load('src/lib/data/agents.ts');
for(const agent of agents){assert.ok(agent.price.irt>=10000000);assert.equal(resolveItem({agent:agent.slug}).price.irt,agent.price.irt);}
assert.equal(resolveItem({plan:'enterprise'}),undefined);
assert.equal(resolveItem({template:'old-template'}),undefined);
console.log('Pricing checks passed: monthly, annual, two-run trial separate from paid plans, custom quote, removed products.');

