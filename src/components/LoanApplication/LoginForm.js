import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

function LoginForm() {
  const { register, handleSubmit, formState: { errors }, setError } = useForm();

  const onSubmit = async (data) => {
    try {
      
      const response = await axios.post('http://localhost:8000/api/token/', data);
      const token = response.data.access;
      sessionStorage.setItem('authToken', token);
      alert('Login successful! Token has been saved.');
      console.log('Login successful, token saved.');


    } catch (error) {

      if (error.response && error.response.status === 401) {
        setError('login', { type: 'manual', message: 'Invalid email or password' });
        alert('Login failed. Invalid email or password.');
      } else {
        console.error('An error occurred:', error.message);
        alert('Login failed. Please try again later.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          {...register('email', { required: 'Email is required' })}
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}
        />
        {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
      </div>

      <div>
        <label>Password:</label>
        <input
          type="password"
          {...register('password', { required: 'Password is required' })}
          className={`form-control ${errors.password ? 'is-invalid' : ''}`}
        />
        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
      </div>

      {errors.login && <div className="alert alert-danger">{errors.login.message}</div>}

      <button type="submit" className="btn btn-primary">Login</button>
    </form>
  );
}

export default LoginForm;
