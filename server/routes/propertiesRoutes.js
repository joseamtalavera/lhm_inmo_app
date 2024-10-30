//propertiesRoutes.js
const express = require('express');
const propertiesController = require('../controllers/propertiesController');
const router = express.Router();

router.get('/properties', propertiesController.getTableProperties);
router.get('/properties/:id', propertiesController.getPropertyById);
router.post('/properties', propertiesController.addProperty);
router.put('/properties/:id', propertiesController.updateProperty);
router.delete('/properties/:id', propertiesController.deleteProperty);
router.get('/properties/:ref/amenities', propertiesController.getPropertyAmenities); 
router.get('/properties/:ref/images', propertiesController.getPropertyImages);

module.exports = router;