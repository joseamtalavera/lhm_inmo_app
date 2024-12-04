// src/components/propiedades/PropertyPage.js

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from './Carousel';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from '../Menu/ResponsiveDrawer';
import Footer from '../home/Footer';
import { 
  carouselContainer, 
  fullScreenContainer, 
  arrowStyle,
  AppContainer,
  DrawerContainer,
  ContentWrapper,
  MainContainer,
  ContentWrapperBelowImage,
  StyledTitle,
  StyledSubtitle,
  PropertyDetailsRow,
  PropertyDetailLocalidad,
  PropertyDetailPrecio
} from '../../styles/PropertyPageStyles';
import { Divider } from '@mui/material';

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [images, setImages] = useState([]);
  const [amenities, setAmenities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);

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

  const handleFullScreenToggle = () => {
    setIsFullScreen(!isFullScreen);
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <DrawerContainer>
          <ResponsiveDrawer />
        </DrawerContainer>

        <ContentWrapper>
          <MainContainer>
         
            <div style={carouselContainer}>
              <Carousel images={images} />
              <div  onClick={handleFullScreenToggle}>
                
              </div>
            </div>
            {isFullScreen && (
              <div style={fullScreenContainer}>
                <Carousel images={images} />
                <div style={arrowStyle} onClick={handleFullScreenToggle}>
                 
                </div>
              </div>
            )}
            <ContentWrapperBelowImage>
              <StyledTitle>{property.title}</StyledTitle>
              <PropertyDetailsRow>
                <PropertyDetailLocalidad>{property.localidad}</PropertyDetailLocalidad>
                <PropertyDetailPrecio>{property.precio} €</PropertyDetailPrecio>
              </PropertyDetailsRow>
              <Divider />
              <StyledSubtitle>Descripción</StyledSubtitle>
              <p>{property.description}</p>
              <Divider />
              <StyledSubtitle>Características Básicas</StyledSubtitle>
              <ul>
                {amenities.length > 0 ? (
                  amenities.map((amenity, index) => (
                    <li key={index}>{amenity.name}</li>
                  ))
                ) : (
                  <p>No amenities available</p>
                )}
              </ul>
            </ContentWrapperBelowImage>
          </MainContainer>
        </ContentWrapper>

        <Footer />
      </AppContainer>
    </>
  );
};

export default PropertyPage;