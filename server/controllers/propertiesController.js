const { 
    getAllProperties, 
    addPropertyDb, 
    updatePropertyDb, 
    deletePropertyDb, 
    getPropertyById, 
    getPropertyAmenities,
    getPropertyImages,
    getPropertyDocuments,
    addPropertyAmenities,
    uploadPropertyImageDb,
    updatePropertyAmenitiesDb,
} = require('../models/propertiesQueries');


// get Controllers

exports.getTableProperties = async (req, res, next) => {
    try { 
        const properties = await getAllProperties();
        res.json(properties);
    } catch (error) {
        console.error('Error in getTableProperties:', error);
        next(error);
    }
};

exports.getPropertyById = async (req, res, next) => {
    const propertyId = req.params.id;
    try {
        const property = await getPropertyById(propertyId);
        res.json(property); 
    } catch (error) {
        console.error('Error in getPropertyById:', error);
        next(error);
    }
}

exports.getPropertyDescriptions = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const descriptions = await getPropertyDescriptions(ref);
        res.json(descriptions);
    } catch (error) {
        console.error('Error in getPropertyDescriptions:', error);
        next(error);
    }
};

exports.getPropertyAmenities = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const amenities = await getPropertyAmenities(ref);
        res.json(amenities);    
    } catch (error) {
        console.error('Error in getPropertyAmenities:', error);
        next(error);
    }
}

exports.getPropertyImages = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const images = await getPropertyImages(ref);
        res.json(images);
    } catch (error) {
        console.error('Error in getPropertyImages:', error);
        next(error);
    }
}

exports.getPropertyDocuments = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const documents = await getPropertyDocuments(ref);
        res.json(documents);
    } catch (error) {
        console.error('Error in getPropertyDocuments:', error);
        next(error);
    }
}



// put Controllers

exports.updateProperty = async (req, res) => {
    try {
        const id = req.params.id; // or however you retrieve the id
        const property = req.body; // updated property data
        const updatedProperty = await updatePropertyDb(property, id);
        res.status(200).json(updatedProperty);
    } catch (error) {
        res.status(500).json({ message: 'Error updating property' });
    }
};

exports.updatePropertyAmenities = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const amenities = req.body.amenities;

        const updatedAmenities = await updatePropertyAmenitiesDb(ref, amenities);
        res.status(200).json(updatedAmenities);
    } catch (error) {
        console.error('Error updating amenities:', error);
        next(error);
    }
};




// post Controllers

exports.addProperty = async (req, res, next) => {
    try {
        // First, add the property
        const newProperty = await addPropertyDb(req.body);
        
        // Then, add amenities (if provided in the request)
        if (req.body.amenities && req.body.amenities.length > 0) {
            await addPropertyAmenities(newProperty.ref, req.body.amenities); // Using the property's ID or ref
        }

        res.json({ message: 'Property and amenities added successfully', property: newProperty });
    } catch (error) {
        console.error('Error in addProperty:', error);
        next(error);
    }
};

exports.addPropertyAmenities = async (req, res, next) => {
    try {
        const ref = req.params.ref;
        const amenities = req.body.amenities;
        const result = await addPropertyAmenities(ref, amenities);
        res.json(result);
    } catch (error) {
        console.error('Error in addPropertyAmenities:', error);
        next(error);
    }
};

exports.uploadPropertyImage = async (req, res, next) => {
    try {
        console.log('Request params:', req.params);
        const ref = req.params.ref;
        const image = req.file; 

        console.log('Received ref:', ref);
        console.log('Received image:', image);
        console.log('Received body:', req.body);
       
        if (!image) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        const imageUrl = `http://localhost:3010/uploads/${image.filename}`; 
        
        const principalValue = req.body.principal === 'true' ? 1 : 0;
        const cabeceraValue = req.body.cabecera === 'true' ? 1 : 0;

        const imageDetails ={
            ref, 
            url: imageUrl,
            fototile: req.body.fototitle || '',
            principal: principalValue,
            cabecera: cabeceraValue,
        }

        console.log('Image details:', imageDetails);

        const savedImage = await uploadPropertyImageDb(imageDetails);

        console.log('Saved image:', savedImage);

        res.status(201).json(savedImage);
    } catch (error) {
        console.error('Error in uploadPropertyImage:', error);
        next(error);
    }
};


// delete Controllers   

exports.deleteProperty = async (req, res, next) => {
    try {
        const deletedProperty = await deletePropertyDb(req.params.id);
        res.json({ message: 'Property deleted successfully', user: deletedProperty});
    } catch (error) {
        console.error('Error in deleteProperty:', error);
        next(error);
    }
}







