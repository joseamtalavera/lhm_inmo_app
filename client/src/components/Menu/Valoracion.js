import React from 'react';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from './ResponsiveDrawer';
import Footer from '../home/Footer';
import { 
  AppContainer, 
  DrawerContainer, 
  ContentWrapper 
} from '../../styles/AppStyles';
import { Grid, Container, Box, CardContent, Button } from '@mui/material';
import { SectionContent, ImageContainer, OverlayText, StyledCard, StyledCardContent } from '../../styles/ValoracionStyled';

const Valoracion = () => {
  const data = [
    {
      title: "Valora Tu Propiedad",
      description: (
        <>
          <SectionContent>
            ¿Cuánto puede valer tu casa? Quieres saberlo pero no te apetece que te hagan llamadas inoportunas para convencerte y perder el tiempo.
          </SectionContent>
          <SectionContent>
            Nosotros NO lo hacemos.
          </SectionContent>
          <SectionContent>
            Siéntete libre de probar nuestro valorador de propiedades y sólo recibirás un correo electrónico con el informe*.
          </SectionContent>
          <SectionContent>
          <Button variant="contained" color="primary" href="https://betterplaceweb.com/" target="_blank" rel="noopener noreferrer">
              Valorar Propiedad
            </Button>
          </SectionContent>
          <SectionContent>
            Si quieres una valoración más exhaustiva o conocer más sobre nuestra forma de trabajar, contáctanos tú. Estamos a tu disposición.
          </SectionContent>
          <SectionContent>
            <strong>Inma:</strong> 625 32 96 63 <br />
            <a href="mailto:inmaculada.garcia@lhainmobiliaria.es">inmaculada.garcia@lhainmobiliaria.es</a>
          </SectionContent>
          <SectionContent>
            <strong>Marcos:</strong> 629 90 19 65 <br />
            <a href="mailto:marcos.lopez@lhainmobiliaria.es">marcos.lopez@lhainmobiliaria.es</a>
          </SectionContent>
          <SectionContent>
            * RGPD: Su e-mail no quedará guardado en nuestra base de datos, es por lo cual no podremos contactar con usted, sin su consentimiento.
          </SectionContent>
        </>
      ),
    },
  ];

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
                <img src="pic2.jpg" alt="Background" />
                <OverlayText variant="h2" align="center" gutterBottom>
                  Valora Tu Propiedad
                  <SectionContent variant="body1" align="center" gutterBottom>
                      Esta es la información detallada sobre los gastos asociados a la compra de una vivienda.
                  </SectionContent>
                </OverlayText>
              </ImageContainer>
              
              <Grid container spacing={2}>
                {data.map((item, index) => (
                  <Grid item xs={12} key={index}>
                    <StyledCard variant="outlined" sx={{ height: "100%" }}>
                      <CardContent>
                        <StyledCardContent variant="h4" gutterBottom>
                          {item.title}
                        </StyledCardContent>
                        {item.description}
                      </CardContent>
                    </StyledCard>
                  </Grid>
                ))}
              </Grid>
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