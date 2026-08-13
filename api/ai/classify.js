import { knowledgeText } from './knowledge.js';

const allowedIntents = [
  'GENERAL_ENQUIRY',
  'SERVICE_INFORMATION',
  'PRODUCT_INFORMATION',
  'ELIGIBILITY',
  'DOCUMENT_REQUIREMENT',
  'CALLBACK',
  'MEETING',
  'WEBSITE_HELP',
  'APPLICATION_STATUS',
  'FOLLOW_UP',
  'COMPLAINT',
  'GRIEVANCE',
  'FINANCIAL_QUERY',
  'INVESTMENT_QUERY',
  'RETURNS_QUERY',
  'LEGAL_QUERY',
  'TAX_QUERY',
  'PRIVATE_CUSTOMER_QUERY',
  'GENERAL_KNOWLEDGE',
  'WRITING_HELP',
  'TRANSLATION',
  'CALCULATION',
  'URGENT',
  'SPAM',
  'UNKNOWN'
];

export async function classifyMessage(message, provider = 'openai') {
  if (provider !== 'openai') throw new Error('Unsupported AI provider');

  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error('OPENAI_API_KEY is not configured');

  const system = `Classify the user's message for the Sree Vriddhi website AI assistant. Return ONLY valid JSON with exactly these keys: category, intent, risk, confidence.

category must be BUSINESS or GENERAL.
intent must be one of: ${allowedIntents.join(', ')}.
risk must be LOW, MEDIUM, HIGH, or CRITICAL.
confidence must be a number from 0 to 1.

BUSINESS means the user is asking about Sree Vriddhi, its website, services, sectors, process, eligibility, documents, contact, applications, complaints, published policies, or anything that should be answered from the supplied business knowledge.
GENERAL means the user is asking for ordinary general-purpose help that is not about Sree Vriddhi, such as explanations, writing, translation, calculations, coding, education, travel planning, or everyday knowledge.

Safety classification:
- Personalized financial/investment/return questions, guarantees, approval decisions, or requests for a specific financial recommendation: HIGH.
- Contract/payment disputes, private customer records, grievances, urgent matters, legal/tax matters: CRITICAL.
- Ordinary public business information: LOW.
- Ordinary general knowledge/help: LOW.

Business knowledge is supplied only to recognize business intent and relevant topics. Do not assume that any missing fact is true.

Knowledge context: ${knowledgeText()}`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || 'gpt-4o-mini',
      temperature: 0,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: message }
      ]
    })
  });

  if (!response.ok) throw new Error(`AI classification failed: ${response.status}`);
  const data = await response.json();
  const parsed = JSON.parse(data.choices?.[0]?.message?.content || '{}');

  return {
    category: parsed.category === 'BUSINESS' ? 'BUSINESS' : 'GENERAL',
    intent: allowedIntents.includes(parsed.intent) ? parsed.intent : 'UNKNOWN',
    risk: ['LOW', 'MEDIUM', 'HIGH', 'CRITICAL'].includes(parsed.risk) ? parsed.risk : 'HIGH',
    confidence: Math.max(0, Math.min(1, Number(parsed.confidence) || 0))
  };
}
