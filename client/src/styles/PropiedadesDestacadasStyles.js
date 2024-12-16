// src/styles/PropiedadesDestacadasStyles.js

import styled from 'styled-components';

export const FeaturedPropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const PropertyCard = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

export const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const PropertyInfo = styled.div`
  padding: 16px;
`;

export const PropertyTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.2em;
`;

export const PropertyLocation = styled.p`
  margin: 0 0 8px;
  color: #757575;
`;

export const PropertyPrice = styled.p`
  margin: 0 0 16px;
  font-size: 1.2em;
  font-weight: bold;
  color: #424242;
`;

export const PropertyDetails = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const PropertyDetailItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9em;
  color: #1E90FF;

  svg {
    margin-right: 4px;
  }
`;
export const PropertyRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

