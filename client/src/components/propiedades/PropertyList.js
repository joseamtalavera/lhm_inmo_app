// PropertyList.js

import React from 'react';
import { Link } from 'react-router-dom';
import { 
  PropertyCard, 
  PropertyImage, 
  PropertyInfo, 
  PropertyTitle,
  PropertyDetails,
  PropertyDetailItem,
  PropertyPrice,
  PropertyLocation,
  PropertyDescription,
  Divider
} from '../../styles/PropertyListStyles';
import BedIcon from '@mui/icons-material/Bed';
import BathtubIcon from '@mui/icons-material/Bathtub';
import WcIcon from '@mui/icons-material/Wc';
import SquareFootIcon from '@mui/icons-material/SquareFoot';

const PropertyList = ({ properties }) => {
  return (
    <div>
      {properties.map((property) => (
        <Link to={`/viviendas/${property.id}`} key={property.id} style={{ textDecoration: 'none', color: 'inherit' }}>
        <PropertyCard key={property.id}>
          <PropertyImage src={property.foto} alt={property.title} />
          <PropertyInfo>
            <PropertyTitle>{property.title}</PropertyTitle>
            <PropertyDescription>{property.description}</PropertyDescription>
            <PropertyLocation>{property.localidad}</PropertyLocation>
            <PropertyPrice>{property.precio} €</PropertyPrice>
            <Divider />
            <PropertyDetails>
              <PropertyDetailItem>
                <BedIcon />
                <span>{property.habitaciones} habitaciones</span>
              </PropertyDetailItem>
              <PropertyDetailItem>
                <SquareFootIcon />
                <span>{property.metrosconstruidos} m²</span>
              </PropertyDetailItem>
              <PropertyDetailItem>
                <BathtubIcon />
                <span>{property.banos} baños</span>
              </PropertyDetailItem>
              <PropertyDetailItem>
                <WcIcon />
                <span>{property.aseos} aseos</span>
              </PropertyDetailItem>
            </PropertyDetails>
          </PropertyInfo>
        </PropertyCard>
        </Link>
      ))}
    </div>
  );
};

export default PropertyList;