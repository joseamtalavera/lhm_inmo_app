//BasiTablePropiedades.js

import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import { useNavigate} from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeProvider } from '@mui/material/styles';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditOutlined  from '@mui/icons-material/EditOutlined';
import Chip from '@mui/material/Chip';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ResponsiveDialog from '../../utils/ResponsiveDialog';
import theme from '../../styles/theme';
import {
    StyledBox,
    StyledCircularProgress,
    ImageContainer,
    ImageWrapper,
    Image,
    IconContainer,
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
                    
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%'}}>
                    <div style={{ 
                        width: 50, 
                        height: 50, 
                        borderRadius: 5, 
                        overflow: 'hidden', 
                        border: '1px solid #ccc', 
                        marginRight: 10 
                    }}>
                        <img 
                            src={property.foto} 
                            alt="Foto Principal" 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'cover' 
                            }} 
                        />
                    </div>
                </div>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <EditOutlined style={{ color: '#1E90FF', cursor: 'pointer' }} onClick={onClick} />
                    </div>
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
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
                        <ResponsiveDialog onDelete={onClick} icon={<DeleteOutlineIcon style={{color: '#1E90FF'}} />} />
                    </div>
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
            </StyledBox>
        </ThemeProvider>
    );
}
