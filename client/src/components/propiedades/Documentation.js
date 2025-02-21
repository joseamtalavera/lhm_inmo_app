import React, { useState } from 'react';
import { 
    Box, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper,
    Tabs,
} from '@mui/material';
import {
    StyledTableCell, 
    StyledButton,
    StyledIconButton,
    StyledBox,
    StyledTableRow,
    StyledTab
} from '../../styles/DocumentationStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const Documentation = ({ 
    documents, 
    planos,        
    isEditing,  
    handleDocumentUpload, 
    handleDeleteDocument,
    handlePlanoUpload,   
    handleDeletePlano,   
    handleOpenDocumentModal 
}) => {
    const [docTab, setDocTab] = useState('documentos');

    const handleDocTabChange = (event, newValue) => {
        setDocTab(newValue);
    };

    // Filter based on selected subtab. For 'planos', use the planos prop.
    let filteredItems = [];
    if (docTab === 'documentos') {
        filteredItems = documents.filter(document => document.tipo !== 'Planos' && document.tipo !== 'Certificado Electrico');
    } else if (docTab === 'planos') {
        filteredItems = planos;
    } else if (docTab === 'certificado') {
        filteredItems = documents.filter(document => document.tipo === 'Certificado Electrico');
    }

    return (
        <Box>
            {/* Tabs for sub-categories */}
            <Box mb={2}>
                <Tabs
                    value={docTab}
                    onChange={handleDocTabChange}
                    textColor="inherit"
                    TabIndicatorProps={{ style: { backgroundColor: '#1E90FF' } }}
                >
                    <StyledTab label="Documentos" value="documentos" />
                    <StyledTab label="Planos" value="planos" />
                    <StyledTab label="Certificado Electrico" value="certificado" />
                </Tabs>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Tipo</StyledTableCell>
                            <StyledTableCell>Descripcion</StyledTableCell>
                            <StyledTableCell>Acciones</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {filteredItems.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.tipo || 'No disponible'}</TableCell>
                                <TableCell>{item.descripcion}</TableCell>
                                <TableCell>
                                    <StyledIconButton 
                                        component="a" 
                                        href={item.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                    >
                                        <VisibilityIcon />
                                    </StyledIconButton>
                                    <StyledIconButton 
                                        color="primary" 
                                        onClick={() => {
                                            if (docTab === 'planos') {
                                                handleDeletePlano(item.id);
                                            } else {
                                                handleDeleteDocument(item.id);
                                            }
                                        }}
                                        disabled={!isEditing}
                                    >
                                        <DeleteIcon />
                                    </StyledIconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {isEditing && (
                <StyledBox sx={{ mt: 2 }}>
                    <StyledButton
                        variant="outlined"
                        component="label"
                        startIcon={<AddIcon />}
                        // Update onClick to pass the current tab value as the upload category
                        onClick={() => handleOpenDocumentModal(docTab)}
                    >
                        Añadir
                    </StyledButton>
                </StyledBox>
            )}
        </Box>
    );
};

export default Documentation;