
// BasicTable.js
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
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const columns = [
        //{ field: 'id', headerName: 'ID', width: 100, hide: true }, 
        { 
            field: 'foto', 
            headerName: 'Foto', 
            width: 250, 
            filterable: true,
            renderCell: (params) => {
                const user = params.row;
                if(!user) {
                    console.log('User not found');
                    return null;
                }
                return (
                    <div style={{ display: 'flex', alignItems: 'center'}}>
                        <Avatar src={user.avatar} style={{ marginRight: 10}} />
                        {user.name}
                    </div>
                );
            }
        },
        { field: 'id', headerName: 'ID', width: 200, filterable: true },
        { field: 'propiedad', headerName: 'Propiedad', width: 200, filterable: true},
        { field: 'localidad', headerName: 'Localidad', width: 155, filterable: true },
        { 
            field: 'status', 
            headerName: 'Status', 
            width: 150, 
            filterable: true,
            renderCell: (params) => {
                const status = params.row.status;
                if (status === 'active') {
                    return (
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
                            label="Active"
                            icon={<CheckCircleIcon fontSize='small' />}
                        />
                          
                    );
                } else {   
                    return (
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
                            label="Inactive"
                            icon={<CancelIcon fontSize='small' />}
                        />
                            
                    );
                }
            }
        },
        //{ field: 'created', headerName: 'Created', width: 200, filterable: true, type: 'date' },
        { 
            field: 'delete', 
            headerName: ' ', 
            sortable: false,
            width: 50, 
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = async () => {
                    const id = params.row.id;
                    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    if (!response.ok) {
                        throw new Error('Failed to delete user');
                    }
                    setUsers(users.filter(user => user.id !== id));
                };
                return (
                    /* <IconButton style={{color: 'orange'}} onClick={onClick}>
                        <DeleteOutlineIcon />
                    </IconButton> */
                    <ResponsiveDialog onDelete={onClick} icon={<DeleteOutlineIcon style={{color: 'orange'}} />} />
                );
                
            }
        },
    ];
 
    useEffect(() => {
        const fetchUsers = async () => { 
            setIsLoading(true);
            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', 
                    },
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const text = await response.text();
                //console.log('Text:', text);

                let data = JSON.parse(text);
                data = data.sort((a, b) => {
                    if (a.name && b.name) {
                        return a.name.localeCompare(b.name);
                    } else if (a.name) {
                        return -1; // a is sorted to an index lower than b
                    } else if (b.name) {
                        return 1; // a is sorted to an index higher than b
                    } else {
                        return 0; // a and b remain with their original order
                    }
                });
                setUsers(data);
                console.log('Users:', data);
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchUsers();
    }, []);

    const handleRowClick = (params) =>{
        const user = users.find(user => user.id === params.row.id);
        console.log('User:', user);
        navigate(`/dashboard/admin/users/${params.row.id}`, { state: { user: user } });
    };

    
    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ maxWidth: 'lg', margin: 'auto', boxShadow: 0, height: 550, width: '90%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                {isLoading ? (
                    <CircularProgress />
                ) : (
           
            <DataGrid
                style={{ height: 550, width: '100%', cursor: 'pointer'}}
                rows={users}
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


