export default async function handler(req, res) {
  const targetUrl = 'https://kazwire.com/';

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Accept-Encoding': 'gzip, deflate',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    let body = await response.text();
    const baseUrl = new URL(targetUrl);
    const basePath = baseUrl.origin + baseUrl.pathname.replace(/\/$/, '');
    
    body = body.replace(/href=["']\/(? !\/)/g, `href="${basePath}/`);
    body = body.replace(/src=["']\/(? !\/)/g, `src="${basePath}/`);
    body = body.replace(/action=["']\/(? !\/)/g, `action="${basePath}/`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.status(200).send(body);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Kazwire', details: error.message });
  }
}
