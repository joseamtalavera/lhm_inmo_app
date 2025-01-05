// ResponsiveDrawer.js

import React, { useState } from 'react';
import { List, ListItem, ListItemText, useMediaQuery, useTheme, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
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
    Selector,
    SelectorOption,
    ArrowIcon,
    IndentedListItem,
    IndentedSelectorOption
} from '../../styles/ResponsiveDrawerStyles';

const menuItems = [
    { text: 'Propiedades', link: '/allviviendas' },
    { text: 'Qué necesitas?', link: '#' },
    { text: 'Quienes Somos', link: '/somos' },
    { text: 'Partners', link: '/partners' }
];

const ResponsiveDrawer = () => {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState('');
    const [isSelectorOpen, setIsSelectorOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleMenuItemClick = (item) => {
        if (item.text === 'Qué necesitas?') {
            setIsSelectorOpen(!isSelectorOpen);
        } 
    }

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
                    <>
                    <IndentedListItem 
                        button 
                        key={item.text} 
                        component={item.text === 'Qué necesitas?' ? 'button' : Link}
                        to={item.text !== 'Qué necesitas?' ? item.link : undefined}
                        onClick={() => handleMenuItemClick(item)}   
                    >
                        <ListItemText primary={item.text} />
                        {item.text === 'Qué necesitas?' && (
                            <ArrowIcon>
                                {isSelectorOpen ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/>}
                            </ArrowIcon>
                        )}
                    </IndentedListItem>
                    {item.text === 'Qué necesitas?' && isSelectorOpen && (
                            <List component="div" disablePadding>
                                <IndentedSelectorOption button component={Link} to="/comprar" >
                                    <ListItemText primary="Comprar" />
                                </IndentedSelectorOption>
                                <IndentedSelectorOption button component={Link} to="/vender" >
                                    <ListItemText primary="Vender" />
                                </IndentedSelectorOption>
                                <IndentedSelectorOption button component={Link} to="/valoracion" >
                                    <ListItemText primary="Valoración" />
                                </IndentedSelectorOption>
                            </List>
                        )}
                    </>

                ))}
                <IndentedListItem button key="Login" component={Link} to="/login">
                    <ListItemText primary="Login" />
                </IndentedListItem>
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
                                <div key={index} style={{ position: 'relative' }}>
                                    <MenuItem component={Link} to={item.link} onClick={() => handleMenuItemClick(item)}>
                                        {item.text}
                                        {item.text === 'Qué necesitas?' && (
                                            <ArrowIcon>
                                                {isSelectorOpen ? <ExpandLessOutlinedIcon/> : <ExpandMoreOutlinedIcon/>}
                                            </ArrowIcon>
                        )}
                                    </MenuItem>
                                    {item.text === 'Qué necesitas?' && isSelectorOpen && (
                                        <Selector>
                                            <SelectorOption component={Link} to="/comprar">Comprar</SelectorOption>
                                            <SelectorOption component={Link} to="/vender">Vender</SelectorOption>
                                            <SelectorOption component={Link} to="/valoracion">Valoración</SelectorOption>
                                        </Selector>
                                    )}
                                </div>
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





