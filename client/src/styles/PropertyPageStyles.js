
import styled from 'styled-components';

export const carouselContainer = {
  position: 'relative',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto',
};

export const carouselImage = {
  width: '100%',
  height: 'auto',
  objectFit: 'cover',
  borderRadius: '8px',
};

export const badgeStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: '10px',
  borderRadius: '50%',
  cursor: 'pointer',
};

export const fullScreenContainer = {
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: '1000',
};

export const arrowStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  padding: '10px',
  borderRadius: '50%',
  cursor: 'pointer',
};

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures it takes up the entire viewport height */
  padding: 0;
  margin: 0;
`;

export const DrawerContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000; /* Ensure the drawer is on top of other content */
  background-color: white;
  margin-bottom: 50px;
`;

export const ContentWrapper = styled.div`
  flex: 1; /* Ensures it grows and fills available space */
  display: flex;
  justify-content: center;
  padding: 20px;
  margin-top: 50px; /* Adjust margin-top to align with the drawer */
  background-color: #f9f9f9;
  
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
`;

export const ContentWrapperBelowImage = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  text-align: left;
`;

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