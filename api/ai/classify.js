import { knowledgeText } from './knowledge.js';

const allowedIntents = [
  'GENERAL_ENQUIRY','SERVICE_INFORMATION','PRODUCT_INFORMATION','ELIGIBILITY','DOCUMENT_REQUIREMENT','CALLBACK','MEETING','WEBSITE_HELP','APPLICATION_STATUS','FOLLOW_UP','COMPLAINT','GRIEVANCE','FINANCIAL_QUERY','INVESTMENT_QUERY','RETURNS_QUERY','LEGAL_QUERY','TAX_QUERY','PRIVATE_CUSTOMER_QUERY','URGENT','SPAM','UNKNOWN'
];

export async function classifyMessage(message, provider = 'openai') {
  if (provider !== 'openai') throw new Error('Unsupported AI provider');
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not configured');

  const system = `Classify a Sree Vriddhi customer message. Return ONLY JSON with intent, risk, confidence. Intent must be one of: ${allowedIntents.join(', ')}. Risk must be LOW, MEDIUM, HIGH, or CRITICAL. Public financial/product questions that ask for personalized returns or guarantees are HIGH. Contract/payment disputes, private records, urgent matters and grievances are CRITICAL. Knowledge context: ${knowledgeText()}`;
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
    body: JSON.stringify({ model: process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0, response_format: { type: 'json_object' }, messages: [{ role: 'system', content: system }, { role: 'user', content: message }] })
  });
  if (!response.ok) throw new Error(`AI classification failed: ${response.status}`);
  const data = await response.json();
  return JSON.parse(data.choices?.[0]?.message?.content || '{}');
}
