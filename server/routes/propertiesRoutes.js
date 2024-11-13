//propertiesRoutes.js
const express = require('express');
const propertiesController = require('../controllers/propertiesController');
const router = express.Router();

// get routes
router.get('/properties', propertiesController.getTableProperties);
router.get('/properties/:id', propertiesController.getPropertyById);
router.get('/properties/:ref/descriptions', propertiesController.getPropertyDescriptions);
router.get('/properties/:ref/amenities', propertiesController.getPropertyAmenities); 
router.get('/properties/:ref/images', propertiesController.getPropertyImages);
router.get('/properties/:ref/documents', propertiesController.getPropertyDocuments);



// put routes
router.put('/properties/:id', propertiesController.updateProperty);
//router.put('/properties/:ref/descriptions', propertiesController.addPropertyDescriptions); 
router.put('/properties/:ref/amenities', propertiesController.updatePropertyAmenities);
//router.put('/properties/:ref/images', propertiesController.addPropertyImages); 
//router.put('/properties/:ref/documents', propertiesController.addPropertyDocuments); 


// post routes
router.post('/properties', propertiesController.addProperty);
//router.post('/properties/:ref/descriptions', propertiesController.addDescription);
//router.post('/properties/:ref/amenities', propertiesController.addAmenity);
//router.post('/properties/:ref/images', propertiesController.uploadPropertyImage);
//router.post('/properties/:ref/documents', propertiesController.uploadPropertyDocument);

// delete routes
router.delete('/properties/:id', propertiesController.deleteProperty);
//router.delete('/properties/:ref/descriptions', propertiesController.deleteDescription);
//router.delete('/properties/:ref/amenities', propertiesController.deleteAmenity);
//router.delete('/properties/:ref/images', propertiesController.deletePropertyImage);
//router.delete('/properties/:ref/documents', propertiesController.deletePropertyDocument);









module.exports = router;