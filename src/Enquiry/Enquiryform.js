import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function Enquiryform() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [submitted, setSubmitted] = useState(false); 
    const [enquiryId, setEnquiryId] = useState(null);

    const createEnquiries = async (data) => {
        try {
            const response = await axios.post('http://localhost:8000/e1/enquiry/', data);
            console.log('Response data:', response.data);
            setEnquiryId(response.data.id);
            reset(); 
            setSubmitted(true); 
        } catch (error) {
            console.error('Error submitting the form:', error);
            alert('There was an error submitting the form. Please try again.');
        }
    };

    return (
        <div className="enquiry-form">
            {submitted ? (
                <div>
                    <h2>Thank You!</h2>
                    <p>Your enquiry has been submitted successfully. Your enquiry ID is <strong>{enquiryId}</strong>.</p>
                    <p>We have sent this ID to your email. Please use it to check the status of your enquiry.</p>
                </div>
            ) : (
                <div>
                    <h2>Enquiry Form</h2>
                    <form onSubmit={handleSubmit(createEnquiries)}>
                        <div className="form-group">
                            <label>First Name</label>
                            <input
                                type="text"
                                {...register('first_name', {
                                    required: 'First name is required.',
                                    minLength: {
                                        value: 2,
                                        message: 'First name must be at least 2 characters long.',
                                    },
                                    validate: (value) =>
                                        value[0] === value[0].toUpperCase() ||
                                        'First name must start with a capital letter.',
                                })}
                                className={errors.first_name ? 'input-error' : ''}
                            />
                            {errors.first_name && (
                                <p className="error-message">{errors.first_name.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Last Name</label>
                            <input
                                type="text"
                                {...register('last_name', {
                                    required: 'Last name is required.',
                                    minLength: {
                                        value: 2,
                                        message: 'Last name must be at least 2 characters long.',
                                    },
                                    validate: (value) =>
                                        value[0] === value[0].toUpperCase() ||
                                        'Last name must start with a capital letter.',
                                })}
                                className={errors.last_name ? 'input-error' : ''}
                            />
                            {errors.last_name && (
                                <p className="error-message">{errors.last_name.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Email</label>
                            <input
                                type="email"
                                {...register('email', {
                                    required: 'Email is required.',
                                    pattern: {
                                        value: /\S+@\S+\.\S+/,
                                        message: 'Email address is invalid.',
                                    },
                                })}
                                className={errors.email ? 'input-error' : ''}
                            />
                            {errors.email && (
                                <p className="error-message">{errors.email.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Mobile</label>
                            <input
                                type="text"
                                {...register('mobile', {
                                    required: 'Mobile number is required.',
                                    pattern: {
                                        value: /^[0-9]{10}$/,
                                        message: 'Mobile number must be 10 digits.',
                                    },
                                })}
                                className={errors.mobile ? 'input-error' : ''}
                            />
                            {errors.mobile && (
                                <p className="error-message">{errors.mobile.message}</p>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                {...register('message', {
                                    required: 'Message is required.',
                                    minLength: {
                                        value: 10,
                                        message: 'Message must be at least 10 characters long.',
                                    },
                                })}
                                className={errors.message ? 'input-error' : ''}
                            ></textarea>
                            {errors.message && (
                                <p className="error-message">{errors.message.message}</p>
                            )}
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Enquiryform;
