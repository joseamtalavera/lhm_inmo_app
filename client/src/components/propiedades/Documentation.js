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
    StyledTab  // newly added
} from '../../styles/DocumentationStyles';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AddIcon from '@mui/icons-material/Add';

const Documentation = ({ 
    documents, 
    isEditing,  
    handleDeleteDocument, 
    handleOpenDocumentModal 
}) => {
    // New state for subtab selection with default "archivos"
    const [docTab, setDocTab] = useState('archivos');

    const handleDocTabChange = (event, newValue) => {
        setDocTab(newValue);
    };

    // Filter documents based on the selected subtab.
    const filteredDocuments = documents.filter(document => {
        if (docTab === 'documentos') {
            return document.tipo !== 'Planos' && document.tipo !== 'Certificado Electrico';
        }
        if (docTab === 'planos') {
            return document.tipo === 'Planos';
        }
        if (docTab === 'certificado') {
            return document.tipo === 'Certificado Electrico';
        }
        return true;
    });

    return (
        <Box>
            {/* New Tabs for subtabs */}
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
                            <StyledTableCell >Descripcion</StyledTableCell>
                            <StyledTableCell >Acciones</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {filteredDocuments.map((document, index) => {
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