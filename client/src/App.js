// App.js

import React from 'react';
import ResponsiveDrawer from './components/Menu/ResponsiveDrawer';
import { 
  AppContainer, 
  StyledSecondaryTypography, 
  DrawerContainer, 
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
        <DrawerContainer>
          <ResponsiveDrawer />
        </DrawerContainer>
        <MainPicture>
          <img src='/lha.intro.png' alt='Lha Inmobiliaria' />
        </MainPicture>
        <StyledSecondaryTypography variant='h2'>
        Oficinas, casas y apartamentos de tus sueños
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