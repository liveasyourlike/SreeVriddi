const VERIFY_TOKEN = process.env.META_VERIFY_TOKEN;

function json(res, status, body) {
  res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const mode = req.query?.['hub.mode'];
    const token = req.query?.['hub.verify_token'];
    const challenge = req.query?.['hub.challenge'];

    if (!VERIFY_TOKEN) {
      return json(res, 503, { error: 'META_VERIFY_TOKEN is not configured.' });
    }

    if (mode === 'subscribe' && token === VERIFY_TOKEN && challenge) {
      res.status(200).send(String(challenge));
      return;
    }

    return json(res, 403, { error: 'Webhook verification failed.' });
  }

  if (req.method === 'POST') {
    // Acknowledge Meta quickly. Message processing can be added in the next
    // phase after webhook delivery is verified.
    console.log('WhatsApp webhook event received', JSON.stringify(req.body || {}));
    return json(res, 200, { received: true });
  }

  res.setHeader('Allow', 'GET, POST');
  return json(res, 405, { error: 'Method not allowed' });
}
