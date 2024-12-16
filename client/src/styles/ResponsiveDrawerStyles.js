// ResponsiveDrawerStyles.js 

import styled from 'styled-components';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer } from '@mui/material';

// Styles for the AppBar component
export const StyledAppBar = styled(AppBar)`
    background: transparent !important;
`;

// Styles for the Toolbar component
export const StyledToolbar = styled(Toolbar)`
    display: flex;
    justify-content: space-between;
    padding: 0 20px;
`;

// Styles for the logo image
export const LogoImage = styled.img`
    width: 80px;
    height: auto;
    object-fit: contain;
    margin-right: 20px;
    
    @media (max-width: 780px) {
        width: 100px;
    }
`;

// Styles for the IconButton component used for the menu button
export const StyledIconButton = styled(IconButton)`
    color: ${({ open }) => (open ? 'white' : '#1E90FF')} !important;
    position: absolute;
    right: 0;
    top: 0;
`;

// Styles for the IconButton component used for the close button
export const CloseButton = styled(IconButton)`
    position: absolute;
    color: white !important;
    right: 0;
    top: 0;
    margin-top: 10px; /* Add margin to create space between CloseIcon and menu items */
    margin-right: 10px; /* Add margin to create space to the right of CloseIcon */
`;

// Styles for the desktop menu container
export const DesktopMenu = styled('div')`
    display: flex;
    justify-content: flex-end;
    margin-top: 40px;
    margin-bottom: 20px;
`;

// Styles for the menu items
export const MenuItem = styled(Typography)`
    color: #1E90FF;
    margin-right: 30px !important;
    margin-top: 10px !important;
    cursor: pointer;
    &:hover {
        color: darkblue;
    }
`;

// Styles for the login button
export const LoginButton = styled(Button)`
    margin-top: -5px;
    width: 100px;
    background-color: #1E90FF;
    text-transform: none;
    border-radius: 20px !important;

    &:hover {
        background-color: darkblue !important;
    }

    &.MuiButton-root {
        text-transform: none;
    }
`;

// Styles for the text inside the login button
export const LoginButtonText = styled(Typography)`
    color: white;
`;

// Styles for the Drawer component
export const StyledDrawer = styled(Drawer)`
    .MuiDrawer-paper {
        background: #1E90FF;
        color: white;
        width: 50%;
    }
`;

// Styles for the content inside the drawer
export const DrawerContent = styled('div')`
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 50px; /* Add padding to create space between CloseIcon and menu items */
`;





