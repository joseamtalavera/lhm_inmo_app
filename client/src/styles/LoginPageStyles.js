import styled from 'styled-components';
import { Dialog, Button, Typography } from '@mui/material';

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
    position: relative;

    @media (max-width: 768px) {
        display: none; /* Hide LeftGrid on mobile devices */
    }
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

export const OverlayText = styled(Typography)`
    
    color: white;
    text-align: center;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 1;
    max-width: 700px; /* Set the maximum width */
`;

export const SectionContent = styled(Typography)`
    margin-bottom: 1rem;
    font-size: 1.2rem;
`;

export const OverlayContainer = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    max-width: 700px; /* Set the maximum width */
    width: 100%; /* Ensure it scales */
    text-align: center; /* Center the text inside */
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
    z-index: 1;
`;