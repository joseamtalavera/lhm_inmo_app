// src/styles/AllPropertiesPageStyles.js

import styled from "styled-components";


export const PropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2em auto;
  max-width: 1200px;
`;

export const PropertyCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  margin: 1em;
  width: 280px;
  border-radius: 8px;
  overflow: hidden;
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
`;

export const PropertyImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const PropertyInfo = styled.div`
  padding: 1em;
`;

export const PropertyTitle = styled.h3`
  margin: 0 0 0.5em 0;
  font-size: 1.2em;
`;

export const PropertyDescription = styled.p`
  font-size: 0.9em;
  color: #666;
`;

export const PropertyPrice = styled.p`
  font-size: 1em;
  color: #333;
  font-weight: bold;
  margin-top: 0.5em;
`;

export const PropertyButton = styled.button`
  background-color: #007BFF;
  color: #fff;
  padding: 0.75em 1em;
  border: none;
  border-radius: 4px;
  margin-top: 1em;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
