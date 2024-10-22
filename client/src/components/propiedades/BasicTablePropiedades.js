//BasiTablePropiedades.js

import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Avatar from '@mui/material/Avatar';
import ResponsiveDialog from '../../utils/ResponsiveDialog';
import theme from '../../styles/theme';

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
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <Avatar src={property.foto} style={{ marginRight: 10}} />
                    </div>
                );
            }
        },
        { field: 'id', headerName: 'ID', width: 120, filterable: true },
        { field: 'title', headerName: 'Título', width: 400, filterable: true },
        { field: 'localidad', headerName: 'Localidad', width: 150, filterable: true },
        /* { field: 'provincia', headerName: 'Provincia', width: 150, filterable: true },
        { field: 'pais', headerName: 'País', width: 150, filterable: true }, */
        { 
            field: 'activa', 
            headerName: 'Activa', 
            width: 100, 
            filterable: true,
            renderCell: (params) => {
                const isActive = params.row.activa;
                return isActive ? (
                    <Chip
                        sx={{
                            borderColor: 'green',
                            color: 'black',
                            height: '24px',
                            '& .MuiChip-icon': {
                                color: 'green',
                            },
                        }}
                        variant="outlined"
                        label="Activa"
                        icon={<CheckCircleIcon fontSize='small' />}
                    />
                ) : (
                    <Chip
                        sx={{
                            borderColor: 'red',
                            color: 'black',
                            height: '24px',
                            '& .MuiChip-icon': {
                                color: 'red',
                            },
                        }}
                        variant="outlined"
                        label="Inactiva"
                        icon={<CancelIcon fontSize='small' />}
                    />
                );
            }
        },
        { 
            field: 'delete', 
            headerName: ' ', 
            sortable: false,
            width: 50, 
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
                    <ResponsiveDialog onDelete={onClick} icon={<DeleteOutlineIcon style={{color: 'orange'}} />} />
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
            <Box sx={{ maxWidth: 'lg', margin: 'auto', boxShadow: 0, height: 550, width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {isLoading ? (
                    <CircularProgress />
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
            </Box>
        </ThemeProvider>
    );
}
