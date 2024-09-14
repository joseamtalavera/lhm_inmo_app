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
    top: 0;
`;

export const StyledSecondaryTypography = styled(Typography)`
    color: #1976d2 !important;
    position: relative;
    text-align: center;
    fontWeight: bold;
    color: white;
    margin: 10px 0;
    line-height: 1.5;
    margin-botton: 100px;
    padding: 0 20px;
    height: 150px;
`;

export const DrawerContainer = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    margin-bottom: 0;
    
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
    
    background-color: orange;
`;

export const MainPicture = styled.div`
    height: 600px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    margin-top: 50px;
    margin-bottom: 0;
    padding: 0;
    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        position: absolute;
        top: 0;
        left: 0;
    }
`;
