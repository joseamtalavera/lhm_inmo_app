// src/styles/LoginPageStyles.js

import styled from 'styled-components';
import { Dialog, Button } from '@mui/material';

export const LoginPageContainer = styled.div`
    display: flex;
    height: 100vh;
`;

export const LeftGrid = styled.div`
    flex: 1;
    background: linear-gradient(
        rgba(173, 216, 230, 0.5), 
        rgba(173, 216, 230, 0.5)
    ), url(/bigPLAYA2.png);
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
`;

export const RightGrid = styled.div`
    flex: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
`;

export const CenteredBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

export const LogoLink = styled.a`
    position: absolute;
    top: 20px;
    left: 20px;

    img {
        max-width: 125px;
        max-height: 75px;
    }
`;

export const StyledDialog = styled(Dialog)`
    .MuiDialog-paper {
        width: 60%;
        max-height: 190px;
        text-align: center;
    }
`;

export const StyledButton = styled(Button)`
    color: green;
    border-color: green;
`;
