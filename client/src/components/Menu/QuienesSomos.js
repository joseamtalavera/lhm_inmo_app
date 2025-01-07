import React from 'react';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from './ResponsiveDrawer';
import Footer from '../home/Footer';
import { 
  AppContainer, 
  DrawerContainer, 
  ContentWrapper 
} from '../../styles/AppStyles';
import { Container, Box } from '@mui/material';
import { SectionContent, ImageContainer,StyledCardContent } from '../../styles/QuienesSomosStyles';

const QuienesSomos = () => {
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
            <Box sx={{ padding: 4 }}>
              <ImageContainer>
                <img src= "bigLHA.png" alt="Background" />
              </ImageContainer>
              <StyledCardContent variant="h4" gutterBottom>
                Quiénes Somos
              </StyledCardContent>
              <SectionContent variant="body1" gutterBottom>
                LHA Inmobiliaria Málaga 2018 S.L es una empresa dedicada al sector inmobiliario con una personalidad única. Nuestro estilo de comunicación, confianza y gestión en el asesoramiento a nuestros clientes, se diferencia con marca propia.
              </SectionContent>
              <SectionContent variant="body1" gutterBottom>
                Nuestro emblema comercial LHA Inmobiliaria proviene del nombre de nuestra empresa madre "La Huella Azul", dedicada al cuidado y guardería de mascotas: <a href="https://www.lahuellazul.com" target="_blank" rel="noopener noreferrer">www.lahuellazul.com</a>
              </SectionContent>
              <Box sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                <a href="https://www.lahuellaazul.com/" target="_blank" rel="noopener noreferrer">
                  <img src="logolahuellaazul.jpg" alt="La Huella Azul Logo" style={{ maxWidth: '100px', height: 'auto' }} />
                </a>
              </Box>
              <SectionContent variant="body1" gutterBottom>
                Nuestra imagen representa transparencia, proximidad, compromiso, liderazgo y sobre todo las garantías de un trabajo bien elaborado de manera profesional y concienzuda.
              </SectionContent>
              <SectionContent variant="body1" gutterBottom>
                En nuestra imagen de marca hemos querido representar estos valores que forman los cimientos de nuestra empresa que se dedica al sector inmobiliario, la fusión entre una imagen de nuestra tierra como es la biznaga (delicada pero con fuerza, laboriosa y bella), con la imagen de la silueta de una mujer; La representación de una mujer confirma nuestra fortaleza, dedicación, entereza y confianza y siempre presente en nuestras bases.
              </SectionContent>
              <SectionContent variant="body1" gutterBottom>
                Gracias por dedicar su tiempo en leer estas palabras escritas.
              </SectionContent>
              <SectionContent variant="body1" gutterBottom>
                <span style={{ color: '#1E90FF', fontWeight: 'bold' }}>Mónica y Marcos.</span>
              </SectionContent>
            </Box>
          </Container>  
        </ContentWrapper>

        {/* Footer */}
        <Footer />
      </AppContainer>
    </>
  );
};

export default QuienesSomos;