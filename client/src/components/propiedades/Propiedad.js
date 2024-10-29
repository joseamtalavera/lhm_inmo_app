import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Box, Card, Typography, Divider, Stack, Grid, FormControl, FormLabel, OutlinedInput, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Tabs, Tab, FormControlLabel, Checkbox } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import theme from '../../styles/theme';
import MenuLayout from '../Menu/MenuLayout';

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

const accessAmenities = [
    { id: 2, label: "Sí" },
    { id: 3, label: "No" }
];

const buildingEquipmentAmenities = [
    { id: 4, label: "Con Ascensor" },
    { id: 5, label: "Sin Ascensor" },
    { id: 6, label: "Con Zonas Comunes" },
    { id: 7, label: "Sin Zonas Comunes" }
];

const viewsAmenities = [
    { id: 8, label: "Vistas al mar" },
    { id: 9, label: "Vistas a la montaña" },
    { id: 10, label: "Vistas calle principal o calle colindante" },
    { id: 11, label: "Vistas panoramicas" }
];

const exteriorConditioningAmenities = [
    { id: 12, label: "Piscina comunitaria" },
    { id: 13, label: "Piscina privada" },
    { id: 14, label: "Piscina climatizada comunitaria" },
    { id: 15, label: "Piscina climatizada privada" },
    { id: 16, label: "Piscina compartida" },
    { id: 17, label: "Sala de GYM Comunitaria" },
    { id: 18, label: "Sala de Eventos en Zona Comunes" },
    { id: 19, label: "Parque infantil en Zona Comunes" },
    { id: 20, label: "Pista de Padel" },
    { id: 21, label: "Pista de Tenis" },
    { id: 22, label: "Pista multideporte" },
    { id: 23, label: "Zona ajardinadas comunitarias" },
    { id: 24, label: "Jardin privado" },
    { id: 25, label: "Zona de paso (Derecho de uso)" },
    { id: 26, label: "Alberca" },
    { id: 27, label: "Pozo de manantial" },
    { id: 28, label: "Pozo propio" },
    { id: 29, label: "Fosa septicca" },
    { id: 30, label: "Alcantarillado" },
    { id: 31, label: "Sin fosa ni alcantarillado" },
    { id: 37, label: "Agua de Ayuntamiento" },
    { id: 38, label: "Agua de Manatial" },
    { id: 39, label: "Sin agua" },
    { id: 40, label: "Electricidad instalada y habilitada" },
    { id: 41, label: "Electricidad instalación pendiente" },
    { id: 42, label: "Electricidad a realizar Boletín" },
    { id: 43, label: "Sin electricidad" },
    { id: 76, label: "Acceso a la propiedad Comunitario" },
    { id: 77, label: "Acceso a la propiedad Independiente" },
    { id: 78, label: "Zona Barbacoa" },
    { id: 79, label: "Placas Solares Electricidad" },
    { id: 80, label: "Placas Solares Agua" }
];

const additionalEquipmentAmenities = [
    { id: 32, label: "Con Parking Comunitario" },
    { id: 33, label: "Con trastero NO INCLUIDO EN PRECIO" },
    { id: 34, label: "Con trastero SI INCLUIDO EN PRECIO" },
    { id: 35, label: "Con plaza de aparcamiento Interior NO INCLUIDO EN PRECIO" },
    { id: 36, label: "Con plaza de aparcamiento Interior SI INCLUIDO EN PRECIO" }
];

const interiorConditioningAmenities = [
    { id: 44, label: "Con aire acondicionado" },
    { id: 45, label: "Sin aire acondicionado" },
    { id: 46, label: "Aire acondicionado centralizado" },
    { id: 47, label: "Amueblado" },
    { id: 48, label: "Sin amueblar" },
    { id: 49, label: "Con Armarios empotrados" },
    { id: 50, label: "Sin armarios empotrados" },
    { id: 51, label: "Puerta entrada de madera" },
    { id: 52, label: "Puerta entrada blindada" },
    { id: 53, label: "Puerta simple de seguridad baja" },
    { id: 54, label: "Terraza" },
    { id: 55, label: "Patio" },
    { id: 56, label: "Azotea" },
    { id: 57, label: "Cocina equipada con electrodomésticos" },
    { id: 58, label: "Cocina equipada sin electrodomésticos" },
    { id: 59, label: "Cuartos de baños reformados" },
    { id: 60, label: "Cuartos de baños a reformar" },
    { id: 61, label: "Cuarto de baño en buen estado" },
    { id: 62, label: "Aseos reformados" },
    { id: 63, label: "Aseos a reformar" },
    { id: 64, label: "Aseos en buen estado" },
    { id: 65, label: "Suelo Tipo Gres" },
    { id: 66, label: "Suelo tipo cerámica" },
    { id: 67, label: "Suelo tipo Parquet" },
    { id: 68, label: "Suelo tipo Rústico" },
    { id: 69, label: "Suelo tipo Madera" },
    { id: 70, label: "Calefacción Centralizada" },
    { id: 71, label: "Chimeneas" },
    { id: 72, label: "Estufas/calefactores/emisores termicos" },
    { id: 73, label: "Ventanas a reformar" },
    { id: 74, label: "Ventanas reformadas" },
    { id: 75, label: "Ventana en buen estado" },
    { id: 81, label: "Balcón" },
    { id: 82, label: "Electricidad Reformada/Nueva" },
    { id: 83, label: "Electricidad con Domótica" },
    { id: 84, label: "Electricidad Antigua + 10 años" },
    { id: 85, label: "Fontanería Reformada/ nueva" },
    { id: 86, label: "Fontanería Antigua +10 años" },
    { id: 87, label: "Ventanas Madera" },
    { id: 88, label: "Ventanas Aluminio" },
    { id: 89, label: "Ventana doble Acristalamiento/corredera/Climalit" },
    { id: 90, label: "Cierre balcón Aluminio" },
    { id: 91, label: "Cierre balcón obra" },
    { id: 92, label: "Cierre Acristalado/Cortinas vidrio" },
    { id: 93, label: "Sin cierre" },
    { id: 94, label: "Suelo estado inicial ANTIGUO" }
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

export default function Propiedad() {
    const { id } = useParams();
    const [property, setProperty] = useState({});
    const [amenities, setAmenities] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditingGeneralInfo, setIsEditingGeneralInfo] = useState(false);
    const [isEditingAmenities, setIsEditingAmenities] = useState(false);
    const [isEditingImages, setIsEditingImages] = useState(false);
    const [isEditingDocumentation, setIsEditingDocumentation] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            setIsLoading(true);
            console.log(`Fetching property with id: ${id}`);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`);
                if (!response.ok) throw new Error('Failed to fetch property');
                const data = await response.json();

                const transformedData = {
                    Ref: data.ref,
                    RefExt: data.refext,
                    Precio: data.precio,
                    Título: data.title,
                    Dirección: data.direccion,
                    Localidad: data.localidad,
                    Provincia: data.provincia,
                    Pais: data.pais,
                    CP: data.cp,
                    Longitud: data.longitud,
                    Latitud: data.latitud,
                    // Add mappings for secondary and extra fields as well
                    "M.Constr": data.metrosconstruidos,
                    "M.Utiles": data.metrosutiles,
                    "M.Parcela": data.metrosparcela,
                    Tipo: data.idtipopropiedad,
                    Habitaciones: data.idhabitaciones,
                    Baños: data.idbanos,
                    Aseos: data.idaseos,
                    Estado: data.idestado,
                    "Año Cont": data.anoconstruccion,
                    Calific: data.idcalificacion,
                    Cargas: data.idcargas,
                    Planta: data.idplanta,
                    "Ori.Entrada": data.idorientacionentrada,
                    "Ori.Ventana": data.idorientacionventana,
                    "Cert.Ener": data.idcertificadoenergetico,
                    "Valor C.E": data.valorcertificadoenergetico,
                    "CO2/m2 Año": data.co2certificadoenergetico,
                    "Kw/Año": data.kwcertificadoenergetico,
                    "T. IBI": data.tributoibi,
                    "T. VADO": data.tributovado,
                    "T. Rústico": data.tributorustico,
                    Gastos: data.gastosvarios,
                    Gerencia: data.idgerencia,
                    Comunidad: data.comunidadgastos,
                    Derrama: data.comunidadderrama,
                    "Cons. Elect": data.consumoelecticidad,
                    "Cons. Agua": data.consumoagua,
                    Internet: data.idinternet,
                    Gas: data.idgas,
                    ITE: data.idite,
                    "Termo Agua": data.idtermoagua,
                    "Sum. Agua": data.idagua,
                    Activa: data.active,
                    Foto: data.foto,
                    CreatedAt: data.created_at,
                    UpdatedAt: data.updated_at,
                };
                console.log(`Property fetched: ${JSON.stringify(data)}`);
                setProperty(transformedData);

                const amenitiesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}/amenities`);
                if (!amenitiesResponse.ok) throw new Error('Failed to fetch property amenities');
                const amenitiesData = await amenitiesResponse.json();
                console.log(`Amenities fetched: ${JSON.stringify(amenitiesData)}`);
                setAmenities(amenitiesData);
            } catch (error) {
                console.error('Error fetching property data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProperty({
            ...property,
            [name]: type === 'checkbox' ? checked : value,  
        });
    };

    const handleTabChange = (event, newValue) => {
        if (newValue === 4) {
            // Navigate to preview page
            navigate(`/dashboard/propiedades/${id}/preview`);
        } else
        {
            setActiveTab(newValue);
        }
    };

    const handleEditClick = (tab) => {
        switch (tab) {
            case 0:
                setIsEditingGeneralInfo(true);
                break;
            case 1:
                setIsEditingAmenities(true);
                break;
            case 2:
                setIsEditingImages(true);
                break;
            case 3:
                setIsEditingDocumentation(true);
                break;
            default:
                break;
        }
    };

    const handleCancelClick = (tab) => {
        switch (tab) {
            case 0:
                setIsEditingGeneralInfo(true);
                break;
            case 1:
                setIsEditingAmenities(true);
                break;
            case 2:
                setIsEditingImages(true);
                break;
            case 3:
                setIsEditingDocumentation(true);
                break;
            default:
                break;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(property),
            });
            if (!response.ok) throw new Error('Failed to update property');
            setIsSaveDialogOpen(true);
            setTimeout(() => {
                setIsSaveDialogOpen(false);
                navigate('/dashboard/propiedades');
            }, 2000);
        } catch (error) {
            console.error(error);
            setOpen(true);
        }
    };

    if (isLoading) {
        return <Box><CircularProgress /></Box>;
    }

    return (
        <MenuLayout>
            <ThemeProvider theme={theme}>
                <Card sx={{ maxWidth: '90%', margin: 'auto', mt: 5, mb: 2 }}>

                    <Tabs value={activeTab} onChange={handleTabChange} centered>
                        <Tab label="Informacion General" />
                        <Tab label="Amenities" />
                        <Tab label="Imagenes" /> {/* Fixed typo here */}
                        <Tab label="Documentos" />
                        <Tab label="Preview" />
                    </Tabs>
                    <Divider />

                    <Box sx={{ p: 2 }}>
                        {activeTab === 0 && (
                            <GeneralInfo    
                                property={property}
                                setProperty={setProperty}
                                handleChange={handleChange}
                                isEditing={isEditingGeneralInfo}   
                            />
                        )}
                        {activeTab === 1 && (
                            <Amenities
                                property={property}
                                amenities={amenities}
                                handleChange={handleChange}
                                isEditing={isEditingAmenities}
                            />
                        )}
                        {activeTab === 2 && (
                            <Images
                                property={property}
                                setProperty={setProperty}
                                handleChange={handleChange}
                                isEditing={isEditingImages}
                            />
                        )}
                        {activeTab === 3 && (
                            <Documentation
                                property={property}
                                setProperty={setProperty}
                                handleChange={handleChange}
                                isEditing={isEditingDocumentation}
                            />
                        )}
                    </Box>
                    
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '0px solid', borderColor: 'divider', mb: 2, mr: 2 }}>
                        <Box sx={{ alignSelf: 'flex-end', pt: 2 }}>
                            {activeTab === 0 && !isEditingGeneralInfo && (
                                <Button
                                    startIcon={<EditIcon />}
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => handleEditClick(0)}
                                    sx={{ mr: 2, mb: 2 }}
                                >
                                    Edit
                                </Button>
                            )}
                            {activeTab === 0 && isEditingGeneralInfo && (
                                <>
                                    <Button
                                        size="medium"
                                        variant="outlined"
                                        onClick={() => handleCancelClick(0)}
                                        sx={{ mr: 2, mb: 2 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="medium"
                                        color="success"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                        sx={{ mr: 2, mb: 2 }}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                            {activeTab === 1 && !isEditingAmenities && (
                                <Button
                                    startIcon={<EditIcon />}
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => handleEditClick(1)}
                                    sx={{ mr: 2, mb: 2 }}
                                >
                                    Edit
                                </Button>
                            )}
                            {activeTab === 1 && isEditingAmenities && (
                                <>
                                    <Button
                                        size="medium"
                                        variant="outlined"
                                        onClick={() => handleCancelClick(1)}
                                        sx={{ mr: 2, mb: 2 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="medium"
                                        color="success"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                        sx={{ mr: 2, mb: 2 }}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                            {activeTab === 2 && !isEditingImages && (
                                <Button
                                    startIcon={<EditIcon />}
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => handleEditClick(2)}
                                    sx={{ mr: 2, mb: 2 }}
                                >
                                    Edit
                                </Button>
                            )}
                            {activeTab === 2 && isEditingImages && (
                                <>
                                    <Button
                                        size="medium"
                                        variant="outlined"
                                        onClick={() => handleCancelClick(2)}
                                        sx={{ mr: 2, mb: 2 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="medium"
                                        color="success"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                        sx={{ mr: 2, mb: 2 }}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                            {activeTab === 3 && !isEditingDocumentation && (
                                <Button
                                    startIcon={<EditIcon />}
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => handleEditClick(3)}
                                    sx={{ mr: 2, mb: 2 }}
                                >
                                    Edit
                                </Button>
                            )}
                            {activeTab === 3 && isEditingDocumentation && (
                                <>
                                    <Button
                                        size="medium"
                                        variant="outlined"
                                        onClick={() => handleCancelClick(3)}
                                        sx={{ mr: 2, mb: 2 }}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        size="medium"
                                        color="success"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                        sx={{ mr: 2, mb: 2 }}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                        </Box>
                    </Box>
                </Card>
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps={{
                        style: {
                            width: "60%",
                            maxHeight: '150px',
                            textAlign: 'center'
                        },
                    }}
                >
                    <DialogTitle>{"Error"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText sx={{ color: 'orange' }}>
                            {"Failed to update property"}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setOpen(false)} color="primary" variant="outlined" sx={{ color: 'green', borderColor: 'green' }}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
                <Dialog
                    open={isSaveDialogOpen}
                    onClose={() => setIsSaveDialogOpen(false)}
                    fullWidth={true}
                    maxWidth={'xs'}
                    PaperProps={{
                        style: {
                            color: 'orange',
                            boxShadow: 'none',
                            borderRadius: '5px'
                        }
                    }}
                >
                    <DialogTitle style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <CheckCircleOutlineIcon style={{ color: 'green', fontSize: '3rem' }} />
                        Property updated successfully
                    </DialogTitle>
                </Dialog>
            </ThemeProvider>
        </MenuLayout>
    );
}

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

const Amenities = ({ property, handleChange }) => (
    <Box> 
        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF'}}>
                Acceso adaptado a personas con movilidad reducida
            </Typography>
            <Grid container spacing={2}>
                {accessAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF'}}>
                Equipamiento edificio
            </Typography>
            <Grid container spacing={2}>
                {buildingEquipmentAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                Vistas
            </Typography>
            <Grid container spacing={2}>
                {viewsAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                Características de acondicionamiento exterior
            </Typography>
            <Grid container spacing={2}>
                {exteriorConditioningAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                Equipamiento adicional
            </Typography>
            <Grid container spacing={2}>
                {additionalEquipmentAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                Características de acondicionamiento interior
            </Typography>
            <Grid container spacing={2}>
                {interiorConditioningAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    </Box>
);

const Images = () => (
    <Box>
        <Typography variant="h6">Images</Typography>
        {/* Add image upload and display functionality here */}
    </Box>
);

const Documentation = () => (
    <Box>
        <Typography variant="h6">Documentation</Typography>
        {/* Add documentation upload fields here */}
    </Box>
);
