import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { PropertyCard, PropertyImage, PropertyInfo, PropertyTitle, PropertyDescription, PropertyPrice } from '../../styles/AllPropertiesPageStyles';

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch property details');
        }
        const data = await response.json();
        setProperty(data);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <PropertyCard>
      <PropertyImage src={property.image} alt={property.title} />
      <PropertyInfo>
        <PropertyTitle>{property.title}</PropertyTitle>
        <PropertyDescription>{property.description}</PropertyDescription>
        <PropertyPrice>{property.price}</PropertyPrice>
        {/* Add more details as needed */}
      </PropertyInfo>
    </PropertyCard>
  );
};

export default PropertyDetails;
