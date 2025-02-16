import React, { useState } from 'react';
import DOMPurify from 'dompurify';
import useMediaQuery from '@mui/material/useMediaQuery'; // added import
import { Dialog, DialogTitle, DialogContent, DialogActions, Fab, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import Button from '@mui/material/Button';
import WhatsAppIcon from '@mui/icons-material/WhatsApp'; // new import
import {
  RequestForm,
  RequestInput,
  RequestTextarea,
  RequestButton,
  ErrorMessage,
  ContactInfoContainer,
  ContactLabel,
  Divider,
  Title,
  PropertyRefColor,
  RequestBoxContainer, 
  CloseDash,
  RequestButtonWhatsApp 
} from '../../styles/RequestBoxStyles';

const RequestBox = ({ propertyRef }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isFormVisible, setIsFormVisible] = useState(false); // added state for mobile
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const isMobile = useMediaQuery('(max-width:1024px)'); // added media query hook

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = DOMPurify.sanitize(value);
    if (name === 'nombre') setName(sanitizedValue);
    else if (name === 'message') setMessage(sanitizedValue);
    else if (name === 'email') setEmail(sanitizedValue);
    else if (name === 'telephone') setTelephone(sanitizedValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !message || !email || !telephone) {
      setError('Todos los campos son obligatorios.');
      return;
    }
    try { 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contactar-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, message, email, telephone, propertyRef })
      });
      if (response.ok) {
        setSuccess('Mensaje enviado correctamente.');
        setName('');
        setMessage('');
        setEmail('');
        setTelephone('');
        setError('');
      } else {
        setError('Ha ocurrido un error. Inténtalo de nuevo.');
      }
    } catch (error) {
      setError('Ha ocurrido un error. Inténtalo de nuevo.');
    }
  };

  const handleOpen = () => {
    setOpenModal(true);
  };
  const handleClose = () => {
    setOpenModal(false);
  };

  // Handlers for mobile view
  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <>
      {!isMobile ? (
        // Desktop view: modified button to a normal text button with "Contacta"
        <>
          <Button
            variant="contained"
            onClick={handleOpen}
            sx={{
              position: 'fixed',
              top: '180px',
              right: '100px',
              zIndex: 1000,
              padding: '8px 16px',
            }}
          >
            Contacta
          </Button>

          <Dialog open={openModal} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>
              Haznos tu consulta
              <IconButton aria-label="close" onClick={handleClose} style={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <RequestForm onSubmit={handleSubmit}>
                <RequestInput
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre..."
                  value={name}
                  onChange={handleInputChange}
                />
                <RequestInput
                  type="email"
                  name="email"
                  placeholder="Tu email..."
                  value={email}
                  onChange={handleInputChange}
                />
                <RequestInput
                  type="tel"
                  name="telephone"
                  placeholder="Tu teléfono..."
                  value={telephone}
                  onChange={handleInputChange}
                />
                <RequestTextarea
                  name="message"
                  placeholder="Escribe aquí tu mensaje..."
                  value={message}
                  onChange={handleInputChange}
                  rows={4}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <RequestButton type="submit">Enviar</RequestButton>
              </RequestForm>
              <Divider />
              <ContactInfoContainer>
                <div>
                  <ContactLabel>Referencia del anuncio:</ContactLabel> <PropertyRefColor>{propertyRef}</PropertyRefColor>
                </div>
              </ContactInfoContainer>
            </DialogContent>
            {/* ...existing code... */}
          </Dialog>
        </>
      ) : (
        // Mobile view: fixed bottom form
        <RequestBoxContainer>
          {!isFormVisible ? (
            <div style={{ display: 'flex', gap: '10px' }}>
              <RequestButton onClick={handleButtonClick}>
                Contactar por email
              </RequestButton>
              <RequestButtonWhatsApp href="https://wa.me/34629901965" target="_blank">
                <WhatsAppIcon style={{ fontSize: '30px' }} />
              </RequestButtonWhatsApp>
            </div>
          ) : (
            <>
              <CloseDash onClick={handleCloseForm} />
              <Title>HAZNOS TU CONSULTA</Title>
              <RequestForm onSubmit={handleSubmit}>
                <RequestInput
                  type="text"
                  name="nombre"
                  placeholder="Tu nombre..."
                  value={name}
                  onChange={handleInputChange}
                />
                <RequestInput
                  type="email"
                  name="email"
                  placeholder="Tu email..."
                  value={email}
                  onChange={handleInputChange}
                />
                <RequestInput
                  type="tel"
                  name="telephone"
                  placeholder="Tu teléfono..."
                  value={telephone}
                  onChange={handleInputChange}
                />
                <RequestTextarea
                  name="message"
                  placeholder="Escribe aquí tu mensaje..."
                  value={message}
                  onChange={handleInputChange}
                  rows={4}
                />
                {error && <ErrorMessage>{error}</ErrorMessage>}
                <RequestButton type="submit">Enviar</RequestButton>
              </RequestForm>
              <Divider />
              <ContactInfoContainer>
                <div>
                  <ContactLabel>Referencia del anuncio:</ContactLabel> <PropertyRefColor>{propertyRef}</PropertyRefColor>
                </div>
              </ContactInfoContainer>
            </>
          )}
        </RequestBoxContainer>
      )}
    </>
  );
};

export default RequestBox;



