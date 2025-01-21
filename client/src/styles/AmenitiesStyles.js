import styled from 'styled-components';
import Box from '@mui/material/Box';

export const InteriorConditioningMobile = styled(Box)`
  width: 100%;
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  @media (min-width: 600px) {
    display: none;
  }
`;

export const InteriorConditioningDesktop = styled(Box)`
  width: 100%;
  margin-bottom: 16px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  @media (max-width: 600px) {
    display: none;
  }
`;
