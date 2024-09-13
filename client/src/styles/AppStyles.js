import styled from 'styled-components';
import { Typography, Button} from '@mui/material';
import { createGlobalStyle } from 'styled-components';

export const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    position: relative;
    /* background: url('/lha.intro.png') no-repeat center center fixed;
    background-size: cover; */
    min-height: 100vh;
    `;

    export const StyledTypography = styled(Typography)`
        color: white;
        z-index: 2; 
        position: relative;
        text-align: center;
        fontWeight: bold;
        color: white;
        margin-top: 20px;
    `;

    export const StyledSecondaryTypography = styled(Typography)`
        color: white;
        z-index: 2;
        position: relative;
        text-align: center;
        fontWeight: bold;
        color: white;
        margin: 10px 0;
        line-height: 1.5;
    `;

    export const Overlay = styled.div`
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 1;
    `;

    export const DrawerContainer = styled.div`
        position: absolute;
        top: 0;
        width: 100%;
        z-index: 3;
    `;

    export const GlobalStyle = createGlobalStyle`
        body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        width: 100%;
    }
    `;

    export const StyledButton = styled(Button)`
        margin-top: 20px;
        color: white !important;
        z-index: 3;
        background-color: orange;
    `;

    export const MainPicture = styled.div`
        background-image: url('/lha.intro.png') no-repeat center center fixed;
        background-size: cover;
        background-position: center;
        height: 400px;
    `;