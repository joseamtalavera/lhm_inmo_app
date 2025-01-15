import React, { useState } from 'react';
import { Grid, DialogContent, DialogActions } from '@mui/material';
import PasswordInput from './PasswordInput';
import EmailInput from './EmailInput';
import {
  FormContainer,
  LoginGrid,
  LoginButton,
  TitleTypography,
  StyledDialog,
  StyledDialogTitle,
  BlueText,
  DialogButton,
  CenteredBodyTypography,
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
        setErrorMessage(errorData.message || 'Email o Contraseña incorrecto'); 
        setOpen(true);
      } else {
        const data = await response.json();
        localStorage.setItem('token', data.token); 
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
          <CenteredBodyTypography variant="body1">
            Introduce tu correo electrónico y contraseña
          </CenteredBodyTypography>
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
        <StyledDialogTitle isError={errorMessage.includes('must')}>
          {errorMessage}
        </StyledDialogTitle>
        <DialogContent>
          <BlueText>
            Intentalo de nuevo
          </BlueText>
        </DialogContent>
        <DialogActions>
          <DialogButton 
            onClick={() => setOpen(false)} 
            size='small'
            variant='outlined'
          >
            Cerrar
          </DialogButton>
        </DialogActions>
      </StyledDialog>
    </FormContainer>
  );
}

export default Login;