export default async function handler(req, res) {
  try {
    // Fetch deployments from GitHub API - get first page to check for pagination
    const firstResponse = await fetch('https://api.github.com/repos/callenflynn/unblocked-games/deployments?per_page=1&page=1', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'unblocked-games-site'
      }
    });

    if (!firstResponse.ok) {
      throw new Error(`GitHub API responded with ${firstResponse.status}`);
    }

    // Extract total from Link header
    const linkHeader = firstResponse.headers.get('link');
    let totalDeployments = 1;
    
    if (linkHeader) {
      // Parse Link header to find last page
      const lastMatch = linkHeader.match(/page=(\d+)>;\s*rel="last"/);
      if (lastMatch) {
        totalDeployments = parseInt(lastMatch[1]);
      }
    }
    
    // Now fetch the first page with all deployments (up to 100 per page)
    const dataResponse = await fetch('https://api.github.com/repos/callenflynn/unblocked-games/deployments?per_page=100&page=1', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'unblocked-games-site'
      }
    });

    const deployments = await dataResponse.json();
    
    if (!Array.isArray(deployments)) {
      throw new Error('Invalid response format from GitHub API');
    }
    
    // Get the latest deployment
    const latest = deployments && deployments.length > 0 ? deployments[0] : null;
    
    const versionInfo = {
      total: totalDeployments,
      latest: latest ? {
        id: latest.id,
        sha: latest.sha.substring(0, 7),
        created_at: latest.created_at,
        environment: latest.environment
      } : null
    };

    res.status(200).json(versionInfo);
  } catch (error) {
    res.status(500).json({ 
      error: 'Failed to fetch deployment info', 
      details: error.message,
      total: 0,
      latest: null
    });
  }
}
