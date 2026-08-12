import { knowledgeText } from './knowledge.js';
import { classifyMessage } from './classify.js';

const cors = (res) => {
  res.setHeader('Access-Control-Allow-Origin', process.env.AI_ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
};

const safetyPrefix = `You are the Sree Vriddhi AI Assistant. Answer only from the supplied public knowledge. Be concise, professional and easy to understand. Never invent current values, customer records, approvals, returns, valuations or availability. Never provide personalized investment, legal or tax advice. Never guarantee profit, return, approval or capital protection. Any published commercial figures are indicative/proposed and subject to applicable legal, regulatory and contractual terms. For private customer records, disputes, grievances, urgent matters, legal/tax questions, or personalized financial/return questions, clearly state that human review is required. If the answer is not in the knowledge, say you do not have that information and offer human follow-up.`;

export default async function handler(req, res) {
  cors(res);
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  try {
    const { message, history = [], channel = 'website' } = req.body || {};
    if (!message || typeof message !== 'string' || message.length > 4000) return res.status(400).json({ error: 'A message up to 4000 characters is required.' });
    const classification = await classifyMessage(message);
    const key = process.env.OPENAI_API_KEY;
    if (!key) throw new Error('OPENAI_API_KEY is not configured');
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || 'gpt-4o-mini', temperature: 0.2,
        messages: [
          { role: 'system', content: `${safetyPrefix}\nChannel: ${channel}\nClassification: ${JSON.stringify(classification)}\nKnowledge: ${knowledgeText()}` },
          ...history.slice(-8).filter(m => m && (m.role === 'user' || m.role === 'assistant')).map(m => ({ role: m.role, content: String(m.content).slice(0, 4000) })),
          { role: 'user', content: message }
        ]
      })
    });
    if (!response.ok) throw new Error(`AI response failed: ${response.status}`);
    const data = await response.json();
    const answer = data.choices?.[0]?.message?.content?.trim();
    if (!answer) throw new Error('AI returned an empty response');
    return res.status(200).json({ answer, intent: classification.intent || 'UNKNOWN', risk: classification.risk || 'HIGH', confidence: Number(classification.confidence) || null, requiresHuman: ['HIGH','CRITICAL'].includes(classification.risk) });
  } catch (error) {
    console.error('Sree Vriddhi AI error', error);
    return res.status(500).json({ error: 'AI assistant is temporarily unavailable. Please contact Sree Vriddhi support.' });
  }
}
