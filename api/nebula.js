export default async function handler(req, res) {
  // Get the target URL from query parameter
  const targetUrl = req.query.url;
  
  if (!targetUrl) {
    return res.status(400).json({ error: 'Missing url parameter' });
  }

  // Validate it's a nebula proxy URL
  const nebulaUrls = [
    'nebulaservices.org',
    'downloadapp.wine-software.com',
    'productions.ceestudio.net',
    'scienceclub.mills-family.us',
    'learnmath.anchorchain.co.za',
    'schoolweb.gurdit.com',
    'sky.ceestudio.net',
    'net.adaptor.cl',
    'net.roybroeils.n',
    'rideand.wine-software.com'
  ];

  const isValidNebula = nebulaUrls.some(domain => targetUrl.includes(domain));
  
  if (!isValidNebula) {
    return res.status(403).json({ error: 'Invalid Nebula proxy URL' });
  }

  try {
    // Ensure URL has protocol
    let fullUrl = targetUrl;
    if (!fullUrl.startsWith('http://') && !fullUrl.startsWith('https://')) {
      fullUrl = 'https://' + fullUrl;
    }

    // Fetch the target site with proper headers
    const response = await fetch(fullUrl, {
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
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    // Get the body as text
    let body = await response.text();

    // Fix relative URLs in HTML to load through the proxy
    // This ensures CSS, JS, and images load properly
    const baseUrl = new URL(fullUrl);
    const basePath = baseUrl.origin + baseUrl.pathname.replace(/\/$/, '');
    
    body = body.replace(/href=["']\/(?!\/)/g, `href="${basePath}/`);
    body = body.replace(/src=["']\/(?!\/)/g, `src="${basePath}/`);
    body = body.replace(/action=["']\/(?!\/)/g, `action="${basePath}/`);

    // Set response headers
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('X-Frame-Options', 'ALLOWALL');
    
    // Send the modified response
    res.status(200).send(body);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch Nebula proxy', details: error.message });
  }
}
