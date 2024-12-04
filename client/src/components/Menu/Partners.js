import React from 'react';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from './ResponsiveDrawer';
import Footer from '../home/Footer';
import { 
  AppContainer, 
  DrawerContainer, 
  ContentWrapper 
} from '../../styles/AppStyles';

const Partners = () => {
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
          {/* Add your partners page content here */}
        </ContentWrapper>

        {/* Footer */}
        <Footer />
      </AppContainer>
    </>
  );
};

export default Partners;
