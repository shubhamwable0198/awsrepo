import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ApplicationForm = () => {
     
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const navigate = useNavigate()

    const onSubmit = async (data) => {
        const token = sessionStorage.getItem('authToken');  
        
        if (!token) {
            alert('You are not logged in!');
            return;
        }

        try {
            const response = await axios.post(
                'http://localhost:8000/app/applications/',  
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,  
                        'Content-Type': 'application/json',
                    }
                }
            );

           


            console.log('Application submitted:', response.data);
            alert('Application submitted successfully');
            reset();
            navigate(`/thankyou/`);  

        } catch (error) {
            console.log(error)
            const errorMsg = error.response?.data?.detail || 'Something went wrong';
            console.log(error);
            alert('Error submitting application: ' + errorMsg);
        }
    };

    return (

        
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">

            <h2 className='align-center'>Loan Application Form</h2>

            
           
            <div className="mb-3">
                <label htmlFor="aadhaar_no" className="form-label">Aadhaar No:</label>
                <input
                    className={`form-control ${errors.aadhaar_no ? 'is-invalid' : ''}`}
                    {...register("aadhaar_no", {
                        required: "Aadhaar No is required",
                        pattern: {
                            value: /^[0-9]{12}$/,
                            message: "Aadhaar No must be 12 digits"
                        }
                    })}
                />
                {errors.aadhaar_no && <div className="invalid-feedback">{errors.aadhaar_no.message}</div>}
            </div>

          
            <div className="mb-3">
                <label htmlFor="pan_no" className="form-label">PAN No:</label>
                <input
                    className={`form-control ${errors.pan_no ? 'is-invalid' : ''}`}
                    {...register("pan_no", {
                        required: "PAN No is required",
                        pattern: {
                            value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                            message: "Invalid PAN No format"
                        }
                    })}
                />
                {errors.pan_no && <div className="invalid-feedback">{errors.pan_no.message}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="type_of_employment" className="form-label">Employment Type:</label>
                <select className={`form-select ${errors.type_of_employment ? 'is-invalid' : ''}`} 
                    {...register("type_of_employment", { required: "Employment type is required" })}>
                    <option value="">Select Employment Type</option>
                    <option value="self_employed">Self Employed</option>
                    <option value="salaried">Salaried</option>
                </select>
                {errors.type_of_employment && <div className="invalid-feedback">{errors.type_of_employment.message}</div>}
            </div>

           
            <div className="mb-3">
                <label htmlFor="business_title" className="form-label">Business Title:</label>
                <input
                    className={`form-control ${errors.business_title ? 'is-invalid' : ''}`}
                    {...register("business_title", { required: "Business title is required" })}
                />
                {errors.business_title && <div className="invalid-feedback">{errors.business_title.message}</div>}
            </div>

          
            <div className="mb-3">
                <label htmlFor="business_type" className="form-label">Business Type:</label>
                <select className={`form-select ${errors.business_type ? 'is-invalid' : ''}`}
                    {...register("business_type", { required: "Business type is required" })}>
                    <option value="">Select Business Type</option>
                    <option value="manufacturing">Manufacturing</option>
                    <option value="service">Service</option>
                    <option value="trading">Trading</option>
                </select>
                {errors.business_type && <div className="invalid-feedback">{errors.business_type.message}</div>}
            </div>

            
            <div className="mb-3">
                <label htmlFor="business_address" className="form-label">Business Address:</label>
                <input
                    className={`form-control ${errors.business_address ? 'is-invalid' : ''}`}
                    {...register("business_address", { required: "Business address is required" })}
                />
                {errors.business_address && <div className="invalid-feedback">{errors.business_address.message}</div>}
            </div>

          
            <div className="mb-3">
                <label htmlFor="gst_registration_no" className="form-label">GST Registration No:</label>
                <input
                    className={`form-control ${errors.gst_registration_no ? 'is-invalid' : ''}`}
                    {...register("gst_registration_no", { required: "GST registration number is required" })}
                />
                {errors.gst_registration_no && <div className="invalid-feedback">{errors.gst_registration_no.message}</div>}
            </div>

          
            <div className="mb-3">
                <label htmlFor="business_license_no" className="form-label">Business License No:</label>
                <input
                    className={`form-control ${errors.business_license_no ? 'is-invalid' : ''}`}
                    {...register("business_license_no", { required: "Business license number is required" })}
                />
                {errors.business_license_no && <div className="invalid-feedback">{errors.business_license_no.message}</div>}
            </div>

            
            <div className="mb-3">
                <label htmlFor="expected_average_annual_turnover" className="form-label">Expected Average Annual Turnover:</label>
                <input
                    className={`form-control ${errors.expected_average_annual_turnover ? 'is-invalid' : ''}`}
                    {...register("expected_average_annual_turnover", { required: "Expected average annual turnover is required" })}
                />
                {errors.expected_average_annual_turnover && <div className="invalid-feedback">{errors.expected_average_annual_turnover.message}</div>}
            </div>

          
            <div className="mb-3">
                <label htmlFor="years_in_current_business" className="form-label">Years in Current Business:</label>
                <input
                    className={`form-control ${errors.years_in_current_business ? 'is-invalid' : ''}`}
                    {...register("years_in_current_business", { required: "Years in current business is required" })}
                />
                {errors.years_in_current_business && <div className="invalid-feedback">{errors.years_in_current_business.message}</div>}
            </div>

           
            <div className="mb-3">
                <label htmlFor="collateral" className="form-label">Collateral:</label>
                <input
                    className={`form-control ${errors.collateral ? 'is-invalid' : ''}`}
                    {...register("collateral", { required: "Collateral is required" })}
                />
                {errors.collateral && <div className="invalid-feedback">{errors.collateral.message}</div>}
            </div>
           
           
            <div className="mb-3">
                <label htmlFor="remark" className="form-label">Remark:</label>
                <input
                    className={`form-control ${errors.remark ? 'is-invalid' : ''}`}
                    {...register("remark", { required: "Remark is required" })}
                />
                {errors.remark && <div className="invalid-feedback">{errors.remark.message}</div>}
            </div>

           
            <div className="mb-3">
                <label htmlFor="credit_score" className="form-label">Credit Score:</label>
                <input
                    className={`form-control ${errors.credit_score ? 'is-invalid' : ''}`}
                    {...register("credit_score", { required: "Credit score is required" })}
                />
                {errors.credit_score && <div className="invalid-feedback">{errors.credit_score.message}</div>}
            </div>

            <button type="submit" className="btn btn-primary">Submit Application</button>
        </form>
    );
};

export default ApplicationForm;
