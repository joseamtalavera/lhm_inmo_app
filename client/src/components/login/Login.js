import React, { useState } from 'react';
import { Grid, DialogContent, DialogActions } from '@mui/material';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import {
  FormContainer,
  LoginGrid,
  LoginButton,
  TitleTypography,
  BodyTypography,
  StyledDialog,
  StyledDialogTitle,
  BlueText,
  DialogButton,
} from '../../styles/LoginStyles';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', 
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message || 'Email or pass is incorrect'); 
        setOpen(true);
      } else {
        const data = await response.json();
        console.log('Login successful');
        localStorage.setItem('token', data.token); 
        console.log('Token:', data.token);
        navigate('/dashboard');
      }
      
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage(error.message);
      setOpen(true);
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <FormContainer component="form" onSubmit={handleSubmit}>  
      <LoginGrid container direction="column" spacing={2}>
        <Grid item>
          <TitleTypography variant="h4">
            Login
          </TitleTypography>
          <BodyTypography variant="body1" sx={{ mb: 2, textAlign: 'center' }}>
            Introduce tu correo electrónico y contraseña
          </BodyTypography>
        </Grid>

        <Grid item>
          <EmailInput
            email={email}
            handleEmailChange={handleEmailChange}
          />

          <PasswordInput
            password={password}
            handlePasswordChange={handlePasswordChange}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            autoComplete="current-password"
            label="Password"
            placeholder="Password"
            required={true}
          />

          <LoginButton
            type="submit" 
            variant="contained" 
            fullWidth
          >
            Log In
          </LoginButton>
        </Grid>
      </LoginGrid>

      <StyledDialog
        open={open}
        onClose={() => setOpen(false)}
      >
        <StyledDialogTitle style={{ fontSize: errorMessage.includes('must') ? '12px' : 'default' }}>
          {errorMessage}
        </StyledDialogTitle>
        <DialogContent>
          <BlueText>
            Please try again
          </BlueText>
        </DialogContent>
        <DialogActions>
          <DialogButton 
            onClick={() => setOpen(false)} 
            size='small'
            variant='outlined'
          >
            Close
          </DialogButton>
        </DialogActions>
      </StyledDialog>
    </FormContainer>
  );
}

export default Login;