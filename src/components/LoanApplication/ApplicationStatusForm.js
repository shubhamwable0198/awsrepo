import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

function ApplicationStatusForm() {
    const { applicationId } = useParams(); 
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    const [status, setStatus] = useState(null);
    const [error, setError] = useState(null);

    const fetchStatus = async (applicationId) => {
        try {
            const token = sessionStorage.getItem('authToken');  

            const response = await axios.get(`http://localhost:8000/app/applications/status/${applicationId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`  
                }
            });
            setStatus(response.data.status);
            setError(null); 

        } catch (error) {
            if (error.response && error.response.status === 404) {
                console.log(error)
                setError('Application ID not found. Please check the Application ID.');
            } else if (error.response && error.response.status === 401) {
                setError('Authentication credentials were not provided or are invalid.');
                console.log(error)
            } else {
                console.log(error)
                setError('Something went wrong. Please try again later.');
            }
            setStatus(null); 
        }
    };

    const onSubmit = (data) => {
        fetchStatus(data.applicationId); 
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4 text-center">Check Application Status</h2>

           
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label htmlFor="applicationId">Application ID</label>
                    <input
                        id="applicationId"
                        className="form-control"
                        {...register('applicationId', { required: true })}
                        placeholder="Enter Application ID"
                    />
                    {errors.applicationId && <p className="text-danger">Application ID is required</p>}
                </div>
                <button type="submit" className="btn btn-primary mt-3">Check Status</button>
            </form>

           
            {status && <p className="mt-3 alert alert-success">Application Status: {status}</p>}

          
            {error && <p className="mt-3 alert alert-danger">{error}</p>}
        </div>
    );
}

export default ApplicationStatusForm;
