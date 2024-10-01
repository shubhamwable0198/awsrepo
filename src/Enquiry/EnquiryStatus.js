import React, { useState } from 'react';
import axios from 'axios';

function EnquiryStatus() {
    const [enquiryId, setEnquiryId] = useState('');
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const handleEnquiryIdChange = (e) => {
        setEnquiryId(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const fetchStatus = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/e1/enquiry/${enquiryId}/status/`, {
                params: { email: email } 
            });
            setStatus(response.data.status);
            setError(null);  
        } catch (error) {
            console.error('Error fetching enquiry status:', error);
            setError('Does not match email and enquiry ID. Please check the Enquiry ID and Email.');
            setStatus(null);  
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Check Enquiry Status</h2>
            <div className="form-group">
                <input 
                    type="text" 
                    className="form-control mb-2"
                    placeholder="Enter Enquiry ID" 
                    value={enquiryId} 
                    onChange={handleEnquiryIdChange} 
                />
                <input 
                    type="email" 
                    className="form-control mb-2"
                    placeholder="Enter Email" 
                    value={email} 
                    onChange={handleEmailChange} 
                />
            </div>
            <button onClick={fetchStatus} className="btn btn-primary btn-block">Check Status</button>
            {status && <p className="mt-3 alert alert-success">Enquiry Status: {status}</p>}
            {error && <p className="mt-3 alert alert-danger">{error}</p>}
        </div>
    );
}

export default EnquiryStatus;
