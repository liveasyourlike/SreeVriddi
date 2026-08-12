const SUPPORT_EMAIL = 'sreevriddhiforwealth@gmail.com';
function escapeHtml(value) { return String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#039;'); }
function rows(lead) {
  return [
    ['Lead ID', lead.id], ['Submitted', lead.createdAt || new Date().toISOString()], ['Full Name', lead.name],
    ['Mobile', lead.mobile], ['Email', lead.email], ['Location', lead.location], ['Asset Category', lead.assetType],
    ['Estimated Asset Value', `₹${Number(lead.approxValue || 0).toLocaleString('en-IN')}`],
    ['Stage', lead.stage || 'Eligibility Submitted'], ['Source', lead.source || 'Website Eligibility Checker'], ['Notes', lead.notes || '']
  ];
}
async function sendEmail(lead) {
  if (!process.env.RESEND_API_KEY) return { configured:false, sent:false, reason:'RESEND_API_KEY is not configured' };
  const table = rows(lead).map(([k,v])=>`<tr><td style="padding:8px;border:1px solid #ddd;font-weight:600">${escapeHtml(k)}</td><td style="padding:8px;border:1px solid #ddd">${escapeHtml(v)}</td></tr>`).join('');
  const response = await fetch('https://api.resend.com/emails',{method:'POST',headers:{Authorization:`Bearer ${process.env.RESEND_API_KEY}`,'Content-Type':'application/json'},body:JSON.stringify({from:process.env.NOTIFY_EMAIL_FROM||'Sree Vriddhi Website <onboarding@resend.dev>',to:[process.env.NOTIFY_EMAIL_TO||SUPPORT_EMAIL],subject:`New Website Evaluation — ${lead.name||'Customer'} — ${lead.id||'New Lead'}`,html:`<div style="font-family:Arial,sans-serif"><h2>New Sree Vriddhi Preliminary Evaluation</h2><p>A customer submitted the 10-Point Preliminary Evaluation Form.</p><table style="border-collapse:collapse;width:100%;max-width:760px">${table}</table><p style="font-size:12px;color:#666">Automated notification. Review before taking customer action.</p></div>`})});
  if(!response.ok) throw new Error(`Email provider failed: ${response.status}`); return {configured:true,sent:true};
}
async function sendWhatsApp(lead) {
  const token=process.env.WHATSAPP_ACCESS_TOKEN, phoneNumberId=process.env.WHATSAPP_PHONE_NUMBER_ID, to=process.env.WHATSAPP_TO_NUMBER, templateName=process.env.WHATSAPP_TEMPLATE_NAME;
  if(!token||!phoneNumberId||!to||!templateName) return {configured:false,sent:false,reason:'WhatsApp Cloud API/template variables are not configured'};
  const params=[lead.name,lead.mobile,lead.email,lead.location,lead.assetType,`₹${Number(lead.approxValue||0).toLocaleString('en-IN')}`,lead.stage||'Eligibility Submitted',lead.id||'-'].map(v=>({type:'text',text:String(v||'-').slice(0,1024)}));
  const response=await fetch(`https://graph.facebook.com/v23.0/${phoneNumberId}/messages`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({messaging_product:'whatsapp',to,type:'template',template:{name:templateName,language:{code:process.env.WHATSAPP_TEMPLATE_LANGUAGE||'en_US'},components:[{type:'body',parameters:params}]}})});
  if(!response.ok) throw new Error(`WhatsApp provider failed: ${response.status}`); return {configured:true,sent:true};
}
export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin',process.env.AI_ALLOWED_ORIGIN||'*'); res.setHeader('Access-Control-Allow-Headers','Content-Type'); res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  if(req.method==='OPTIONS') return res.status(204).end(); if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const lead=req.body?.lead; if(!lead||typeof lead!=='object'||!lead.name||!lead.mobile||!lead.email) return res.status(400).json({error:'Lead name, mobile and email are required.'});
  try {
    const [e,w]=await Promise.allSettled([sendEmail(lead),sendWhatsApp(lead)]);
    const email=e.status==='fulfilled'?e.value:{configured:true,sent:false,reason:e.reason?.message||'Email failed'};
    const whatsapp=w.status==='fulfilled'?w.value:{configured:true,sent:false,reason:w.reason?.message||'WhatsApp failed'};
    console.log('Lead notification result',{leadId:lead.id,email:email.sent,whatsapp:whatsapp.sent});
    return res.status(200).json({ok:true,leadId:lead.id,email,whatsapp});
  } catch(error){ console.error('Lead notification error',error); return res.status(500).json({error:'Lead notification service failed.'}); }
}
