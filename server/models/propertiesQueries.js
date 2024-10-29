// propertiesQueries.js

const pool = require('./db');
//const bcrypt = require('bcrypt');
//const saltRounds = 10;

const getAllProperties = async () => {
    try { 
        const result = await pool.query(
            `SELECT p.id, p.ref, p.refext, p.title, p.precio, p.direccion, p.localidad, p.provincia, p.pais, p.cp, p.longitud, p.latitud, p.metrosconstruidos, p.metrosutiles, p.metrosparcela, p.idtipopropiedad, p.idhabitaciones, p.idbanos, p.idaseos, p.idestado, p.anoconstruccion, p.idcalificacion, p.idcargas, p.idplanta, p.idorientacionentrada, p.idorientacionventana, p.idcertificadoenergetico, p.valorcertificadoenergetico, p.co2certificadoenergetico, p.kwcertificadoenergetico, p.tributoibi, p.tributovado, p.tributorustico, p.gastosvarios, p.idgerencia, p.comunidadgastos, p.comunidadderrama, p.consumoelecticidad, p.consumoagua, p.idinternet, p.idgas, p.idite, p.idtermoagua, p.idagua, p.active, p.created_at, p.updated_at, p.idusuario, v.url AS foto
            FROM lhainmobiliaria.vproperties p
            LEFT JOIN lhainmobiliaria.vimages v ON p.ref = v.ref AND v.principal = 1`
        );
        return result.rows;
    } catch (error) {
        console.error('Error in getAllProperties:', error);
        throw error;
    }
};

const getPropertyById = async (id) => {
    try {   
        const result = await pool.query(
            `SELECT p.id, p.ref, p.refext, p.title, p.precio, p.direccion, p.localidad, p.provincia, p.pais, p.cp, p.longitud, p.latitud, p.metrosconstruidos, p.metrosutiles, p.metrosparcela, p.idtipopropiedad, p.idhabitaciones, p.idbanos, p.idaseos, p.idestado, p.anoconstruccion, p.idcalificacion, p.idcargas, p.idplanta, p.idorientacionentrada, p.idorientacionventana, p.idcertificadoenergetico, p.valorcertificadoenergetico, p.co2certificadoenergetico, p.kwcertificadoenergetico, p.tributoibi, p.tributovado, p.tributorustico, p.gastosvarios, p.idgerencia, p.comunidadgastos, p.comunidadderrama, p.consumoelecticidad, p.consumoagua, p.idinternet, p.idgas, p.idite, p.idtermoagua, p.idagua, p.active, p.created_at, p.updated_at, p.idusuario, v.url AS foto
            FROM lhainmobiliaria.vproperties p
            LEFT JOIN lhainmobiliaria.vimages v ON p.ref = v.ref AND v.principal = 1
            WHERE p.id = $1`,
            [id]
        );
        console
        return result.rows[0];
    } catch (error) {
        console.error('Error in getPropertyById:', error);
        throw error;
    }
};

const addPropertyDb = async (property) => {
    try {
        const { ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud, metrosconstruidos, metrosutiles, metrosparcela, idtipopropiedad, idhabitaciones, idbanos, idaseos, idestado, anoconstruccion, idcalificacion, idcargas, idplanta, idorientacionentrada, idorientacionventana, idcertificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico, tributoibi, tributovado, tributorustico, gastosvarios, idgerencia, comunidadgastos, comunidadderrama, consumoelecticidad, consumoagua, idinternet, idgas, idite, idtermoagua, idagua, active, idusuario } = property;

        const result = await pool.query(
            `INSERT INTO lhainmobiliaria.vproperties (ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud, metrosconstruidos, metrosutiles, metrosparcela, idtipopropiedad, idhabitaciones, idbanos, idaseos, idestado, anoconstruccion, idcalificacion, idcargas, idplanta, idorientacionentrada, idorientacionventana, idcertificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico, tributoibi, tributovado, tributorustico, gastosvarios, idgerencia, comunidadgastos, comunidadderrama, consumoelecticidad, consumoagua, idinternet, idgas, idite, idtermoagua, idagua, active, idusuario) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45) RETURNING *`,
            [ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud, metrosconstruidos, metrosutiles, metrosparcela, idtipopropiedad, idhabitaciones, idbanos, idaseos, idestado, anoconstruccion, idcalificacion, idcargas, idplanta, idorientacionentrada, idorientacionventana, idcertificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico, tributoibi, tributovado, tributorustico, gastosvarios, idgerencia, comunidadgastos, comunidadderrama, consumoelecticidad, consumoagua, idinternet, idgas, idite, idtermoagua, idagua, active, idusuario]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error in addPropertyDb:', error);
        throw error;
    }
};

const updatePropertyDb = async (property) => {
    try {
        const { id, ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud, metrosconstruidos, metrosutiles, metrosparcela, idtipopropiedad, idhabitaciones, idbanos, idaseos, idestado, anoconstruccion, idcalificacion, idcargas, idplanta, idorientacionentrada, idorientacionventana, idcertificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico, tributoibi, tributovado, tributorustico, gastosvarios, idgerencia, comunidadgastos, comunidadderrama, consumoelecticidad, consumoagua, idinternet, idgas, idite, idtermoagua, idagua, active, idusuario } = property;

        const result = await pool.query(
            `UPDATE lhainmobiliaria.vproperties SET ref = $1, refext = $2, title = $3, precio = $4, direccion = $5, localidad = $6, provincia = $7, pais = $8, cp = $9, longitud = $10, latitud = $11, metrosconstruidos = $12, metrosutiles = $13, metrosparcela = $14, idtipopropiedad = $15, idhabitaciones = $16, idbanos = $17, idaseos = $18, idestado = $19, anoconstruccion = $20, idcalificacion = $21, idcargas = $22, idplanta = $23, idorientacionentrada = $24, idorientacionventana = $25, idcertificadoenergetico = $26, valorcertificadoenergetico = $27, co2certificadoenergetico = $28, kwcertificadoenergetico = $29, tributoibi = $30, tributovado = $31, tributorustico = $32, gastosvarios = $33, idgerencia = $34, comunidadgastos = $35, comunidadderrama = $36, consumoelecticidad = $37, consumoagua = $38, idinternet = $39, idgas = $40, idite = $41, idtermoagua = $42, idagua = $43, active = $44, idusuario = $45 WHERE id = $46 RETURNING *`,
            [ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud, metrosconstruidos, metrosutiles, metrosparcela, idtipopropiedad, idhabitaciones, idbanos, idaseos, idestado, anoconstruccion, idcalificacion, idcargas, idplanta, idorientacionentrada, idorientacionventana, idcertificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico, tributoibi, tributovado, tributorustico, gastosvarios, idgerencia, comunidadgastos, comunidadderrama, consumoelecticidad, consumoagua, idinternet, idgas, idite, idtermoagua, idagua, active, idusuario, id]
        );

        return result.rows[0];
    }
    catch (error) {
        console.error('Error in updatePropertyDb:', error);
        throw error;
    }
}

const deletePropertyDb = async (id) => {
    try {
        const result = await pool.query(
            'DELETE FROM lhainmobiliaria.vproperties WHERE id = $1 RETURNING *', 
            [id]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error in deletePropertiyDb:', error);
        throw error;
    }
};

/* const getPropertyAmenities = async (id) => {
    try{
        const result = await pool.query(
            `SELECT a.IdAmenity AS id, a.Amenity AS label, a.Grupo AS category
     FROM lhainmobiliaria.vamenitiesproperty pa
     LEFT JOIN lhainmobiliaria.vamenities a ON pa.IdAmenityIncluded = a.IdAmenity
     WHERE pa.idProperty = $1`,
    [id]
        );
        console.log(`Query results: ${JSON.stringify(result.rows)}`);
        return result.rows;
    } catch (error) {
        console.error('Error in getPropertyAmenities:', error);
        throw error;
    }
} */

    const getPropertyAmenities = async (id) => {
        try {
            // Directly query amenities based on IdProperty in vamenitiesproperty
            const result = await pool.query(
                `SELECT a.IdAmenity AS id, a.Amenity AS label, a.Grupo AS category
                 FROM lhainmobiliaria.vamenitiesproperty pa
                 LEFT JOIN lhainmobiliaria.vamenities a ON pa.IdAmenityIncluded = a.IdAmenity
                 WHERE pa.IdProperty = $1`,
                [id]
            );
    
            console.log(`Query results: ${JSON.stringify(result.rows)}`);
            return result.rows;
        } catch (error) {
            console.error('Error in getPropertyAmenities:', error);
            throw error;
        }
    }
    
    

module.exports = {
    getAllProperties,
    getPropertyById,
    addPropertyDb,
    updatePropertyDb,
    deletePropertyDb,
    getPropertyAmenities
};