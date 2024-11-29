// AllPropertiesPage.js

import React, {useState, useEffect} from 'react';
import { GlobalStyle } from '../../styles/GlobalStyles';
import ResponsiveDrawer from '../Menu/ResponsiveDrawer';
import Footer from '../home/Footer';
import Filters from './Filters';
import PropertyList from './PropertyList';
import { 
  AppContainer, 
  DrawerContainer, 
  ContentWrapper,
  FiltersContainer,
  PropertiesContainer
} from '../../styles/AllPropertiesPageStyles';

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch properties from backend API or static data
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
          setFilteredProperties(data);
      } catch (error) {
          console.error('Error:', error);
      } finally {
          setIsLoading(false);
      }
  };

    fetchProperties();
  }, []);

  const handleFilterChange = (filters) => {
    const filtered = properties.filter((property) => {
      return (
        (!filters.propertyType || property.type === filters.propertyType) &&
        (!filters.minPrice || property.price >= filters.minPrice) &&
        (!filters.maxPrice || property.price <= filters.maxPrice) &&
        (!filters.minSize || property.size >= filters.minSize) &&
        (!filters.maxSize || property.size <= filters.maxSize) &&
        (!filters.bedrooms || property.bedrooms === Number(filters.bedrooms)) &&
        (!filters.bathrooms || property.bathrooms === Number(filters.bathrooms))
      );
    });
    setFilteredProperties(filtered);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        {/* Drawer container that handles menu */}
        <DrawerContainer>
          <ResponsiveDrawer />
        </DrawerContainer>

        {/* Main content area */}
        <ContentWrapper>
          <FiltersContainer>
            <Filters onFilterChange={handleFilterChange} />
          </FiltersContainer>
          <PropertiesContainer>
            <PropertyList properties={filteredProperties} />
          </PropertiesContainer>
        </ContentWrapper>

        {/* Footer */}
        <Footer />
      </AppContainer>
    </>
  );
};

export default AllPropertiesPage;