export default async function handler(req, res) {
  const targetUrl = 'https://radon.games/';

  try {
    // Fetch the target site
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': req.headers['user-agent'] || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      }
    });

    // Clone the response (body + headers)
    const body = await response.text();
    const headers = Object.fromEntries(response.headers.entries());

    // Remove anti-iframe protections
    delete headers['x-frame-options'];
    delete headers['content-security-policy'];
    delete headers['content-security-policy-report-only'];

    // Set response headers
    res.setHeader('Content-Type', headers['content-type'] || 'text/html');
    
    // Send the modified response
    res.status(200).send(body);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch proxy', details: error.message });
  }
}
