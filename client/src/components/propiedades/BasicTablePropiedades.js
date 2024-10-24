//BasiTablePropiedades.js

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
