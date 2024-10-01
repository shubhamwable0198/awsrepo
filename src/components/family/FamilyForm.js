import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

const FamilyForm = () => {
  const { id } = useParams(); 
  const token = sessionStorage.getItem('authToken'); 
  const [isEdit, setIsEdit] = useState(false);
  const [error, setError] = useState(null); 

  
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

 
  useEffect(() => {
    const fetchFamilyDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8000/e1/family/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const familyDetails = response.data;
       
        Object.keys(familyDetails).forEach((key) => setValue(key, familyDetails[key]));
        setIsEdit(true);
      } catch (err) {
        console.error('Error fetching family details:', err);
        setError('Family details not found. You can create new details.');
      }
    };

    fetchFamilyDetails();
  }, [token, setValue]);

  
  const onSubmit = async (data) => {
    setError(null); 
    const url = 'http://localhost:8000/e1/family/';
    const method = isEdit ? 'put' : 'post';

    try {
      const response = await axios({
        method: method,
        url: url,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data: data,
      });

      
      alert('Family details saved successfully!');
      reset(response.data); 
    } catch (err) {
      console.error('Error saving family details:', err);
      setError('There was an error saving your family details. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">{isEdit ? 'Edit Family Details' : 'Add Family Details'}</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Father's Details */}
        <div className="mb-3">
          <label htmlFor="father_name" className="form-label">Father's Name</label>
          <input
            type="text"
            id="father_name"
            {...register('father_name')}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="father_profession" className="form-label">Father's Profession</label>
          <input
            type="text"
            id="father_profession"
            {...register('father_profession')}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="father_income" className="form-label">Father's Income</label>
          <input
            type="number"
            id="father_income"
            {...register('father_income')}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="father_contact" className="form-label">Father's Contact</label>
          <input
            type="text"
            id="father_contact"
            {...register('father_contact')}
            className="form-control"
          />
        </div>

        {/* Mother's Details */}
        <div className="mb-3">
          <label htmlFor="mother_name" className="form-label">Mother's Name</label>
          <input
            type="text"
            id="mother_name"
            {...register('mother_name')}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mother_profession" className="form-label">Mother's Profession</label>
          <input
            type="text"
            id="mother_profession"
            {...register('mother_profession')}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mother_income" className="form-label">Mother's Income</label>
          <input
            type="number"
            id="mother_income"
            {...register('mother_income')}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="mother_contact" className="form-label">Mother's Contact</label>
          <input
            type="text"
            id="mother_contact"
            {...register('mother_contact')}
            className="form-control"
          />
        </div>

        {/* Marital Status */}
        <div className="mb-3">
          <label htmlFor="marital_status" className="form-label">Marital Status</label>
          <select
            id="marital_status"
            {...register('marital_status')}
            className="form-select"
          >
            <option value="married">Married</option>
            <option value="unmarried">Unmarried</option>
            <option value="divorced">Divorced</option>
          </select>
        </div>

        {/* Spouse's Details */}
        <div className="mb-3">
          <label htmlFor="spouse_name" className="form-label">Spouse's Name</label>
          <input
            type="text"
            id="spouse_name"
            {...register('spouse_name')}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="spouse_profession" className="form-label">Spouse's Profession</label>
          <input
            type="text"
            id="spouse_profession"
            {...register('spouse_profession')}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="spouse_income" className="form-label">Spouse's Income</label>
          <input
            type="number"
            id="spouse_income"
            {...register('spouse_income')}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="spouse_contact" className="form-label">Spouse's Contact</label>
          <input
            type="text"
            id="spouse_contact"
            {...register('spouse_contact')}
            className="form-control"
          />
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary">{isEdit ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  );
};

export default FamilyForm;
