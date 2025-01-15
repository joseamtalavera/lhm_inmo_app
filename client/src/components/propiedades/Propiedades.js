
import React, { useState, useEffect } from 'react';
import MenuLayout from '../Menu/MenuLayout'; 
import BasicTablePropiedades from './BasicTablePropiedades';
import { Box, CircularProgress } from '@mui/material';
import {
  StyledBox,
} from '../../styles/PropiedadesStyles';

const Propiedades = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <MenuLayout>
      <StyledBox>
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '1200px', width: '100%', padding: '1rem' }}>
            {isLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
              </Box>
            ) : (
              <BasicTablePropiedades />
            )}
          </Box>
        </Box>
      </StyledBox>
    </MenuLayout>
  );
};

export default Propiedades;