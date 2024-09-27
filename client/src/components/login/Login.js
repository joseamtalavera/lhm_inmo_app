// Login.js
import React, { useState } from 'react';
import { Grid, DialogContent,  DialogActions } from '@mui/material';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import { useNavigate } from 'react-router-dom';
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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [open, setOpen] = useState(false); 
  const navigate = useNavigate(); 

  // handle email input change
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  // handle password input change
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // Pause the execution of the function until the fetch promise is resolved
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', 
      });

      // Check if the response is not ok
      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message ||'Email or pass is incorrect'); //errorData.message is the message from authRoutes.js
        setOpen(true);
      } else {
          const data = await response.json();
          console.log('Login successful');
          localStorage.setItem('token', data.token); // Store the token in local storage
          navigate('/dashboard');
      }
      // If there is an error, catch it and log it to the console
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
      <LoginGrid container direction= "column" spacing={2}>
            <Grid item>
              <TitleTypography variant="h4">
                  Login
              </TitleTypography>
              <BodyTypography variant="body1" sx={{mb:2, textAlign: 'center'}}>
                  Introduce tu correo electrónico y contraseña
              </BodyTypography>
            </Grid>

        <Grid item >
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
        <StyledDialogTitle style={{ fontSize: errorMessage.includes('must') ? '12px' : 'default'}} >{errorMessage}</StyledDialogTitle>
        <DialogContent >
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