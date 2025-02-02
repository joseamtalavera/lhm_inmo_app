//propertiesRoutes.js
const express = require('express');
const { body, validationResult } = require('express-validator');
const propertiesController = require('../controllers/propertiesController');
const router = express.Router();
const multer = require('multer');
const path = require('path');


//1) Decide final image destination based on environment
const imageDestination =
  process.env.NODE_ENV === 'production'
    ? '/usr/share/nginx/uploads'                // Production folder (Nginx-managed)
    : path.join(__dirname, '..', 'uploads');     // Dev folder (served by Express)


//2) Decide final documents destination based on environment
const documentDestination =
  process.env.NODE_ENV === 'production'
    ? '/usr/share/nginx/documents'       // Production folder (Nginx-managed)
    : path.join(__dirname, '..', 'documentos');   // Dev folder (served by Express)

///3) Create multer instances for image and document uploads
const upload = multer({ dest: imageDestination });
const uploadDocuments = multer({ dest: documentDestination });

 

// Validation and sanitization middleware for contact form
const validateContactForm = [
  body('message')
    .trim()
    .escape()
    .notEmpty()
    .withMessage('Message is required'),
  body('email')
    .isEmail()
    .normalizeEmail()
    .withMessage('Invalid email address'),
  body('telephone')
    .trim()
    .escape()
    .isMobilePhone()
    .withMessage('Invalid telephone number'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
]; 

// get routes

router.get('/properties', propertiesController.getTableProperties);
router.get('/properties/:id', propertiesController.getPropertyById);
router.get('/properties/:ref/amenities', propertiesController.getPropertyAmenities); 
router.get('/properties/:ref/images', propertiesController.getPropertyImages);
router.get('/properties/:ref/documents', propertiesController.getPropertyDocuments);


// put routes

router.put('/properties/:id', propertiesController.updateProperty);
router.put('/properties/:ref/amenities', propertiesController.updatePropertyAmenities); 
router.put('/properties/images/update-all', propertiesController.updateAllImages);



// post routes

router.post('/properties', propertiesController.addProperty);
router.post('/properties/:ref/images', upload.single('image'), propertiesController.uploadPropertyImage);
router.post('/properties/:ref/documents', uploadDocuments.single('document'), propertiesController.uploadPropertyDocument);
router.post('/contactar-email', validateContactForm, propertiesController.sendEmail);


// delete routes

router.delete('/properties/:id', propertiesController.deleteProperty);
router.delete('/properties/images/:imageId', propertiesController.deletePropertyImage);
router.delete('/properties/documents/:documentId', propertiesController.deletePropertyDocument);









module.exports = router;