import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const BankForm = () => {
  const { ifsc_code } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [ifscError, setIfscError] = useState('');


  const { register, handleSubmit, setValue, reset, watch, formState: { errors } } = useForm();
  const token = sessionStorage.getItem('authToken'); 

  
  const ifscCode = watch('ifsc_code');

 
  useEffect(() => {
    if (ifsc_code) {
      const fetchBankDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/app/bank-details/${ifsc_code}/`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          
          if (response.data) {
            setIsEdit(true);
            setValue('bank_name', response.data.bank_name);
            setValue('account_number', response.data.account_number);
            setValue('ifsc_code', response.data.ifsc_code);
            setValue('bank_address', response.data.bank_address);
          }
        } catch (error) {
          console.error('Error fetching bank details:', error);
          alert('There was an error fetching bank details.');
        }
      };

      fetchBankDetails();
    }
  }, [ifsc_code, token, setValue]);

  
  useEffect(() => {
    const fetchIfscDetails = async (ifsc) => {
      try {
        
        const response = await axios.get(`http://localhost:8000/app/bank-details/${ifsc}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

      
        setValue('bank_name', response.data.BANK || response.data.bank_name);
        setValue('bank_address', response.data.ADDRESS || response.data.bank_address);
        setIfscError('');
      } catch (error) {
        setIfscError('Invalid IFSC code or unable to fetch bank details.');
        setValue('bank_name', '');
        setValue('bank_address', '');
      }
    };

   
    if (ifscCode && ifscCode.length === 11) {
      fetchIfscDetails(ifscCode);
    }
  }, [ifscCode, token, setValue]);

 
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('account_number', data.account_number);
    formData.append('ifsc_code', data.ifsc_code);

    
    if (data.passbook_copy && data.passbook_copy.length > 0) {
      formData.append('passbook_copy', data.passbook_copy[0]);
    }

    const url = `http://localhost:8000/app/bank-details/`;
    const method = isEdit ? 'put' : 'post';

    try {
      const response = await axios({
        method,
        url,
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      });

      if (response.status === 201 || response.status === 200) {
        reset();
        setSubmitted(true); 
      } else {
        alert('An unexpected issue occurred while saving your bank details.');
      }
    } catch (error) {
      console.error('Error saving bank details:', error);
      alert('There was an error saving your bank details. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{isEdit ? 'Edit Bank Details' : 'Add Bank Details'}</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
         
          <div className="mb-3">
            <label htmlFor="ifsc_code" className="form-label">IFSC Code</label>
            <input
              type="text"
              id="ifsc_code"
              className={`form-control ${errors.ifsc_code ? 'is-invalid' : ''}`}
              {...register('ifsc_code', {
                required: 'IFSC code is required',
                pattern: {
                  value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                  message: 'Invalid IFSC code format',
                }
              })}
            />
            {errors.ifsc_code && <div className="invalid-feedback">{errors.ifsc_code.message}</div>}
            {ifscError && <div style={{ color: 'red' }}>{ifscError}</div>}
          </div>

         
          <div className="mb-3">
            <label htmlFor="bank_name" className="form-label">Bank Name</label>
            <input
              type="text"
              id="bank_name"
              className={`form-control ${errors.bank_name ? 'is-invalid' : ''}`}
              {...register('bank_name', { required: 'Bank name is required' })}
              readOnly
            />
            {errors.bank_name && <div className="invalid-feedback">{errors.bank_name.message}</div>}
          </div>
          
          
          <div className="mb-3">
            <label htmlFor="account_number" className="form-label">Account Number</label>
            <input
              type="text"
              id="account_number"
              className={`form-control ${errors.account_number ? 'is-invalid' : ''}`}
              {...register('account_number', {
                required: 'Account number is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Account number must be numeric',
                },
                minLength: {
                  value: 10,
                  message: 'Account number must be at least 10 digits',
                }
              })}
            />
            {errors.account_number && <div className="invalid-feedback">{errors.account_number.message}</div>}
          </div>

        
          <div className="mb-3">
            <label htmlFor="passbook_copy" className="form-label">Passbook Copy</label>
            <input
              type="file"
              id="passbook_copy"
              className="form-control"
              {...register('passbook_copy')}
            />
          </div>

          
          <div className="mb-3">
            <label htmlFor="bank_address" className="form-label">Bank Address</label>
            <textarea
              id="bank_address"
              className={`form-control ${errors.bank_address ? 'is-invalid' : ''}`}
              rows="3"
              {...register('bank_address', { required: 'Bank address is required' })}
              readOnly
            />
            {errors.bank_address && <div className="invalid-feedback">{errors.bank_address.message}</div>}
          </div>

          <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Submit'}</button>
        </form>
      ) : (
        <div className="alert alert-success mt-4">
          Bank details submitted successfully!
        </div>
      )}
    </div>
  );
};

export default BankForm;
