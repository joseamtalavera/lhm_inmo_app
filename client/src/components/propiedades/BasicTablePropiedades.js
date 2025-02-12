import React, { useEffect, useState, useMemo } from 'react';
import { 
    Box,
    TableBody, 
    TableHead, 
    TableRow, 
    Paper, 
    IconButton,  
    TablePagination, 
    InputAdornment, 
    TextField, 
    TableSortLabel,
    Button,
    Typography, 
    useMediaQuery, 
    DialogContent, 
    DialogActions,
    Chip,
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
    StyledCard,
    StyledCardContent,
    StyledCardTitle,
    StyledCardActions,
    StyledBox,
    StyledCircularProgress,
    StyledDialog,
    StyledDialogTitle,
    DialogButton,
    RedDialogButton,
    PropertyImage,
    PropertyCardImage,
    StyledDeleteDialogText,
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
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('ref');
    const [filter, setFilter] = useState(initialFilter);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [propertyToDelete, setPropertyToDelete] = useState(null);

    const handleOpenDeleteDialog = (property) => {
        setPropertyToDelete(property);
        setOpenDeleteDialog(true);
    };

    const handleCloseDeleteDialog = () => {
        setOpenDeleteDialog(false);
        setPropertyToDelete(null);
    };

    const handleConfirmDelete = async () => {
        if (propertyToDelete) {
            await handleDelete(propertyToDelete.id);
            handleCloseDeleteDialog();
        }
    };

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
            console.log('Fetched properties:', data);
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

    const handleRowClick = (id) => {
        console.log('Row clicked:', id);
        const property = properties.find(property => property.id === id);
        if (!property) {
            console.error('Property not found:', id);
            return;
        }
        console.log('Property:', property);
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

    const handleOpen = async () => {
        try {
            const newRef = await generateNextReference();
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/properties`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ref: newRef, title: 'New Property', active: 0 }) 
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

    const renderStatusChip = (activeStatus) => {
        return (
            <Chip
                label={
                    activeStatus === 2 ? "Vendida" :
                    activeStatus === 1 ? "Activa" : "Inactiva"
                }
                icon={
                    activeStatus === 2 ? 
                        <CheckCircleIcon sx={{ color: '#1E90FF !important' }} /> :
                    activeStatus === 1 ? 
                        <CheckCircleIcon sx={{ color: '#4caf50 !important' }} /> :
                        <CancelIcon sx={{ color: '#f44336 !important' }} />
                }
                sx={{
                    mt: 2,
                    minWidth: '100px', // fixed chip width for equal border length
                    borderColor: activeStatus === 2 ? '#1E90FF' : activeStatus === 1 ? 'success.main' : 'error.main',
                    color: activeStatus === 2 ? '#1E90FF' : activeStatus === 1 ? 'success.main' : 'error.main'
                }}
                variant="outlined"
            />
        );
    };

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
                                    borderColor: '#1E90FF', 
                                },
                                '&:hover fieldset': {
                                    borderColor: '#1E90FF', 
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#1E90FF', 
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
                            borderColor: '#1E90FF', 
                            color: '#1E90FF', 
                            '&:hover': {
                                borderColor: '#1E90FF', 
                                backgroundColor: 'rgba(30, 144, 255, 0.04)', 
                            },
                        }}
                    >
                        Add
                    </Button>
                </Box>
                {isLoading ? (
                    <StyledBox>
                        <StyledCircularProgress />
                    </StyledBox>
                ) : (
                    <>
                        {!isMobile && (
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
                                                Referencia
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
                                        <TableRow 
                                            key={property.id}
                                            onClick={() => handleRowClick(property.id)}
                                            sx={{ cursor: 'pointer' }} 
                                        >
                                            <StyledTableCell>
                                                <PropertyImage src={property.url} alt="Foto Principal" />
                                            </StyledTableCell>
                                            <StyledTableCell>{property.ref}</StyledTableCell>
                                            <StyledTableCell>{property.title}</StyledTableCell>
                                            <StyledTableCell>{property.localidad}</StyledTableCell>
                                            <StyledTableCell>
                                          {/*   <Chip
                                                label={property.active ? "Activa" : "Inactiva"}
                                                icon={property.active ? <CheckCircleIcon /> : <CancelIcon />}
                                                color={property.active ? "success" : "error"}
                                                variant="outlined"
                                            /> */}
                                            {renderStatusChip(property.active)}
                                            </StyledTableCell>
                                            <StyledTableCell>
                                                <IconButton 
                                                    color="primary" 
                                                    onClick={(e) => { 
                                                        e.stopPropagation(); 
                                                        navigate(`/dashboard/propiedades/${property.id}`, { state: { edit: true } }); 
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton 
                                                    color="error" // changed from "red" to valid MUI color "error"
                                                    onClick={(e) => { e.stopPropagation(); handleOpenDeleteDialog(property); }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </StyledTableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </StyledTable>
                        </StyledTableContainer>
                        )}

                        {isMobile && sortedProperties.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((property) => (
                            <StyledCard 
                                key={property.id}
                                onClick={() => handleRowClick(property.id)} 
                                sx={{ cursor: 'pointer' }} 
                            >
                                <StyledCardContent>
                                    <PropertyCardImage src={property.url} alt="Foto Principal" />
                                    <StyledCardTitle>{property.ref}</StyledCardTitle>
                                    <Typography variant="body2">{property.title}</Typography>
                                    <Typography variant="body2">{property.localidad}</Typography>
                                   {/*  <Chip
                                        label={property.active ? "Activa" : "Inactiva"}
                                        icon={property.active ? <CheckCircleIcon /> : <CancelIcon />}
                                        color={property.active ? "success" : "error"}
                                        variant="outlined"
                                        sx={{ mt: 2 }}
                                    /> */}
                                     {renderStatusChip(property.active)}
                                    <StyledCardActions>
                                        <IconButton 
                                            color="primary" 
                                            onClick={(e) => { 
                                                e.stopPropagation(); 
                                                navigate(`/dashboard/propiedades/${property.id}`, { state: { edit: true } }); 
                                            }}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton 
                                            color="error" // changed from "red" to valid MUI color "error"
                                            onClick={(e) => { e.stopPropagation(); handleOpenDeleteDialog(property); }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </StyledCardActions>
                                </StyledCardContent>
                            </StyledCard>
                        ))}

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
                <StyledDialog
                    open={openDeleteDialog}
                    onClose={handleCloseDeleteDialog}
                >
                    <StyledDialogTitle>Borrar Propiedad</StyledDialogTitle>
                    <DialogContent>
                        <StyledDeleteDialogText>¿Estas seguro que deseas borrar esta propiedad?</StyledDeleteDialogText>
                    </DialogContent>
                    <DialogActions>
                        <DialogButton 
                            onClick={handleCloseDeleteDialog} 
                            color="primary"
                            size='small'
                            variant='outlined'
                        >
                            Cancela
                        </DialogButton>
                        <RedDialogButton 
                            onClick={handleConfirmDelete} 
                            size='small'
                            variant='outlined'
                        >
                            Confirma
                        </RedDialogButton>
                    </DialogActions>
                </StyledDialog>
            </Box>
        </ThemeProvider>
    );
}