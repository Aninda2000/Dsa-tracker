import React, { useState } from 'react';
import axios from '../utils/axiosInstance';
import { Container, Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      await axios.post('/api/auth/register', {
        username: formData.username,
        password: formData.password,
      });
      toast.success('Registration successful! Please log in.');
      navigate('/');
    } catch (err: any) {
      toast.error(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
    <Container className="mt-5" style={{ maxWidth: '400px' }}>
      <h3>Register</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control name="username" type="text" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control name="confirmPassword" type="password" onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" className="w-100">Register</Button>
      </Form>
      <div className="text-center mt-3">
        Already have an account? <Link to="/">Login here</Link>
      </div>
    </Container>
  );
};

export default RegisterPage;
