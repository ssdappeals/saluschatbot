export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { chatInput, sessionId } = req.body;

  // For testing, just echo back the message
  const response = `You said: ${chatInput}`;

  return res.json({
    output: response,
    sessionId
  });
} 