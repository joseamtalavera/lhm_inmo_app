import styled from 'styled-components';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const BigWhatsAppIcon = styled(WhatsAppIcon)`
  position: fixed;
  font-size: 60px;
  color: #25D366;
  cursor: pointer;
  transition: transform 0.3s ease;
  right: 20px;
  bottom: 40px;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 1024px) {
    left: auto;
    right: 20px;
    bottom: 100px;
  }
`;
