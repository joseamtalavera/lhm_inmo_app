//propertiesRoutes.js
const express = require('express');
const propertiesController = require('../controllers/propertiesController');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: '/usr/share/nginx/uploads/' });

// get routes
router.get('/properties', propertiesController.getTableProperties);
router.get('/properties/:id', propertiesController.getPropertyById);
router.get('/properties/:ref/amenities', propertiesController.getPropertyAmenities); 
router.get('/properties/:ref/images', propertiesController.getPropertyImages);
router.get('/properties/:ref/documents', propertiesController.getPropertyDocuments);



// put routes
router.put('/properties/:id', propertiesController.updateProperty);
router.put('/properties/:ref/amenities', propertiesController.updatePropertyAmenities); 



// post routes
router.post('/properties', propertiesController.addProperty);
//router.post('/properties/:ref/amenities', propertiesController.addAmenity);
router.post('/properties/:ref/images', upload.single('image'), propertiesController.uploadPropertyImage);
//router.post('/properties/:ref/documents', upload.single('document'), propertiesController.uploadPropertyDocument);



// delete routes
router.delete('/properties/:id', propertiesController.deleteProperty);
//router.delete('/properties/:ref/amenities', propertiesController.deleteAmenity);
router.delete('/properties/:ref/images/:imageId', propertiesController.deletePropertyImage);
//router.delete('/properties/:ref/documents', propertiesController.deletePropertyDocument);









module.exports = router;