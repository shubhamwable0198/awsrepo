import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserFamilyInfo = () => {
  const [familyInfo, setFamilyInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('authToken');

  useEffect(() => {
    const fetchFamilyInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/user_details/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFamilyInfo(response.data.family_info);
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching family info.');
        setLoading(false);
      }
    };

    fetchFamilyInfo();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Family Information</h2>
      {familyInfo.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Father Name</th>
              <th>Father Profession</th>
              <th>Father Income</th>
              <th>Father Contact</th>
              <th>Mother Name</th>
              <th>Mother Profession</th>
              <th>Mother Income</th>
              <th>Mother Contact</th>
              <th>Marital Status</th>
              <th>Spouse Name</th>
              <th>Spouse Profession</th>
              <th>Spouse Income</th>
              <th>Spouse Contact</th>
            </tr>
          </thead>
          <tbody>
            {familyInfo.map((member, index) => (
              <tr key={index}>
                <td>{member.father_name}</td>
                <td>{member.father_profession}</td>
                <td>{member.father_income}</td>
                <td>{member.father_contact}</td>
                <td>{member.mother_name}</td>
                <td>{member.mother_profession}</td>
                <td>{member.mother_income}</td>
                <td>{member.mother_contact}</td>
                <td>{member.marital_status}</td>
                <td>{member.spouse_name || 'N/A'}</td>
                <td>{member.spouse_profession || 'N/A'}</td>
                <td>{member.spouse_income || 'N/A'}</td>
                <td>{member.spouse_contact || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No family members found.</p>
      )}
    </div>
  );
};

export default UserFamilyInfo;
