// src/components/PropiedadesDestacadas.js

import React, { useEffect, useState } from 'react';
import { 
  FeaturedPropertiesContainer, 
  PropertyCard, 
  PropertyImage, 
  PropertyInfo, 
  PropertyTitle, 
  PropertyDetails,
  PropertyDetailItem,
  PropertyPrice,
  PropertyLocation,
  PropertyRow,
} from '../../styles/PropiedadesDestacadasStyles';
import BedIcon from '@mui/icons-material/Bed';
import BathIcon from '@mui/icons-material/Bathtub';
import WcIcon from '@mui/icons-material/Wc';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

const PropiedadesDestacadas = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      setIsLoading(true);
      try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });
          if (!response.ok) {
              throw new Error('Failed to fetch properties');
          }
          const data = await response.json();
          setProperties(data);
      } catch (error) {
          console.error('Error:', error);
      } finally {
          setIsLoading(false);
      }
  };

    fetchProperties();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const featuredProperties = properties.filter(property => {
    return property.destacada === "Si";
  });
  console.log('Featured Properties:', featuredProperties);

  return (
    <FeaturedPropertiesContainer>
      {featuredProperties.map((property) => (
        <PropertyCard key={property.id}>
          <PropertyImage src={property.foto} alt={property.title} />
          <PropertyInfo>
            <PropertyTitle>{property.title}</PropertyTitle>
            <PropertyRow>
              <PropertyLocation>{property.localidad}</PropertyLocation>
              <PropertyPrice>{property.precio} €</PropertyPrice>
            </PropertyRow>
            <PropertyDetails>
              <PropertyDetailItem>
                <BedIcon />
                <span>{property.habitaciones} habitaciones</span>
              </PropertyDetailItem>
              <PropertyDetailItem>
                <SquareFootIcon />
                <span>{property.metrosconstruidos} m²</span>
              </PropertyDetailItem>
            </PropertyDetails>
            <PropertyDetails>
              <PropertyDetailItem>
                <BathIcon />
                <span>{property.banos} baños</span>
              </PropertyDetailItem>
              <PropertyDetailItem>
                <WcIcon />
                <span>{property.aseos} aseos</span>
              </PropertyDetailItem>
            </PropertyDetails>
          </PropertyInfo>
        </PropertyCard>
      ))}
    </FeaturedPropertiesContainer>
  );
};

export default PropiedadesDestacadas;