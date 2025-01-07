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
  height: '500px', // Adjusted height to make the image smaller
  position: 'relative',
  overflow: 'hidden',
  marginBottom: '2rem',

  '& img': {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // Adjusted to ensure the image is not cut off
  },

  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: '#1E90FF',
    opacity: 0.3, // Adjust the opacity to achieve the desired light filter effect
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
  textAlign: 'left',
});

export const ZigzagContainer = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: left,
  justify-content: space-between;
  padding: 16px 0;

  img {
    width: 80%; 
    max-width: 300px;
    height: auto;
  }
    @media (max-width: 600px) {
    flex-direction: column;
  }
`;

export const ZigzagItem = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;

  img {
    width: 80%; // Adjust the percentage as needed
    max-width: 300px; // Add a maximum width to maintain consistent sizing
    height: auto; // Maintain aspect ratio
  }
`;

export const RoundImage = styled('img')({
  borderRadius: '50%',
});

