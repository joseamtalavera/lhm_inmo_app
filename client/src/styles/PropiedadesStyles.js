// StyledComponents.js

import styled from 'styled-components';
import { Button, Box, Modal } from '@mui/material';

export const StyledButton = styled(Button)`
  margin-bottom: 1rem;
  margin-right: 0rem;
`;

export const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  width: 100%;
  margin-top: 55px;
`;

export const InnerBox = styled(Box)`
  max-width: lg;
  margin: auto;
  box-shadow: 0;
  height: 50px;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledModal = styled(Modal)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContent = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 100%;
  background-color: #e5e5e5;
  border: 0px solid #000;
  border-radius: 15px;
  box-shadow: 24;
  padding: 1rem;
  max-height: 80%;
  overflow-y: auto;
`;