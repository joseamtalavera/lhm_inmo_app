import styled from 'styled-components';
import Divider from '@mui/material/Divider';

// Layout Containers
export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures it takes up the entire viewport height */
  padding: 0;
  margin: 0;
  overflow-x: hidden; /* Prevents horizontal scrolling */
`;

export const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure the drawer is on top of other content */
  background-color: white;
  margin-bottom: 50px;
  padding: 10px;

   @media (max-width: 780px) {
        position: relative;
        margin-bottom: 20px;
    }
`;

export const ContentWrapper = styled.div`
  flex: 1; /* Ensures it grows and fills available space */
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 50px; /* Adjust margin-top to align with the drawer */
  background-color: #f9f9f9;
  width: 100%;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 10px; /* Adjust the value as needed */
  }
`;

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 0px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    margin-top: 10px; /* Adjust the value as needed */
  }
`;

export const ContentWrapperBelowImage = styled.div`
  width: 100%;
  padding: 0px;
  box-sizing: border-box;
  text-align: left;
  margin-top: 0px;
`;

// Styled Carousel Container
export const StyledCarouselContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

// Styled Arrow
export const StyledArrow = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  padding: 10px;
  border-radius: 50%;
  cursor: pointer;
`;

// Carousel Styles

export const CarouselRequestContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
  margin-right: 20px;
  gap: 15px;
`;

// Styled Full Screen Container
export const StyledFullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

// Styled Request Box Container
export const RequestBoxContainer = styled.div`
  flex: 1;
  max-width: 300px;
`;


// Typography
export const StyledTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 300; /* Thinner font weight */
  margin-bottom: 10px;
`;

export const StyledSubtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-top: 20px;
  margin-bottom: 10px;
`;

// Property Details
export const PropertyDetailsRow = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const PropertyDetailLocalidad = styled.div`
  margin: 0 0 8px;
  color: #1E90FF;
  font-size: 1.2em;
`;

export const PropertyDetailPrecio = styled.div`
  font-size: 2em;
  color: #333;
  font-weight: bold;
  margin-top: 0.5em;
`;

// Amenities
export const AmenitiesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, max-content auto); /* Two ticks + Two labels */
  column-gap: 30px; /* Space between columns */
  row-gap: 10px; /* Space between rows */
  align-items: center; /* Aligns content vertically */
  width: 100%;
  max-width: 100%; /* Ensures the container doesn't exceed the viewport */
  overflow-x: hidden;
  margin-bottom: 20px;
`;

export const Tick = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px; /* Fixed width for consistent alignment */
`;

export const AmenityLabel = styled.div`
  font-size: 1rem;
  color: #666;
`;

export const AmenitySection = styled.div`
  margin-bottom: 20px;
`;

export const AmenityTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 300;
  margin-bottom: 10px;
`;

// Collapsible Sections
export const CollapsibleHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;

export const PlusMinus = styled.span`
  color: #1E90FF;
  font-weight: bold;
`;

// Property Information
export const PropertyInfoContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 20px;
  color: #666;
  font-size: 1rem;
  margin-bottom: 20px;
`;

export const PropertyInfoItem = styled.div`
  flex: 1 1 200px;

  strong {
    font-weight: bold;
    color: #666;
  }
`;

// Divider
export const BlueDivider = styled(Divider)`
  border-color: #1E90FF !important;
`;
