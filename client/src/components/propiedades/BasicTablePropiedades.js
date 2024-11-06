// BasicTablePropiedades 

import React, { useEffect, useState, useMemo } from 'react';
import { 
    Box, 
    Table, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton, 
    CircularProgress, 
    Chip, 
    TablePagination, 
    InputAdornment, 
    TextField, 
    TableSortLabel,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import theme from '../../styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

export default function DataTable({ filter: initialFilter }) {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('ref');
    const [filter, setFilter] = useState(initialFilter);

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

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    const handleOpen = () => {
        navigate('/dashboard/propiedades/add-propiedad');
    };

    // Normalize text to remove accents and convert to lowercase
    const normalizeText = (text) => {
        if (!text) return ''; // Add null check
        return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    };

    // Filter properties based on filter input
    const filteredProperties = useMemo(() => {
        const normalizedFilter = normalizeText(filter);
        return properties.filter(property =>
            normalizeText(String(property.ref)).includes(normalizedFilter) ||
            normalizeText(property.title).includes(normalizedFilter) ||
            normalizeText(property.localidad).includes(normalizedFilter)
        );
    }, [properties, filter]);

    // Sort properties based on order and orderBy
    const sortedProperties = useMemo(() => {
        return filteredProperties.sort((a, b) => {
            if (orderBy === 'active') {
                return (a[orderBy] === b[orderBy] ? 0 : a[orderBy] ? -1 : 1) * (order === 'asc' ? 1 : -1);
            }
            return (a[orderBy] < b[orderBy] ? -1 : 1) * (order === 'asc' ? 1 : -1);
        });
    }, [filteredProperties, order, orderBy]);

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', minHeight: '100vh', mt: 4 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', mb: 2 }}>
                    <TextField
                        label="Filtrar propiedades"
                        variant="outlined"
                        value={filter}
                        onChange={handleFilterChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            flexGrow: 1,
                            mr: 2,
                            height: '56px',
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#1E90FF', // Set border color to #1E90FF
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1E90FF', // Set border color to #1E90FF on hover
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1E90FF', // Set border color to #1E90FF when focused
                                },
                            },
                        }}
                    />
                    <Button
                        variant="outlined"
                        startIcon={<AddIcon />}
                        onClick={handleOpen}
                        sx={{
                            height: '56px',
                            borderColor: '#1E90FF', // Set border color to #1E90FF
                            color: '#1E90FF', // Set text color to #1E90FF
                            '&:hover': {
                                borderColor: '#1E90FF', // Set border color to #1E90FF on hover
                                backgroundColor: 'rgba(30, 144, 255, 0.04)', // Set background color on hover
                            },
                        }}
                    >
                        Add
                    </Button>
                </Box>
                {isLoading ? (
                    <CircularProgress />
                ) : (
                    <>
                    <TableContainer component={Paper} sx={ '100%'}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Foto Principal</TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                                        <TableSortLabel
                                            active={orderBy === 'ref'}
                                            direction={orderBy === 'ref' ? order : 'asc'}
                                            onClick={() => handleRequestSort('ref')}
                                        >
                                            Refencia
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                                        <TableSortLabel
                                            active={orderBy === 'title'}
                                            direction={orderBy === 'title' ? order : 'asc'}
                                            onClick={() => handleRequestSort('title')}
                                        >
                                            Título
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                                        <TableSortLabel
                                            active={orderBy === 'localidad'}
                                            direction={orderBy === 'localidad' ? order : 'asc'}
                                            onClick={() => handleRequestSort('localidad')}
                                        >
                                            Localidad
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>
                                        <TableSortLabel
                                            active={orderBy === 'active'}
                                            direction={orderBy === 'active' ? order : 'asc'}
                                            onClick={() => handleRequestSort('active')}
                                        >
                                            Activa
                                        </TableSortLabel>
                                    </TableCell>
                                    <TableCell sx={{ backgroundColor: '#f0f0f0', fontWeight: 'bold' }}>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                            {sortedProperties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
                                    <TableRow key={property.id} onClick={() => handleRowClick(property.id)} style={{ cursor: 'pointer' }}>
                                        <TableCell>
                                            <img src={property.foto} alt="Foto Principal" style={{ width: '100px', height: 'auto' }} />
                                        </TableCell>
                                        <TableCell>{property.ref}</TableCell>
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
                        count={sortedProperties.length}
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