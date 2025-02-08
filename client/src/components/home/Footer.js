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
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WhatsappButton from '../WhatsappButton';  // <- added import

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterColumn>
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
          <FooterLogoContainer>
            <FooterLogo 
              src="/iso-fin.png" 
              alt="ISO Logo" 
            />
          </FooterLogoContainer>
        </FooterColumn>

        <FooterColumn>
          <FooterTitle>Oficina</FooterTitle>
          <FooterDetailItem>
            Calle Alejandro Dumas 17, Edificio Oficinas<br />
            Oficina 2<br />
            29004 Málaga
          </FooterDetailItem>
          <FooterDetailItem>
            <FooterLink 
              href="https://www.google.es/maps/place/C.+Alejandro+Dumas,+17,+Carretera+de+C%C3%A1diz,+29004+M%C3%A1laga,+Hispaania/@36.6940622,-4.4572845,17z/data=!3m1!4b1!4m6!3m5!1s0xd72f99d0c089249:0x6c52b645c94d72a6!8m2!3d36.6940622!4d-4.4572845!16s%2Fg%2F11wwt1s_lc?entry=ttu&g_ep=EgoyMDI0MTIxMS4wIKXMDSoASAFQAw%3D%3D" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <LocationOnIcon /> Cómo llegar
            </FooterLink>
          </FooterDetailItem>
          <FooterDetailItem>
            LHA Inmobiliaria S.L<br />
            Apartado de Correos ES18561<br />
            29006 Málaga
          </FooterDetailItem>
        </FooterColumn>
      </FooterContent>

      <FooterDetailItemCentered>
        &copy; {new Date().getFullYear()} LHA Inmobiliaria. Todos los derechos reservados.
        <br />
        <FooterLink href="/politica-de-privacidad">
          Política de Privacidad
        </FooterLink> | 
        <FooterLink href="/aviso-legal">
          Aviso Legal
        </FooterLink>
      </FooterDetailItemCentered>
      <WhatsappButton />  {/* added WhatsappButton component */}
    </FooterContainer>
  );
};

export default Footer;



