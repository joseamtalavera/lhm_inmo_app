// Documentation.js

import React from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const Documentation = ({ documents, setDocuments, isEditing, handleUpload }) => {
    const handleDelete = (index) => {
        const updatedDocuments = documents.filter((_, i) => i !== index);
        setDocuments(updatedDocuments);
    };

    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                Documentación
            </Typography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Tipo</TableCell>
                            <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Descripcion</TableCell>
                            <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((document, index) => {
                            return (
                                <TableRow key={document.id}>
                                    <TableCell>{document.tipo}</TableCell>
                                    <TableCell>{document.descripcion}</TableCell>
                                    <TableCell>
                                        <IconButton component="a" href={document.url} target="_blank" rel="noopener noreferrer">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton color="primary" onClick={() => handleDelete(index)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {isEditing && (
                <Box sx={{ mt: 2 }}>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<UploadFileIcon />}
                    >
                        Subir
                        <input
                            type="file"
                            hidden
                            onChange={handleUpload}
                        />
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default Documentation;