// src/styles/PropiedadesDestacadasStyles.js

import styled from 'styled-components';

export const FeaturedPropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

export const PropertyCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  margin: 1em;
  width: 100%;
  max-width: 1100px;
  border-radius: 8px;
  overflow: hidden;
  display: flex; /* Use Flexbox for layout */
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const PropertyImage = styled.img`
  width: 40%;
  height: 180%;
  object-fit: cover;
`;

export const PropertyInfo = styled.div`
  width: 60%;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const PropertyTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 1.2em;
`;

export const PropertyLocation = styled.p`
  margin: 0 0 8px;
  color: #1E90FF;
  font-size: 1.2em;
`;

export const PropertyPrice = styled.p`
  font-size: 2em;
  color: #333;
  font-weight: bold;
  margin-top: 0.5em;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #1E90FF;
  margin: 1em 0;
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

export const PropertyDescription = styled.p`
  font-size: 0.9em;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
`;