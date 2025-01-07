import styled from 'styled-components';
import { Typography, Card, CardContent } from '@mui/material';

export const Section = styled('div')({
  marginBottom: '2rem',
});

export const SectionTitle = styled(Typography)({
  fontWeight: 'bold',
  marginBottom: '1rem',
});

export const SectionContent = styled(Typography)({
  marginBottom: '1rem',
  '@media (max-width: 600px)': {
    fontSize: '0.875rem', 
    },
});

export const ImageContainer = styled('div')({
  width: '100%',
  height: '300px', // Adjusted height to make the image smaller
  position: 'relative',
  overflow: 'hidden',
  marginBottom: '2rem',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'contain', // Adjusted to ensure the image is not cut off
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'tranasparent',
    opacity: 0.6, // Adjust the opacity to achieve the desired light filter effect
    pointerEvents: 'none', // Ensure the overlay does not interfere with interactions
  },
});

export const OverlayText = styled(Typography)({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
    zIndex: 1,
  });

export const StyledCard = styled(Card)({
  borderColor: '#1E90FF',
  paddingLeft: '16px',
});

export const StyledCardContent = styled(CardContent)({
  color: '#1E90FF',
  fontSize: '2rem',
  paddingLeft: '0px',
});
