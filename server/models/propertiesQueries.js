// propertiesQueries.js

const { uploadPropertyDocument } = require('../controllers/propertiesController');
const pool = require('./db');

// get Queries
const getAllProperties = async () => {
    try { 
        const result = await pool.query(
            `SELECT 
                p.id, p.ref, p.refext, p.title, p.precio, p.direccion, p.localidad, 
                p.provincia, p.pais, p.cp, p.longitud, p.latitud, p.metrosconstruidos, 
                p.metrosutiles, p.metrosparcela, p.idtipopropiedad, p.idhabitaciones, 
                p.idbanos, p.idaseos, p.idestado, p.anoconstruccion, p.idcalificacion, 
                p.idcargas, p.idplanta, p.idorientacionentrada, p.idorientacionventana, 
                p.idcertificadoenergetico, p.valorcertificadoenergetico, p.co2certificadoenergetico, 
                p.kwcertificadoenergetico, p.tributoibi, p.tributovado, p.tributorustico, 
                p.gastosvarios, p.idgerencia, p.comunidadgastos, p.comunidadderrama, 
                p.consumoelecticidad, p.consumoagua, p.idinternet, p.idgas, p.idite, 
                p.idtermoagua, p.idagua, p.active, p.created_at, p.updated_at, p.idusuario, 
                v.url AS foto, 
                destacada,
                tc.calificacion AS calificacion
            FROM lhainmobiliaria.vproperties p
            LEFT JOIN lhainmobiliaria.vimages v ON p.ref = v.ref AND v.principal = 1
            LEFT JOIN lhainmobiliaria.destacadas d ON p.ref = d.ref
            LEFT JOIN lhainmobiliaria.tipocalificacion tc ON p.idcalificacion = tc.idcalificacion;`
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
            `SELECT 
                p.id, p.ref, p.refext, p.title, p.precio, p.direccion, p.localidad, 
                p.provincia, p.pais, p.cp, p.longitud, p.latitud, p.metrosconstruidos, 
                p.metrosutiles, p.metrosparcela, tp.tipopropiedad AS tipo_propiedad, ne.nestancias AS habitaciones, 
                nb.nbanos AS banos, ns.naseos AS aseos, te.estado AS estado, p.anoconstruccion, 
                tc.calificacion AS calificacion, tca.cargas AS cargas, tpl.planta AS planta, oe.orientacionentrada AS orientacionentrada, 
                ov.orientacionventana AS orientacionventana, tce.certificadoenergetico AS certificadoenergetico, p.valorcertificadoenergetico, 
                p.co2certificadoenergetico, p.kwcertificadoenergetico, p.tributoibi, p.tributovado, 
                p.tributorustico, p.gastosvarios, tg.tipogerencia AS gerencia, p.comunidadgastos, p.comunidadderrama, 
               p.consumoelecticidad, p.consumoagua, ti.tipointernet AS internet, tgs.tipogas AS gas, tte.tipoite AS ite, 
                tta.tipotermoagua AS termoagua, tag.tipoagua, p.active, p.created_at, p.updated_at, p.idusuario, 
                v.url AS foto, 
                CASE 
                    WHEN d.destacada = 1 THEN 'Yes'
                    ELSE 'No'
                END AS destacada,
                vd.Description AS description
            FROM lhainmobiliaria.vproperties p
            LEFT JOIN lhainmobiliaria.vimages v ON p.ref = v.ref AND v.principal = 1
            LEFT JOIN lhainmobiliaria.destacadas d ON p.ref = d.ref
            LEFT JOIN lhainmobiliaria.vdescriptions vd ON p.ref = vd.Ref AND vd.IdLenguaje = 3
            LEFT JOIN lhainmobiliaria.tipopropiedad tp ON p.idtipopropiedad = tp.idtipopropiedad
            LEFT JOIN lhainmobiliaria.nbanos nb ON p.idbanos = nb.idnbanos
            LEFT JOIN lhainmobiliaria.nestancias ne ON p.idhabitaciones = ne.idnestancias
            LEFT JOIN lhainmobiliaria.naseos ns ON p.idaseos = ns.idnaseos
            LEFT JOIN lhainmobiliaria.tipoestado te ON p.idestado = te.idestado
            LEFT JOIN lhainmobiliaria.tipocalificacion tc ON p.idcalificacion = tc.idcalificacion
            LEFT JOIN lhainmobiliaria.tipocargas tca ON p.idcargas = tca.idcargas
            LEFT JOIN lhainmobiliaria.tipoplanta tpl ON p.idplanta = tpl.idplanta
            LEFT JOIN lhainmobiliaria.tipoorientacionentrada oe ON p.idorientacionentrada = oe.idorientacionentrada
            LEFT JOIN lhainmobiliaria.tipoorientacionventana ov ON p.idorientacionventana = ov.idorientacionventana
            LEFT JOIN lhainmobiliaria.tipocertificadoenergetico tce ON p.idcertificadoenergetico = tce.idcertificadoenergetico
            LEFT JOIN lhainmobiliaria.tipogerencia tg ON p.idgerencia = tg.id
            LEFT JOIN lhainmobiliaria.tipointernet ti ON p.idinternet = ti.id 
            LEFT JOIN lhainmobiliaria.tipogas tgs ON p.idgas = tgs.id
            LEFT JOIN lhainmobiliaria.tipoite tte ON p.idite = tte.id
            LEFT JOIN lhainmobiliaria.tipotermoagua tta ON p.idtermoagua = tta.id 
            LEFT JOIN lhainmobiliaria.tipoagua tag ON p.idagua = tag.id
            WHERE p.id = $1`,
            [id]
        );
        return result.rows[0];
        
    } catch (error) {
        console.error('Error in getPropertyById:', error);
        throw error;
    }
};

const getPropertyDescriptions = async (ref) => {
    try {
        const result = await pool.query(
            `SELECT Id, Ref, Descripcion, Tipo, FechaHora
             FROM lhainmobiliaria.vdescriptions
             WHERE Ref = $1`,
            [ref]
        );
        return result.rows;
    } catch (error) {
        console.error('Error in getPropertyDescriptions:', error);
        throw error;
    }
};

const getPropertyAmenities = async (ref) => {
    try {
        const result = await pool.query(
            `SELECT a.IdAmenity AS id, a.Amenity AS label, a.Grupo AS category
             FROM lhainmobiliaria.vamenitiesproperty pa
             LEFT JOIN lhainmobiliaria.vamenities a ON pa.IdAmenityIncluded = a.IdAmenity
             WHERE pa.IdProperty = $1`,
            [ref]
        );
        return result.rows;
    } catch (error) {
        console.error('Error in getPropertyAmenities:', error);
        throw error;
    }
}

const getPropertyImages = async (ref) => {
    try { 
        const result = await pool.query(
            `SELECT id, Ref, Url, FotoTitle, Principal, Cabecera
             FROM lhainmobiliaria.vimages
             WHERE Ref = $1
             ORDER BY id ASC`,
            [ref]
        );
        return result.rows;
    }
    catch (error) {
        console.error('Error in getPropertyImages:', error);
        throw error;
    }
};

const getPropertyDocuments = async (ref) => {
    try {
        const result = await pool.query(
            `SELECT Id, Ref, Url, Descripcion, Tipo, FechaHora
            FROM lhainmobiliaria.varchivos
            WHERE Ref = $1`,
           [ref]
        );
       return result.rows;
    } catch (error) {
        console.error('Error in getPropertyDocuments:', error);
        throw error;
    }   
};

// Helper function to fetch ID from a table by matching column value
const getIdFromTable = async (tableName, idColumnName, columnName, value) => {
    try {
        const result = await pool.query(
            `SELECT ${idColumnName} FROM ${tableName} WHERE ${columnName} = $1`,
            [value]
        );

        // Check if the query returned a result
        if (result.rows.length === 0) {
            throw new Error(`No match found in ${tableName} for ${columnName} = ${value}`);
        }
        return result.rows[0][idColumnName];
    } catch (error) {
        console.error(`Error in getIdFromTable for ${tableName}:`, error);
        throw error;
    }
};

// Helper function to normalize keys and convert empty strings to null for numeric fields
const normalizeKeys = (obj) => {
    const keyMap = {
        'Ref': 'ref',
        'RefExt': 'refext',
        'Título': 'title',
        'Precio': 'precio',
        'Dirección': 'direccion',
        'Localidad': 'localidad',
        'Provincia': 'provincia',
        'Pais': 'pais',
        'CP': 'cp',
        'Longitud': 'longitud',
        'Latitud': 'latitud',
        'M.Constr': 'metrosconstruidos',
        'M.Utiles': 'metrosutiles',
        'M.Parcela': 'metrosparcela',
        'Tipo': 'tipopropiedad',
        'Habitaciones': 'nestancias', 
        'Baños': 'nbanos',
        'Aseos': 'naseos',
        'Estado': 'estado',
        'Año.Const': 'anoconstruccion',
        'Calific': 'calificacion',
        'Cargas': 'cargas',
        'Planta': 'planta', 
        'Ori.Entrada': 'orientacionentrada',
        'Ori.Ventana': 'orientacionventana',
        'Cert.Ener': 'certificadoenergetico',
        'Valor.C.E': 'valorcertificadoenergetico',
        'CO2/m2/Año': 'co2certificadoenergetico',
        'Kw/Año': 'kwcertificadoenergetico',
        'T.IBI': 'tributoibi',
        'T.VADO': 'tributovado',
        'T.Rústico': 'tributorustico',
        'Gastos': 'gastosvarios',
        'Gerencia': 'gerencia',
        'Comunidad': 'comunidadgastos',
        'Derrama': 'comunidadderrama',
        'Cons.Elect': 'consumoelecticidad',
        'Cons.Agua': 'consumoagua',
        'Internet': 'tipointernet',
        'Gas': 'tipogas',
        'ITE': 'tipoite',
        'Termo.Agua': 'tipotermoagua',
        'Sum.Agua': 'tipoagua',
        'Activa': 'active',
        'Foto': 'foto',
        'Destacada': 'destacada',
        'CreatedAt': 'created_at',
        'UpdatedAt': 'updated_at',
        'Descripción': 'description'
    };

    const numericFields = [
        'precio', 'longitud', 'latitud', 'metrosconstruidos', 'metrosutiles', 'metrosparcela',
        'idhabitaciones', 'idbanos', 'idaseos', 'idestado', 'anoconstruccion', 'idcalificacion',
        'idcargas', 'idorientacionentrada', 'idorientacionventana', 'idcertificadoenergetico',
        'valorcertificadoenergetico', 'co2certificadoenergetico', 'kwcertificadoenergetico', 'tributoibi',
        'tributovado', 'tributorustico', 'gastosvarios', 'idgerencia', 'comunidadgastos', 'comunidadderrama',
        'consumoelecticidad', 'consumoagua', 'idinternet', 'idgas', 'idite', 'idtermoagua', 'idagua'
    ];

    return Object.keys(obj).reduce((acc, key) => {
        const normalizedKey = keyMap[key] || key;
        let value = obj[key];

        // Convert empty strings to null for numeric fields
        if (numericFields.includes(normalizedKey) && value === '') {
            value = null;
        }

        acc[normalizedKey] = value;
        return acc;
    }, {});
};



// put Queries

const updatePropertyDb = async (property, id) => {
    try {
        property = normalizeKeys(property);
        const {
            ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud,
            metrosconstruidos, metrosutiles, metrosparcela, tipopropiedad, nestancias, nbanos, naseos,
            estado, anoconstruccion, calificacion, cargas, planta, orientacionentrada, orientacionventana,
            certificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico,
            tributoibi, tributovado, tributorustico, gastosvarios, tipogerencia, comunidadgastos, comunidadderrama,
            consumoelecticidad, consumoagua, tipointernet, tipogas, tipoite, tipotermoagua, tipoagua, active, idusuario,
            description // Add description here
        } = property;

        // Lookup foreign key IDs based on provided names
        let idtipopropiedad = null;
        if (tipopropiedad) {
            idtipopropiedad = await getIdFromTable('lhainmobiliaria.tipopropiedad', 'idtipopropiedad', 'tipopropiedad', tipopropiedad);
        }

        let idhabitaciones = null;
        if (nestancias) {
            idhabitaciones = await getIdFromTable('lhainmobiliaria.nestancias', 'idnestancias', 'nestancias', nestancias);
        }

        let idbanos = null;
        if (nbanos) {
            idbanos = await getIdFromTable('lhainmobiliaria.nbanos', 'idnbanos', 'nbanos', nbanos);
        }

        let idaseos = null;
        if (naseos) {
            idaseos = await getIdFromTable('lhainmobiliaria.naseos', 'idnaseos', 'naseos', naseos);
        }

        let idestado = null;
        if (estado) {
            idestado = await getIdFromTable('lhainmobiliaria.tipoestado', 'idestado', 'estado', estado);
        }

        let idcalificacion = null;
        if (calificacion) {
            idcalificacion = await getIdFromTable('lhainmobiliaria.tipocalificacion', 'idcalificacion', 'calificacion', calificacion);
        }

        let idcargas = null;
        if (cargas) {
            idcargas = await getIdFromTable('lhainmobiliaria.tipocargas', 'idcargas', 'cargas', cargas);
        }

        let idplanta = null;
        if (planta) {
            idplanta = await getIdFromTable('lhainmobiliaria.tipoplanta', 'idplanta', 'planta', planta);
        }

        let idorientacionentrada = null;
        if (orientacionentrada) {
            idorientacionentrada = await getIdFromTable('lhainmobiliaria.tipoorientacionentrada', 'idorientacionentrada', 'orientacionentrada', orientacionentrada);
        }

        let idorientacionventana = null;
        if (orientacionventana) {
            idorientacionventana = await getIdFromTable('lhainmobiliaria.tipoorientacionventana', 'idorientacionventana', 'orientacionventana', orientacionventana);
        }

        let idcertificadoenergetico = null;
        if (certificadoenergetico) {
            idcertificadoenergetico = await getIdFromTable('lhainmobiliaria.tipocertificadoenergetico', 'idcertificadoenergetico', 'certificadoenergetico', certificadoenergetico);
        }

        let idgerencia = null;
        if (tipogerencia) {
            idgerencia = await getIdFromTable('lhainmobiliaria.tipogerencia', 'id', 'tipogerencia', tipogerencia);
        }

        let idinternet = null;
        if (tipointernet) {
            idinternet = await getIdFromTable('lhainmobiliaria.tipointernet', 'id', 'tipointernet', tipointernet);
        }

        let idgas = null;
        if (tipogas) {
            idgas = await getIdFromTable('lhainmobiliaria.tipogas', 'id', 'tipogas', tipogas);
        }

        let idite = null;
        if (tipoite) {
            idite = await getIdFromTable('lhainmobiliaria.tipoite', 'id', 'tipoite', tipoite);
        }

        let idtermoagua = null;
        if (tipotermoagua) {
            idtermoagua = await getIdFromTable('lhainmobiliaria.tipotermoagua', 'id', 'tipotermoagua', tipotermoagua);
        }

        let idagua = null;
        if (tipoagua) {
            idagua = await getIdFromTable('lhainmobiliaria.tipoagua', 'id', 'tipoagua', tipoagua);
        }

        const result = await pool.query(
            `UPDATE lhainmobiliaria.vproperties SET ref = $1, refext = $2, title = $3, precio = $4, direccion = $5, localidad = $6, provincia = $7, pais = $8, cp = $9, longitud = $10, latitud = $11, metrosconstruidos = $12, metrosutiles = $13, metrosparcela = $14, idtipopropiedad = $15, idhabitaciones = $16, idbanos = $17, idaseos = $18, idestado = $19, anoconstruccion = $20, idcalificacion = $21, idcargas = $22, idplanta = $23, idorientacionentrada = $24, idorientacionventana = $25, idcertificadoenergetico = $26, valorcertificadoenergetico = $27, co2certificadoenergetico = $28, kwcertificadoenergetico = $29, tributoibi = $30, tributovado = $31, tributorustico = $32, gastosvarios = $33, idgerencia = $34, comunidadgastos = $35, comunidadderrama = $36, consumoelecticidad = $37, consumoagua = $38, idinternet = $39, idgas = $40, idite = $41, idtermoagua = $42, idagua = $43, active = $44, idusuario = $45 WHERE id = $46 RETURNING *`,
            [
                ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud,
                metrosconstruidos, metrosutiles, metrosparcela, idtipopropiedad, idhabitaciones, idbanos, idaseos,
                idestado, anoconstruccion, idcalificacion, idcargas, idplanta, idorientacionentrada, idorientacionventana,
                idcertificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico,
                tributoibi, tributovado, tributorustico, gastosvarios, idgerencia, comunidadgastos, comunidadderrama,
                consumoelecticidad, consumoagua, idinternet, idgas, idite, idtermoagua, idagua, active, idusuario, id // Ensure 'id' is included as the last parameter
            ]
        );
        
        // Update the description in the vdescriptions table
        if (description) {
            await pool.query(
                `UPDATE lhainmobiliaria.vdescriptions SET description = $1 WHERE ref = $2 AND IdLenguaje = 3 RETURNING *`,
                [description, ref]
            );
            
        }      

        return result.rows[0];
    } catch (error) {
        console.error('Error in updatePropertyDb:', error);
        throw error;
    }
};

const updatePropertyAmenitiesDb = async (ref, amenities) => {
    try {
        // First, delete existing amenities for the property
        await pool.query('DELETE FROM lhainmobiliaria.vamenitiesproperty WHERE idproperty = $1', [ref]);

        // Then, insert the new amenities
        const queries = amenities.map(async (amenityId) => {
            const result = await pool.query(
                'INSERT INTO lhainmobiliaria.vamenitiesproperty (idproperty, idamenityincluded) VALUES ($1, $2) RETURNING *',
                [ref, amenityId]
            );
            return result.rows[0];
        });

        const updatedAmenities = await Promise.all(queries);
        return updatedAmenities;
    } catch (error) {
        console.error('Error in updatePropertyAmenitiesDb:', error);
        throw error;
    }
};




// post Queries
const addPropertyDb = async (property) => {
    try {
        property = normalizeKeys(property);
        const {
            ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud,
            metrosconstruidos, metrosutiles, metrosparcela, tipopropiedad, nestancias, nbanos, naseos,
            estado, anoconstruccion, calificacion, cargas, planta, orientacionentrada, orientacionventana,
            certificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico,
            tributoibi, tributovado, tributorustico, gastosvarios, tipogerencia, comunidadgastos, comunidadderrama,
            consumoelecticidad, consumoagua, tipointernet, tipogas, tipoite, tipotermoagua, tipoagua, active, idusuario
        } = property;

        let idtipopropiedad = null;
        if (tipopropiedad) {
            idtipopropiedad = await getIdFromTable('lhainmobiliaria.tipopropiedad', 'idtipopropiedad', 'tipopropiedad', tipopropiedad);
        }

        let idhabitaciones = null;
        if (nestancias) {
            idhabitaciones = await getIdFromTable('lhainmobiliaria.nestancias', 'idnestancias', 'nestancias', nestancias);
        }

        let idbanos = null;
        if (nbanos) {
            idbanos = await getIdFromTable('lhainmobiliaria.nbanos', 'idnbanos', 'nbanos', nbanos);
        }

        let idaseos = null;
        if (naseos) {
            idaseos = await getIdFromTable('lhainmobiliaria.naseos', 'idnaseos', 'naseos', naseos);
        }

        let idestado = null;
        if (estado) {
            idestado = await getIdFromTable('lhainmobiliaria.tipoestado', 'idestado', 'estado', estado);
        }

        let idcalificacion = null;
        if (calificacion) {
            idcalificacion = await getIdFromTable('lhainmobiliaria.tipocalificacion', 'idcalificacion', 'calificacion', calificacion);
        }

        let idcargas = null;
        if (cargas) {
            idcargas = await getIdFromTable('lhainmobiliaria.tipocargas', 'idcargas', 'cargas', cargas);
        }

        let idplanta = null;
        if (planta) {
            idplanta = await getIdFromTable('lhainmobiliaria.tipoplanta', 'idplanta', 'planta', planta);
        }

        let idorientacionentrada = null;
        if (orientacionentrada) {
            idorientacionentrada = await getIdFromTable('lhainmobiliaria.tipoorientacionentrada', 'idorientacionentrada', 'orientacionentrada', orientacionentrada);
        }

        let idorientacionventana = null;
        if (orientacionventana) {
            idorientacionventana = await getIdFromTable('lhainmobiliaria.tipoorientacionventana', 'idorientacionventana', 'orientacionventana', orientacionventana);
        }

        let idcertificadoenergetico = null;
        if (certificadoenergetico) {
            idcertificadoenergetico = await getIdFromTable('lhainmobiliaria.tipocertificadoenergetico', 'idcertificadoenergetico', 'certificadoenergetico', certificadoenergetico);
        }

        let idgerencia = null;
        if (tipogerencia) {
            idgerencia = await getIdFromTable('lhainmobiliaria.tipogerencia', 'id', 'tipogerencia', tipogerencia);
        }

        let idinternet = null;
        if (tipointernet) {
            idinternet = await getIdFromTable('lhainmobiliaria.tipointernet', 'id', 'tipointernet', tipointernet);
        }

        let idgas = null;
        if (tipogas) {
            idgas = await getIdFromTable('lhainmobiliaria.tipogas', 'id', 'tipogas', tipogas);
        }

        let idite = null;
        if (tipoite) {
            idite = await getIdFromTable('lhainmobiliaria.tipoite', 'id', 'tipoite', tipoite);
        }

        let idtermoagua = null;
        if (tipotermoagua) {
            idtermoagua = await getIdFromTable('lhainmobiliaria.tipotermoagua', 'id', 'tipotermoagua', tipotermoagua);
        }

        let idagua = null;
        if (tipoagua) {
            idagua = await getIdFromTable('lhainmobiliaria.tipoagua', 'id', 'tipoagua', tipoagua);
        }

        // Insert property data, including the retrieved foreign key IDs
        const result = await pool.query(
            `INSERT INTO lhainmobiliaria.vproperties (
                ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud,
                metrosconstruidos, metrosutiles, metrosparcela, idtipopropiedad, idhabitaciones, idbanos, idaseos,
                idestado, anoconstruccion, idcalificacion, idcargas, idplanta, idorientacionentrada, idorientacionventana,
                idcertificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico,
                tributoibi, tributovado, tributorustico, gastosvarios, idgerencia, comunidadgastos, comunidadderrama,
                consumoelecticidad, consumoagua, idinternet, idgas, idite, idtermoagua, idagua, active, idusuario
            ) VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23,
                $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41, $42, $43, $44, $45
            ) RETURNING *`,
            [
                ref, refext, title, precio, direccion, localidad, provincia, pais, cp, longitud, latitud,
                metrosconstruidos, metrosutiles, metrosparcela, idtipopropiedad, idhabitaciones, idbanos, idaseos,
                idestado, anoconstruccion, idcalificacion, idcargas, idplanta, idorientacionentrada, idorientacionventana,
                idcertificadoenergetico, valorcertificadoenergetico, co2certificadoenergetico, kwcertificadoenergetico,
                tributoibi, tributovado, tributorustico, gastosvarios, idgerencia, comunidadgastos, comunidadderrama,
                consumoelecticidad, consumoagua, idinternet, idgas, idite, idtermoagua, idagua, active, idusuario
            ]
        );

        return result.rows[0];
    } catch (error) {
        console.error('Error in addPropertyDb:', error);
        throw error;
    }
};

const addPropertyAmenities = async (ref, amenities) => {
    try {
        const queries = amenities.map(async (amenityId) => {
            const insertResult = await pool.query(
                `INSERT INTO lhainmobiliaria.vamenitiesproperty (idProperty, idamenityincluded) VALUES ($1, $2) RETURNING *`,
                [ref, amenityId]
            );
            return insertResult.rows[0];
        });

        await Promise.all(queries);
        return { message: 'Amenities added successfully' };
    } catch (error) {
        console.error('Error in addPropertyAmenities:', error);
        throw error;
    }
};

const uploadPropertyImageDb = async (imageDetails) => {
    try{
        const { ref, url, fototitle, principal, cabecera } = imageDetails;
        const result = await pool.query(
            `INSERT INTO lhainmobiliaria.vimages (ref, url, fototitle, principal, cabecera)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [ref, url, fototitle, principal, cabecera]
        );
        return result.rows[0];

    } catch (error) {
        console.error('Error in uploadPropertyImageDb:', error);
        throw error;
    }
}

const uploadPropertyDocumentDb = async (documentDetails) => {
    try {
        const { ref, url, descripcion, tipo, fechahora } = documentDetails;
        const result = await pool.query(
            `INSERT INTO lhainmobiliaria.varchivos (ref, url, descripcion, tipo, fechahora)
             VALUES ($1, $2, $3, $4, $5) RETURNING *`,
            [ref, url, descripcion, tipo, fechahora]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error in uploadPropertyDocumentDb:', error);
        throw error;
    }
};




// delete Queries
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

const deleteImageDb = async (imageId) => {
    try {
        console.log(`Attempting to delete image with id: ${imageId}`);
        const result = await pool.query(
            'DELETE FROM lhainmobiliaria.vimages WHERE id = $1 RETURNING *',
            [imageId]
        );
        console.log('Deleted image:', result.rows[0]);
        return result.rows[0];
    } catch (error) {
        console.error('Error in deleteImageDb:', error);
        throw error;
    }
};

const deleteDocumentDb = async (documentId) => {
    try {
        const result = await pool.query(
            'DELETE FROM lhainmobiliaria.varchivos WHERE id = $1 RETURNING *',
            [documentId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error in deleteDocumentDb:', error);
        throw error;
    }
};


module.exports = {
    getAllProperties,
    getPropertyById,
    addPropertyDb,
    updatePropertyDb,
    deletePropertyDb,
    getPropertyAmenities,
    getPropertyImages,
    getPropertyDocuments,
    getPropertyDescriptions,
    addPropertyAmenities,
    uploadPropertyImageDb,
    updatePropertyAmenitiesDb,
    deleteImageDb,
    uploadPropertyDocumentDb,
    deleteDocumentDb
};