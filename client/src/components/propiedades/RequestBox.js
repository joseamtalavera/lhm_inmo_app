import React, { useState } from 'react';
import {
  RequestBoxContainer,
  RequestTextarea,
  RequestButton,
  ContactInfoContainer,
  ContactLabel,
  ContactLink,
  Divider,
  RequestForm,
  ErrorMessage
} from '../../styles/RequestBoxStyles';

const RequestBox = ({ onSubmitRequest }) => {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');


  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitRequest(message);
  };

  return (
    <RequestBoxContainer>
      <h3>Haznos tu consulta</h3>
      <RequestForm onSubmit={handleSubmit}>
        <RequestTextarea
          placeholder="Escribe aquí tu mensaje..."
          value={message}
          onChange={handleInputChange}
          rows={4}
        />
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <RequestButton type="submit">Contactar por email</RequestButton>
      </RequestForm>
      <Divider />
      <ContactInfoContainer>
        <div>
          <ContactLabel>Teléfono:</ContactLabel>
          <ContactLink href="tel:+34912345678">+34 912345678</ContactLink>
        </div>
        <div>
          <ContactLabel>Referencia del anuncio:</ContactLabel> PIS0549
        </div>
        <div>
          <ContactLabel>Profesional:</ContactLabel> Norando Homes
        </div>
      </ContactInfoContainer>
      <Divider />
      <ContactInfoContainer>
        <ContactLabel>Email:</ContactLabel>
        <ContactLink href="mailto:info@example.com">info@example.com</ContactLink>
      </ContactInfoContainer>
    </RequestBoxContainer>
  );
};

export default RequestBox;
