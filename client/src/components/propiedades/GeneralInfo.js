//GeneralInfo.js

import React, { useEffect, useState } from 'react';
import { Box, Stack, Grid, Typography, FormControl, FormLabel, OutlinedInput, Select, MenuItem, Chip } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add'; // Import AddIcon

const primaryFields = [
    "Ref", "RefExt", "Precio", "Destacada", "Título", "Dirección", "Localidad", "Provincia", "Pais", "CP",
    "Longitud", "Latitud"
];

const secondaryFields = [
    "M.Constr", "M.Utiles", "M.Parcela", "Tipo", "Habitaciones", "Baños", "Aseos", "Estado"
];

const extraFields = [
    "Año.Const", "Calific", "Cargas", "Planta", "Ori.Entrada", "Ori.Ventana", "Cert.Ener", "Valor.C.E", "CO2/m2/Año", 
    "Kw/Año", "T.IBI", "T.VADO", "T.Rústico", "Gerencia", "Gastos", "Comunidad", "Derrama", "Cons.Elect", 
    "Cons.Agua", "Internet", "Gas", "ITE", "Termo.Agua", "Sum.Agua"
];

const selectOptions = {
    Destacada: ["Si", "No"],
    Tipo: ["Casa rustica o de campo",
        "Chalet/casa independiente",
        "Chalet/casa pareada",
        "Chalet/casa adosada",
        "Inmueble",
        "Piso",
        "Atico/Duplex",
        "Obra Nueva",
        "Oficina",
        "Local",
        "Garaje/parking",
        "Trastero",
        "Terrenos/parcela",
        "Edificio"
    ],
    Habitaciones:["0", "1", "2", "3", "4", "5 o más"],
    Baños:["0", "1", "2", "3", "4 o más"],
    Aseos:["0", "1", "2", "3", "4 o más"],
    Estado:[ "Buen estado",
        "Para entrar a vivir",
        "Reforma de mantenimiento (pintar, cambiar enchufes, etc.)",
        "Reforma completa",
        "Abandonado",
        "Estado inicial de en fecha de su adquisición"],
    Calific:["Obra nueva",
        "Segunda mano",
        "En construcción",
        "A reformar",
        "Reformado",
        "En ruinas"
    ],
    Cargas: [
        "Sin Cargas",
        "Carga Hipotecaria se liquida en la venta",
        "Carga administrativa",
        "Carga Judicial",
        "Carga por embargo",
        "Proindivisa",
        "Se puede segregar"
    ],
    Planta: [
        "Sótano",
        "Bajo",
        "Primera planta",
        "Segunda planta",
        "Tercera planta",
        "Cuarta planta",
        "Quinta planta",
        "Sexta planta",
        "Séptima planta o más",
        "Ático",
        "Ultima Planta"
    ],
    "Ori.Entrada": [
        "Norte",
        "Sur",
        "Este",
        "Oeste",
        "Sureste",
        "Suroeste",
        "Noroeste",
        "Noreste"
    ],
    "Ori.Ventana": [
        "Norte",
        "Sur",
        "Este",
        "Oeste",
        "Sureste",
        "Suroeste",
        "Noroeste",
        "Noreste"
    ],
    "Cert.Ener": [
        "En tramite",
        "Calificación",
        "Exento",
        "No necesita"
    ],
    "Valor.C.E": [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G"
    ],
    Gerencia: [
        "Presidencia",
        "Con administrador de fincas COLEGIADO",
        "Con administrador de fincas NO COLEGIADO"
    ],
    Internet: [
        "Fibra",
        "Normal",
        "Satélite",
        "Antena",
        "Telecable"
    ],
    Gas: [
        "Ciudad",
        "Bombona propano",
        "Bombona"
    ],
    ITE: [
        "No es necesaria aún",
        "Aprobada",
        "En curso",
        "Pendiente",
        "Exento"
    ],
    "Termo.Agua": [
        "Calentador eléctrico",
        "Termo gas butano",
        "Termo gas ciudad",
        "Calentador comunitario",
        "Calentador placa solar"
    ],
    "Sum.Agua": [
        "Comunitaria",
        "Independiente"
    ],
}

const generateGridItem = (field, property, handleChange, isEditing) => {
    if (selectOptions[field]) {
        return (
            <Grid item xs={12} md={4} key={field}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                        <Typography variant="body2" sx={{ color: 'black' }}>
                            {field}
                        </Typography>
                    </FormLabel>
                    <Select
                        size="small"
                        name={field.replace(/\s/g, '')}
                        value={property[field.replace(/\s/g, '')] || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        sx={{
                            '& .MuiSelect-select': {
                                color: '#404040', // Darker gray color for the text in Select component
                            },
                        }}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {selectOptions[field].map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        );
    }

    return (
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
                    sx={{ color: '#404040' }} // Ensures the input field itself is targeted
                    inputProps={{
                        style: {
                            color: '#404040' // Directly sets the text color inside the input
                        }
                    }}
                />
            </FormControl>
        </Grid>
    );
};

const GeneralInfo = ({ property, handleChange, isEditing, setProperty, setActiveTab }) => {
    
    useEffect(() => {
        const fetchExistingReferences = async () => {
            const storedReferences = JSON.parse(localStorage.getItem('references')) || [];
            return storedReferences;
        };

        const generateRef = async () => {
            const prefix = 'LHA';
            const existingReferences = await fetchExistingReferences();
            const referenceNumbers = existingReferences.map(ref => parseInt(ref.replace(prefix, ''), 10));

            // Find the first unused reference starting from 1000
            let nextRefNumber = 1040;
            while (referenceNumbers.includes(nextRefNumber)) {
                nextRefNumber++;
            }

            // Create the new reference string
            const newRef = `${prefix}${nextRefNumber}`;

            // Save the new reference to local storage
            localStorage.setItem('references', JSON.stringify([...existingReferences, newRef]));

            return newRef;
        };

        // Check if the Ref is not already set, then generate and set it
        if (!property.Ref) {
            generateRef().then(newRef => {
                setProperty((prevProperty) => ({
                    ...prevProperty,
                    Ref: newRef,
                }));
            });
        }
    }, [property, setProperty]);

    const handleImageClick = () => {
        if (typeof setActiveTab === 'function') {
            setActiveTab(2); 
        } else {
            console.error('setActiveTab is not a function');
        }
    };

    return (
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
                                {property.Foto ? (
                                    <img src={property.Foto} alt="Img" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
                                ) : (
                                    <Box
                                        sx={{
                                            width: '100%',
                                            height: '200px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            border: '2px dashed #ddd',
                                            borderRadius: '4px',
                                            cursor: 'pointer'
                                        }}
                                        onClick={handleImageClick}
                                    >
                                        <AddIcon sx={{ fontSize: 40, color: '#ddd' }} />
                                    </Box>
                                )}
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
                                <Chip
                                    label={property.Activa ? "Activa" : "Inactiva"}
                                    icon={property.Activa ? <CheckCircleIcon /> : <CancelIcon />}
                                    color={property.Activa ? "success" : "error"}
                                    variant="outlined"
                                    sx={{ mt: 2 }} // Add margin-top to create space
                                />
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
                                    value={property.Activa !== undefined ? String(property.Activa) : ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            color: '#404040', // Darker gray color for the text in Select component
                                        },
                                    }}
                                >
                                    <MenuItem value=""><em>None</em></MenuItem>
                                    <MenuItem value="1" >Si</MenuItem>
                                    <MenuItem value="0" >No</MenuItem>
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
};

export default GeneralInfo;