import React from 'react';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from '../Menu/ResponsiveDrawer';
import Footer from './Footer';
import { 
  AppContainer, 
  DrawerContainer, 
  ContentWrapper 
} from '../../styles/AppStyles';
import { Container, Box } from '@mui/material';
import { Section, SectionTitle, SectionContent } from '../../styles/PoliticaPrivacidadStyles';

const PoliticaPrivacidad = () => {
  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <DrawerContainer>
          <ResponsiveDrawer />
        </DrawerContainer>
        <ContentWrapper>
          <Container>
            <SectionTitle variant="h4" gutterBottom>
              POLITICA DE PRIVACIDAD
            </SectionTitle>
            <Box>
              <Section>
                <SectionTitle variant="h6" gutterBottom>
                  1. INFORMACIÓN AL USUARIO
                </SectionTitle>
                <SectionContent paragraph>
                  LHA INMOBILIARIA MALAGA 2018 SL, en adelante RESPONSABLE, es el Responsable del tratamiento de los datos personales del Usuario y le informa que estos datos serán tratados de conformidad con lo dispuesto en el Reglamento (UE) 2016/679 de 27 de abril (GDPR) y la Ley Orgánica 3/2018 de 5 de diciembre (LOPDGDD), por lo que se le facilita la siguiente información del tratamiento:
                </SectionContent>
                <SectionContent paragraph>
                  Fin del tratamiento: mantener una relación comercial con el Usuario. Las operaciones previstas para realizar el tratamiento son:
                </SectionContent>
                <SectionContent paragraph>
                  Remisión de comunicaciones comerciales publicitarias por email, fax, SMS, MMS, comunidades sociales o cualquier otro medio electrónico o físico, presente o futuro, que posibilite realizar comunicaciones comerciales. Estas comunicaciones serán realizadas por el RESPONSABLE y relacionadas sobre sus productos y servicios, o de sus colaboradores o proveedores con los que éste haya alcanzado algún acuerdo de promoción. En este caso, los terceros nunca tendrán acceso a los datos personales.
                </SectionContent>
                <SectionContent paragraph>
                  Tramitar encargos, solicitudes o cualquier tipo de petición que sea realizada por el usuario a través de cualquiera de las formas de contacto que se ponen a su disposición.
                </SectionContent>
                <SectionContent paragraph>
                  Base jurídica del tratamiento: consentimiento del interesado.
                </SectionContent>
                <SectionContent paragraph>
                  Criterios de conservación de los datos: se conservarán durante no más tiempo del necesario para mantener el fin del tratamiento y cuando ya no sea necesario para tal fin, se suprimirán con medidas de seguridad adecuadas para garantizar la seudonimización de los datos o la destrucción total de los mismos.
                </SectionContent>
                <SectionContent paragraph>
                  Comunicación de los datos: no se comunicarán los datos a terceros, salvo obligación legal.
                </SectionContent>
                <SectionContent paragraph>
                  Derechos que asisten al Usuario:
                </SectionContent>
                <SectionContent paragraph>
                  - Derecho a retirar el consentimiento en cualquier momento.
                </SectionContent>
                <SectionContent paragraph>
                  - Derecho de acceso, rectificación, portabilidad y supresión de sus datos y a la limitación u oposición al su tratamiento.
                </SectionContent>
                <SectionContent paragraph>
                  - Derecho a presentar una reclamación ante la autoridad de control (www.aepd.es) si considera que el tratamiento no se ajusta a la normativa vigente.
                </SectionContent>
              </Section>
              <Section>
                <SectionTitle variant="h6" gutterBottom>
                  2. CARÁCTER OBLIGATORIO O FACULTATIVO DE LA INFORMACIÓN FACILITADA POR EL USUARIO
                </SectionTitle>
                <SectionContent paragraph>
                  Los Usuarios, mediante la marcación de las casillas correspondientes y entrada de datos en los campos, marcados con un asterisco (*) en el formulario de contacto o presentados en formularios de descarga, aceptan expresamente y de forma libre e inequívoca, que sus datos son necesarios para atender su petición, por parte del prestador, siendo voluntaria la inclusión de datos en los campos restantes. El Usuario garantiza que los datos personales facilitados al RESPONSABLE son veraces y se hace responsable de comunicar cualquier modificación de los mismos.
                </SectionContent>
                <SectionContent paragraph>
                  El RESPONSABLE informa de que todos los datos solicitados a través del sitio web son obligatorios, ya que son necesarios para la prestación de un servicio óptimo al Usuario. En caso de que no se faciliten todos los datos, no se garantiza que la información y servicios facilitados sean completamente ajustados a sus necesidades.
                </SectionContent>
              </Section>
              <Section>
                <SectionTitle variant="h6" gutterBottom>
                  3. MEDIDAS DE SEGURIDAD
                </SectionTitle>
                <SectionContent paragraph>
                  Que de conformidad con lo dispuesto en las normativas vigentes en protección de datos personales, el RESPONSABLE está cumpliendo con todas las disposiciones de las normativas GDPR y LOPDGDD para el tratamiento de los datos personales de su responsabilidad, y manifiestamente con los principios descritos en el artículo 5 del GDPR, por los cuales son tratados de manera lícita, leal y transparente en relación con el interesado y adecuados, pertinentes y limitados a lo necesario en relación con los fines para los que son tratados.
                </SectionContent>
                <SectionContent paragraph>
                  El RESPONSABLE garantiza que ha implementado políticas técnicas y organizativas apropiadas para aplicar las medidas de seguridad que establecen el GDPR y la LOPDGDD con el fin de proteger los derechos y libertades de los Usuarios y les ha comunicado la información adecuada para que puedan ejercerlos.
                </SectionContent>
              </Section>
            </Box>
          </Container>
        </ContentWrapper>
        <Footer />
      </AppContainer>
    </>
  );
};

export default PoliticaPrivacidad;
