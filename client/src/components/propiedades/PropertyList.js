// PropertyList.js

import React from 'react';
import { 
  PropertyCard, 
  PropertyImage, 
  PropertyInfo, 
  PropertyTitle,
  PropertyDetails,
  PropertyDetailItem,
  PropertyPrice,
  PropertyLocation,
  PropertyRow,
  PropertyDescription
} from '../../styles/PropertyListStyles';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import WcIcon from '@mui/icons-material/Wc';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

const PropertyList = ({ properties }) => {
  return (
    <div>
      {properties.map((property) => (
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
                <span>{property.habitaciones}</span>
              </PropertyDetailItem>
              <PropertyDetailItem>
                <SquareFootIcon />
                <span>{property.metrosconstruidos} m²</span>
              </PropertyDetailItem>
            </PropertyDetails>
            <PropertyDetails>
              <PropertyDetailItem>
                <BathtubIcon />
                <span>{property.banos}</span>
              </PropertyDetailItem>
              <PropertyDetailItem>
                <WcIcon />
                <span>{property.aseos}</span>
              </PropertyDetailItem>
            </PropertyDetails>
            <PropertyDescription>{property.description}</PropertyDescription>
          </PropertyInfo>
        </PropertyCard>
      ))}
    </div>
  );
};

export default PropertyList;