import styled from 'styled-components';
import { Typography, Card, CardContent, Button } from '@mui/material'; // Import Button

export const Section = styled.div`
  margin-bottom: 2rem;
`;

export const SectionTitle = styled(Typography)`
  font-weight: bold;
  margin-bottom: 1rem;
`;

export const SectionContent = styled(Typography)`
  margin-bottom: 1rem;
  @media (max-width: 600px) {
    font-size: 0.875rem;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;

  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #1E90FF;
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const OverlayText = styled(Typography)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  z-index: 1;
`;

export const StyledCard = styled(Card)`
  border-color: #1E90FF;
  padding-left: 16px;
`;

export const StyledCardContent = styled(CardContent)`
  color: #1E90FF;
  font-size: 2rem;
  padding-left: 0px;
  text-align: left;
`;

export const ZigzagContainer = styled.div`
  display: flex;
  flex-direction: ${({ reverse }) => (reverse ? 'row-reverse' : 'row')};
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
  margin: 60px;
 
   

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
  align-items: center; // Changed from 'left' to 'center'

  img {
    width: 80%;
    max-width: 300px;
    height: auto;
  }
`;

export const ZigzagItemTitle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left; // Changed from 'left' to 'center'

  img {
    width: 80%;
    max-width: 300px;
    height: auto;
  }
`;

export const RoundImage = styled.img`
  border-radius: 50%;
`;

export const StyledButton = styled(Button)`
  padding: 4px 16px;
  font-size: 1rem;
  border-color: #1E90FF !important; // Ensure border color is applied

  &:hover {
    background-color: rgba(30, 144, 255, 0.1) !important; // Ensure hover background color is applied
    border-color: #1E90FF !important; // Ensure hover border color is applied
  }
`;

