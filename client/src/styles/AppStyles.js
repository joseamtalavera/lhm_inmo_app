import styled from 'styled-components';
import { Typography, Button } from '@mui/material';

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    @media (max-width: 780px) {
        padding: 0 10px;
    }
`;

export const DrawerContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: white;
    margin-bottom: 50px;

    @media (max-width: 780px) {
        position: relative;
        margin-bottom: 20px;
    }
`;

export const ContentWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    margin-top: 50px;

    @media (max-width: 780px) {
        margin-top: 20px;
    }
`;

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
        display: none;
    }

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: relative;
        margin: 0;
        padding: 0;

        @media (max-width: 2000px) {
            width: 100%;
            height: auto;
        }

        @media (max-width: 1200px) {
            width: 80%;
            height: auto;
        }

        @media (max-width: 780px) {
            width: 100%;
            height: 200px;
        }
    }
`;

export const StyledSecondaryTypography = styled(Typography)`
    color: #1E90FF;
    position: relative;
    text-align: center;
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







