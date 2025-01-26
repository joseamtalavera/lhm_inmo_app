//GeneralInfo.js

import React from 'react';
import { Box, Stack, Grid, Typography, FormControl, FormLabel, OutlinedInput, Select, MenuItem, Chip, FormHelperText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add'; 

const primaryFields = [
    {label: "Ref", name: "ref"},
    {label: "RefExt", name: "refExt"},
    {label: "Precio", name: "precio"},
    {label: "Destacada", name: "destacada"},
    {label: "Título", name: "titulo"},
    {label: "Dirección", name: "direccion"},
    {label: "Localidad", name: "localidad"},
    {label: "Provincia", name: "provincia"},
    {label: "Pais", name: "pais"},
    {label: "CP", name: "cp"},
    {label: "Longitud", name: "longitud"},
    {label: "Latitud", name: "latitud"}

   /*  "RefExt", "Precio", "Destacada", "Título", "Dirección", "Localidad", "Provincia", "Pais", "CP",
    "Longitud", "Latitud"
   */
];

const secondaryFields = [
    {label: "M.Constr", name: "metrosconsturidos"},
    {label: "M.Utiles", name: "metrosutiles"},
    {label: "M.Parcela", name: "metrosparcela"},
    {label: "Tipo", name: "tipopropiedad"},
    {label: "Habitaciones", name: "nestancias"},
    {label: "Baños", name: "nbanos"},
    {label: "Aseos", name: "naseos"},
    {label: "Estado", name: "estado"}

   /*  "M.Constr", "M.Utiles", "M.Parcela", "Tipo", "Habitaciones", "Baños", "Aseos", "Estado" */
];

const extraFields = [
    {label: "Año.Const", name: "anoconstruccion"},
    {label: "Calific", name: "calificacion"},
    {label: "Cargas", name: "cargas"},
    {label: "Planta", name: "planta"},
    {label: "Ori.Entrada", name: "orientacionentrada"},
    {label: "Ori.Ventana", name: "orientacionventana"},
    {label: "Cert.Ener", name: "certificadoenergetico"},
    {label: "Valor.C.E", name: "valorcertificadoenergetico"},
    {label: "CO2/m2/Año", name: "co2certificadoenergetico"},
    {label: "Kw/Año", name: "kwcercificadoenergetico"},
    {label: "T.IBI", name: "tributoibi"},
    {label: "T.VADO", name: "tributovado"},
    {label: "T.Rústico", name: "tributorustico"},
    {label: "Gerencia", name: "gerencia"},
    {label: "Gastos", name: "gastos"},
    {label: "Comunidad", name: "comunidadgastos"},
    {label: "Derrama", name: "comunidadderrama"},
    {label: "Cons.Elect", name: "consumoelectricidad"},
    {label: "Cons.Agua", name: "consumoagua"},
    {label: "Internet", name: "tipointernet"},
    {label: "Gas", name: "tipogas"},
    {label: "ITE", name: "tipoite"},
    {label: "Termo.Agua", name: "tipotermoagua"},
    {label: "Sum.Agua", name: "tipoagua"}

   /*  "Año.Const", "Calific", "Cargas", "Planta", "Ori.Entrada", "Ori.Ventana", "Cert.Ener", "Valor.C.E", "CO2/m2/Año", 
    "Kw/Año", "T.IBI", "T.VADO", "T.Rústico", "Gerencia", "Gastos", "Comunidad", "Derrama", "Cons.Elect", 
    "Cons.Agua", "Internet", "Gas", "ITE", "Termo.Agua", "Sum.Agua" */
];

const selectOptions = {
    Destacada: [
        {id: "1", label: "Si"},
        {id: "0", label: "No"}
    ],
    Tipo: [
        {id: "1", label: "Casa rustica o de campo"},
        {id: "2", label: "Chalet/casa independiente"},
        {id: "3", label: "Chalet/casa pareada"},
        {id: "4", label: "Chalet/casa adosada"},
        {id: "5", label: "Inmueble"},
        {id: "6", label: "Piso"},
        {id: "7", label: "Atico/Duplex"},
        {id: "8", label: "Obra Nueva"},
        {id: "9", label: "Oficina"},
        {id: "10", label: "Local"},
        {id: "11", label: "Garaje/parking"},
        {id: "12", label: "Trastero"},
        {id: "13", label: "Terrenos/parcela"},
        {id: "14", label: "Edificio"}
    
       /*  "Casa rustica o de campo",
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
        "Edificio" */
    ],
    Habitaciones:[
        {id: "1", label: "0"},
        {id: "2", label: "1"},
        {id: "3", label: "2"},
        {id: "4", label: "3"},
        {id: "5", label: "4"},
        {id: "6", label: "5 o más"}
    
        /* "0", "1", "2", "3", "4", "5 o más" */
    ],
    Baños:[
        {id: "1", label: "0"},
        {id: "2", label: "1"},

        {id: "3", label: "2"},
        {id: "4", label: "3"},
        {id: "5", label: "4 o más"}

       /*  "0", "1", "2", "3", "4 o más" */
    ],
    Aseos:[
        {id: "1", label: "0"},
        {id: "2", label: "1"},
        {id: "3", label: "2"},
        {id: "4", label: "3"},
        {id: "5", label: "4 o más"}

       /*  "0", "1", "2", "3", "4 o más" */
    ],
    Estado:[ 
        {id: "1", label: "Buen estado"},
        {id: "2", label: "Para entrar a vivir"},
        {id: "3", label: "Reforma de mantenimiento (pintar, cambiar enchufes, etc.)"},
        {id: "4", label: "Reforma completa"},
        {id: "5", label: "Abandonado"},
        {id: "6", label: "Estado inicial de en fecha de su adquisición"}

       /*  "Buen estado",
        "Para entrar a vivir",
        "Reforma de mantenimiento (pintar, cambiar enchufes, etc.)",
        "Reforma completa",
        "Abandonado",
        "Estado inicial de en fecha de su adquisición" */
    ],
    Calific:[
        {id: "1", label: "VPO"},
        {id: "2", label: "Subvencionada por administración"},
        {id: "3", label: "Descalificada"},
        {id: "4", label: "VPO  (Certificada como vivienda libre)"},
        {id: "5", label: "Vivienda libre"}

        /* "VPO",
        "Subvencionada por administración",
        "Descalificada",
        "VPO  (Certificada como vivienda libre)",
        "Vivienda libre", */
    ],
    Cargas: [
        {id: "1", label: "Sin Cargas"},
        {id: "2", label: "Carga Hipotecaria se liquida en la venta"},
        {id: "3", label: "Carga administrativa"},
        {id: "4", label: "Carga Judicial"},
        {id: "5", label: "Carga por embargo"},
        {id: "6", label: "Proindivisa"},
        {id: "7", label: "Se puede segregar"}

       /*  "Sin Cargas",
        "Carga Hipotecaria se liquida en la venta",
        "Carga administrativa",
        "Carga Judicial",
        "Carga por embargo",
        "Proindivisa",
        "Se puede segregar" */
    ],
    Planta: [
        {id: "1", label: "Sótano"},
        {id: "2", label: "Bajo"},
        {id: "3", label: "Primera planta"},
        {id: "4", label: "Segunda planta"},
        {id: "5", label: "Tercera planta"},
        {id: "6", label: "Cuarta planta"},
        {id: "7", label: "Quinta planta"},
        {id: "8", label: "Sexta planta"},
        {id: "9", label: "Séptima planta o más"},
        {id: "10", label: "Ático"},
        {id: "11", label: "Ultima Planta"}

        /* "Sótano",
        "Bajo",
        "Primera planta",
        "Segunda planta",
        "Tercera planta",
        "Cuarta planta",
        "Quinta planta",
        "Sexta planta",
        "Séptima planta o más",
        "Ático",
        "Ultima Planta" */
    ],
    "Ori.Entrada": [
        {id: "1", label: "Norte"},
        {id: "2", label: "Sur"},
        {id: "3", label: "Este"},
        {id: "4", label: "Oeste"},
        {id: "5", label: "Sureste"},
        {id: "6", label: "Suroeste"},
        {id: "7", label: "Noroeste"},
        {id: "8", label: "Noreste"}

       /*  "Norte",
        "Sur",
        "Este",
        "Oeste",
        "Sureste",
        "Suroeste",
        "Noroeste",
        "Noreste" */
    ],
    "Ori.Ventana": [
        {id: "1", label: "Norte"},
        {id: "2", label: "Sur"},
        {id: "3", label: "Este"},
        {id: "4", label: "Oeste"},
        {id: "5", label: "Sureste"},
        {id: "6", label: "Suroeste"},
        {id: "7", label: "Noroeste"},
        {id: "8", label: "Noreste"}

        /* "Norte",
        "Sur",
        "Este",
        "Oeste",
        "Sureste",
        "Suroeste",
        "Noroeste",
        "Noreste" */
    ],
    "Cert.Ener": [
        {id: "1", label: "En tramite"},
        {id: "2", label: "Calificación"},
        {id: "3", label: "Exento"},
        {id: "4", label: "No necesita"}

        /* "En tramite",
        "Calificación",
        "Exento",
        "No necesita" */
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
        {id: "1", label: "Presidencia"},
        {id: "2", label: "Con administrador de fincas COLEGIADO"},
        {id: "3", label: "Con administrador de fincas NO COLEGIADO"}

        /* "Presidencia",
        "Con administrador de fincas COLEGIADO",
        "Con administrador de fincas NO COLEGIADO" */
    ],
    Internet: [
        {id: "1", label: "Fibra"},
        {id: "2", label: "Normal"},
        {id: "3", label: "Satélite"},
        {id: "4", label: "Antena"},
        {id: "5", label: "Telecable"}

      /*   "Fibra",
        "Normal",
        "Satélite",
        "Antena",
        "Telecable" */
    ],
    Gas: [
        {id: "1", label: "Ciudad"},
        {id: "2", label: "Bombona propano"},
        {id: "3", label: "Bombona"}

       /*  "Ciudad",
        "Bombona propano",
        "Bombona" */
    ],
    ITE: [
        {id: "1", label: "No es necesaria aún"},
        {id: "2", label: "Aprobada"},
        {id: "3", label: "En curso"},
        {id: "4", label: "Pendiente"},
        {id: "5", label: "Exento"}

       /*  "No es necesaria aún",
        "Aprobada",
        "En curso",
        "Pendiente",
        "Exento" */
    ],
    "Termo.Agua": [
        {id: "1", label: "Calentador eléctrico"},
        {id: "2", label: "Termo gas butano"},
        {id: "3", label: "Termo gas ciudad"},
        {id: "4", label: "Calentador comunitario"},
        {id: "5", label: "Calentador placa solar"}

        /* "Calentador eléctrico",
        "Termo gas butano",
        "Termo gas ciudad",
        "Calentador comunitario",
        "Calentador placa solar" */
    ],
    "Sum.Agua": [
        {id: "1", label: "Individual"},
        {id: "2", label: "Comunitaria"},

       /*  "Comunitaria",
        "Independiente" */
    ],
}

const generateGridItem = (field, property, handleChange, isEditing) => {
    const isTitulo = field.label === "Título";
    const maxLength = isTitulo ? 35 : undefined;

    if (selectOptions[field.label]) {
        return (
            <Grid item xs={12} md={4} key={field}>
                <FormControl variant="outlined" sx={{ width: '100%' }}>
                    <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                        <Typography variant="body2" sx={{ color: 'black' }}>
                            {field.label}
                        </Typography>
                    </FormLabel>
                    <Select
                        size="small"
                        name={field.name.replace(/\s/g, '')}
                        value={property[field.name.replace(/\s/g, '')] || ''}
                        onChange={handleChange}
                        disabled={!isEditing}
                        sx={{
                            '& .MuiSelect-select': {
                                color: '#404040', 
                            },
                        }}
                    >
                        <MenuItem value=""><em>None</em></MenuItem>
                        {selectOptions[field.label].map(option => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.label}
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
                        {field.label}
                    </Typography>
                </FormLabel>
                <OutlinedInput
                    size="small"
                    name={field.name.replace(/\s/g, '')}
                    value={property[field.name.replace(/\s/g, '')] || ''}
                    onChange={(e) => {
                        const { value } = e.target;
                        if (isTitulo && value.length > maxLength) {
                            // Option 1: Prevent input beyond maxLength
                            // return;

                            // Option 2: Trim the input to maxLength
                            // setProperty to trim the value
                            // Assuming setProperty is available in scope
                            // This requires passing setProperty to generateGridItem or handling differently
                            
                            // For simplicity, using handleChange but ensuring maxLength via inputProps
                            handleChange(e);
                        } else {
                            handleChange(e);
                        }
                    }}
                    disabled={!isEditing}
                    sx={{ color: '#404040' }} 
                    inputProps={{
                        maxLength: maxLength,
                        style: {
                            color: '#404040' 
                        }
                    }}
                />
                {isTitulo && (
                    <FormHelperText>
                        {property[field.name.replace(/\s/g, '')]?.length || 0}/{maxLength} caracteres
                    </FormHelperText>
                )}
            </FormControl>
        </Grid>
    );
};

const GeneralInfo = ({ property, handleChange, isEditing, setProperty, setActiveTab }) => {
    
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
                                {property.url ? (
                                    <img src={property.url} alt="Img" style={{ width: '100%', height: 'auto', borderRadius: '4px' }} />
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
                                    Referencia: {property.ref}
                                </Typography>
                                <Typography variant='body1'>
                                    Localidad: {property.localidad}
                                </Typography>
                                <Chip
                                    label={property.activa ? "Activa" : "Inactiva"}
                                    icon={property.activa ? <CheckCircleIcon /> : <CancelIcon />}
                                    color={property.activa ? "success" : "error"}
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
                                    value={property.activa !== undefined ? String(property.activa) : ''}
                                    onChange={handleChange}
                                    disabled={!isEditing}
                                    sx={{
                                        '& .MuiSelect-select': {
                                            color: '#404040', 
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
                                        value={property.descripción || ''}
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