// App.js

import React from 'react';
import { GlobalStyle } from './styles/GlobalStyles';
import ResponsiveDrawer from './components/Menu/ResponsiveDrawer';
import PropiedadesDestacadas from './components/home/PropiedadesDestacadas';
import Footer from './components/home/Footer';
import { 
  AppContainer, 
  StyledSecondaryTypography, 
  DrawerContainer, 
  StyledButton,
  MainPicture,
  ContentWrapper,
  StyledParagraph
} from './styles/AppStyles';
import { Link } from 'react-router-dom'; // for navigation

const App = () => {
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
          <MainPicture>
            <img src='/lha.intro.png' alt='Lha Inmobiliaria' />
          </MainPicture>

          <StyledSecondaryTypography variant='h3'>
            Propiedades Destacadas        
          </StyledSecondaryTypography>
          <StyledParagraph>Las últimas novedades y lanzamientos inmobiliarios en la Costa del Sol</StyledParagraph>
          <StyledParagraph>No pierdas la vivienda de sus sueños</StyledParagraph>

          <PropiedadesDestacadas />

          <StyledButton 
            variant='contained' 
            color='primary' 
            size='large' 
            component={Link}
            to='/propiedades'
          >
            Ver todas las propiedades
          </StyledButton>
        </ContentWrapper>

        {/* Footer */}
        <Footer />
      </AppContainer>
    </>
  );
};

export default App;