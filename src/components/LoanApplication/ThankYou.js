import React from 'react';
import { useParams } from 'react-router-dom';

const ThankYou = () => {
    
    const { id } = useParams();

    return (
        <div className="container mt-4">
            <h2>Thank You!</h2>
            <p>Your application has been submitted successfully.</p>
            <p>Application ID is sent to your email</p>
        </div>
    );
};

export default ThankYou;
