// src/components/PropiedadesDestacadas.js

import React from 'react';
import { 
  FeaturedPropertiesContainer, 
  PropertyCard, 
  PropertyImage, 
  PropertyInfo, 
  PropertyTitle 
} from '../../styles/PropiedadesDestacadasStyles';

const featuredProperties = [
  {
    id: 1,
    title: 'Casa en la playa',
    image: '/1.jpg',
    description: 'Hermosa casa frente al mar con 3 habitaciones.',
  },
  {
    id: 2,
    title: 'Apartamento céntrico',
    image: '/2.jpg',
    description: 'Moderno apartamento en el corazón de la ciudad.',
  },
  {
    id: 3,
    title: 'Chalet en las montañas',
    image: '/3.jpg',
    description: 'Escápate a este tranquilo chalet en las montañas.',
  },
];

const PropiedadesDestacadas = () => {
  return (
    <FeaturedPropertiesContainer>
      {featuredProperties.map((property) => (
        <PropertyCard key={property.id}>
          <PropertyImage src={property.image} alt={property.title} />
          <PropertyInfo>
            <PropertyTitle>{property.title}</PropertyTitle>
            <p>{property.description}</p>
          </PropertyInfo>
        </PropertyCard>
      ))}
    </FeaturedPropertiesContainer>
  );
};

export default PropiedadesDestacadas;
