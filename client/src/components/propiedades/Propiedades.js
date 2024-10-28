//Propiedades.js
import React, { useState }from 'react';
import MenuLayout from '../Menu/MenuLayout'; 
import BasicTablePropiedades from './BasicTablePropiedades';
import AddIcon from '@mui/icons-material/Add';
import {useTheme } from '@mui/material/styles';
import {
  StyledButton,
  StyledBox,
  InnerBox,
} from '../../styles/PropiedadesStyles';


const Propiedades = () => {
  
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <MenuLayout>

      <StyledBox>
        <InnerBox>
          <StyledButton
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleOpen}
          >
          Add
          </StyledButton>
          </InnerBox>
          <BasicTablePropiedades/>
      </StyledBox>
    </MenuLayout>
  );
};

export default Propiedades;