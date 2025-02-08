import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useProperties } from './PropertiesContext';

export default function Deposits() {
  
  const { activeProperties } = useProperties();
  const today = new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });

  return (
    <React.Fragment>
      <Title>Propiedades Activas</Title>
      <Typography component="p" variant="h4">
        {activeProperties.length} 
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        {today} 
      </Typography>
      <div>
        <Link color="primary" href="/dashboard/propiedades">
          Ver Propiedades 
        </Link>
      </div>
    </React.Fragment>
  );
}