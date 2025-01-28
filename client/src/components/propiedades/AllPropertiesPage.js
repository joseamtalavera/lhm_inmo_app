// AllPropertiesPage.js

import React, { useState, useEffect } from 'react';
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
  PropertiesContainer,
  MainContainer
} from '../../styles/AllPropertiesPageStyles';
import TablePagination from '@mui/material/TablePagination';
import { CircularProgress, Box } from '@mui/material';

const AllPropertiesPage = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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

      const normalizeText = (text) => 
        text ? text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : '';

      const matchLocation = !filters.location || 
        normalizeText(property.localidad).includes(normalizeText(filters.location));
      
      console.log('Property:', property);
      console.log('Filters:', filters);
  
      return (
        matchLocation && 
        (!filters.propertyType || property.tipopropiedad === filters.propertyType) &&
        (!filters.minPrice || property.precio >= filters.minPrice) &&
        (!filters.maxPrice || property.precio <= filters.maxPrice) &&
        (!filters.minSize || property.metrosconstruidos >= filters.minSize) &&
        (!filters.maxSize || property.metrosconstruidos <= filters.maxSize) &&
        (!filters.bedrooms || property.nestancias == filters.bedrooms) && 
        (!filters.bathrooms || property.nbanos == filters.bathrooms) &&
        (!filters.aseos || property.naseos == filters.aseos) // Corrected this line
      );
    });

    console.log('Filtered properties:', filtered);
  
    setFilteredProperties(filtered);
    setPage(0);
  };
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedProperties = filteredProperties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
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
          <MainContainer>
            <FiltersContainer>
              <Filters onFilterChange={handleFilterChange} />
            </FiltersContainer>
            <PropertiesContainer>
              <PropertyList properties={paginatedProperties} />
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <TablePagination
                  rowsPerPageOptions={[10, 25, 50]}
                  component="div"
                  count={filteredProperties.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </Box>
            </PropertiesContainer>
          </MainContainer>
        </ContentWrapper>

        {/* Footer */}
        <Footer />
      </AppContainer>
    </>
  );
};

export default AllPropertiesPage;




