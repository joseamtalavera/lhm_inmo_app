import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import MenuLayout from '../Menu/MenuLayout'; 
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import { PropertiesProvider } from './PropertiesContext';

const Dashboard = () => {
  
  return (
    <PropertiesProvider>
    <MenuLayout>
       <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={8} lg={9}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
              {/* Recent Deposits */}
              <Grid item xs={12} md={4} lg={3}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Deposits />
                </Paper>
              </Grid>
              {/* Recent Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                  <Orders />
                </Paper>
              </Grid>
            </Grid>
          </Container> 
    </MenuLayout>
    </PropertiesProvider>
  );
};

export default Dashboard;