import React from 'react';
import { BigWhatsAppIcon } from '../styles/WhatsappButtonStyles';

const WhatsAppButton = () => {
  const handleClick = () => {
    window.open('https://wa.me/34629901965', '_blank');
  };

  return (
    <div onClick={handleClick} aria-label="Chat on WhatsApp">
      <BigWhatsAppIcon />
    </div>
  );
};

export default WhatsAppButton;
