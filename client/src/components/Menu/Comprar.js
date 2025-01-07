import React from 'react';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from './ResponsiveDrawer';
import Footer from '../home/Footer';
import { 
  AppContainer, 
  DrawerContainer, 
  ContentWrapper 
} from '../../styles/AppStyles';
import { Container, CardContent, Box, Grid } from '@mui/material';
import { SectionContent, ImageContainer, OverlayText, StyledCard, StyledCardContent } from '../../styles/ValoracionStyled';

const Comprar = () => {
  const data = [
    {
      title: "Impuesto de Transmisiones Patrimoniales (ITP)",
      description: (
        <>
          <SectionContent>
            El tributo (Impuesto) a pagar en la comunidad autónoma de Andalucía es de un 8% sobre el precio de venta (para compras hasta 400.000 €).
          </SectionContent>
          <SectionContent>
            Existe un descuento en este impuesto, por el cual se paga el 3,5% si se cumplen los siguientes requisitos:
            <ul>
              <li>El precio de la compra sea inferior a 130.000 €</li>
              <li>La vivienda se destine a la residencia habitual del comprador</li>
              <li>El comprador tenga menos de 35 años</li>
            </ul>
          </SectionContent>
          <SectionContent>
            Existe un descuento en este impuesto del 2 % a la adquisición de vivienda para su reventa por una persona física o jurídica que ejerza una actividad empresarial a la que sean aplicables las normas de adaptación del Plan General del Sector Inmobiliario.
          </SectionContent>
          <SectionContent>
            Existe un descuento en este impuesto del 1 %, si se trata de la constitución de derecho reales de garantía, pensiones, fianzas, préstamos y la cesión de créditos.
          </SectionContent>
        </>
      ),
    },
    {
      title: "Impuesto de Actos Jurídicos Documentados (A.J.D.)",
      description: (
        <>
          <SectionContent>
            Este tributo en la Comunidad autónoma de Andalucía Desde 23 de junio de 2012 (Ley 3/2012), es de 1,5%, aunque exiten ciertas deducciones al respecto:
          </SectionContent>
          <SectionContent>
            <ul>
              <li>0,3 % en las adquisiciones de la vivienda habitual de valor real no superior a 130.000 €, por sujetos pasivos menores de 35 años.</li>
              <li>0,3% en la constitución de préstamos hipotecarios por sujetos pasivos menores de 35 años para adquirir la vivienda habitual, siempre y cuando el valor real de la vivienda y el principal del préstamo no excedan de 130.000 €.</li>
              <li>0,1 % en las adquisiciones de la vivienda habitual de valor real no superior a 180.000 €, por sujetos pasivos que tengan la consideración de persona con discapacidad con un grado de minusvalía reconocido igual o superior al 33%.</li>
              <li>0,1 % en la constitución de préstamo hipotecario destinado a financiar la adquisición de la vivienda habitual de personas con discapacidad con un grado de minusvalía reconocido igual o superior al 33%, cuando el valor real de la vivienda y el valor del principal del préstamo sea inferior a 180.000 euros.</li>
              <li>0,1 % para los documentos notariales que formalicen la constitución y cancelación de derechos reales de garantía, cuando el sujeto pasivo sea una Sociedad de Garantía Recíproca con domicilio social en la Comunidad Autónoma de Andalucía.</li>
              <li>2 % en las escrituras notariales que formalicen transmisiones de inmuebles en las que se realiza la renuncia a la exención en el Impuesto sobre el valor añadido.</li>
            </ul>
          </SectionContent>
        </>
      ),
    },
    {
      title: "Notaría",
      description: (
        <SectionContent>
          Para formalizar la compra de la propiedad interesada se necesita realizar una escritura pública de compra-venta que se firmará en una notaría. El coste de este servicio está fijado por normativa y depende directamente del importe del inmueble (a mayor precio mayor coste), aunque puede incrementarse por otros factores como el número de páginas que tenga la escritura, el número de copias, etc.
          <br />
          Los notarios cobran un arancel fijo, por lo que todos los notarios de Andalucía cobran lo mismo (apenas tienen margen para hacer un descuento), y la elección entre uno y otro depende de preferencias personales y el COMPRADOR es el que debe realizar dicha eleccion.
          <br />
          El coste de este servicio, teniendo en cuenta el precio medio al que se venden las viviendas en Andalucía, puede rondar los 650 €.
        </SectionContent>
      ),
    },
    {
      title: "Registro de la Propiedad",
      description: (
        <SectionContent>
          Un vez firmada la escritura de compra-venta, la notaría se encarga rápidamente de mandar la información de forma telemática al Registro de la Propiedad, para que se inscriba cuanto antes quien es el nuevo propietario de la vivienda.
          <br />
          De nuevo, estos costes están fijados por normativa, y dependen del precio de compra.
          <br />
          El coste de este servicio, siguiendo el ejemplo anterior puede rondar los 400 €.
        </SectionContent>
      ),
    },
    {
      title: "Gestoría",
      description: (
        <SectionContent>
          Lo más habitual es que todas estas gestiones de pagar los impuestos en Hacienda, la inscripción en el Registro de la Propiedad y el pago de la notaría lo realice una gestoría.
          <br />
          Si estás comprando una vivienda con financiación bancaria, estos trámites los realizará de forma obligada la gestoría del banco.
          <br />
          En estos casos, se realiza lo que se denomina una “provisión de fondos”, que es dejar un dinero a cuenta para que la gestora sea la que se encargue de pagar en cada lugar lo que corresponda.
        </SectionContent>
      ),
    },
    {
      title: "Gastos Inmobiliaria",
      description: (
        <SectionContent>
          Con LHA Inmobiliaria, los gastos son 0% sobre el precio de venta.
        </SectionContent>
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
                <img src="pic1.png" alt="Background" />
              </ImageContainer>
              <OverlayText variant="h2" align="center" gutterBottom>
                Gastos Como Comprador
                <SectionContent variant="body1" align="center" gutterBottom>
                Esta es la información detallada sobre los gastos asociados a la compra de una vivienda.
                </SectionContent>
              </OverlayText>
              
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

export default Comprar;
