import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { 
    CircularProgress, 
    Box, 
    Divider, 
    Tabs, 
    Tab, 
    Dialog, 
    DialogContent, 
    DialogActions,
    Menu,
    TextField,
    DialogTitle,
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';
import theme from '../../styles/theme';
import MenuLayout from '../Menu/MenuLayout';
import GeneralInfo from './GeneralInfo';
import Amenities from './Amenities';
import Images from './Images';
import Documentation from './Documentation';
import {
    StyledCard,
    StyledBox,
    StyledButton,
    StyledIconButton,
    StyledMenuItem,
    StyledDialogContentText,
    StyledMenuBox,
    StyledActionBox,
    StyledAlignBox,
    StyledDialogTitle,
    StyledDialogActionsButton,
    StyledDialogPaper,
    StyledSaveDialogPaper,
    StyledCancelButton,
    StyledDialogSubir,
} from '../../styles/PropiedadStyles';


const Propiedad = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();

    const [property, setProperty] = useState({});
    const [amenities, setAmenities ] = useState([]);
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    // Edit states for each tab
    const [isEditingGeneralInfo, setIsEditingGeneralInfo] = useState(location.state?.edit ?? false);
    const [isEditingAmenities, setIsEditingAmenities] = useState(location.state?.edit ?? false);
    const [isEditingImages, setIsEditingImages] = useState(location.state?.edit ?? false);
    const [isEditingDocumentation, setIsEditingDocumentation] = useState(location.state?.edit ?? false);
    
    // UI states
    const [activeTab, setActiveTab] = useState(0);
    const [open, setOpen] = useState(false);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    // Mobile menu anchor state
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    // States for Document Upload Modal
    const [openDocumentModal, setOpenDocumentModal] = useState(false);
    const [selectedDocument, setSelectedDocument] = useState(null);
    const [documentTipo, setDocumentTipo] = useState('');
    const [documentDescripcion, setDocumentDescripcion] = useState('');

    // ------------------Menu handlers------------------
    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };
    const handleMenuItemClick = (index) => {
        setActiveTab(index);
        handleMenuClose();
    };

    // ------------------fetchProperty logic------------------

    useEffect(() => {
        const fetchProperty = async () => {
            setIsLoading(true);
            console.log(`Fetching property with id: ${id}`);
            try {
                // 1) Fetch property data
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`);
                if (!response.ok) throw new Error('Failed to fetch property');
                const data = await response.json();
                console.log(`Property fetched: ${JSON.stringify(data)}`);

                // 2) Update state with server respons data
                setProperty(data);

                // 3) Fetch property amenities
                const amenitiesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/amenities`);
                if (!amenitiesResponse.ok) throw new Error('Failed to fetch property amenities');
                const amenitiesData = await amenitiesResponse.json();
                console.log(`Amenities fetched: ${JSON.stringify(amenitiesData)}`);

                // Update state with fetched amenities
                const updatedProperty = { ...data };
                amenitiesData.forEach(amenity => {
                    updatedProperty[amenity.label] = true;
                });
                setProperty(updatedProperty);
                setAmenities(amenitiesData.map(amenity => String(amenity.id))); // Update amenities state

                // 5) Fetch property images
                const imagesResponse = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${data.ref}/images`);
                if (!imagesResponse.ok) throw new Error('Failed to fetch property images');
                const imagesData = await imagesResponse.json();
                console.log(`Images fetched: ${JSON.stringify(imagesData)}`);
                setImages(imagesData);

                // 6) Fetch property documents
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

    useEffect(() => {
        if (images.length > 0) {
          // Construct a new URL with a cache-busting query parameter
          const updatedUrl = `${images[0].url}?t=${Date.now()}`;
          setProperty(prev => ({ ...prev, url: updatedUrl }));
        }
      }, [images]);

    // ------------------fetchUpadatedImages logic------------------
    const fetchUpdatedImages = async () => {
        try {
            console.log('Fetching updated images');
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${property.ref}/images?timestamp=${Date.now()}`);
            
            if (!response.ok) throw new Error('Failed to fetch updated images');
            const imagesData = await response.json();
            console.log('Updated images fetched:', imagesData);
            
            setImages(imagesData);

            // If there is at least one image, update property.url dynamically
            if (imagesData.length > 0) {
                const updatedUrl = `${imagesData[0].url}?t=${Date.now()}`;
                setProperty(prev => ({
                    ...prev,
                    url: updatedUrl,
                }));
            }

        } catch (error) {
            console.error('Error fetching updated images:', error);
        }
    };



    //------------------handleChange logic------------------

    const handleChange = (e, amenityId, forcedChecked) => {
        const { name, value, type, checked } = e.target;
        const finalChecked = forcedChecked !== undefined ? forcedChecked : checked;
        
        // If it's a checkbox, handle it differently
        if (type === 'checkbox' && amenityId !== undefined) {
            // Amnity checkboxes
            const amenityIdStr = String(amenityId);
            setAmenities((prevAmenities) => {
                if (finalChecked && !prevAmenities.includes(amenityIdStr)) {
                    console.log(`Adding Amenity ID: ${amenityIdStr}`);
                    return [...prevAmenities, amenityIdStr];
                }
                if (!finalChecked) {
                    console.log(`Removing Amenity ID: ${amenityIdStr}`);
                    return prevAmenities.filter((id) => id !== amenityIdStr);
                }
                console.log(`No changes for Amenity ID: ${amenityIdStr}`);
                return prevAmenities; // No changes if the ID is already present
            });
        // If is a normal property checkbox
        } else if (type === 'checkbox') {
            // Property checkboxes
            setProperty((prevProperty) => ({
                ...prevProperty,
                [name]: finalChecked,
            }));
        } else {
            // Other property inputs
            setProperty((prevProperty) => ({
                ...prevProperty,
                [name]: value,
            }));
        }
    }; 
    
    // ------------------Tab change logic------------------
    
    const handleTabChange = (event, newValue) => {
        if (newValue === 4) {
            // Navigate to preview page
            navigate(`/viviendas/${id}`);
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

    // ------------------handleSubmit logic (PUT)------------------

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
            // Store the updated property in state
            setProperty((prevProperty) => ({
                ...prevProperty,
                ...updatedProperty,
            }));

            // Update amenities
            if(isEditingAmenities) {
                const ref = property.ref;
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

    // ------------------saveProperty logic userd for image uploading------------------

    const saveProperty = async () => {
        if (!property || !property.ref) {
            console.error('Property state is undefined');
            return null;
        }

        setIsSaving(true);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(property),
            });
    
            if (!response.ok) {
                throw new Error('Failed to save property');
            }
    
            const updatedProperty = await response.json();

            // Merge updated property with existing property state
           /*  setProperty((prevProperty) => ({
                ...prevProperty,
                ...updatedProperty,
            })); */
    
            console.log('Property saved successfully:', updatedProperty);
            
            return updatedProperty; // Return only the ref
        } catch (error) {
            console.error('Error saving property:', error);
            return null; 
        } finally {
            setIsSaving(false);
        }
    };

    // ------------------uploadImage logic for Image Uploading------------------
    
    const uploadImage = async (file, ref) => {
        const formData = new FormData();
        formData.append('image', file);
        formData.append('ref', ref);
    
        console.log('Uploading file:', file);
    
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${ref}/images`, {
                method: 'POST',
                body: formData,
            });
    
            if (!response.ok) {
                throw new Error('Failed to upload image');
            }

            console.log('Image uploaded successfully');

            // Wait briefly to allow the server to update the image
            const uploadedImage = await new Promise(resolve => setTimeout(resolve, 500));
            await fetchUpdatedImages(); // Fetch the updated images from the server

            return uploadedImage;
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    // ------------------handleUpload logic for Image Uploading------------------
    
    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file || isUploading) {
            return;
        }
        setIsUploading(true);

        try {
            // Ensure property is saved and ref is available
            const updatedProperty = property?.ref
                ? property
                : await saveProperty();
    
            if (!updatedProperty.ref) {
                console.error('Property ref is undefined after saving');
                return;
            }
            setProperty(updatedProperty); // Update property state
            await uploadImage(file, updatedProperty.ref); // Upload the image

            await saveProperty(); // Save the property again to update the image count
            await fetchUpdatedImages(); // Fetch the updated images from the server

            e.target.value = null; // Clear the file input

        } catch (error) {
            console.error('Error in handleUpload:', error);
        } finally {
            setIsUploading(false); // Reset the uploading state
        }
    };

    // ------------------deleteImage logic for Image Deletion------------------

    const handleDelete = async (imageId) => {
        try {
            console.log(`Attempting to delete image with ID: ${imageId}`);
    
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/images/${imageId}`, {
                method: 'DELETE',
            });
    
            if (!response.ok) throw new Error('Failed to delete image');
    
            console.log(`Successfully deleted image with ID: ${imageId}`);

            // Immediately update state to remove the deleted image.
            setImages(prevImages => prevImages.filter(image => image.id !== imageId));
            // Optionally, fetch updated images from the server.
            await fetchUpdatedImages();
        } catch (error) {
            console.error('Error deleting image:', error);
            setOpen(true);
        }
    };

    // ------------------handleDocumentUpload logic for Document Uploading------------------

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

    // ------------------handleDeleteDocument logic for Document Deletion------------------

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

    // ------------------handleOpenDocumentModal logic for opening the modal------------------

    const handleOpenDocumentModal = (shouldOpen = true) => {
        if (shouldOpen) {
            setOpenDocumentModal(true);
            setDocumentTipo('');
            setDocumentDescripcion('');
            setSelectedDocument(null);
        } else {
            setOpenDocumentModal(false);
        }
    };

    // ------------------handleCloseDocumentModal (Close the Modal)------------------
    const handleCloseDocumentModal = () => {
        setOpenDocumentModal(false);
    };

    // ------------------handleDocumentSubmit logic for submitting the document------------------

    const handleDocumentSubmit = async () => {
        if (!selectedDocument || !documentTipo || !documentDescripcion) {
            console.error('Todos los campos son requeridos');
            return;
        }

        const formData = new FormData();
        formData.append('document', selectedDocument);
        formData.append('tipo', documentTipo);
        formData.append('descripcion', documentDescripcion);
        formData.append('ref', property.ref);

        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${property.ref}/documents`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Fallo al subir el documento');
            }

            const newDocument = await response.json();
            setDocuments((prevDocuments) => [...prevDocuments, newDocument]);
            handleOpenDocumentModal(false); // Close the modal after successful submission
        } catch (error) {
            console.error('Error subiendo el documento:', error);
        }
    };
    
    if (isLoading) {
        return (
            <StyledBox>
                <CircularProgress />
            </StyledBox>
        );
    }

    return (
        <MenuLayout>
            <ThemeProvider theme={theme}>
                <StyledCard>
                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <StyledMenuBox>
                            <StyledIconButton
                                aria-label="more"
                                aria-controls="long-menu"
                                aria-haspopup="true"
                                onClick={handleMenuOpen}
                            >
                                <MenuIcon />
                            </StyledIconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={isMenuOpen}
                                onClose={handleMenuClose}
                                PaperProps={{
                                    style: {
                                        maxHeight: 48 * 4.5,
                                        width: '20ch',
                                    },
                                }}
                            >
                                <StyledMenuItem onClick={() => handleMenuItemClick(0)}>Informacion</StyledMenuItem>
                                <StyledMenuItem onClick={() => handleMenuItemClick(1)}>Amenities</StyledMenuItem>
                                <StyledMenuItem onClick={() => handleMenuItemClick(2)}>Imagenes</StyledMenuItem>
                                <StyledMenuItem onClick={() => handleMenuItemClick(3)}>Documentos</StyledMenuItem>
                                <StyledMenuItem onClick={() => handleMenuItemClick(4)}>Preview</StyledMenuItem>
                            </Menu>
                        </StyledMenuBox>
                    </Box>

                    {/* Desktop tabs */}
                    <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                        <Tabs value={activeTab} onChange={handleTabChange} centered>
                            <Tab label="Informacion" />
                            <Tab label="Amenities" />
                            <Tab label="Imagenes" />
                            <Tab label="Documentos" />
                            <Tab label="Preview" />
                        </Tabs>
                    </Box>
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
                                propertyRef={property?.ref}
                                isSaving={isSaving}
                            />
                        )}
                        {activeTab === 3 && (
                            <Documentation
                                documents={documents}
                                setDocuments={setDocuments}
                                isEditing={isEditingDocumentation}
                                handleDocumentUpload={handleDocumentUpload} 
                                handleDeleteDocument={handleDeleteDocument}
                                handleOpenDocumentModal={handleOpenDocumentModal} // Pass handleOpenDocumentModal as a prop to Anadir
                            />
                        )}
                    </Box>

                    {/* Action buttons (Edit / Cancel / Save) */}
                    <StyledActionBox>
                        <StyledAlignBox>
                            {activeTab === 0 && !isEditingGeneralInfo && (
                                <StyledButton
                                    startIcon={<EditIcon />}
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => handleEditClick(0)}
                                >
                                    Editar
                                </StyledButton>
                            )}
                            {activeTab === 0 && isEditingGeneralInfo && (
                                <>
                                    <StyledCancelButton
                                        size="medium"
                                        variant="outlined"
                                        onClick={() => handleCancelClick(0)}
                                    >
                                        Cancelar
                                    </StyledCancelButton>
                                    <StyledButton
                                        size="medium"
                                        color="success"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                    >
                                        Guardar
                                    </StyledButton>
                                </>
                            )}
                            {activeTab === 1 && !isEditingAmenities && (
                                <StyledButton
                                    startIcon={<EditIcon />}
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => handleEditClick(1)}
                                >
                                    Editar
                                </StyledButton>
                            )}
                            {activeTab === 1 && isEditingAmenities && (
                                <>
                                    <StyledCancelButton
                                        size="medium"
                                        variant="outlined"
                                        onClick={() => handleCancelClick(1)}
                                    >
                                        Cancelar
                                    </StyledCancelButton>
                                    <StyledButton
                                        size="medium"
                                        color="success"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                    >
                                        Guardar
                                    </StyledButton>
                                </>
                            )}
                            {activeTab === 2 && !isEditingImages && (
                                <StyledButton
                                    startIcon={<EditIcon />}
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => handleEditClick(2)}
                                >
                                    Editar
                                </StyledButton>
                            )}
                            {activeTab === 2 && isEditingImages && (
                                <>
                                    <StyledCancelButton
                                        size="medium"
                                        variant="outlined"
                                        onClick={() => handleCancelClick(2)}
                                    >
                                        Cancel
                                    </StyledCancelButton>
                                    <StyledButton
                                        size="medium"
                                        color="success"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                    >
                                        Guardar
                                    </StyledButton>
                                </>
                            )}
                            {activeTab === 3 && !isEditingDocumentation && (
                                <StyledButton
                                    startIcon={<EditIcon />}
                                    size="medium"
                                    variant="outlined"
                                    onClick={() => handleEditClick(3)}
                                >
                                    Editar
                                </StyledButton>
                            )}
                            {activeTab === 3 && isEditingDocumentation && (
                                <>
                                    <StyledCancelButton
                                        size="medium"
                                        variant="outlined"
                                        onClick={() => handleCancelClick(3)}
                                    >
                                        Cancelar
                                    </StyledCancelButton>
                                    <StyledButton
                                        size="medium"
                                        color="success"
                                        variant="outlined"
                                        onClick={handleSubmit}
                                    >
                                        Guardar
                                    </StyledButton>
                                </>
                            )}
                        </StyledAlignBox>
                    </StyledActionBox>
                </StyledCard>

                {/* Error dialog */}
                <Dialog
                    open={open}
                    onClose={() => setOpen(false)}
                    PaperProps={{ style: StyledDialogPaper }}
                >
                    <StyledDialogTitle>{"Error"}</StyledDialogTitle>
                    <DialogContent>
                        <StyledDialogContentText>
                            {"Failed to update property"}
                        </StyledDialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <StyledDialogActionsButton onClick={() => setOpen(false)} color="primary" variant="outlined">
                            OK
                        </StyledDialogActionsButton>
                    </DialogActions>
                </Dialog>

                {/* Save dialog */}
                <Dialog
                    open={isSaveDialogOpen}
                    onClose={() => setIsSaveDialogOpen(false)}
                    fullWidth={true}
                    maxWidth={'xs'}
                    PaperProps={{ style: StyledSaveDialogPaper }}
                >
                    <StyledDialogSubir>
                        <CheckCircleOutlineIcon style={{ color: 'green', fontSize: '3rem' }} />
                        La actualización realizada
                    </StyledDialogSubir>
                </Dialog>
                {/* ------------------- ADD DOCUMENT MODAL ------------------- */}
                <Dialog
                    open={openDocumentModal}
                    onClose={handleCloseDocumentModal}
                    fullWidth
                    maxWidth="sm"
                >
                    <StyledDialogSubir >
                        Subir Documento
                    </StyledDialogSubir>
                    <DialogContent>

                        {/* Tipo */}
                        <TextField
                            label="Tipo"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={documentTipo}
                            onChange={(e) => setDocumentTipo(e.target.value)}
                        />

                        {/* Descripción */}
                        <TextField
                            label="Descripción"
                            variant="outlined"
                            fullWidth
                            margin="normal"
                            value={documentDescripcion}
                            onChange={(e) => setDocumentDescripcion(e.target.value)}
                        />

                        {/* File Input */}
                        <Box sx={{ mt: 2 }}>
                            <input
                                type="file"
                                onChange={(e) => setSelectedDocument(e.target.files[0])}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <StyledCancelButton 
                            variant="outlined"
                            onClick={handleCloseDocumentModal}>
                            Cancelar
                        </StyledCancelButton>
                        <StyledButton 
                            size="medium"
                            color="success"
                            variant="outlined"
                            onClick={handleDocumentSubmit}>
                            Subir
                        </StyledButton>
                    </DialogActions>
                </Dialog>

            </ThemeProvider>
        </MenuLayout>
    );
};

export default Propiedad;