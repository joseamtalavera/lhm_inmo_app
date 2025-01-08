import React from 'react';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from './ResponsiveDrawer';
import Footer from '../home/Footer';
import { 
  AppContainer, 
  DrawerContainer, 
  ContentWrapper 
} from '../../styles/AppStyles';
import { Container, Box, Grid } from '@mui/material'; // Remove Button import
import { SectionContent, ImageContainer, StyledCardContent, OverlayText, ZigzagContainer, ZigzagItem, ZigzagItemTitle, RoundImage, StyledButton } from '../../styles/PartnersStyles'; // Import StyledButton

const Partners = () => {
  const data = [
    {
      title: "Viajes Fomentur",
      description: "Aman lo que hacen, y eso se nota. Con más de 20 años de experiencia en el sector. Diseñan y proporcionan los mejores viajes, creando una experiencia única.",
      image: "fomentur2.jpg",
      link: "https://viajesfomentur.com"
    },
    {
      title: "KUKI Mascota Feliz",
      description: "Son una empresa familiar con experiencia el el sector y han creado su tienda on-line con el objetivo de ofrecer a todos sus clientes, la facilidad de comprar con un simple click, una amplia gama de productos para sus mascotas.",
      image: "kuki.png",
      link: "https://kukimascotafeliz.com"
    },
    {
      title: "Ingenium Group",
      description: "Como contratistas generales supervisan proyectos de construcción y/o renovación en los sectores comerciales y residenciales. Se han ocupado de todos los proyectos de gran envergadura.",
      image: "ingenium.png",
      link: "https://ingeniumgr.com/"
    },
    {
      title: "Aranzazu Triguero (Abogada)",
      description: "Abogada colegiada núm. 5516 del ICAMALAGA desde marzo 2002. Licenciada en Derecho Universidad de Málaga 2001. NOS PROTEGE, NOS CUIDA Y NOS MIMA.",
      image: "abogada.png",
      link: "https://civisabogados.es/"
    },
    {
      title: "Acorán",
      description: "Empresa dedicada a la Consultoría en Protección de Datos y a la Formación. Ofrecen a sus clientes un trato excepcional y un servicio diferenciado, personalizado y completo, siempre enmarcando las actividades realizadas con la mayor integridad y calidad. Se aseguran de que cumplamos todas las directivas sobre la LOPD y LSSI-CE. GRACIAS",
      image: "acoran.png",
      link: "https://www.acoran.es/"
    },
    {
      title: "MAPFRE Seguros",
      description: "Nuestro Asesor, quien se ocupa de asegurar y protegernos frente a cualquier incidencia. Sucursal El Molinillo. Asesor PACO. Calle San Bartolomé, 14. 29013 Málaga. Teléfono 952 65 78 01",
      image: "mapfre.png",
      link: "https://mapfre.com"
    },
    {
      title: "La Huella Azul",
      description: "Dedicada al cuidado y guardería de mascotas. La Huella Azul: Pasión por los animales. Nuestra dedicación al cuidado de nuestros más íntimos, fieles y cariñosos bebés, no es solo un hobby, trabajo o pasatiempo. Es algo tan inexplicable, que la única manera de definirlo sería FELICIDAD.",
      image: "logolahuellaazul.jpg",
      link: "https://lahuellaazul.com"
    }
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
                <img src="partners.png" alt="Background" />
                <OverlayText variant="h2" align="center" gutterBottom>
                  Partners
                  <SectionContent variant="body1" align="center" gutterBottom>
                      Te presentamos a nuestros colaboradores. Empresa que confian en nuestra filosofía y trabajan con nosotros para ofrecerte un servicio.
                  </SectionContent>
                </OverlayText>
              </ImageContainer>
              {data.map((item, index) => (
                <ZigzagContainer key={index} reverse={index % 2 !== 0} >
                  <ZigzagItem>
                    {item.image === "abogada.png" ? (
                      <RoundImage src={item.image} alt={item.title} style={{ width: '100%', height: 'auto' }} />
                    ) : (
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: 'auto' }} />
                    )}
                  </ZigzagItem>
                  <ZigzagItemTitle>
                    <StyledCardContent variant="h4" align="left" gutterBottom>
                      {item.title}
                    </StyledCardContent>
                    <SectionContent variant="body1" gutterBottom>
                      {item.description}
                    </SectionContent>
                    <StyledButton 
                      variant="outlined" 
                      href={item.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Visita la Web
                    </StyledButton> 
                  </ZigzagItemTitle>
                </ZigzagContainer>
              ))}
            </Box>
          </Container>  
        </ContentWrapper>

        {/* Footer */}
        <Footer />
      </AppContainer>
    </>
  );
};

export default Partners;