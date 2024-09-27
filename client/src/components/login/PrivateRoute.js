
// PrivateRoute.js
import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
 
function PrivateRoute({ children }) {
    // it calls the useAuth hook to check if the user is authenticated
    // it destructures the isAuthenticated and isLoading values from the useAuth hook. 
    // the component will use these values to determine the rendering logic.
    // data coming from the useAuth hook to determine the rendering logic, line 22 
    const { isAuthenticated, isLoading } = useAuth();
    // If authentication is in progress, show a loading spinner
    if (isLoading) {
        return (
            <Box 
                display="flex" 
                justifyContent="center" 
                alignItems="center" 
                height="100vh"
            >
                <CircularProgress color='#1E90FF' />
            </Box>
        );
    }
    // If the user is not authenticated, redirect to the login page
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    // If the user is authenticated, render the children components
    return children;
}

PrivateRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default PrivateRoute;
