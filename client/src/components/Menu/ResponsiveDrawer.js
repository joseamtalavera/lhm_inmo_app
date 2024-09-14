// ResponsiveDrawer.js

import React, { useState } from 'react';
import { List, ListItem, useMediaQuery, useTheme, Box} from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import {
    StyledAppBar,
    StyledToolbar,
    StyledIconButton,
    DesktopMenu,
    MenuItem,
    LoginButton,
    LoginButtonText,
    StyledDrawer,
    StyledListItemText,
    CloseButton, 
    DrawerContent
} from '../../styles/ResponsiveDrawerStyles';

const menuItems = ['Propiedades', 'Opciones', 'Valora tu Propiedad', 'Partners'];

const ResponsiveDrawer = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme(); // get the theme object
    // useMediaQuery takes a theme object and returns a function that can be called with a breakpoint key to check if the screen is at that breakpoint or smaller (.dow())
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = (() => {
        setMobileOpen(!mobileOpen);
    });

    const drawer = (
        <DrawerContent data-testid="drawer-content">
            <CloseButton // we could not take to the right?????
                aria-label="close drawer"
                edge="end"
                onClick={handleDrawerToggle}
                data-testid="close-button"
            >
                <CloseIcon />
            </CloseButton>
            <List>
                {menuItems.map((text, index) => (
                    <ListItem button key={text}>
                        <StyledListItemText primary={text}/>
                    </ListItem>
                ))}
                <ListItem button key="Login" component={Link} to="/login">
                    <StyledListItemText primary="Login"/>
                </ListItem>
            </List>
        </DrawerContent>     
    );

    return (
        <div data-testid="responsive-drawer">
            <StyledAppBar position="static" elevation={0}>
                <StyledToolbar >
                <Box>
                    {/* <Link to="/">
                        <LogoImage src="logo_aula_cowork_blanco-e1647607454934.png" alt="Logo"/>
                    </Link> */}
                </Box>
                    {isMobile ? (
                        <StyledIconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={handleDrawerToggle}
                            data-testid="menu-button"
                        >
                        <MenuIcon />
                        </StyledIconButton>
                    ) : (
                        <DesktopMenu >
                            {menuItems.map((text, index) => (
                                <MenuItem key={index} >
                                    {text}
                                </MenuItem>
                            ))}
                           <LoginButton 
                                variant="contained" 
                                component={Link} 
                                to="/login"    
                            >
                                <LoginButtonText >
                                    Login
                                </LoginButtonText>  
                            </LoginButton>
                        </DesktopMenu>
                    )}
                </StyledToolbar>
                {isMobile && ( 
                    <StyledDrawer
                        variant="temporary"
                        anchor="right"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }} 
                    >
                        {drawer}
                    </StyledDrawer>
                )}
            </StyledAppBar>
        </div>
    );
}

export default ResponsiveDrawer;