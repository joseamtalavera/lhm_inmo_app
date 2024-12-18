// ResponsiveDrawer.js

import React, { useState } from 'react';
import { List, ListItem, ListItemText, useMediaQuery, useTheme, Box } from '@mui/material';
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
    CloseButton,
    DrawerContent,
    LogoImage,
} from '../../styles/ResponsiveDrawerStyles';

const menuItems = [
    { text: 'Propiedades', link: '/allviviendas' },
    { text: 'Opciones', link: '/opciones' },
    { text: 'Valora tu Propiedad', link: '/valora-tu-propiedad' },
    { text: 'Partners', link: '/partners' }
];

const ResponsiveDrawer = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <DrawerContent data-testid="drawer-content">
            <CloseButton
                aria-label="close drawer"
                edge="end"
                onClick={handleDrawerToggle}
                data-testid="close-button"
            >
                <CloseIcon />
            </CloseButton>
            <List>
                {menuItems.map((item) => (
                    <ListItem button key={item.text} component={Link} to={item.link}>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ))}
                <ListItem button key="Login" component={Link} to="/login">
                    <ListItemText primary="Login" />
                </ListItem>
            </List>
        </DrawerContent>
    );

    return (
        <div data-testid="responsive-drawer">
            <StyledAppBar position="static" elevation={0}>
                <StyledToolbar>
                    <Box>
                        <Link to="/">
                            <LogoImage src="/logo300x212.png" alt="Logo" />
                        </Link>
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
                        <DesktopMenu>
                            {menuItems.map((item, index) => (
                                <MenuItem key={index} component={Link} to={item.link}>
                                    {item.text}
                                </MenuItem>
                            ))}
                            <LoginButton
                                variant="contained"
                                component={Link}
                                to="/login"
                            >
                                <LoginButtonText>
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





