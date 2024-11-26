// addPropiedad.js
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import {
    Button,
    Box,
    Card,
    Divider,
    Tabs,
    Tab,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    //CircularProgress
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import theme from '../../styles/theme';
import MenuLayout from '../Menu/MenuLayout';
import GeneralInfo from './GeneralInfo';
import Amenities from './Amenities';
import Images from './Images';
import Documentation from './Documentation';
import EditIcon from '@mui/icons-material/Edit';

const AddPropiedad = () => {
    const {id} = useParams();
    const [property, setProperty] = useState({});
    const [amenities, setAmenities] = useState([]); // Ensure amenities is initialized as an empty array
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const [ isEditingGeneralInfo, setIsEditingGeneralInfo ] = useState(true);
    const [isEditingAmenities, setIsEditingAmenities] = useState(true);
    const [isEditingImages, setIsEditingImages] = useState(true);
    const [isEditingDocumentation, setIsEditingDocumentation] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    //const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(true);


    useEffect(() => {
        setIsModalOpen(true);
    }, []);
    
    const handleSaveClick = () => {
        setIsModalOpen(false);
        createPropertyFirst();
    };

    useEffect(() => {
        const fetchExistingReferences = async () => {
            const storedReferences = JSON.parse(localStorage.getItem('references')) || [];
            return storedReferences; // Correctly close this function
        };

        const generateRef = async () => {
            const prefix = 'LHA';
            const existingReferences = await fetchExistingReferences();
            const referenceNumbers = existingReferences.map(ref => parseInt(ref.replace(prefix, ''), 10));

            let nextRefNumber = 1040;
            while (referenceNumbers.includes(nextRefNumber)) {
                nextRefNumber++;
            }

            const newRef = `${prefix}${nextRefNumber}`;
            localStorage.setItem('references', JSON.stringify([...existingReferences, newRef]));

            return newRef; // Ensure the function is properly closed here
        };

        generateRef().then(newRef => {
            setProperty(prevProperty => ({
                ...prevProperty,
                Ref: newRef,
            }));
        });

        
    }, []); 

    const handleChange = (e, amenityId) => {
        const { name, value, type } = e.target; // Remove 'checked' from destructuring
    
        if (type === 'checkbox' && amenityId) {
            // Handle amenities 
            setAmenities((prevAmenities) =>
                e.target.checked
                    ? [...prevAmenities, amenityId] // Add the amenity ID if checked
                    : prevAmenities.filter((id) => id !== amenityId) // Remove the amenity ID if unchecked
            );
        } else if (type === 'checkbox') {
            // Handle property checkboxes
            setProperty({
                ...property,
                [name]: e.target.checked, // Use e.target.checked instead of 'checked' from destructuring
            });
        } else {
            // handle all other inputs
            setProperty({
                ...property,
                [name]: value,
            });
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
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

    const createPropertyFirst = async (e) => {
       if (e) e.preventDefault();
        const dataToPost = {
            ...property,
            amenities, 
            images,
            documents
        };
        console.log('Submitting:', dataToPost); 
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToPost), // Use dataToPost to include amenities
            });

            if (!response.ok) throw new Error('Failed to add property');
            const createdProperty = await response.json();

            setProperty((prevProperty) => ({
                ...prevProperty,
                ...createdProperty,
            }));

            setIsSaveDialogOpen(true);
            setTimeout(() => {
                setIsSaveDialogOpen(false);
                //navigate('/dashboard/propiedades');
            }, 2000);

            console.log('Property created successfully:', createdProperty);
            return createdProperty; // Return the created property
        } catch (error) {
            console.error(error);
            setOpen(true);
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

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!property || !property.ref) {
                console.error('property or property.ref is undefined');
                //return;
                await saveProperty();
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
    // not sure, if we need this function
    const saveProperty = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(property),
            });
    
            if (!response.ok) throw new Error('Failed to save property');
    
            const updatedProperty = await response.json();
            setProperty((prevProperty) => ({
                ...prevProperty,
                ...updatedProperty,
            }));
    
            console.log('Property saved successfully:', updatedProperty);
        } catch (error) {
            console.error('Error saving property:', error);
            throw error; // Re-throw error to handle in the calling function
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

    /* if (isLoading) {
        return <Box><CircularProgress /></Box>;
    } */

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
                                setActiveTab={setActiveTab}
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
                            propertyRef={property.Ref}
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

                    {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '0px solid', borderColor: 'divider', mb: 2, mr: 2 }}>
                        <Button
                            size="medium"
                            color="success"
                            variant="outlined"
                            onClick={handleSubmit}
                            sx={{ mr: 2, mb: 2 }}
                        >
                            Save
                        </Button>
                    </Box> */}

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
                            {"Failed to add property"}
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
                        Property added successfully
                    </DialogTitle>
                </Dialog>
                <Dialog
                    open={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
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
                    <DialogTitle style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: "#1E90FF     " }}>{"Creando Propiedad"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>{"Quieres crear una Propiedad?"}</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsModalOpen(false)} color="secondary" variant="outlined" sx={{ color: 'red', borderColor: 'red' }}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSaveClick} color="primary" variant="outlined" sx={{ color: 'primary', borderColor: 'primary' }}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </MenuLayout>
    );
}; 

export default AddPropiedad;

