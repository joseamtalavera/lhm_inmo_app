// App.js

import React from 'react';
import ResponsiveDrawer from './components/Menu/ResponsiveDrawer';
import { 
  AppContainer, 
  StyledTypography, 
  StyledSecondaryTypography, 
  Overlay, DrawerContainer, 
  GlobalStyle, 
  StyledButton ,
  MainPicture
} from './styles/AppStyles';

const App = () => {
  const handleCtaClick = () => {
    console.log ('CTA clicked');
  };

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <Overlay />
        
        <DrawerContainer>
          <ResponsiveDrawer />
        </DrawerContainer>
        <MainPicture />
        
        <StyledTypography variant='h1'>
          Lha Inmobiliaria!
        </StyledTypography>

        <StyledSecondaryTypography variant='h2'>
        Oficinas, casas y apartamentos adaptados a tus necesidades        
        </StyledSecondaryTypography>
        <StyledButton 
          variant='contained' 
          color='primary' 
          size='large' 
          onClick={handleCtaClick}
        >
          ¡Empieza ahora!
        </StyledButton>
        
      </AppContainer>
      
    </>
  );
}

export default App;