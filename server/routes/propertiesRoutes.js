//propertiesRoutes.js
const express = require('express');
const propertiesController = require('../controllers/propertiesController');
const router = express.Router();
const multer = require('multer');

const upload = multer({ dest: '/usr/share/nginx/uploads/' });
//const uploadDocuments = multer({ dest: '/usr/share/nginx/uploads/documents/' });  
const uploadDocuments = multer({ dest: 'documentos' });

// get 
router.get('/properties', propertiesController.getTableProperties);
router.get('/properties/:id', propertiesController.getPropertyById);
router.get('/properties/:ref/amenities', propertiesController.getPropertyAmenities); 
router.get('/properties/:ref/images', propertiesController.getPropertyImages);
router.get('/properties/:ref/documents', propertiesController.getPropertyDocuments);



// put 
router.put('/properties/:id', propertiesController.updateProperty);
router.put('/properties/:ref/amenities', propertiesController.updatePropertyAmenities); 
router.put('/properties/images/update-all', propertiesController.updateAllImages);



// post 
router.post('/properties', propertiesController.addProperty);
//router.post('/properties/:ref/amenities', propertiesController.addAmenity);
router.post('/properties/:ref/images', upload.single('image'), propertiesController.uploadPropertyImage);
router.post('/properties/:ref/documents', uploadDocuments.single('document'), propertiesController.uploadPropertyDocument);



// delete 
router.delete('/properties/:id', propertiesController.deleteProperty);
//router.delete('/properties/:ref/amenities', propertiesController.deleteAmenity);
router.delete('/properties/images/:imageId', propertiesController.deletePropertyImage);
router.delete('/properties/documents/:documentId', propertiesController.deletePropertyDocument);









module.exports = router;