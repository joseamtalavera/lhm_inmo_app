// LogingPage.js
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { DialogTitle, DialogContent, DialogContentText, DialogActions} from '@mui/material';
import Login from './Login'; 
import {
        LoginPageContainer,
        LeftGrid,
        RightGrid,
        CenteredBox,
        LogoLink,
        StyledDialog,
        StyledButton
}from '../../styles/LoginPageStyles';
import { GlobalStyle } from '../../styles/GlobalStyles';

const LoginPage = () => {
        const [open, setOpen] = useState(false);
        const navigate = useNavigate(); 
        
        
        return (
                <LoginPageContainer >
                        <LeftGrid />
                        <RightGrid>
                            <CenteredBox>
                                <Login />
                            </CenteredBox>
                            <LogoLink href="/">
                                <img src="/logo300x212.png" alt="Logo" />
                            </LogoLink>
                        </RightGrid>
                        <StyledDialog
                                open={open} 
                                onClose={() => setOpen(false)}
                                >
                                <DialogTitle style={{ fontSize: 'default' }}>{"Registration Successful!"}</DialogTitle>
                                        <DialogContent style={{ overflow: 'hidden'}}>
                                                <DialogContentText sx={{ color: 'orange'}}>
                                                        Please check your email to confirm your account
                                                </DialogContentText>
                                        </DialogContent>
                                        <DialogActions >
                                                <StyledButton
                                                onClick={()=> {
                                                        setOpen(false);
                                                        navigate('/');
                                                }}
                                                >
                                                Close
                                                </StyledButton>
                                        </DialogActions>
                        </StyledDialog>                                
                </LoginPageContainer>
                
        );
};

export default LoginPage;