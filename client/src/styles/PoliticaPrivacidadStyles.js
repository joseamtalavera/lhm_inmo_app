import styled from 'styled-components';
import { Typography } from '@mui/material';

export const Section = styled('div')({
  marginBottom: '2rem',
});

export const SectionTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '1rem',
  marginTop: '48px',
  color: '#1E90FF',
});

export const SectionContent = styled(Typography)({
  marginBottom: '1rem',
  fontSize: '1.2rem',
});
