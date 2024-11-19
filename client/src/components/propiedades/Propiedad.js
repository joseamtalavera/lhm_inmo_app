// Propiedad.js

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, CircularProgress, Box, Card, Divider, Tabs, Tab, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import theme from '../../styles/theme';
import MenuLayout from '../Menu/MenuLayout';
import GeneralInfo from './GeneralInfo';
import Amenities from './Amenities';
import Images from './Images';
import Documentation from './Documentation';

const Propiedad = () => {
    const { id } = useParams();
    const [property, setProperty] = useState();
    const [amenities, setAmenities ] = useState([]);
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
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
                    "M.Constr": data.metrosconstruidos,
                    "M.Utiles": data.metrosutiles,
                    "M.Parcela": data.metrosparcela,
                    Tipo: data.tipo_propiedad,
                    Habitaciones: data.habitaciones,
                    Baños: data.banos,
                    Aseos: data.aseos,
                    Estado: data.estado,
                    "Año.Const": data.anoconstruccion,
                    Calific: data.calificacion,
                    Cargas: data.cargas,
                    Planta: data.planta, // Ensure correct handling as string
                    "Ori.Entrada": data.orientacionentrada,
                    "Ori.Ventana": data.orientacionventana,
                    "Cert.Ener": data.certificadoenergetico,
                    "Valor.C.E": data.valorcertificadoenergetico,
                    "CO2/m2/Año": data.co2certificadoenergetico,
                    "Kw/Año": data.kwcertificadoenergetico,
                    "T.IBI": data.tributoibi,
                    "T.VADO": data.tributovado,
                    "T.Rústico": data.tributorustico,
                    Gastos: data.gastosvarios,
                    Gerencia: data.gerencia,
                    Comunidad: data.comunidadgastos,
                    Derrama: data.comunidadderrama,
                    "Cons.Elect": data.consumoelecticidad,
                    "Cons.Agua": data.consumoagua,
                    Internet: data.internet,
                    Gas: data.gas,
                    ITE: data.ite,
                    "Termo.Agua": data.termoagua,
                    "Sum.Agua": data.tipoagua,
                    Activa: data.active,
                    Foto: data.foto,
                    Destacada: data.destacada,
                    CreatedAt: data.created_at,
                    UpdatedAt: data.updated_at,
                   "Descripción": data.description
                };
                console.log(`Property fetched: ${JSON.stringify(data)}`);
                setProperty(transformedData);

                // Fetch property amenities
                const amenitiesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/amenities`);
                if (!amenitiesResponse.ok) throw new Error('Failed to fetch property amenities');
                const amenitiesData = await amenitiesResponse.json();
                console.log(`Amenities fetched: ${JSON.stringify(amenitiesData)}`);

                // Update state with fetched amenities
                const updatedProperty = { ...transformedData };
                amenitiesData.forEach(amenity => {
                    updatedProperty[amenity.label] = true;
                });
                setProperty(updatedProperty);
                setAmenities(amenitiesData.map(amenity => String(amenity.id))); // Update amenities state

                // Fetch property images
                const imagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/images`);
                if (!imagesResponse.ok) throw new Error('Failed to fetch property images');
                const imagesData = await imagesResponse.json();
                console.log(`Images fetched: ${JSON.stringify(imagesData)}`);
                setImages(imagesData);

                // Fetch property documents
                const documentsResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/documents`);
                if (!documentsResponse.ok) throw new Error('Failed to fetch property documents');
                const documentsData = await documentsResponse.json();
                console.log(`Documents fetched: ${JSON.stringify(documentsData)}`);
                setDocuments(documentsData);

            } catch (error) {
                console.error('Error fetching property data:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleChange = (e, amenityId) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox' && amenityId) {
            // Handle amenities
            setAmenities((prevAmenities) =>
                checked
                    ? [...prevAmenities, amenityId] // Add the amenity ID if checked
                    : prevAmenities.filter((id) => id !== amenityId) // Remove the amenity ID if unchecked
            );
        } else if (type === 'checkbox') {
            // Handle property checkboxes
            setProperty((prevProperty) => ({
                ...prevProperty,
                [name]: checked,
            }));
        } else {
            // Handle other property inputs
            setProperty((prevProperty) => ({
                ...prevProperty,
                [name]: value,
            }));
        }
    };

    const handleTabChange = (event, newValue) => {
        if (newValue === 4) {
            // Navigate to preview page
            navigate(`/dashboard/propiedades/${id}/preview`);
        } else {
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
                setIsEditingGeneralInfo(false);
                break;
            case 1:
                setIsEditingAmenities(false);
                break;
            case 2:
                setIsEditingImages(false);
                break;
            case 3:
                setIsEditingDocumentation(false);
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

            const updatedProperty = await response.json();
            setProperty((prevProperty) => ({
                ...prevProperty,
                ...updatedProperty,
                Ref: prevProperty.Ref, // Ensure Ref is preserved
            }));

            // Update amenities
            if(isEditingAmenities) {
                const ref = property.Ref;
                const amenitiesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${ref}/amenities`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ amenities }),
                });
                if (!amenitiesResponse.ok) throw new Error('Failed to update amenities');
            }
            setIsEditingGeneralInfo(false);
            setIsEditingAmenities(false);
            setIsEditingImages(false);
            setIsEditingDocumentation(false);

            setIsSaveDialogOpen(true);
            setTimeout(() => {
                setIsSaveDialogOpen(false);
            }, 2000);
        } catch (error) {
            console.error(error);
            setOpen(true);
        }
    };
    // Handle image upload
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!property || !property.ref) {
                console.error('property or property.ref is undefined');
                return;
            }
            const formData = new FormData();
            formData.append('image', file);
            formData.append('ref', property.ref);

            console.log('Uploading file:', file);
            try {
                console.log('Property ref:', property.ref); // Check if this is defined
                const response = await fetch(
                    `${process.env.REACT_APP_API_URL}/api/properties/${property.ref}/images`, 
                    {
                    method: 'POST',
                    body: formData,
                }
            );

                if (!response.ok) throw new Error('Failed to upload image');
                const newImage = await response.json();
                console.log('Uploaded image response:', newImage);
                
                setImages((prevImages) => [...prevImages, newImage]);
            } catch (error) {
                console.error('Error uploading image:', error);
            }
        }
    };

    const handleDelete = async (imageId) => {
        try {
            console.log(`Attempting to delete image with ID: ${imageId}`);
    
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/images/${imageId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) throw new Error('Failed to delete image');
    
            console.log(`Successfully deleted image with ID: ${imageId}`);
            setImages((prevImages) => prevImages.filter((image) => image.id !== imageId));
        } catch (error) {
            console.error('Error deleting image:', error);
            setOpen(true);
        }
    };
    

    const handleDocumentUpload = async (e) => {
        if (!property || !property.ref) {
            console.error('property or property.ref is undefined');
            return;
        }
        const file = e.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('document', file);
            formData.append('ref', property.ref);

            console.log('Uploading document:', file);
            try {
                console.log('Property ref:', property.ref); // Check if this is defined
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${property.ref}/documents`, {
                    method: 'POST',
                    body: formData,
                });

                if (!response.ok) throw new Error('Failed to upload document');
                const newDocument = await response.json();
                console.log('Uploaded document response:', newDocument);
                setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
            } catch (error) {
                console.error('Error uploading document:', error);
            }
        }
    };

    const handleDeleteDocument = async (documentId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/documents/${documentId}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Failed to delete document');

            console.log(`Successfully deleted document with ID: ${documentId}`);
            setDocuments((prevDocuments) => prevDocuments.filter((document) => document.id !== documentId));
        } catch (error) {
            console.error('Error deleting document:', error);
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
                        <Tab label="Informacion" />
                        <Tab label="Amenities" />
                        <Tab label="Imagenes" />
                        <Tab label="Documentos" />
                        <Tab label="Preview" />
                    </Tabs>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                        {activeTab === 0 && (
                            <GeneralInfo
                                property={property}
                                handleChange={handleChange}
                                isEditing={isEditingGeneralInfo}
                                setProperty={setProperty}
                                setActiveTab={setActiveTab} // Pass setActiveTab as a prop
                            />                            
                        )}
                        {activeTab === 1 && (
                            <Amenities
                                amenities={amenities}
                                handleChange={handleChange}
                                isEditing={isEditingAmenities}
                            />
                        )}
                        {activeTab === 2 && (
                            <Images
                                images={images}
                                setImages={setImages}
                                isEditing={isEditingImages}
                                handleUpload={handleUpload} 
                                handleDelete={handleDelete}
                            />
                        )}
                        {activeTab === 3 && (
                            <Documentation
                                documents={documents}
                                setDocuments={setDocuments}
                                isEditing={isEditingDocumentation}
                                handleDocumentUpload={handleDocumentUpload} 
                                handleDeleteDocument={handleDeleteDocument}
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
};

export default Propiedad;