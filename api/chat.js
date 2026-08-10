const SYSTEM_PROMPT = `You are the Sree Vriddhi website AI support assistant.

Your job is to help visitors navigate the website and understand the business model at a high level. Be concise, professional, and easy to understand.

You may explain: Sree Vriddhi pages, how the eligibility checker works, eligible asset categories shown on the website, products, gallery, contact options, customer portal navigation, application workflow, document requirements shown on the website, and how to reach human support.

Safety and accuracy rules:
- Never invent guaranteed returns, approvals, valuations, legal conclusions, tax advice, or regulatory approvals.
- Treat all rates/returns shown on the website as illustrative/proposed unless the page explicitly says otherwise.
- Do not request or repeat OTPs, passwords, full bank/card numbers, Aadhaar numbers, PAN numbers, private documents, or other sensitive credentials.
- For account-specific, legal, compliance, grievance, payment, or contract questions, direct the visitor to a human support channel.
- If you do not know an answer from the website context, say so and guide the visitor to Contact, FAQ, Eligibility, or human support.
- Do not claim to have accessed the visitor's screen, files, camera, microphone, account, or CRM records unless the user-facing feature explicitly provides that capability.

The current website route is supplied with each request. Use it only as navigation context.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    return res.status(503).json({ error: 'AI chat is not configured. Add OPENAI_API_KEY to the Vercel environment variables.' });
  }

  const body = req.body || {};
  const incoming = Array.isArray(body.messages) ? body.messages : [];
  const messages = incoming
    .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
    .slice(-12)
    .map(m => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (!messages.length || messages[messages.length - 1].role !== 'user') {
    return res.status(400).json({ error: 'A user message is required.' });
  }

  const page = typeof body.page === 'string' ? body.page.slice(0, 200) : '/';

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_CHAT_MODEL || 'gpt-4o-mini',
        temperature: 0.2,
        max_tokens: 700,
        messages: [
          { role: 'system', content: `${SYSTEM_PROMPT}\nCurrent route: ${page}` },
          ...messages
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI chat error', data);
      return res.status(502).json({ error: 'AI service request failed.' });
    }

    const reply = data?.choices?.[0]?.message?.content?.trim();
    if (!reply) return res.status(502).json({ error: 'AI service returned an empty response.' });

    return res.status(200).json({ reply, mode: 'ai' });
  } catch (error) {
    console.error('Chat endpoint error', error);
    return res.status(500).json({ error: 'Unable to reach the AI service.' });
  }
}
