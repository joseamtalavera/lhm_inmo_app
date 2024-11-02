
const { 
    getAllProperties, 
    addPropertyDb, 
    updatePropertyDb, 
    deletePropertyDb, 
    getPropertyById, 
    getPropertyAmenities,
    getPropertyImages,
    getPropertyDocuments
    } = require('../models/propertiesQueries');


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

        if (property) {
            if (propertyId === '65') {
                console.log(`Property fetched with ID ${propertyId}:`, property); // Log the fetched property with ID 65
            }
            res.json(property);
        }else {
            console.log(`Property with ID ${propertyId} not found`);
            res.status(404).json({ message: 'Property not found'});
        }
    } catch (error) {
        console.error('Error in getPropertyById:', error);
        next(error);
    }
}

exports.addProperty = async (req, res, next) => {
    try {
        const newProperty = await addPropertyDb(req.body);
        res.json({ message: 'Property added successfully', user: newProperty});
    } catch (error) {
        console.error('Error in addProperty:', error);
        next(error);
    }
}

exports.updateProperty = async (req, res, next) => {
    try {
        const updatedProperty = await updatePropertyDb(req.body);
        res.json({ message: 'Property updated succesfully', user: updatedProperty});
    } catch (error){
        console.error('Error in updateProperty:', error);
        next(error);
    }
}

exports.deleteProperty = async (req, res, next) => {
    try {
        const deletedProperty = await deletePropertyDb(req.params.id);
        res.json({ message: 'Property deleted successfully', user: deletedProperty});
    } catch (error) {
        console.error('Error in deleteProperty:', error);
        next(error);
    }
}

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
