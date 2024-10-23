//Propiedades.js
import React, { useState }from 'react';
import MenuLayout from '../Menu/MenuLayout'; 
import BasicTablePropiedades from './BasicTablePropiedades';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import {useTheme } from '@mui/material/styles';
import {
  StyledButton,
  StyledBox,
  InnerBox,
  StyledModal,
  ModalContent,
} from '../../styles/PropiedadesStyles';

import Modal from '@mui/material/Modal';
//import AddUser from './AddUser';

const Propiedades = () => {
  const handleAddUser = () => {
    // logic for adding a new user goes here
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const theme = useTheme();

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

   {/*  <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '50%',
        height: '100%',
        bgcolor: '#e5e5e5',
        border: '0px solid #000',
        borderRadius: '15px',
        boxShadow: 24,
        p: 1,
        maxHeight: '80%',
        overflowY: 'auto',
      }}>
       <AddUser/>
      </Box>
    </Modal> */}
    </MenuLayout>
  );
};

export default Propiedades;