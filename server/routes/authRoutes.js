// routes/authRoutes.js

const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();
const { body } = require('express-validator');

// POST route for user login
router.post(
    '/login',
    [
        body('email')
          .isEmail().withMessage('Please provide a valid email address')
          .normalizeEmail(),
        body('password')
          .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long')
          .trim()
          .escape(),
      ], 
      login
    );

module.exports = router;
