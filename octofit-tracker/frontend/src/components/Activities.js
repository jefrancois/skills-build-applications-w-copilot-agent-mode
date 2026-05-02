import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/activities/`;
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setActivities(Array.isArray(results) ? results : []);
        console.log('Activities data:', data);
      })
      .catch(err => {
        console.error('Error fetching activities:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Loading Activities...</div>;
  if (error) return <div className="alert alert-danger">Error loading activities: {error}</div>;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Activities</h2>
            <p className="text-muted mb-0">Fetched from Octofit REST API.</p>
          </div>
          <button type="button" className="btn btn-outline-primary">Refresh</button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Intensity</th>
              </tr>
            </thead>
            <tbody>
              {activities.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">No activities available.</td>
                </tr>
              ) : (
                activities.map((activity, idx) => (
                  <tr key={activity.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{activity.name || activity.title || 'N/A'}</td>
                    <td>{activity.type || activity.category || 'N/A'}</td>
                    <td>{activity.duration || activity.time || 'N/A'}</td>
                    <td>{activity.intensity || activity.level || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#activitiesHelpModal">
            API Details
          </button>
        </div>
      </div>

      <div className="modal fade" id="activitiesHelpModal" tabIndex="-1" aria-labelledby="activitiesHelpLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="activitiesHelpLabel">Activities API</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              This component loads activity data from the backend endpoint and displays it in a Bootstrap table.
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

export default Activities;
