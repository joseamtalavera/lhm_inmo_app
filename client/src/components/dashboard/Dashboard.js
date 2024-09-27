import React from 'react';
import { Container, Typography, Box } from '@mui/material';
//import ConstructionIcon from '@material-ui/icons/Construction';

const Dashboard = () => {
  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        {/* <ConstructionIcon style={{ fontSize: 100, color: '#f0ad4e' }} /> */}
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard Under Construction
        </Typography>
        <Typography variant="body1">
          We are working hard to bring you the best experience. Please check back later.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;