import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import MenuLayout from '../Menu/MenuLayout'; 


const Dashboard = () => {
  
  return (
    <MenuLayout>
       <Container>
        <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
          <Typography variant="h4" component="h1" gutterBottom>
            Dashboard Under Construction. Thanks for your patience.
          </Typography>
          <Typography variant="body1">
            We are working hard to bring you the best experience. Please check back later.
          </Typography>
        </Box>
      </Container>   
    </MenuLayout>
  );
};

export default Dashboard;