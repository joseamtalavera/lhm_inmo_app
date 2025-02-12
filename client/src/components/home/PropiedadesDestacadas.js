import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  LoadingContainer, 
  PropertyRef
} from '../../styles/PropiedadesDestacadasStyles';
import BedIcon from '@mui/icons-material/Bed';
import BathIcon from '@mui/icons-material/Bathtub';
import WcIcon from '@mui/icons-material/Wc';
import SquareFootIcon from '@mui/icons-material/SquareFoot';
import CircularProgress from '@mui/material/CircularProgress'; 

const PropiedadesDestacadas = () => {
  const [properties, setProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
    return <LoadingContainer><CircularProgress /></LoadingContainer>;
  }

  const featuredProperties = properties.filter(property => property.destacada === "1");

  const handleCardClick = (id) => {
    console.log(`Navigating to property with id: ${id}`);
    navigate(`/viviendas/${id}`);
  };

  return (
    <FeaturedPropertiesContainer>
      {featuredProperties.map((property) => (
        <PropertyCard key={property.id} onClick={() => handleCardClick(property.id)}>
          <PropertyImage src={property.url} alt={property.title} />
          <PropertyInfo>
            <PropertyTitle>{property.title}</PropertyTitle>
            <PropertyRef>{property.ref}</PropertyRef>
            <PropertyRow>
              <PropertyLocation>{property.localidad}</PropertyLocation>
              <PropertyPrice>{property.precio} €</PropertyPrice>
            </PropertyRow>
            <PropertyDetails>
              <PropertyDetailItem>
                <BedIcon />
                <span>{property.nestancias} habitaciones</span>
              </PropertyDetailItem>
              <PropertyDetailItem>
                <SquareFootIcon />
                <span>{property.metrosconstruidos} m²</span>
              </PropertyDetailItem>
            </PropertyDetails>
            <PropertyDetails>
              <PropertyDetailItem>
                <BathIcon />
                <span>{property.nbanos} baños</span>
              </PropertyDetailItem>
              <PropertyDetailItem>
                <WcIcon />
                <span>{property.naseos} aseos</span>
              </PropertyDetailItem>
            </PropertyDetails>
          </PropertyInfo>
        </PropertyCard>
      ))}
    </FeaturedPropertiesContainer>
  );
};

export default PropiedadesDestacadas;

