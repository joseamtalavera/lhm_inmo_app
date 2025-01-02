import React from 'react';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from './ResponsiveDrawer';
import Footer from '../home/Footer';
import { 
  AppContainer, 
  DrawerContainer, 
  ContentWrapper 
} from '../../styles/AppStyles';
import { Container, Typography, Box } from '@mui/material';

const Valoracion = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {/* Drawer container that handles menu */}
        <DrawerContainer>
          <ResponsiveDrawer />
        </DrawerContainer>

        {/* Main content area */}
        <ContentWrapper>
        <Container>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
          {/* <ConstructionIcon style={{ fontSize: 100, color: '#f0ad4e' }} /> */}
          <Typography variant="h4" component="h1" gutterBottom>
            Valora tu Propiedad Under Construction. Thanks for your patience.
          </Typography>
          <Typography variant="body1">
            We are working hard to bring you the best experience. Please check back later.
          </Typography>
        </Box>
      </Container>  
        </ContentWrapper>

        {/* Footer */}
        <Footer />
      </AppContainer>
    </>
  );
};

export default Valoracion;
