
import React from 'react';
import { 
    Box, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
} from '@mui/material';
import {
    StyledTypography, 
    StyledTableCell, 
    StyledButton,
    StyledIconButton,
    StyledBox,
    StyledTableRow
} from '../../styles/DocumentationStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const Documentation = ({ documents, setDocuments, isEditing, handleDocumentUpload, handleDeleteDocument, handleOpenDocumentModal }) => {
    return (
        <Box>
            <StyledTypography variant="h6">
                Documentación
            </StyledTypography>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Tipo</StyledTableCell>
                            <StyledTableCell >Descripcion</StyledTableCell>
                            <StyledTableCell >Acciones</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {documents.map((document, index) => {
                            return (
                                <TableRow key={document.id}>
                                    <TableCell>{document.tipo || 'Tipo no disponible'}</TableCell>
                                    <TableCell>{document.descripcion}</TableCell>
                                    <TableCell>
                                        <StyledIconButton 
                                            component="a" 
                                            href={document.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer">
                                            <VisibilityIcon />
                                        </StyledIconButton>
                                        <StyledIconButton 
                                            color="primary" 
                                            onClick={() => handleDeleteDocument(document.id)}
                                            disabled={!isEditing}
                                        >
                                            <DeleteIcon />
                                        </StyledIconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {isEditing && (
                <StyledBox sx={{ mt: 2 }}>
                    <StyledButton
                        variant="outlined"
                        component="label"
                        startIcon={<AddIcon />}
                        onClick={handleOpenDocumentModal}
                    >
                        Añadir
                    </StyledButton>
                </StyledBox>
            )}
        </Box>
    );
};

export default Documentation;