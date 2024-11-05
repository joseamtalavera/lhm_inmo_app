// BasicTablePropiedades 

import React, { useEffect, useState } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, CircularProgress, Chip, TablePagination } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import theme from '../../styles/theme';
import { ThemeProvider } from '@mui/material/styles';

export default function DataTable() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        const fetchProperties = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch properties');
                }
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const handleRowClick = (id) => {
        const property = properties.find(property => property.id === id);
        navigate(`/dashboard/propiedades/${id}`, { state: { property: property } });
    };

    const handleDelete = async (id) => {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to delete property');
        }
        setProperties(properties.filter(property => property.id !== id));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const filteredProperties = properties.filter(property =>
        property.title.toLowerCase().includes(filter.toLowerCase()) ||
        property.direccion.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', mt: 4}}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Foto Principal</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>ID</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Título</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Localidad</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Activa</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {properties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
                                    <TableRow key={property.id} onClick={() => handleRowClick(property.id)} style={{ cursor: 'pointer' }}>
                                        <TableCell>
                                            <img src={property.foto} alt="Foto Principal" style={{ width: '100px', height: 'auto' }} />
                                        </TableCell>
                                        <TableCell>{property.id}</TableCell>
                                        <TableCell>{property.title}</TableCell>
                                        <TableCell>{property.localidad}</TableCell>
                                        <TableCell>
                                            <Chip
                                                label={property.active ? "Activa" : "Inactiva"}
                                                icon={property.active ? <CheckCircleIcon /> : <CancelIcon />}
                                                color={property.active ? "success" : "error"}
                                                variant="outlined"
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton color="primary" onClick={() => navigate(`/dashboard/propiedades/${property.id}`)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton color="secondary" onClick={() => handleDelete(property.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50]}
                        component="div"
                        count={properties.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                    </>
                )}
            </Box>
        </ThemeProvider>
    );
}