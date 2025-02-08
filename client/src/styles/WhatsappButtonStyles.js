import styled from 'styled-components';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export const BigWhatsAppIcon = styled(WhatsAppIcon)`
  position: fixed;
  font-size: 48px;
  color: #25D366;
  cursor: pointer;
  transition: transform 0.3s ease;
  left: 20px;
  bottom: 20px;

  &:hover {
    transform: scale(1.1);
  }
`;
