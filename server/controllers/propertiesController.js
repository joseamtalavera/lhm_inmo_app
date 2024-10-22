
const { getAllProperties, addPropertyDb, updatePropertyDb, deletePropertyDb } = require('../models/propertiesQueries');


exports.getTableProperties = async (req, res, next) => {
    try { 
        const users = await getAllProperties();
        res.json(users);
    } catch (error) {
        console.error('Error in getTableProperties:', error);
        next(error);
    }
};

exports.addProperty = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        const newProperty = await addPropertyDb(req.body);
        res.json({ message: 'Property added successfully', user: newProperty});
    } catch (error) {
        console.error('Error in addProperty:', error);
        next(error);
    }
}

exports.updateProperty = async (req, res, next) => {
    try {
        console.log('Request body:', req.body);
        const updatedProperty = await updatePropertyDb(req.body);
        console.log('Updated Property:', updatedProperty);
        res.json({ message: 'Property updated succesfully', user: updatedProperty});
    } catch (error){
        console.error('Error in updateProperty:', error);
        next(error);
    }
}

exports.deleteProperty = async (req, res, next) => {
    try {
        console.log('Deleting property with id:', req.params.id);
        const deletedProperty = await deletePropertyDb(req.params.id);
        res.json({ message: 'Property deleted successfully', user: deletedProperty});
    } catch (error) {
        console.error('Error in deleteProperty:', error);
        next(error);
    }
}