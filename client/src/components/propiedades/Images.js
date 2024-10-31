import React from 'react';
import { Box, Grid, Card, CardMedia, CardContent, IconButton, TextField } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const Images = ({ images, setImages }) => {
    const handleDragEnd = (result) => {
        if (!result.destination) return;

        const reorderedImages = Array.from(images);
        const [movedImage] = reorderedImages.splice(result.source.index, 1);
        reorderedImages.splice(result.destination.index, 0, movedImage);

        setImages(reorderedImages);
    };

    const handleDelete = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleTitleChange = (index, newTitle) => {
        const updatedImages = images.map((image, i) => 
            i === index ? { ...image, fototitle: newTitle } : image
        );
        setImages(updatedImages);
    };

    return (
        <Box>
            <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="images" direction="horizontal">
                    {(provided) => (
                        <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
                            {images.map((image, index) => (
                                <Draggable key={image.id} draggableId={image.id.toString()} index={index}>
                                    {(provided) => (
                                        <Grid item xs={12} sm={6} md={4} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                            <Card>
                                                <CardMedia
                                                    component="img"
                                                    height="200"
                                                    image={image.url}
                                                    alt={image.fototitle || 'Imagen de la Propiedad'}
                                                />
                                                <CardContent sx={{ display: 'flex', alignItems: 'center' }}>
                                                    <TextField
                                                        label="Titulo"
                                                        value={image.fototitle || ''}
                                                        onChange={(e) => handleTitleChange(index, e.target.value)}
                                                        fullWidth
                                                    />
                                                    <Box sx={{ ml: 2, display: 'flex', alignItems: 'center', height: '56px', border: '1px solid #ddd', padding: '8px', borderRadius: '4px' }}>
                                                        <IconButton color="primary" onClick={() => handleDelete(index)}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </Grid>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    );
};

export default Images;