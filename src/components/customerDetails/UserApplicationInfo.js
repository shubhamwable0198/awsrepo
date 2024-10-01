import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserApplicationInfo = () => {
  const [applicationInfo, setApplicationInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('authToken'); // Retrieve the token

  useEffect(() => {
    const fetchApplicationInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/user_details/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setApplicationInfo(response.data.application_info);
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching application info.');
        setLoading(false);
      }
    };

    fetchApplicationInfo();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Application Information</h2>
      {applicationInfo.length > 0 ? (
        <ul>
          {applicationInfo.map((app) => (
            <li key={app.id}>
              Application Type: {app.application_type || 'N/A'}, Status: {app.application_status || 'N/A'}, Created At: {app.created_at ? new Date(app.created_at).toLocaleDateString() : 'N/A'}
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications found.</p>
      )}
    </div>
  );
};

export default UserApplicationInfo;
