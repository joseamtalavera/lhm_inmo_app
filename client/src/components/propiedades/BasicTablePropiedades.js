/* //BasiTablePropiedades.js

import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useNavigate} from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import ResponsiveDialog from '../../utils/ResponsiveDialog';
import theme from '../../styles/theme';
import {
    StyledBox,
    StyledCircularProgress,
    ImageContainer,
    ImageWrapper,
    Image,
    IconContainer,
    EditIcon,
    DeleteIcon,
    StyledChip,
    StyledCheckCircleIcon,
    StyledCancelIcon
} from '../../styles/BasicTablePropiedadesStyles';

export default function DataTable() {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const columns = [
        { 
            field: 'foto', 
            headerName: 'Foto Principal', 
            width: 150, 
            filterable: true,
            renderCell: (params) => {
                const property = params.row;
                return (
                    <ImageContainer>
                    <ImageWrapper>
                        <Image
                            src={property.foto} 
                            alt="Foto Principal" 
                        />
                    </ImageWrapper>
                </ImageContainer>
                );
            }
        },
        { field: 'id', headerName: 'ID', width: 120, filterable: true },
        { field: 'title', headerName: 'Título', width: 400, filterable: true },
        { field: 'localidad', headerName: 'Localidad', width: 150, filterable: true },
        { 
            field: 'activa', 
            headerName: 'Activa', 
            width: 150, 
            filterable: true,
            renderCell: (params) => {
                const isActive = params.row.activa;
                return (
                    <StyledChip
                    active={isActive}
                    variant="outlined"
                    label={isActive ? "Activa" : "Inactiva"}
                    icon={isActive ? <StyledCheckCircleIcon/> : <StyledCancelIcon fontSize='small' />}
                />
                );
            }
        },
        {
            field: 'edit',
            headerName: ' ',
            sortable: false,
            width: 150,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = ()=> {
                    const id = params.row.id;
                    navigate(`/dashboard/propiedades/${id}`);
                };
                return (
                    <IconContainer>
                        <EditIcon onClick={onClick} />
                    </IconContainer>
                );
            }
        },
        { 
            field: 'delete', 
            headerName: ' ', 
            sortable: false,
            width: 150, 
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = async () => {
                    const id = params.row.id;
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
                return (
                    <IconContainer>
                        <ResponsiveDialog onDelete={onClick} icon={<DeleteIcon />} />
                    </IconContainer>
                );
            }
        },
    ];

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

    const handleRowClick = (params) =>{
        const property = properties.find(property => property.id === params.row.id);
        navigate(`/dashboard/propiedades/${params.row.id}`, { state: { property: property } });
    };

    return (
        <ThemeProvider theme={theme}>
            <StyledBox>
                {isLoading ? (
                    <StyledCircularProgress/>
                ) : (
                    <DataGrid
                        style={{ height: 550, width: '100%', cursor: 'pointer'}}
                        rows={properties}
                        columns={columns}
                        pageSize={25}
                        rowHeight={75}
                        rowsPerPageOptions={[10, 25, 50, 100]}
                        checkboxSelection
                        components={{
                            Toolbar: GridToolbar,
                        }}
                        componentsProps={{
                            toolbar: {
                                density: 'compact',
                            },
                        }}
                        onRowClick={handleRowClick}
                        disableVirtualization
                    />
                )}
            </StyledBox>
        </ThemeProvider>
    );
}
 */

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
                                                label={property.activa ? "Activa" : "Inactiva"}
                                                icon={property.activa ? <CheckCircleIcon /> : <CancelIcon />}
                                                color={property.activa ? "success" : "error"}
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