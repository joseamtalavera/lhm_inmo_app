import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, CircularProgress, Box, Card, Typography, Divider, Stack, Grid, FormControl, FormLabel, OutlinedInput, Select, MenuItem, Accordion, AccordionSummary, AccordionDetails, IconButton, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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

const generateGridItem = (field, property, handleChange, isEditing) => (
    <Grid item xs={12} md={3} key={field}>
        <FormControl variant="outlined" sx={{ width: '100%' }}>
            <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                <Typography variant="body2" sx={{ color: 'black' }}>
                    {field}<span style={{ color: 'orange', fontSize: '1.5em' }}>*</span>
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
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [open, setOpen] = useState(false);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`);
                if (!response.ok) throw new Error('Failed to fetch property');
                const data = await response.json();
                setProperty(data);
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleChange = (e) => {
        setProperty({
            ...property,
            [e.target.name]: e.target.value,
        });
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
            <Box sx={{ mb: 1, mt: 1, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 0.5, ml: 2, color: 'orange' }}>
                        Edit Property
                    </Typography>
                </Box>
                <FormControl variant="outlined" sx={{ ml: 'auto', width: '200px' }}>
        <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
            <Typography variant="body2" sx={{ color: 'black' }}>
                Activa<span style={{ color: 'orange', fontSize: '1.5em' }}>*</span>
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
            </Box>
            <Divider />
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
                    <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'orange' }}>
                            Informacion General
                        </Typography>
                        <Grid container spacing={2}>
                            {primaryFields.map(field => generateGridItem(field, property, handleChange, isEditing))}
                            <Grid item xs={12} md={12}>
                                <FormControl variant="outlined" sx={{ width: '100%' }}>
                                    <FormLabel sx={{ mb: 0.5, fontWeight: 'bold' }}>
                                        <Typography variant="body2" sx={{ color: 'black' }}>
                                            Descripción<span style={{ color: 'orange', fontSize: '1.5em' }}>*</span>
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
                        <Typography variant="h6" sx={{ mb: 2, color: 'orange' }}>
                            Características
                        </Typography>
                        <Grid container spacing={2}>
                            {secondaryFields.map(field => generateGridItem(field, property, handleChange, isEditing))}
                        </Grid>
                    </Box>
                    <Box sx={{  width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px'}}>
                        <Typography variant="h6" sx={{ mb: 2, color: 'orange' }}>
                            Extras
                        </Typography>
                        <Grid container spacing={2}>
                            {extraFields.map(field => generateGridItem(field, property, handleChange, isEditing))}
                        </Grid>
                    </Box>
                </Box>
            </Stack>
            
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '0px solid', borderColor: 'divider' }}>
                <Box sx={{ alignSelf: 'flex-end', pt: 2 }}>
                    {!isEditing && (
                        <Button
                            startIcon={<EditIcon />}
                            size="small"
                            variant="outlined"
                            onClick={() => setIsEditing(true)}
                        >
                            Edit
                        </Button>
                    )}
                    {isEditing && (
                        <>
                            <Button
                                size="small"
                                variant="outlined"
                                onClick={() => setIsEditing(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                size="small"
                                color="success"
                                variant="outlined"
                                onClick={handleSubmit}
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