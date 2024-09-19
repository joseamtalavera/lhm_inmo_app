// src/styles/PropiedadesDestacadasStyles.js

import styled from "styled-components";


export const FeaturedPropertiesContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 2em 0;
`;

export const PropertyCard = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  margin: 1em;
  width: 300px;
  border-radius: 8px;
  overflow: hidden;
`;

export const PropertyImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const PropertyInfo = styled.div`
  padding: 1em;
`;

export const PropertyTitle = styled.h3`
  margin: 0 0 0.5em 0;
`;
