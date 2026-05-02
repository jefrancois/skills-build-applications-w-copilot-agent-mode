import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const endpoint = `${process.env.REACT_APP_CODESPACE_URL}/api/users/`;
    console.log('Fetching Users from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setUsers(results);
        console.log('Users data:', data);
      })
      .catch(err => console.error('Error fetching users:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading Users...</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user, idx) => (
          <li key={user.id || idx}>{JSON.stringify(user)}</li>
        ))}
      </ul>
    </div>
  );
};

export default Users;
