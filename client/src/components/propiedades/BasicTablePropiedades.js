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
import {
    StyledTableContainer,
    StyledTable,
    StyledTableHeaderCell,
    StyledTableCell,
} from '../../styles/BasicTablePropiedadesStyles';

const generateNextReference = async () => {
    const prefix = 'LHA';
    const storedReferences = JSON.parse(localStorage.getItem('references')) || [];
    const referenceNumbers = storedReferences.map(ref => parseInt(ref.replace(prefix, ''), 10));

    let nextRefNumber = 1040;
    while (referenceNumbers.includes(nextRefNumber)) {
        nextRefNumber++;
    }

    const newRef = `${prefix}${nextRefNumber}`;
    localStorage.setItem('references', JSON.stringify([...storedReferences, newRef]));

    return newRef;
};

export default function DataTable({ filter: initialFilter }) {
    const navigate = useNavigate();
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('ref');
    const [filter, setFilter] = useState(initialFilter);

   
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

    useEffect(() => {
        fetchProperties();
    }, []);

    /* const handleRowClick = (id) => {
        const property = properties.find(property => property.id === id);
        navigate(`/dashboard/propiedades/${id}`, { state: { property: property } });
    }; */

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

    /* const handleOpen = () => {
        navigate('/dashboard/propiedades/add-propiedad');
    }; */

    const handleOpen = async () => {
        try {
            const newRef = await generateNextReference();
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ref: newRef, title: 'New Property' }) // Example data
            });

            if (!response.ok) throw new Error('Failed to create property');

            const newProperty = await response.json();
            console.log('Created property:', newProperty);

            // Update the state with the new property
            setProperties((prevProperties) => [newProperty, ...prevProperties]);

            await fetchProperties();
            
        } catch (error) {
            console.error('Error creating property:', error);
        }
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
            if (a.title === 'New Property' && b.title !== 'New Property') return -1;
            if (a.title !== 'New Property' && b.title === 'New Property') return 1;
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
                        <StyledTableContainer component={Paper}>
                            <StyledTable>
                                <TableHead>
                                    <TableRow>
                                        <StyledTableHeaderCell >Foto Principal</StyledTableHeaderCell>
                                        <StyledTableHeaderCell>
                                            <TableSortLabel
                                                active={orderBy === 'ref'}
                                                direction={orderBy === 'ref' ? order : 'asc'}
                                                onClick={() => handleRequestSort('ref')}
                                            >
                                                Refencia
                                            </TableSortLabel>
                                        </StyledTableHeaderCell>
                                        <StyledTableHeaderCell>
                                            <TableSortLabel
                                                active={orderBy === 'title'}
                                                direction={orderBy === 'title' ? order : 'asc'}
                                                onClick={() => handleRequestSort('title')}
                                            >
                                                Título
                                            </TableSortLabel>
                                        </StyledTableHeaderCell>
                                        <StyledTableHeaderCell>
                                            <TableSortLabel
                                                active={orderBy === 'localidad'}
                                                direction={orderBy === 'localidad' ? order : 'asc'}
                                                onClick={() => handleRequestSort('localidad')}
                                            >
                                                Localidad
                                            </TableSortLabel>
                                        </StyledTableHeaderCell>
                                        <StyledTableHeaderCell>
                                            <TableSortLabel
                                                active={orderBy === 'active'}
                                                direction={orderBy === 'active' ? order : 'asc'}
                                                onClick={() => handleRequestSort('active')}
                                            >
                                                Activa
                                            </TableSortLabel>
                                        </StyledTableHeaderCell>
                                        <StyledTableHeaderCell >Acciones</StyledTableHeaderCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {sortedProperties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
                                        <TableRow key={property.id}>
                                            <StyledTableCell>
                                                <img src={property.foto} alt="Foto Principal" style={{ width: '100px', height: 'auto' }} />
                                            </StyledTableCell>
                                            <StyledTableCell>{property.ref}</StyledTableCell>
                                            <StyledTableCell>{property.title}</StyledTableCell>
                                            <StyledTableCell>{property.localidad}</StyledTableCell>
                                            <StyledTableCell>
                                                <Chip
                                                    label={property.active ? "Activa" : "Inactiva"}
                                                    icon={property.active ? <CheckCircleIcon /> : <CancelIcon />}
                                                    color={property.active ? "success" : "error"}
                                                    variant="outlined"
                                                />
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <IconButton 
                                                    color="primary" 
                                                    onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        navigate(`/dashboard/propiedades/${property.id}`); 
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton color="red" onClick={(e) => { e.stopPropagation(); handleDelete(property.id); }}>
                                                    <DeleteIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </StyledTable>
                        </StyledTableContainer>
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