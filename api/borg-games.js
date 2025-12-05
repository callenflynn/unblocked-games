export default async function handler(req, res) {
  const targetUrl = 'https://borg.games/';

  try {
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
        'Accept-Language': 'en-US,en;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive',
        'Upgrade-Insecure-Requests': '1',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Cache-Control': 'max-age=0',
        'Referer': 'https://www.google.com/',
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    let body = await response.text();
    const baseUrl = new URL(targetUrl);
    const basePath = baseUrl.origin + baseUrl.pathname.replace(/\/$/, '');
    
    body = body.replace(/href=["']\/(?!\/)/g, `href="${basePath}/`);
    body = body.replace(/src=["']\/(?!\/)/g, `src="${basePath}/`);
    body = body.replace(/action=["']\/(?!\/)/g, `action="${basePath}/`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    res.status(200).send(body);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Borg Games', details: error.message });
  }
}
