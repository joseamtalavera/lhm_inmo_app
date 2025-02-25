

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
  margin: 10px auto;
  width: 100%;
  max-width: 1100px; /* Increased from 600px to 800px */
  border-radius: 8px;
  overflow: hidden;
  display: flex; /* Use Flexbox for layout */
  transition: box-shadow 0.3s ease;
  margin-top: 18px;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1024px) {
    flex-direction: column;
  }
`;

export const PropertyImage = styled.img`
  width: 70%;
  height: auto;
  object-fit: cover;
  max-width: 500px;

  @media (max-width: 1024px) {
    width: 100%;
    height: auto;
  }
`;

export const PropertyInfo = styled.div`
  width: 70%; /* Increased from 60% to 70% */
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const PropertyTitle = styled.h3`
  margin: 0 0 8px;
  font-size: 20px;
  color: black;
  font-weight: 300;
  margin-bottom: 20px;
`;

export const PropertyLocation = styled.p`
  margin: 0 0 8px;
  color: #1E90FF;
  font-size: 1.2em;
`;

export const PropertyRef = styled.p`
  margin: 0 0 8px;
  color: #1E90FF;
  font-size: 1.2em;
`;

export const PropertyPrice = styled.p`
  font-size: 2em;
  color: #333;
  font-weight: 250;
  margin-top: 0.5em;
  text-align: right;

  @media (max-width: 1024px) {
    text-align: right;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #1E90FF;
  margin: 1em 0;
`;

export const PropertyDetails = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2 items per row */
  gap: 8px 40px; /* Row and column gap */
  margin-bottom: 16px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
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

export const PropertyDescription = styled.p`
  font-size: 0.9em;
  color: #666;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
`;








