export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { text, targetLang } = req.body || {};
  if (!text || !targetLang) return res.status(400).json({ error: 'Missing text or targetLang' });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return res.status(503).json({ error: 'Translation is not configured. Add OPENAI_API_KEY to the Vercel environment variables.' });

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: process.env.OPENAI_TRANSLATION_MODEL || 'gpt-4o-mini',
        temperature: 0.1,
        max_tokens: 1200,
        messages: [
          {
            role: 'system',
            content: 'You translate website UI and business content. Preserve meaning, numbers, dates, URLs, placeholders, HTML tags and product names. Return only the translated text. Do not add explanations.'
          },
          { role: 'user', content: `Target language: ${targetLang}\n\nText:\n${String(text).slice(0, 12000)}` }
        ]
      })
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('OpenAI translation error', data);
      return res.status(502).json({ error: 'Translation service request failed.' });
    }

    const translated = data?.choices?.[0]?.message?.content?.trim();
    if (!translated) return res.status(502).json({ error: 'Translation service returned an empty response.' });
    return res.status(200).json({ translated });
  } catch (error) {
    console.error('Translation endpoint error', error);
    return res.status(500).json({ error: 'Unable to reach translation service.' });
  }
}
