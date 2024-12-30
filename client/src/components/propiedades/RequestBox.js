import React, { useState, useEffect } from 'react';
import {
  RequestBoxContainer,
  RequestTextarea,
  RequestButton,
  ContactInfoContainer,
  ContactLabel,
  Divider,
  RequestForm,
  ErrorMessage,
  RequestInput,
  CloseDash
} from '../../styles/RequestBoxStyles';

const RequestBox = ({ propertyRef }) => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1020) {
        setIsFormVisible(false);
      } else {
        setIsFormVisible(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'message') setMessage(value);
    if (name === 'email') setEmail(value);
    if (name === 'telephone') setTelephone(value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!message || !email || !telephone) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Add debugging logs
    console.log('Sending request data:', { message, email, telephone, propertyRef });

    try { 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contactar-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message, email, telephone, propertyRef })
      });

      if(response.ok) {
        setSuccess('Mensaje enviado correctamente.');
        setMessage('');
        setEmail('');
        setTelephone('');
        setError('');
      }else {
        setError('Ha ocurrido un error. Inténtalo de nuevo.');
      }

    } catch (error) {
      setError('Ha ocurrido un error. Inténtalo de nuevo.');
    }
  };

  const handleButtonClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };

  return (
    <RequestBoxContainer>
      {!isFormVisible ? (
        <RequestButton onClick={handleButtonClick}>Contactar por email</RequestButton>
      ) : (
        <>
          <CloseDash onClick={handleCloseForm}></CloseDash>
          <h3>Haznos tu consulta</h3>
          <RequestForm onSubmit={handleSubmit}>
            <RequestTextarea
              name="message"
              placeholder="Escribe aquí tu mensaje..."
              value={message}
              onChange={handleInputChange}
              rows={4}
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
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <RequestButton type="submit">Enviar</RequestButton>
          </RequestForm>
          <Divider />
          <ContactInfoContainer>
            <div>
              <ContactLabel>Referencia del anuncio:</ContactLabel> {propertyRef}
            </div>
          </ContactInfoContainer>
        </>
      )}
    </RequestBoxContainer>
  );
};

export default RequestBox;



