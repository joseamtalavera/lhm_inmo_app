// controllers/authController.js

const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../models/Queries');
const { validationResult } = require('express-validator');

// User login function
exports.login = async (req, res) => {
  // Validate inputs (check if any validation error exists)
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { email, password } = req.body;
  console.log('Received req.body:', req.body);

  try {
    // Check if the user exists
    const user = await getUserByEmail(email);
    console.log('user:', user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Validate password
   /*  const isMatch = await bcrypt.compare(password, user.password);
    console.log('isMatch:', isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    } */

    // Generate JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Send response
    res.status(200).json({
      token,
      user: { email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
