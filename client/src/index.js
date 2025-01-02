// index.js

import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import LoginPage from './components/login/LoginPage';
import Dashboard from './components/dashboard/Dashboard';
import Propiedades from './components/propiedades/Propiedades';
import Propiedad from './components/propiedades/Propiedad';
import AddPropiedad from './components/propiedades/AddPropiedad';
import PrivateRoute from './components/login/PrivateRoute';
import theme from './styles/theme';
import { ThemeProvider } from '@mui/material/styles';
import AllPropertiesPage from './components/propiedades/AllPropertiesPage';
import PropertyPage from './components/propiedades/PropertyPage';
import Partners from './components/Menu/Partners';
import QuienesSomos from './components/Menu/QuienesSomos';
import Clientes from './components/clientes/Clientes';
import Settings from './components/settings/Settings';
import Ayuda from './components/ayuda/Ayuda'; 
import Comprar from './components/Menu/Comprar';
import Vender from './components/Menu/Vender';
import Valoracion from './components/Menu/Valoracion';


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <ThemeProvider theme={theme}> 
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<LoginPage />} /> 
        <Route path="/partners" element={<Partners />} />
        <Route path="/comprar" element={<Comprar />} />
        <Route path="/vender" element={<Vender />} />
        <Route path="/valoracion" element={<Valoracion />} />
        <Route path="/somos" element={<QuienesSomos/>} />
        <Route path="/allviviendas" element={<AllPropertiesPage />} /> 
        <Route path="/viviendas/:id" element={<PropertyPage />} />
        <Route path='/dashboard' element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path='/dashboard/propiedades' element={<PrivateRoute><Propiedades /></PrivateRoute>} />
        <Route path="/dashboard/propiedades/:id" element={<PrivateRoute><Propiedad /></PrivateRoute>} />
        <Route path="/dashboard/propiedades/add-propiedad" element={<PrivateRoute><AddPropiedad /></PrivateRoute>} />
        <Route path="/dashboard/clientes" element={<PrivateRoute><Clientes /></PrivateRoute>} />
        <Route path="/dashboard/settings" element={<PrivateRoute><Settings /></PrivateRoute>} />
        <Route path="/dashboard/ayuda" element={<PrivateRoute><Ayuda /></PrivateRoute>} />
      </Routes>
    </Router>
  </ThemeProvider>
);

/* 
Summary of Comments:

- ThemeProvider: Applies the custom Material-UI theme to the entire application.
- Router: Sets up the router for handling navigation.
- Routes: Defines the routes for the application.
- Route for App: Route for the main application component.
- Route for LoginPage: Route for the login page.
- Protected Route for Dashboard: Protected route for the dashboard, only accessible if authenticated.
- ReactDOM.createRoot: Creates a root for rendering the application, improving performance and future compatibility.
 */