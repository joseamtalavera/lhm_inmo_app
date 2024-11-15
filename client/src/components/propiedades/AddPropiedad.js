// addPropiedad.js

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
    DialogActions
} from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import theme from '../../styles/theme';
import MenuLayout from '../Menu/MenuLayout';
import GeneralInfo from './GeneralInfo';
import Amenities from './Amenities';
import Images from './Images';
import Documentation from './Documentation';

const AddPropiedad = () => {
    const [property, setProperty] = useState({});
    const [amenities, setAmenities] = useState([]); // Ensure amenities is initialized as an empty array
    const [images, setImages] = useState([]);
    const [documents, setDocuments] = useState([]);
    const [activeTab, setActiveTab] = useState(0);
    const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
    const [open, setOpen] = useState(false);
    //const navigate = useNavigate();

    /* const handleChange = (e, amenityId) => {
        setAmenities((prevAmenities) =>
            e.target.checked
                ? [...prevAmenities, amenityId] // Add the amenity ID if checked
                : prevAmenities.filter((id) => id !== amenityId) // Remove the amenity ID if unchecked
        );
    }; */

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
    }, []); // Dependency array ensures this runs only once
    

    const handleChange = (e, amenityId) => {
        const { name, value, type } = e.target; // Remove 'checked' from destructuring
    
        if (type === 'checkbox' && amenityId) {
            setAmenities((prevAmenities) =>
                e.target.checked
                    ? [...prevAmenities, amenityId] // Add the amenity ID if checked
                    : prevAmenities.filter((id) => id !== amenityId) // Remove the amenity ID if unchecked
            );
        } else if (type === 'checkbox') {
            setProperty({
                ...property,
                [name]: e.target.checked, // Use e.target.checked instead of 'checked' from destructuring
            });
        } else {
            setProperty({
                ...property,
                [name]: value,
            });
        }
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const newImage = {
                id: images.length + 1,
                url: URL.createObjectURL(file),
                fototitle: file.name,
            };
            console.log('New image URL:', newImage.url);    
            setImages([...images, newImage]);
        }
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
            setIsSaveDialogOpen(true);
            setTimeout(() => {
                setIsSaveDialogOpen(false);
                //navigate('/dashboard/propiedades');
            }, 2000);
        } catch (error) {
            console.error(error);
            setOpen(true);
        }
    }; // Add closing bracket for handleSubmit

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
                                isEditing={true} // Always editable for new properties
                                setProperty={setProperty}
                                setActiveTab={setActiveTab}
                            />
                        )}
                        {activeTab === 1 && (
                            <Amenities
                                amenities={amenities}
                                handleChange={handleChange}
                                isEditing={true}
                            />
                        )}
                        {activeTab === 2 && (
                            <Images
                                images={images}
                                setImages={setImages}
                                isEditing={true}
                                handleUpload={handleUpload} // Pass handleUpload as a prop
                            />
                        )}
                        {activeTab === 3 && (
                            <Documentation
                                documents={documents}
                                setDocuments={setDocuments}
                                isEditing={true}
                            />
                        )}
                    </Box>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', borderTop: '0px solid', borderColor: 'divider', mb: 2, mr: 2 }}>
                        <Button
                            size="medium"
                            color="success"
                            variant="outlined"
                            onClick={handleSubmit}
                            sx={{ mr: 2, mb: 2 }}
                        >
                            Save
                        </Button>
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
            </ThemeProvider>
        </MenuLayout>
    );
}; // Add closing bracket for AddPropiedad component

export default AddPropiedad;