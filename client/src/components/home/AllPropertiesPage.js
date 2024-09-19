// src/pages/AllPropertiesPage.js

import React from 'react';
import { 
  PropertiesContainer, 
  PropertyCard, 
  PropertyImage, 
  PropertyInfo, 
  PropertyTitle, 
  PropertyDescription,
  PropertyPrice,
  PropertyButton
} from '../styles/AllPropertiesPageStyles';

const allProperties = [
  // Include all properties here
];

const AllPropertiesPage = () => {
  return (
    <PropertiesContainer>
      {allProperties.map((property) => (
        <PropertyCard key={property.id}>
          <PropertyImage src={property.image} alt={property.title} />
          <PropertyInfo>
          <PropertyTitle>{property.title}</PropertyTitle>
            <PropertyDescription>{property.description}</PropertyDescription>
            <PropertyPrice>{property.price}</PropertyPrice>
            <PropertyButton>View Details</PropertyButton>
          </PropertyInfo>
        </PropertyCard>
      ))}
    </PropertiesContainer>
  );
};

export default AllPropertiesPage;
