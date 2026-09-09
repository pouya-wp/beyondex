const assert=require('node:assert/strict');
(async()=>{
 for(const locale of ['fa','en']){
  const r=await fetch(`http://localhost:3001/${locale}/pricing`);assert.equal(r.status,200);
  const html=await r.text();assert.ok(html.includes('product-trial'));assert.ok(!html.includes('/checkout?plan=starter'));
  for(const stale of ['500 agent runs','۵۰۰ اجرای','SOC 2 Type II','99.9% uptime SLA','daily rate shown'])assert.ok(!html.includes(stale),stale);
  const agent=await(await fetch(`http://localhost:3001/${locale}/agents/accounting`)).text();assert.ok(agent.includes('product-trial'));assert.ok(agent.includes('25000000')||agent.includes('۲۵٬۰۰۰٬۰۰۰')||agent.includes('25,000,000'));
  console.log('PASS',locale,'trial separated from paid subscriptions; outdated claims removed');
 }
 const res=await fetch('http://localhost:3001/api/payments/create',{method:'POST',headers:{'content-type':'application/json'},body:'{}'});assert.equal(res.status,503);console.log('PASS live-purchase gate remains closed');
})().catch(e=>{console.error(e);process.exitCode=1});
