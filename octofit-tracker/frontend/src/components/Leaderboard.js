import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/leaderboard/`;
    console.log('Fetching Leaderboard from:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setLeaders(Array.isArray(results) ? results : []);
        console.log('Leaderboard data:', data);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Loading Leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error loading leaderboard: {error}</div>;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Leaderboard</h2>
            <p className="text-muted mb-0">Top performers from your Octofit community.</p>
          </div>
          <button type="button" className="btn btn-outline-primary">Refresh</button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Score</th>
                <th>Rank</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {leaders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">No leaderboard entries available.</td>
                </tr>
              ) : (
                leaders.map((leader, idx) => (
                  <tr key={leader.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{leader.name || leader.username || 'N/A'}</td>
                    <td>{leader.score || leader.points || 'N/A'}</td>
                    <td>{leader.rank || idx + 1}</td>
                    <td>{leader.team || leader.team_name || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#leaderboardHelpModal">
            API Details
          </button>
        </div>
      </div>

      <div className="modal fade" id="leaderboardHelpModal" tabIndex="-1" aria-labelledby="leaderboardHelpLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="leaderboardHelpLabel">Leaderboard API</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              This component loads the leaderboard endpoint and renders the results in a styled Bootstrap table.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-outline-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
