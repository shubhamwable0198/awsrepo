import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserBankInfo = () => {
  const [bankInfo, setBankInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = sessionStorage.getItem('authToken'); // Retrieve the token

  useEffect(() => {
    const fetchBankInfo = async () => {
      try {
        const response = await axios.get('http://localhost:8000/app/user_details/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setBankInfo(response.data.bank_info);
        setLoading(false);
      } catch (error) {
        setError('An error occurred while fetching bank info.');
        setLoading(false);
      }
    };

    fetchBankInfo();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h2>Bank Information</h2>
      {bankInfo.length > 0 ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Bank Name</th>
              <th>Account Number</th>
              <th>IFSC Code</th>
              <th>Branch Address</th>
            </tr>
          </thead>
          <tbody>
            {bankInfo.map((bank, index) => (
              <tr key={index}>
                <td>{bank.bank_name}</td>
                <td>{bank.account_number}</td>
                <td>{bank.ifsc_code}</td>
                <td>{bank.bank_address || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bank details found.</p>
      )}
    </div>
  );
};

export default UserBankInfo;
