
const express = require('express');
const { body, validationResult } = require('express-validator');
const propertiesController = require('../controllers/propertiesController');
const router = express.Router();
const multer = require('multer');
const path = require('path');


//Decide final item destination based on environment

const imageDestination =
  process.env.NODE_ENV === 'production'
    ? '/usr/share/nginx/uploads'                
    : path.join(__dirname, '..', 'uploads');     

const documentDestination =
  process.env.NODE_ENV === 'production'
    ? '/usr/share/nginx/documents'       
    : path.join(__dirname, '..', 'documentos');   

const videoDestination =
  process.env.NODE_ENV === 'production'
    ? '/usr/share/nginx/videos'                
    : path.join(__dirname, '..', 'videos');      

const planosDestination =
  process.env.NODE_ENV === 'production'
    ? '/usr/share/nginx/planos'                
    : path.join(__dirname, '..', 'planos');      

const certificadoDestination =
  process.env.NODE_ENV === 'production'
    ? '/usr/share/nginx/certificados'
    : path.join(__dirname, '..', 'certificados');


// Create multer instances for items uploads

const upload = multer({ dest: imageDestination });
const uploadDocuments = multer({ dest: documentDestination });
const uploadVideo = multer({ dest: videoDestination });
const uploadPlano = multer({ dest: planosDestination });
const uploadCertificado = multer({ dest: certificadoDestination });

 

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
router.get('/properties/:ref/videos', propertiesController.getPropertyVideos);
router.get('/properties/:ref/planos', propertiesController.getPropertyPlanos);
router.get('/properties/:ref/certificados', propertiesController.getPropertyCertificados);
router.get('/requests', propertiesController.getRequests);


// put routes

router.put('/properties/:id', propertiesController.updateProperty);
router.put('/properties/:ref/amenities', propertiesController.updatePropertyAmenities); 
router.put('/properties/images/update-all', propertiesController.updateAllImages);



// post routes

router.post('/properties', propertiesController.addProperty);
router.post('/properties/:ref/images', upload.single('image'), propertiesController.uploadPropertyImage);
router.post('/properties/:ref/documents', uploadDocuments.single('document'), propertiesController.uploadPropertyDocument);
router.post('/properties/:ref/videos', uploadVideo.single('video'), propertiesController.uploadPropertyVideo);
router.post('/properties/:ref/planos', uploadPlano.single('plano'), propertiesController.uploadPropertyPlano);
router.post('/properties/:ref/certificados', uploadCertificado.single('certificado'), propertiesController.uploadPropertyCertificado);
router.post('/contactar-email', validateContactForm, propertiesController.sendEmail);


// delete routes

router.delete('/properties/:id', propertiesController.deleteProperty);
router.delete('/properties/images/:imageId', propertiesController.deletePropertyImage);
router.delete('/properties/documents/:documentId', propertiesController.deletePropertyDocument);
router.delete('/properties/videos/:videoId', propertiesController.deletePropertyVideo);
router.delete('/properties/planos/:planoId', propertiesController.deletePropertyPlano);
router.delete('/properties/certificados/:certificadoId', propertiesController.deletePropertyCertificado);

module.exports = router;
