import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/workouts/`;
    console.log('Fetching Workouts from:', endpoint);
    fetch(endpoint)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        const results = data.results || data;
        setWorkouts(Array.isArray(results) ? results : []);
        console.log('Workouts data:', data);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center py-5">Loading Workouts...</div>;
  if (error) return <div className="alert alert-danger">Error loading workouts: {error}</div>;

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="h4 mb-1">Workouts</h2>
            <p className="text-muted mb-0">Workout sessions retrieved from the backend API.</p>
          </div>
          <button type="button" className="btn btn-outline-primary">Refresh</button>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Duration</th>
                <th>Difficulty</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {workouts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-4">No workouts found.</td>
                </tr>
              ) : (
                workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <td>{idx + 1}</td>
                    <td>{workout.name || workout.title || 'N/A'}</td>
                    <td>{workout.duration || workout.length || 'N/A'}</td>
                    <td>{workout.difficulty || workout.level || 'N/A'}</td>
                    <td>{workout.category || workout.type || 'N/A'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
          <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#workoutsHelpModal">
            API Details
          </button>
        </div>
      </div>

      <div className="modal fade" id="workoutsHelpModal" tabIndex="-1" aria-labelledby="workoutsHelpLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="workoutsHelpLabel">Workouts API</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              This component loads the workouts endpoint and displays the results in a Bootstrap styled layout.
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

export default Workouts;
