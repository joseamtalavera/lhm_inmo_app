// routes/authRoutes.js

const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();

// POST route for user login
router.post('/login', login);

module.exports = router;
