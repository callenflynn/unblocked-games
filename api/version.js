export default async function handler(req, res) {
  try {
    // Fetch deployments from GitHub API
    const response = await fetch('https://api.github.com/repos/callenflynn/unblocked-games/deployments', {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'unblocked-games-site'
      }
    });

    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }

    const deployments = await response.json();
    
    // Get the latest deployment
    const latest = deployments && deployments.length > 0 ? deployments[0] : null;
    
    const versionInfo = {
      total: deployments.length,
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
