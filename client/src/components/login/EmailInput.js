import React from 'react';
import { StyledTextField } from '../../styles/EmailInputStyles';

const EmailInput = ({ email, handleEmailChange }) => {
    return (
        <StyledTextField
            variant="outlined"
            fullWidth
            id="email"
            label="Email address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={handleEmailChange}
            placeholder='Email address'
        />
    );
};

export default EmailInput;