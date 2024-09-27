// src/styles/EmailInputStyles.js
import styled from 'styled-components';
import { TextField } from '@mui/material';

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: #1e90ff;
  }
  &:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline {
    border-color: #1e90ff;
  }
  & .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #1e90ff;
  }
  & .MuiInputLabel-outlined.Mui-focused {
    color: #808080;
  }
    & .MuiOutlinedInput-input {
        color: #808080;
    }
    margin-bottom: 20px;
`;