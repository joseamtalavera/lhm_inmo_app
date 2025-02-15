// ResponsiveDrawerStyles.js 

import styled from 'styled-components';
import { AppBar, Toolbar, IconButton, Typography, Button, Drawer,ListItem } from '@mui/material';
import { Link } from 'react-router-dom';
import ButtonBase from '@mui/material/ButtonBase';

// Styles for the AppBar component
export const StyledAppBar = styled(AppBar)`
  background: transparent !important;
  box-shadow: none !important; // remove grey line shadow
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
        color: ${({ noHover }) => noHover ? '#1E90FF' : 'grey'};
    }
`;

// Styles for the login button
export const LoginButton = styled(Button)`
    margin-top: -5px;
    width: 100px;
    background-color: transparent !important;
    text-transform: none;
    border-radius: 20px !important;
    border: 2px solid #1E90FF !important;

    &:hover {
        background-color: ${({ noHover }) => noHover ? 'transparent' : 'transparent'} !important;
    }

    &.MuiButton-root {
        text-transform: none;
    } 
`;

// Add the custom login button to avoid the initial solid background:
export const CustomLoginButton = styled(ButtonBase)`
    margin-top: -6px;
    padding: 6px 16px;
    border: 1px solid #1E90FF;
    border-radius: 20px;
    color: #1E90FF;
    background-color: transparent;
    text-transform: none;
    &:hover {
        background-color: transparent;
    }
`;

// Styles for the text inside the login button
export const LoginButtonText = styled(Typography)`
    color: #1E90FF;
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

// Styles for the selector component
export const Selector = styled('div')`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    padding: 5px;
    border-radius: 5px;
    background-color: white;
    border: 1px solid #1E90FF;
    position: absolute;
    z-index: 10;
`;

// Styles for the selector options
export const SelectorOption = styled(Link)`
    color: #1E90FF;
    padding: 5px 0;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: darkblue;
    }
`;

// Styles for the arrow icon
export const ArrowIcon = styled('span')`
    margin-left: 5px; /* Space between text and icon */
    font-size: 12px;
    color: inherit; /* Inherits text color */
    display: inline-block; /* Aligns with text */
    vertical-align: middle; /* Ensures proper alignment */
    cursor: pointer; /* Indicate clickable behavior */
`;


// Styles for the indented list items
export const IndentedListItem = styled(ListItem)`
    padding-left: ${({ level }) => (level ? `${level * 32}px` : '16px')} !important;
`;

// Styles for the indented selector options
export const IndentedSelectorOption = styled(ListItem)`
    padding-left: 48px !important;
`;





