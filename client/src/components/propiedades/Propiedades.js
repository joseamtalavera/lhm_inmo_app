//Propiedades.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MenuLayout from '../Menu/MenuLayout'; 
import BasicTablePropiedades from './BasicTablePropiedades';
import AddIcon from '@mui/icons-material/Add';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';
import {
  StyledButton,
  StyledBox,
  InnerBox,
} from '../../styles/PropiedadesStyles';

const Propiedades = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    navigate('/dashboard/propiedades/add-propiedad');
  }

  return (
    <MenuLayout>
      <StyledBox>
       {/*  <InnerBox>
          <StyledButton
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
            Add
          </StyledButton>
        </InnerBox> */}
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ maxWidth: '1200px', width: '100%', padding: '1rem' }}>
            <BasicTablePropiedades />
          </Box>
        </Box>
      </StyledBox>
    </MenuLayout>
  );
};

export default Propiedades;