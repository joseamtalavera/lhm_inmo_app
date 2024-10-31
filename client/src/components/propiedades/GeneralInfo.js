import React from 'react';
import { Box, Stack, Grid, Typography, FormControl, FormLabel, OutlinedInput, Select, MenuItem } from '@mui/material';

const primaryFields = [
    "Ref", "RefExt", "Precio", "Destacada", "Título", "Dirección", "Localidad", "Provincia", "Pais", "CP",
    "Longitud", "Latitud"
];

const secondaryFields = [
    "M.Constr", "M.Utiles", "M.Parcela", "Tipo", "Habitaciones", "Baños", "Aseos", "Estado"
];

const extraFields = [
    "Año Cont", "Calific", "Cargas", "Planta", "Ori.Entrada", "Ori.Ventana", "Cert.Ener", "Valor C.E", "CO2/m2 Año", 
    "Kw/Año", "T. IBI", "T. VADO", "T. Rústico", "Gerencia", "Gastos", "Comunidad", "Derrama", "Cons. Elect", 
    "Cons. Agua", "Internet", "Gas", "ITE", "Termo Agua", "Sum. Agua"
];

const generateGridItem = (field, property, handleChange, isEditing) => (
    <Grid item xs={12} md={4} key={field}>
        <FormControl variant="outlined" sx={{ width: '100%' }}>
            <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                <Typography variant="body2" sx={{ color: 'black' }}>
                    {field}
                </Typography>
            </FormLabel>
            <OutlinedInput
                size="small"
                name={field.replace(/\s/g, '')}
                value={property[field.replace(/\s/g, '')] || ''}
                onChange={handleChange}
                disabled={!isEditing}
            />
        </FormControl>
    </Grid>
);

const GeneralInfo = ({ property, handleChange, isEditing }) => (
    <Box>
        <Stack spacing={2} sx={{ my: 1 }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    gap: 2,
                    mb: 0, mt: 1, p: 2,
                    flexWrap: 'wrap'
                }}
            >
                <Grid container spacing={2} alignItems="center">
                    <Grid item xs={12} md={3}>
                        <Box sx={{ width:'100%', mb: 2 }}>
                            <img src={property.Foto} alt="Property" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Box sx={{mb: 2}}>
                            <Typography variant="h6" sx={{ mb:1 }}>
                                Referencia: {property.Ref}
                            </Typography>
                            <Typography variant='body1'>
                                Localidad: {property.Localidad}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={3}>
                        <FormControl variant="outlined" sx={{ width: '100%' }}>
                            <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                                <Typography variant="body2" sx={{ color: 'black' }}>
                                    Activa<span style={{ color: '#1E90FF', fontSize: '1.5em' }}>*</span>
                                </Typography>
                            </FormLabel>
                            <Select
                                size="small"
                                name="Activa"
                                value={property.Activa || ''}
                                onChange={handleChange}
                                disabled={!isEditing}
                            >
                                <MenuItem value=""><em>None</em></MenuItem>
                                <MenuItem value="Yes">Yes</MenuItem>
                                <MenuItem value="No">No</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF'  }}>
                        Informacion General
                    </Typography>
                    <Grid container spacing={2}>
                        {primaryFields.map(field => generateGridItem(field, property, handleChange, isEditing))}
                        <Grid item xs={12} md={12}>
                            <FormControl variant="outlined" sx={{ width: '100%' }}>
                                <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                                    <Typography variant="body2" sx={{ color: 'black' }}>
                                        Descripción<span style={{ color: '#1E90FF', fontSize: '1.5em' }}>*</span>
                                    </Typography>
                                </FormLabel>
                                <OutlinedInput
                                    size="small"
                                    name="Descripción"
                                    value={property.Descripción || ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    multiline
                                    minRows={4}
                                />
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{  width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                        Características
                    </Typography>
                    <Grid container spacing={2}>
                        {secondaryFields.map(field => generateGridItem(field, property, handleChange, isEditing))}
                    </Grid>
                </Box>
                <Box sx={{  width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px'}}>
                    <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                        Extras
                    </Typography>
                    <Grid container spacing={2}>
                        {extraFields.map(field => generateGridItem(field, property, handleChange, isEditing))}
                    </Grid>
                </Box>
            </Box>
        </Stack>
    </Box>
);

export default GeneralInfo;