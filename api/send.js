export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: 'Missing parameters' });
  }

  try {
    const apiUrl = `https://haji-mix-api.gleeze.com/api/smsbomber?phone=${encodeURIComponent(phone)}&amount=${amount}&api_key=${process.env.API_KEY}`;
    
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, message: `${amount} messages sent to ${phone}` });
    } else {
      return res.status(400).json({ error: data.message || 'Failed to send messages' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
