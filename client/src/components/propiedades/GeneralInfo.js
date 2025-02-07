//GeneralInfo.js

import React from 'react';
import { Box, Stack, Grid, Typography, FormControl, FormLabel, OutlinedInput, Select, MenuItem, Chip, FormHelperText } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add'; 

const primaryFields = [
    {label: "Ref", name: "ref"},
    {label: "RefExt", name: "refext"},
    {label: "Precio", name: "precio"},
    {label: "Destacada", name: "destacada"},
    {label: "Título", name: "title"},
    {label: "Dirección", name: "direccion"},
    {label: "Localidad", name: "localidad"},
    {label: "Provincia", name: "provincia"},
    {label: "Pais", name: "pais"},
    {label: "CP", name: "cp"},
    {label: "Longitud", name: "longitud"},
    {label: "Latitud", name: "latitud"}
];

const secondaryFields = [
    {label: "M.Constr", name: "metrosconstruidos"},
    {label: "M.Utiles", name: "metrosutiles"},
    {label: "M.Parcela", name: "metrosparcela"},
    {label: "Tipo", name: "tipopropiedad"},
    {label: "Habitaciones", name: "nestancias"},
    {label: "Baños", name: "nbanos"},
    {label: "Aseos", name: "naseos"},
    {label: "Estado", name: "estado"}
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
    {label: "Kw/Año", name: "kwcertificadoenergetico"},
    {label: "T.IBI", name: "tributoibi"},
    {label: "T.VADO", name: "tributovado"},
    {label: "T.Rústico", name: "tributorustico"},
    {label: "Gerencia", name: "tipogerencia"},
    {label: "Gastos", name: "gastosvarios"},
    {label: "Comunidad", name: "comunidadgastos"},
    {label: "Derrama", name: "comunidadderrama"},
    {label: "Cons.Elect", name: "consumoelecticidad"},
    {label: "Cons.Agua", name: "consumoagua"},
    {label: "Internet", name: "tipointernet"},
    {label: "Gas", name: "tipogas"},
    {label: "ITE", name: "tipoite"},
    {label: "Termo.Agua", name: "tipotermoagua"},
    {label: "Sum.Agua", name: "tipoagua"}
];

const selectOptions = {
    Destacada: [
        {value: "1", label: "Si"},
        {value: "0", label: "No"}
    ],
    Tipo: [
        {value: "Casa rustica o de campo", label: "Casa rustica o de campo"},
        {value: "Chalet/casa independiente", label: "Chalet/casa independiente"},
        {value: "Chalet/casa independiente", label: "Chalet/casa independiente"},
        {value: "Chalet/casa adosada", label: "Chalet/casa adosada"},
        {value: "Inmueble", label: "Inmueble"},
        {value: "Piso", label: "Piso"},
        {value: "Atico/Duplex", label: "Atico/Duplex"},
        {value: "Obra Nueva", label: "Obra Nueva"},
        {value: "Oficina", label: "Oficina"},
        {value: "Local", label: "Local"},
        {value: "Garaje/parking", label: "Garaje/parking"},
        {value: "Trastero", label: "Trastero"},
        {value: "Terrenos/parcela", label: "Terrenos/parcela"},
        {value: "Edificio", label: "Edificio"}
    ],
    Habitaciones:[
        {value: "1", label: "0"},
        {value: "2", label: "1"},
        {value: "3", label: "2"},
        {value: "4", label: "3"},
        {value: "5", label: "4"},
        {value: "6", label: "5 o más"}
    ],
    Baños:[
        {value: "1", label: "0"},
        {value: "2", label: "1"},

        {value: "3", label: "2"},
        {value: "4", label: "3"},
        {value: "5", label: "4 o más"}
    ],
    Aseos:[
        {value: "1", label: "0"},
        {value: "2", label: "1"},
        {value: "3", label: "2"},
        {value: "4", label: "3"},
        {value: "5", label: "4 o más"}
    ],
    Estado:[ 
        {value: "Buen estado", label: "Buen estado"},
        {value: "Para entrar a vivir", label: "Para entrar a vivir"},
        {value: "Reforma de mantenimiento (pintar, cambiar enchufes, etc.)", label: "Reforma de mantenimiento (pintar, cambiar enchufes, etc.)"},
        {value: "Reforma completa", label: "Reforma completa"},
        {value: "Abandonado", label: "Abandonado"},
        {value: "Estado inicial de en fecha de su adquisición", label: "Estado inicial de en fecha de su adquisición"}
    ],
    Calific:[
        {value: "VPO", label: "VPO"},
        {value: "Subvencionada por administración", label: "Subvencionada por administración"},
        {value: "Descalificada", label: "Descalificada"},
        {value: "VPO  (Certificada como vivienda libre)", label: "VPO  (Certificada como vivienda libre)"},
        {value: "Vivienda libre", label: "Vivienda libre"}
    ],
    Cargas: [
        {value: "Sin Cargas", label: "Sin Cargas"},
        {value: "Carga Hipotecaria se liquida en la venta", label: "Carga Hipotecaria se liquida en la venta"},
        {value: "Carga administrativa", label: "Carga administrativa"},
        {value: "Carga Judicial", label: "Carga Judicial"},
        {value: "Carga por embargo", label: "Carga por embargo"},
        {value: "Proindivisa", label: "Proindivisa"},
        {value: "Se puede segregar", label: "Se puede segregar"}
    ],
    Planta: [
        {value: "Sótano", label: "Sótano"},
        {value: "Bajo", label: "Bajo"},
        {value: "Primera planta", label: "Primera planta"},
        {value: "Segunda planta", label: "Segunda planta"},
        {value: "Tercera planta", label: "Tercera planta"},
        {value: "Cuarta planta", label: "Cuarta planta"},
        {value: "Quinta planta", label: "Quinta planta"},
        {value: "Sexta planta", label: "Sexta planta"},
        {value: "Séptima planta o más", label: "Séptima planta o más"},
        {value: "Ático", label: "Ático"},
        {value: "Ultima Planta", label: "Ultima Planta"}
    ],
    "Ori.Entrada": [
        {value: "Norte", label: "Norte"},
        {value: "Sur", label: "Sur"},
        {value: "Este", label: "Este"},
        {value: "Oeste", label: "Oeste"},
        {value: "Sureste", label: "Sureste"},
        {value: "Suroeste", label: "Suroeste"},
        {value: "Noroeste", label: "Noroeste"},
        {value: "Noreste", label: "Noreste"}
    ],
    "Ori.Ventana": [
        {value: "Norte", label: "Norte"},
        {value: "Sur", label: "Sur"},
        {value: "Este", label: "Este"},
        {value: "Oeste", label: "Oeste"},
        {value: "Sureste", label: "Sureste"},
        {value: "Suroeste", label: "Suroeste"},
        {value: "Noroeste", label: "Noroeste"},
        {value: "Noreste", label: "Noreste"}
    ],
    "Cert.Ener": [
        {value: "En tramite", label: "En tramite"},
        {value: "Calificació", label: "Calificación"},
        {value: "Exento", label: "Exento"},
        {value: "No necesita", label: "No necesita"}
    ],
  "Valor.C.E": [ 
        {value: "A", label: "A"},
        {value: "B", label: "B"},
        {value: "C", label: "C"},
        {value: "D", label: "D"},
        {value: "E", label: "E"},
        {value: "F", label: "F"},
        {value: "G", label: "G"}
    ], 
    Gerencia: [
        {value: "Presidencia", label: "Presidencia"},
        {value: "Con administrador de fincas COLEGIADO", label: "Con administrador de fincas COLEGIADO"},
        {value: "Con administrador de fincas NO COLEGIADO", label: "Con administrador de fincas NO COLEGIADO"}
    ],
    Internet: [
        {vlaue: "Fibra", label: "Fibra"},
        {value: "Normal", label: "Normal"},
        {value: "Satélite", label: "Satélite"},
        {value: "Antena", label: "Antena"},
        {value: "Telecable", label: "Telecable"}
    ],
    Gas: [
        {value: "Ciudad", label: "Ciudad"},
        {value: "Bombona propano", label: "Bombona propano"},
        {value: "Bombona", label: "Bombona"}
    ],
    ITE: [
        {value: "No es necesaria aún", label: "No es necesaria aún"},
        {value: "Aprobada", label: "Aprobada"},
        {value: "En curso", label: "En curso"},
        {value: "Pendiente", label: "Pendiente"},
        {value: "Exento", label: "Exento"}
    ],
    "Termo.Agua": [
        {value: "Calentador eléctrico", label: "Calentador eléctrico"},
        {value: "Termo gas butano", label: "Termo gas butano"},
        {value: "Termo gas ciudad", label: "Termo gas ciudad"},
        {value: "Calentador comunitario", label: "Calentador comunitario"},
        {value: "Calentador placa solar", label: "Calentador placa solar"}
    ],
    "Sum.Agua": [
        {value: "Individual", label: "Individual"},
        {value: "Comunitaria", label: "Comunitaria"}
    ],
}

const generateGridItem = (field, property, handleChange, isEditing) => {
    const isTitulo = field.label === "Título";
    const maxLength = isTitulo ? 35 : undefined;

    if (selectOptions[field.label]) {
        return (
            <Grid item xs={12} md={4} key={field.name}>
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
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
        );
    }

    return (
        <Grid item xs={12} md={4} key={field.name}>
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

    console.log('Recived property data in GenarlInfo', property);
    
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
                                    <img 
                                        key={property.url}
                                        src={property.url} 
                                        alt="Img" 
                                        style={{ width: '100%', height: 'auto', borderRadius: '4px' }} 
                                    />
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
                                    label={property.active ? "Activa" : "Inactiva"}
                                    icon={property.active ? <CheckCircleIcon /> : <CancelIcon />}
                                    color={property.active ? "success" : "error"}
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
                                    value={property.active !== undefined ? String(property.active) : ''}
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
                            {primaryFields.map(field => {
                                if (field.name === "destacada") {
                                    return (
                                        <Grid item xs={12} md={4} key={field.name}>
                                            <FormControl variant="outlined" sx={{ width: '100%' }}>
                                                <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                                                    <Typography variant="body2" sx={{ color: 'black' }}>
                                                        {field.label}
                                                    </Typography>
                                                </FormLabel>
                                                <Select
                                                    size="small"
                                                    name="destacada"
                                                    value={property.destacada !== undefined ? String(property.destacada) : ''}
                                                    onChange={(e) => {
                                                        const updatedValue = e.target.value === '1' ? 1 : 0; // Ensure numeric values
                                                        handleChange({
                                                            target: { name: 'destacada', value: updatedValue },
                                                        });
                                                    }}
                                                    disabled={!isEditing}
                                                    sx={{
                                                        '& .MuiSelect-select': {
                                                            color: '#404040',
                                                        },
                                                    }}
                                                >
                                                    <MenuItem value=""><em>None</em></MenuItem>
                                                    {selectOptions.Destacada.map((option) => (
                                                        <MenuItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                    );
                                }

                                // Default rendering for other fields
                                return generateGridItem(field, property, handleChange, isEditing);
                            })}
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
                                        value={property.description || ''}
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