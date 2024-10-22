//propertiesRoutes.js
const express = require('express');
const propertiesController = require('../controllers/propertiesController');
const router = express.Router();

router.get('/properties', propertiesController.getTableProperties);
router.post('/properties', propertiesController.addProperty);
router.put('/properties/:id', propertiesController.updateProperty);
router.delete('/properties/:id', propertiesController.deleteProperty);

module.exports = router;