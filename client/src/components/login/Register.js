import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import styled from 'styled-components';

// Styled-components for the register form
const FormContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
`;

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registering user', formData);
    // Here you can make an API call to register the user
  };

  return (
    <FormContainer>
      <Typography variant="h4" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />
      <StyledButton variant="contained" color="primary" onClick={handleSubmit} fullWidth>
        Register
      </StyledButton>
    </FormContainer>
  );
};

export default Register;
