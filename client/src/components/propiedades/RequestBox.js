import React, { useState, useEffect } from 'react';
import DOMPurify from 'dompurify';
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
  CloseDash,
  Title,
  PropertyRefColor
} from '../../styles/RequestBoxStyles';

const RequestBox = ({ propertyRef }) => {
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [telephone, setTelephone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [name, setName] = useState(''); // added state for Nombre

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
    const sanitizedValue = DOMPurify.sanitize(value);
    if (name === 'nombre') setName(sanitizedValue); 
    if (name === 'message') setMessage(sanitizedValue);
    if (name === 'email') setEmail(sanitizedValue);
    if (name === 'telephone') setTelephone(sanitizedValue);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!name || !message || !email || !telephone) { // validate nombre
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Add debugging logs
    console.log('Sending request data:', { name, message, email, telephone, propertyRef });

    try { 
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/contactar-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, message, email, telephone, propertyRef }) // include nombre
      });

      if(response.ok) {
        setSuccess('Mensaje enviado correctamente.');
        setName(''); // clear nombre
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
  );
};

export default RequestBox;



