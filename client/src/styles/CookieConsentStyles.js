import styled from 'styled-components';
import { Typography } from '@mui/material';

export const ConsentWrapper = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  border: 1px solid #ccc;
  padding: 20px;
  z-index: 2000;
  box-shadow: 0 2px 8px rgba(0,0,0,0.2);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  transition: opacity 0.3s ease-in-out;
  @media (max-width: 780px) {
    width: 90%;
  }
`;

export const Message = styled(Typography)`
  margin-right: 20px;
  margin-bottom: 10px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
`;
