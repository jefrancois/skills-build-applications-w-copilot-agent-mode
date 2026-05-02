import React, { useEffect, useState } from 'react';

const Teams = () => {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/teams/`;
    console.log('Fetching Teams from:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setTeams(Array.isArray(results) ? results : []);
        console.log('Teams data:', data);
      })
      .catch(err => {
        console.error('Error fetching teams:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Loading Teams...</div>;
  if (error) return <div className="alert alert-danger">Error loading teams: {error}</div>;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Teams</h2>
            <p className="text-muted mb-0">Team summary loaded from the Octofit backend.</p>
          </div>
          <button type="button" className="btn btn-outline-primary">Refresh</button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Team Name</th>
                <th>Members</th>
                <th>Wins</th>
                <th>Points</th>
              </tr>
            </thead>
            <tbody>
              {teams.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">No teams available.</td>
                </tr>
              ) : (
                teams.map((team, idx) => (
                  <tr key={team.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{team.name || team.team_name || 'N/A'}</td>
                    <td>{team.member_count || team.members || 'N/A'}</td>
                    <td>{team.wins || team.record || 'N/A'}</td>
                    <td>{team.points || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#teamsHelpModal">
            API Details
          </button>
        </div>
      </div>

      <div className="modal fade" id="teamsHelpModal" tabIndex="-1" aria-labelledby="teamsHelpLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="teamsHelpLabel">Teams API</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              This component displays team roster and score data using Bootstrap table styling.
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

export default Teams;
