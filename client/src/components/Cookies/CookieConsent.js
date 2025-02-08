import React, { useState, useEffect } from 'react';
import { Button, Link } from '@mui/material';
import { ConsentWrapper, Message, ButtonGroup } from '../../styles/CookieConsentStyles';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check if the user has already accepted or declined cookies
    const accepted = localStorage.getItem('cookieAccepted');
    const declined = localStorage.getItem('cookieDeclined');
    if (!accepted && !declined) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieAccepted', 'true');
    setVisible(false);
    // Optionally load non-essential cookies or scripts here
  };

  const handleDecline = () => {
    localStorage.setItem('cookieDeclined', 'true');
    setVisible(false);
    // Optionally ensure non-essential cookies or scripts are not loaded
  };

  if (!visible) return null;

  return (
    <ConsentWrapper role="dialog" aria-live="polite" aria-label="Cookie consent">
      <Message variant="body1">
        Usamos cookies para mejorar su experiencia. Al hacer clic en "Aceptar", acepta nuestra política de cookies.
        {' '}
        <Link href="/politica-de-privacidad" target="_blank" rel="noopener noreferrer">
          Learn more
        </Link>
      </Message>
      <ButtonGroup>
        <Button variant="contained" color="primary" onClick={handleAccept}>
          Aceptar
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleDecline}>
          Rechazar
        </Button>
      </ButtonGroup>
    </ConsentWrapper>
  );
};

export default CookieConsent;
