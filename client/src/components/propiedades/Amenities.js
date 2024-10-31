import React from 'react';
import { Box, Typography, Grid, FormControlLabel, Checkbox, Divider } from '@mui/material';

const accessAmenities = [
    { id: 2, label: "Sí" },
    { id: 3, label: "No" }
];

const buildingEquipmentAmenities = [
    { id: 4, label: "Con Ascensor" },
    { id: 5, label: "Sin Ascensor" },
    { id: 6, label: "Con Zonas Comunes" },
    { id: 7, label: "Sin Zonas Comunes" }
];

const viewsAmenities = [
    { id: 8, label: "Vistas al mar" },
    { id: 9, label: "Vistas a la montaña" },
    { id: 10, label: "Vistas calle principal o calle colindante" },
    { id: 11, label: "Vistas panoramicas" }
];

const exteriorConditioningAmenities = [
    { id: 12, label: "Piscina comunitaria" },
    { id: 13, label: "Piscina privada" },
    { id: 14, label: "Piscina climatizada comunitaria" },
    { id: 15, label: "Piscina climatizada privada" },
    { id: 16, label: "Piscina compartida" },
    { id: 17, label: "Sala de GYM Comunitaria" },
    { id: 18, label: "Sala de Eventos en Zona Comunes" },
    { id: 19, label: "Parque infantil en Zona Comunes" },
    { id: 20, label: "Pista de Padel" },
    { id: 21, label: "Pista de Tenis" },
    { id: 22, label: "Pista multideporte" },
    { id: 23, label: "Zona ajardinadas comunitarias" },
    { id: 24, label: "Jardin privado" },
    { id: 25, label: "Zona de paso (Derecho de uso)" },
    { id: 26, label: "Alberca" },
    { id: 27, label: "Pozo de manantial" },
    { id: 28, label: "Pozo propio" },
    { id: 29, label: "Fosa septicca" },
    { id: 30, label: "Alcantarillado" },
    { id: 31, label: "Sin fosa ni alcantarillado" },
    { id: 37, label: "Agua de Ayuntamiento" },
    { id: 38, label: "Agua de Manatial" },
    { id: 39, label: "Sin agua" },
    { id: 40, label: "Electricidad instalada y habilitada" },
    { id: 41, label: "Electricidad instalación pendiente" },
    { id: 42, label: "Electricidad a realizar Boletín" },
    { id: 43, label: "Sin electricidad" },
    { id: 76, label: "Acceso a la propiedad Comunitario" },
    { id: 77, label: "Acceso a la propiedad Independiente" },
    { id: 78, label: "Zona Barbacoa" },
    { id: 79, label: "Placas Solares Electricidad" },
    { id: 80, label: "Placas Solares Agua" }
];

const additionalEquipmentAmenities = [
    { id: 32, label: "Con Parking Comunitario" },
    { id: 33, label: "Con trastero NO INCLUIDO EN PRECIO" },
    { id: 34, label: "Con trastero SI INCLUIDO EN PRECIO" },
    { id: 35, label: "Con plaza de aparcamiento Interior NO INCLUIDO EN PRECIO" },
    { id: 36, label: "Con plaza de aparcamiento Interior SI INCLUIDO EN PRECIO" }
];

const interiorConditioningAmenities = [
    { id: 44, label: "Con aire acondicionado" },
    { id: 45, label: "Sin aire acondicionado" },
    { id: 46, label: "Aire acondicionado centralizado" },
    { id: 47, label: "Amueblado" },
    { id: 48, label: "Sin amueblar" },
    { id: 49, label: "Con Armarios empotrados" },
    { id: 50, label: "Sin armarios empotrados" },
    { id: 51, label: "Puerta entrada de madera" },
    { id: 52, label: "Puerta entrada blindada" },
    { id: 53, label: "Puerta simple de seguridad baja" },
    { id: 54, label: "Terraza" },
    { id: 55, label: "Patio" },
    { id: 56, label: "Azotea" },
    { id: 57, label: "Cocina equipada con electrodomésticos" },
    { id: 58, label: "Cocina equipada sin electrodomésticos" },
    { id: 59, label: "Cuartos de baños reformados" },
    { id: 60, label: "Cuartos de baños a reformar" },
    { id: 61, label: "Cuarto de baño en buen estado" },
    { id: 62, label: "Aseos reformados" },
    { id: 63, label: "Aseos a reformar" },
    { id: 64, label: "Aseos en buen estado" },
    { id: 65, label: "Suelo Tipo Gres" },
    { id: 66, label: "Suelo tipo cerámica" },
    { id: 67, label: "Suelo tipo Parquet" },
    { id: 68, label: "Suelo tipo Rústico" },
    { id: 69, label: "Suelo tipo Madera" },
    { id: 70, label: "Calefacción Centralizada" },
    { id: 71, label: "Chimeneas" },
    { id: 72, label: "Estufas/calefactores/emisores termicos" },
    { id: 73, label: "Ventanas a reformar" },
    { id: 74, label: "Ventanas reformadas" },
    { id: 75, label: "Ventana en buen estado" },
    { id: 81, label: "Balcón" },
    { id: 82, label: "Electricidad Reformada/Nueva" },
    { id: 83, label: "Electricidad con Domótica" },
    { id: 84, label: "Electricidad Antigua + 10 años" },
    { id: 85, label: "Fontanería Reformada/ nueva" },
    { id: 86, label: "Fontanería Antigua +10 años" },
    { id: 87, label: "Ventanas Madera" },
    { id: 88, label: "Ventanas Aluminio" },
    { id: 89, label: "Ventana doble Acristalamiento/corredera/Climalit" },
    { id: 90, label: "Cierre balcón Aluminio" },
    { id: 91, label: "Cierre balcón obra" },
    { id: 92, label: "Cierre Acristalado/Cortinas vidrio" },
    { id: 93, label: "Sin cierre" },
    { id: 94, label: "Suelo estado inicial ANTIGUO" }
];

const Amenities = ({ property, handleChange }) => (
    <Box> 
        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF'}}>
                Acceso adaptado a personas con movilidad reducida
            </Typography>
            <Divider sx={{ width: '100%', mx: 0, mb: 2 }} />
            <Grid container spacing={2}>
                {accessAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF'}}>
                Equipamiento edificio
            </Typography>
            <Divider sx={{ width: '100%', mx: 0, mb: 2 }} />
            <Grid container spacing={2}>
                {buildingEquipmentAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                Vistas
            </Typography>
            <Divider sx={{ width: '100%', mx: 0, mb: 2 }} />
            <Grid container spacing={2}>
                {viewsAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                Características de acondicionamiento exterior
            </Typography>
            <Divider sx={{ width: '100%', mx: 0, mb: 2 }} />
            <Grid container spacing={2}>
                {exteriorConditioningAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                Equipamiento adicional
            </Typography>
            <Divider sx={{ width: '100%', mx: 0, mb: 2 }} />
            <Grid container spacing={2}>
                {additionalEquipmentAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>

        <Box sx={{ width: '100%', mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px' }}>
            <Typography variant="h6" sx={{ mb: 2, color: '#1E90FF' }}>
                Características de acondicionamiento interior
            </Typography>
            <Divider sx={{ width: '100%', mx: 0, mb: 2 }} />
            <Grid container spacing={2}>
                {interiorConditioningAmenities.map((amenity) => (
                    <Grid item xs={12} md={6} key={amenity.id}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={property[amenity.label] || false}
                                    onChange={handleChange}
                                    name={amenity.label}
                                />
                            }
                            label={amenity.label}
                        />
                    </Grid>
                ))}
            </Grid>
        </Box>
    </Box>
);

export default Amenities;