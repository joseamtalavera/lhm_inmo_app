import styled from 'styled-components';
import { Typography, Button } from '@mui/material';

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensures it takes up the entire viewport height */
    
    @media (max-width: 780px) {
        padding: 0 10px;
    }
`;

// Drawer container that handle menu
export const DrawerContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000; /* Ensure the drawer is on top of other container */
    background-color: white;
    margin-bottom: 50px;

    @media (max-width: 780px) {
        position: relative;
        margin-bottom: 20px;
    }
`;

// Wrapper for the main content in the middle of the page
export const ContentWrapper = styled.div`
    flex: 1; /* Ensures it grows and fills available space */
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin-top: 50px;

    @media (max-width: 780px) {
        margin-top: 20px;
    }
`;

// Main picture at the top of the page
export const MainPicture = styled.div`
    height: 680px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin-top: 50px;
    padding: 0;

    @media (max-width: 780px) {
        display: none; /* Hide the main picture on mobile */
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        margin: 0;
        padding: 0;
    

        @media (max-width: 2000px) {
        /* When the viewport is 2000px or smaller, start reducing the image size */
            width: 100%;
            height: auto; /* Mantain the aspect ratio */
        }

        @media (max-width: 1200px) {
            width: 80%;
            height: auto; /* Mantain aspect ratio */
        }

        @media (max-width: 780px) {
        /* Mobile view: reduce height and make sure it's responsive */
            width: 100%;
            height: 200px; /* Fixed height on mobile */
        }
    }
`;

// Styled typography for the main title
export const StyledSecondaryTypography = styled(Typography)`
    color: #1E90FF;
    position: relative;
    text-align: center;
    /*font-weight: bold;*/
    margin: 10px 0;
    line-height: 1.5;
    margin-bottom: 10px;
    padding: 0 10px;
    height: 1.8em;
    width: 100%;
    box-sizing: border-box;

    @media (max-width: 780px) {
        font-size: 1.5rem;
    }
`;

export const StyledParagraph = styled.p`
    font-size: 1.5rem;
    margin-top: 2px;
    color: #616161;

    @media (max-width: 780px) {
        font-size: 1rem;
        text-align: center;
    }
`;

// Button with custom styles
export const StyledButton = styled(Button)`
    margin-top: 75px;
    margin-bottom: 75px;
    color: white;
    background-color: #1E90FF;

    &:hover {
        background-color: #ff9800;
    }

    @media (max-width: 780px) {
        width: 100%;
        margin-top: 20px;
        margin-bottom: 20px;
    }
`;







