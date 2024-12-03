// src/components/propiedades/PropertyDetailPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { carouselContainer, carouselImage } from '../../styles/PropertyPageStyles';

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      setIsLoading(true);
      try {
        const propertyresponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`);
        if (!propertyresponse.ok) {
          throw new Error('Failed to fetch property');
        }
        const propertyData = await propertyresponse.json();

        const imagesresponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${propertyData.ref}/images`);
        if (!imagesresponse.ok) {
          throw new Error('Failed to fetch images');
        }
        const imagesData = await imagesresponse.json();

        const amenitiesresponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${propertyData.ref}/amenities`);
        if (!amenitiesresponse.ok) {
          throw new Error('Failed to fetch amenities');
        }
        const amenitiesData = await amenitiesresponse.json();

        setProperty(propertyData);
        setImages(imagesData);
        setAmenities(amenitiesData);
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
    <div>
      <h1>{property.title}</h1>
      <p>{property.description}</p>
      <div style={carouselContainer}>
        {images.length > 0 ? (
          images.map((image, index) => (
            <img key={index} src={image.url} alt={`${property.title} ${index + 1}`} style={carouselImage} />
          ))
        ) : (
          <p>No images available</p>
        )}
      </div>
      <h2>Amenities</h2>
      <ul>
        {amenities.length > 0 ? (
          amenities.map((amenity, index) => (
            <li key={index}>{amenity.name}</li>
          ))
        ) : (
          <p>No amenities available</p>
        )}
      </ul>
      {/* Add more details as needed */}
    </div>
  );
};

export default PropertyPage;