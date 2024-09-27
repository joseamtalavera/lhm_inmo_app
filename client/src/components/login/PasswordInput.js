// PasswordInput.js
import React from 'react';
import { IconButton } from '@mui/material';
import { StyledPasswordTextField } from '../../styles/PasswordInputStyles';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const PasswordInput = ({ password, showPassword, setPassword, handleMouseDownPassword, setShowPassword, autoComplete, label, placeholder, required, handlePasswordChange, ...props }) => {
const toggleShowPassword = () => setShowPassword(!showPassword);

    return (
        <StyledPasswordTextField
            variant="outlined"
            fullWidth
            name="password"
            type={showPassword ? 'text' : 'password'}
            id="password"
            label={label}
            autoComplete={autoComplete}
            value={password}
            onChange={handlePasswordChange}
            placeholder={placeholder}
            InputProps={{
                style: { color: '#808080' },
                endAdornment: (
                    <IconButton style={{ color: '#808080' }} onClick={toggleShowPassword} onMouseDown={handleMouseDownPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                ),
            }}
            {...props}
        />
    );
};

export default PasswordInput;