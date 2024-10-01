import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplicationEditForm = () => {
    const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();
    const { id } = useParams(); 
    const [applicationData, setApplicationData] = useState(null);

   
    useEffect(() => {
        const fetchApplication = async () => {
            const token = sessionStorage.getItem('authToken');
            try {
                const response = await axios.get(`http://localhost:8000/app/applications/${id}/`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    }
                });
                setApplicationData(response.data);    
                setValue('aadhaar_no', response.data.aadhaar_no);
                setValue('pan_no', response.data.pan_no);
                setValue('type_of_employment', response.data.type_of_employment);
                setValue('business_title', response.data.business_title);
                setValue('business_type', response.data.business_type);
                setValue('business_address', response.data.business_address);
                setValue('gst_registration_no', response.data.gst_registration_no);
                setValue('business_license_no', response.data.business_license_no);
                setValue('expected_average_annual_turnover', response.data.expected_average_annual_turnover);
                setValue('years_in_current_business', response.data.years_in_current_business);
                setValue('collateral', response.data.collateral);
                setValue('status', response.data.status);
                setValue('remark', response.data.remark);
                setValue('credit_score', response.data.credit_score);
            } catch (error) {
                console.error('Error fetching application data:', error);
            }
        };

        fetchApplication();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        const token = sessionStorage.getItem('authToken');

        try {
            const response = await axios.put(
                `http://localhost:8000/app/applications/${id}/`,  // Update the application
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    }
                }
            );
            console.log('Application updated:', response.data);
            alert('Application updated successfully');
            reset();  

        } catch (error) {
            const errorMsg = error.response?.data?.detail || 'Something went wrong';
            console.log(error);
            alert('Error updating application: ' + errorMsg);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="container mt-4">
            {/* Aadhaar No (Cannot be modified) */}
            <div className="mb-3">
                <label htmlFor="aadhaar_no" className="form-label">Aadhaar No:</label>
                <input
                    className={`form-control ${errors.aadhaar_no ? 'is-invalid' : ''}`}
                    {...register("aadhaar_no")}
                    disabled  // Disable editing
                />
                {errors.aadhaar_no && <div className="invalid-feedback">{errors.aadhaar_no.message}</div>}
            </div>

            {/* PAN No (Cannot be modified) */}
            <div className="mb-3">
                <label htmlFor="pan_no" className="form-label">PAN No:</label>
                <input
                    className={`form-control ${errors.pan_no ? 'is-invalid' : ''}`}
                    {...register("pan_no")}
                    disabled  // Disable editing
                />
                {errors.pan_no && <div className="invalid-feedback">{errors.pan_no.message}</div>}
            </div>

            {/* Employment Type */}
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

            {/* Business Title */}
            <div className="mb-3">
                <label htmlFor="business_title" className="form-label">Business Title:</label>
                <input
                    className={`form-control ${errors.business_title ? 'is-invalid' : ''}`}
                    {...register("business_title", { required: "Business title is required" })}
                />
                {errors.business_title && <div className="invalid-feedback">{errors.business_title.message}</div>}
            </div>

            {/* Business Type */}
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

            {/* Business Address */}
            <div className="mb-3">
                <label htmlFor="business_address" className="form-label">Business Address:</label>
                <input
                    className={`form-control ${errors.business_address ? 'is-invalid' : ''}`}
                    {...register("business_address", { required: "Business address is required" })}
                />
                {errors.business_address && <div className="invalid-feedback">{errors.business_address.message}</div>}
            </div>

            {/* GST Registration No */}
            <div className="mb-3">
                <label htmlFor="gst_registration_no" className="form-label">GST Registration No:</label>
                <input
                    className={`form-control ${errors.gst_registration_no ? 'is-invalid' : ''}`}
                    {...register("gst_registration_no", { required: "GST registration number is required" })}
                />
                {errors.gst_registration_no && <div className="invalid-feedback">{errors.gst_registration_no.message}</div>}
            </div>

            {/* Business License No */}
            <div className="mb-3">
                <label htmlFor="business_license_no" className="form-label">Business License No:</label>
                <input
                    className={`form-control ${errors.business_license_no ? 'is-invalid' : ''}`}
                    {...register("business_license_no", { required: "Business license number is required" })}
                />
                {errors.business_license_no && <div className="invalid-feedback">{errors.business_license_no.message}</div>}
            </div>

            {/* Expected Average Annual Turnover */}
            <div className="mb-3">
                <label htmlFor="expected_average_annual_turnover" className="form-label">Expected Average Annual Turnover:</label>
                <input
                    className={`form-control ${errors.expected_average_annual_turnover ? 'is-invalid' : ''}`}
                    {...register("expected_average_annual_turnover", { required: "Expected average annual turnover is required" })}
                />
                {errors.expected_average_annual_turnover && <div className="invalid-feedback">{errors.expected_average_annual_turnover.message}</div>}
            </div>

            {/* Years in Current Business */}
            <div className="mb-3">
                <label htmlFor="years_in_current_business" className="form-label">Years in Current Business:</label>
                <input
                    className={`form-control ${errors.years_in_current_business ? 'is-invalid' : ''}`}
                    {...register("years_in_current_business", { required: "Years in current business is required" })}
                />
                {errors.years_in_current_business && <div className="invalid-feedback">{errors.years_in_current_business.message}</div>}
            </div>

            {/* Collateral */}
            <div className="mb-3">
                <label htmlFor="collateral" className="form-label">Collateral:</label>
                <input
                    className={`form-control ${errors.collateral ? 'is-invalid' : ''}`}
                    {...register("collateral", { required: "Collateral is required" })}
                />
                {errors.collateral && <div className="invalid-feedback">{errors.collateral.message}</div>}
            </div>

            {/* Status */}
            <div className="mb-3">
                <label htmlFor="status" className="form-label">Status:</label>
                <input
                    className={`form-control ${errors.status ? 'is-invalid' : ''}`}
                    {...register("status", { required: "Status is required" })}
                />
                {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
            </div>

            {/* Remark */}
            <div className="mb-3">
                <label htmlFor="remark" className="form-label">Remark:</label>
                <input
                    className={`form-control ${errors.remark ? 'is-invalid' : ''}`}
                    {...register("remark", { required: "Remark is required" })}
                />
                {errors.remark && <div className="invalid-feedback">{errors.remark.message}</div>}
            </div>

            {/* Credit Score */}
            <div className="mb-3">
                <label htmlFor="credit_score" className="form-label">Credit Score:</label>
                <input
                    className={`form-control ${errors.credit_score ? 'is-invalid' : ''}`}
                    {...register("credit_score", { required: "Credit score is required" })}
                />
                {errors.credit_score && <div className="invalid-feedback">{errors.credit_score.message}</div>}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">Update Application</button>
        </form>
    );
};

export default ApplicationEditForm;
