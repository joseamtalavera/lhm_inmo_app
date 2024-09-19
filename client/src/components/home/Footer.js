// src/components/Footer.js

import React from 'react';
import { 
  FooterContainer, 
  FooterContent, 
  FooterColumn,
  FooterTitle, 
  FooterLink, 
  FooterLogoContainer, 
  FooterLogo,
  FooterDetailItem,
  FooterDetailItemCentered,
} from '../../styles/FooterStyles';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        {/* Column 1 */}
        <FooterColumn>
          {/* Logo and Company Name */}
          <FooterLogoContainer>
            <FooterLogo 
              src="/logo300x212.png" 
              alt="LHA Inmobiliaria Logo" 
            />
          </FooterLogoContainer>
          <FooterTitle>LHA Inmobiliaria Málaga 2018 SL</FooterTitle>
          <FooterDetailItem>Inscrita en el Registro Mercantil de Málaga</FooterDetailItem>
          <FooterDetailItem>Tomo: 5693 Libro: 4600 Folio: 57 Hoja: MA-143242</FooterDetailItem>
          <FooterDetailItem>NIF: B93590792</FooterDetailItem>
        </FooterColumn>

        {/* Column 2 */}
        <FooterColumn>
          <FooterTitle>Contacto</FooterTitle>
          <FooterDetailItem>
            Teléfono: <FooterLink href="tel:629901965">629 90 19 65</FooterLink>
          </FooterDetailItem>
          <FooterDetailItem>
            Email: <FooterLink href="mailto:marcos.lopez@lhainmobiliaria.es">marcos.lopez@lhainmobiliaria.es</FooterLink>
          </FooterDetailItem>
          <FooterDetailItem>
            <strong>Correo Postal:</strong><br />
            LHA Inmobiliaria S.L<br />
            Apartado de Correos ES18561<br />
            29006 Málaga
          </FooterDetailItem>
          {/* Iso logo */}
          <FooterLogoContainer>
            <FooterLogo 
              src="/iso-fin.png" 
              alt="ISO Logo" 
            />
          </FooterLogoContainer>
        </FooterColumn>

        {/* Column 3 */}
        <FooterColumn>
          <FooterTitle>Oficina</FooterTitle>
          <FooterDetailItem>
            Calle Alejandro Dumas 17, Edificio Oficinas<br />
            Oficina 2<br />
            29004 Málaga
          </FooterDetailItem>
          <FooterDetailItem>
            <FooterLink 
              href="https://goo.gl/maps/YourGoogleMapsLink" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Cómo llegar
            </FooterLink>
          </FooterDetailItem>
          <FooterDetailItem>
            LHA Inmobiliaria S.L<br />
            Apartado de Correos ES18561<br />
            29006 Málaga
          </FooterDetailItem>
        </FooterColumn>
      </FooterContent>

      {/* Footer Bottom */}
      <FooterDetailItemCentered >
        &copy; {new Date().getFullYear()} LHA Inmobiliaria. Todos los derechos reservados.
      </FooterDetailItemCentered>
    </FooterContainer>
  );
};

export default Footer;
