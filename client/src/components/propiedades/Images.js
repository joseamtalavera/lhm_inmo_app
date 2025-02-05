import React, { useRef } from 'react';
import { Box, Grid, Card, CardMedia, CardContent, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Images = ({ images, setImages, isEditing, handleUpload, handleDelete }) => {
    const fileInputRef = useRef(null);
   
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedImages = Array.from(images);
        const [movedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, movedImage);

        // Update the first image as the principal and cabecera image
        const updatedImages = reorderedImages.map((image, index) => ({
            ...image, 
            principal: index === 0 ? 1 : 0,
            cabecera: index === 0 ? 1 : 0,
        }));

        setImages(reorderedImages);

        // Update the images in the database
        updateAllImages(updatedImages);
    };

    const updateAllImages = async (updatedImages) => {
        try {
            console.log('Updating all images: ', updatedImages);
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/images/update-all`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedImages),
            });
    
            if (!response.ok) {
                throw new Error('Failed to update images');
            }
    
            console.log('Successfully updated all images');
        } catch (error) {
            console.error('Error updating images:', error);
        }
    };

    const handleTitleChange = (index, newTitle) => {
        const updatedImages = images.map((image, i) => 
            i === index ? { ...image, fototitle: newTitle } : image
        );
        setImages(updatedImages);
    };    

    return (
        <Box position={'relative'}>
            <DragDropContext 
                onDragEnd={isEditing ? handleDragEnd : () => {}}    
            >
                <Droppable droppableId="images" direction="horizontal">
                    {(provided) => (
                        <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
                            {images.map((image, index) => (
                                <Draggable 
                                    key={image.id} 
                                    draggableId={image.id.toString()} 
                                    index={index}
                                    isDragDisabled={!isEditing}
                                >
                                    {(provided) => (
                                        <Grid item xs={12} sm={6} md={4} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Card sx={{position: 'relative'}}>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={`${image.url}?timestamp=${Date.now()}`} 
                                                    alt={image.fototitle || 'Imagen de la Propiedad'}
                                                />
                                                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <TextField
                                                        label="Titulo"
                                                        value={image.fototitle || ''}
                                                        onChange={(e) => handleTitleChange(index, e.target.value)}
                                                        fullWidth
                                                        disabled={!isEditing}
                                                    />
                                                    <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', height: '56px', border: '1px solid #ddd', padding: '8px', borderRadius: '4px' }}>
                                                        <IconButton 
                                                            color="primary" 
                                                            onClick={() => {
                                                                console.log(`Delete button clicked for image ID: ${image.id}`);
                                                                handleDelete(image.id);
                                                            }}
                                                            disabled={!isEditing}
                                                        >
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )}
                                </Draggable>
                            ))}
                            {isEditing && (
                                <Grid item xs={12} sm={6} md={4}>
                                    <Box sx={{ width: '100%', mb: 2 }}>
                                        <Box
                                            sx={{
                                                width: '100%',
                                                height: '300px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                border: '2px dashed #ddd',
                                                borderRadius: '4px',
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => fileInputRef.current.click()}
                                        >
                                            <AddIcon sx={{ fontSize: 40, color: '#ddd' }} />
                                        </Box>
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            hidden
                                            onChange={handleUpload}
                                            //disabled={!propertyRef}
                                        />
                                    </Box>
                                </Grid>
                            )}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};

export default Images;